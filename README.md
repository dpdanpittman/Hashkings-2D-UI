<h1 align="center">HashKings</h1>

<div align="center">
  <strong>Gamified Staking</strong>
</div>
<div align="center">
  Steem Blockchain Gaming | Grow Crypto Cannabis and get paid to play! 
</div>

<br />

<div align="center">
  <h3>
    <a href="https://qwoyn.io">
      Website
    </a>
    <span> | </span>
    <a href="https://discord.gg/DcsPHUG">
      Community
    </a>
    <span> | </span>
    <a href="https://steemit.com/@hashkings">
      Steemit
    </a>
    <span> | </span>
    <a href="https://discord.gg/DcsPHUG">
      Chat
    </a>
  </h3>
</div>

<div align="center">
  <sub>Gamified Staking. Built with ❤︎ by
  <a href="https://twitter.com/canna_curate">Daniel Pittman</a> and
  <a href="https://github.com/dpdanpittman/Hashkings-2D-UI/graphs/contributors">
    contributors
  </a>
</div>

## Table of Contents
- [Features](#features)
- [Optimizations](#optimizations)
- [FAQ](#faq)
- [Installation](#installation)
- [See Also](#see-also)
- [Support](#support)

## Features
- __Blockchain:__ imuttable record and non-fungible tokens on Steem
- __React.js:__ our frontend is written with the react framework
- __custom api:__ unique requests to the Steem Blockchain 
- __minimal requirements:__ easy to use with [Steem Keychain](https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm?hl=en)
- __isomorphic:__ renders seamlessly in both Node and browsers

## Philosophy
We believe programming should be fun and light, not stern and stressful. It's
cool to be cute; using serious words without explaining them doesn't make for
better results - if anything it scares people off. We don't want to be scary,
we want to be nice and fun, and then _casually_ be the best choice around.
_Real casually._

We believe frameworks should be disposable, and components recyclable. We don't
want a web where walled gardens jealously compete with one another. By making
the DOM the lowest common denominator, switching from one framework to another
becomes frictionless. choo is modest in its design; we don't believe it will
be top of the class forever, so we've made it as easy to toss out as it is to
pick up.

We don't believe that bigger is better. Big APIs, large complexities, long
files - we see them as omens of impending userland complexity. We want everyone
on a team, no matter the size, to fully understand how an application is laid
out. And once an application is built, we want it to be small, performant and
easy to reason about. All of which makes for easy to debug code, better results
and super smiley faces.

## FAQ
### Why is it called choo?
Because I thought it sounded cute. All these programs talk about being
_"performant"_, _"rigid"_, _"robust"_ - I like programming to be light, fun and
non-scary. choo embraces that.

Also imagine telling some business people you chose to rewrite something
critical for serious bizcorp using a train themed framework.
:steam_locomotive::train::train::train:

### Is it called choo, choo.js or...?
It's called "choo", though we're fine if you call it "choo-choo" or
"Chugga-chugga-choo-choo" too. The only time "choo.js" is tolerated is if /
when you shimmy like you're a locomotive.

### Does choo use a virtual-dom?
choo uses [nanomorph][nanomorph], which diffs real DOM nodes instead of
virtual nodes. It turns out that [browsers are actually ridiculously good at
dealing with DOM nodes][morphdom-bench], and it has the added benefit of
working with _any_ library that produces valid DOM nodes. So to put a long
answer short: we're using something even better.

### How can I support older browsers?
Template strings aren't supported in all browsers, and parsing them creates
significant overhead. To optimize we recommend running `browserify` with
[nanohtml][nanohtml] as a global transform or using [bankai][bankai] directly.
```sh
$ browserify -g nanohtml
```

### Is choo production ready?
Sure.

## API
This section provides documentation on how each function in choo works. It's
intended to be a technical reference. If you're interested in learning choo for
the first time, consider reading through the [handbook][handbook] first
:sparkles:

### `app = choo([opts])`
Initialize a new `choo` instance. `opts` can also contain the following values:
- __opts.history:__ default: `true`. Listen for url changes through the
  history API.
- __opts.href:__ default: `true`. Handle all relative `<a
  href="<location>"></a>` clicks and call `emit('render')`
- __opts.cache:__ default: `undefined`. Override default class cache used by
  `state.cache`. Can be a a `number` (maximum number of instances in cache,
  default `100`) or an `object` with a [nanolru][nanolru]-compatible API.
- __opts.hash:__ default: `true`. Treat hashes in URLs as part of the pathname,
  transforming `/foo#bar` to `/foo/bar`. This is useful if the application is
  not mounted at the website root.

### `app.use(callback(state, emitter, app))`
Call a function and pass it a `state`, `emitter` and `app`. `emitter` is an instance
of [nanobus](https://github.com/hashkingsjs/nanobus/). You can listen to
messages by calling `emitter.on()` and emit messages by calling
`emitter.emit()`. `app` is the same choo instance. Callbacks passed to `app.use()` are commonly referred to as
`'stores'`.

If the callback has a `.storeName` property on it, it will be used to identify
the callback during tracing.

See [#events](#events) for an overview of all events.

### `app.route(routeName, handler(state, emit))`
Register a route on the router. The handler function is passed `app.state`
and `app.emitter.emit` as arguments. Uses [nanorouter][nanorouter] under the
hood.

See [#routing](#routing) for an overview of how to use routing efficiently.

### `app.mount(selector)`
Start the application and mount it on the given `querySelector`,
the given selector can be a String or a DOM element.

In the browser, this will _replace_ the selector provided with the tree returned from `app.start()`.
If you want to add the app as a child to an element, use `app.start()` to obtain the tree and manually append it.

On the server, this will save the `selector` on the app instance.
When doing server side rendering, you can then check the `app.selector` property to see where the render result should be inserted.

Returns `this`, so you can easily export the application for server side rendering:

```js
module.exports = app.mount('body')
```

### `tree = app.start()`
Start the application. Returns a tree of DOM nodes that can be mounted using
`document.body.appendChild()`.

### `app.toString(location, [state])`
Render the application to a string. Useful for rendering on the server.

### `choo/html`
Create DOM nodes from template string literals. Exposes
[nanohtml](https://github.com/hashkingsjs/nanohtml). Can be optimized using
[nanohtml][nanohtml].

### `choo/html/raw`
Exposes [nanohtml/raw](https://github.com/shama/nanohtml#unescaping) helper for rendering raw HTML content.

## Installation
```sh
$ npm install choo
```

## See Also
- [bankai](https://github.com/hashkingsjs/bankai) - streaming asset compiler
- [stack.gl](http://stack.gl/) - open software ecosystem for WebGL
- [yo-yo](https://github.com/maxogden/yo-yo) - tiny library for modular UI
- [tachyons](https://github.com/tachyons-css/tachyons) - functional CSS for
  humans
- [sheetify](https://github.com/stackcss/sheetify) - modular CSS bundler for
  `browserify`

## Support
Creating a quality framework takes a lot of time. Unlike others frameworks,
choo is completely independently funded. We fight for our users. This does mean
however that we also have to spend time working contracts to pay the bills.
This is where you can help: by chipping in you can ensure more time is spent
improving choo rather than dealing with distractions.

### Sponsors
Become a sponsor and help ensure the development of independent quality
software. You can help us keep the lights on, bellies full and work days sharp
and focused on improving the state of the web. [Become a
sponsor](https://opencollective.com/choo#sponsor)


### Backers
Become a backer, and buy us a coffee (or perhaps lunch?) every month or so.
[Become a backer](https://opencollective.com/choo#backer)


## License
[MIT](https://tldrlegal.com/license/mit-license)