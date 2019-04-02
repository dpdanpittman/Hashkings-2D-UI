import cookie from "cookie";
import Head from "next/head";
import React from "react";
import { getMarkupFromTree } from "react-apollo-hooks";
import { renderToString } from "react-dom/server";
import initApollo from "./init-apollo";
import { ME_QUERY } from "../graphql/queries";

function parseCookies(req, options) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

export default App => {
  return class Apollo extends React.Component {
    static displayName = "withApolloClient(App)";
    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      let apollo;

      try {
        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        apollo = initApollo(
          {},
          {
            getToken: () => parseCookies(req).accessToken,
          }
        );
      } catch (e) {
        console.log(e);
      }

      const {
        data: { me },
      } = await apollo.query({ query: ME_QUERY });

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getMarkupFromTree({
            renderFunction: renderToString,
            tree: (
              <App
                {...appProps}
                Component={Component}
                router={router}
                apolloClient={apollo}
              />
            ),
          });
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
        me,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().accessToken;
        },
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};