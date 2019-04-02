import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "components/PageHeader/PageHeader.jsx";


// sections for this page/view
import Basics from "views/IndexSections/Basics.jsx";
import Pagination from "views/IndexSections/Pagination.jsx";

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <PageHeader />
          <div className="main">
            <Basics />
            <Pagination />
          </div>
        </div>
      </>
    );
  }
}

export default Index;
