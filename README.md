# Router

Selects the logic to respond to requests based on the `request` method and URL. Can be used with REST APIs or apps that require basic routing logic.

- [`router.ts`](https://github.com/ispivey/workers-router-typescript-template/blob/master/src/router.ts) implements the `Router` object
- [`handler.ts`](https://github.com/ispivey/workers-router-typescript-template/blob/master/src/handler.ts) includes examples of using a `Router` to handle requests
- [`index.ts`](https://github.com/ispivey/workers-router-typescript-template/blob/master/src/index.ts) registers a `fetch` event handler that simply invokes `handleRequest`

To use the `Router`, simply use its helper methods to register route handlers:

```typescript
const r = new Router()

r.get('/demos/router/buzz', request => fetch(request))
r.all('/', () =>
  Promise.resolve(
    new Response('Hello worker!! Request method was: ' + request.method),
  ),
)

const resp = await r.route(request)
return resp
```

Handler functions must be of the type:

```typescript
interface HandlerFunc {
  (req: Request): Promise<Response>
}
```

You can construct more complex routing rules based on request method, path-matching regular expressions, and headers. In the current absence of documentation, check out [`router.ts`](https://github.com/ispivey/workers-router-typescript-template/blob/master/src/router.ts) to learn more.

### 🔋 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To generate using Wrangler, run this command:

```bash
wrangler generate my-app https://github.com/ispivey/workers-router-typescript-template
```

### 👩 💻 Developing

[`src/index.js`](./src/index.ts) calls the request handler in [`src/handler.ts`](./src/handler.ts), and will return the [request method](https://developer.mozilla.org/en-US/docs/Web/API/Request/method) for the given request.

### 🧪 Testing

This template comes with mocha tests which simply test that the `handleRequest` function can handle each request method. `npm test` will run your tests.

### ✏️ Formatting

This template uses [`prettier`](https://prettier.io/) to format the project. To invoke, run `npm run format`.

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).

### 🤢 Issues

If you run into issues with this specific project, please feel free to file an issue [here](https://github.com/ispivey/workers-router-typescript-template/issues). If the problem is with Wrangler, please file an issue [here](https://github.com/cloudflare/wrangler/issues).

### 🙌 Credit

This template is a mashup of the following templates:

- https://github.com/cloudflare/worker-template-router
- https://github.com/EverlastingBugstopper/worker-typescript-template
