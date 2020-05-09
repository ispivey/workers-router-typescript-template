import {} from '@cloudflare/workers-types'

const Method = (method: string) => (req: Request) =>
  req.method.toLowerCase() === method.toLowerCase()

const Connect = Method('connect')
const Delete = Method('delete')
const Get = Method('get')
const Head = Method('head')
const Options = Method('options')
const Patch = Method('patch')
const Post = Method('post')
const Put = Method('put')
const Trace = Method('trace')

const Header = (header: string, val: string) => (req: Request) =>
  req.headers.get(header) === val
const Host = (host: string) => Header('host', host.toLowerCase())
const Referrer = (host: string) => Header('referrer', host.toLowerCase())

const Path = (regExp: string) => (req: Request) => {
  const url = new URL(req.url)
  const path = url.pathname
  const match = path.match(regExp) || []
  return match[0] === path
}

interface HandlerFunc {
  (req: Request): Promise<Response>
}

interface ConditionFunc {
  (req: Request): Boolean
}

interface Route {
  conditions: Array<ConditionFunc>
  handler: HandlerFunc
}

class Router {
  routes: Array<Route>

  constructor() {
    this.routes = []
  }

  handle(conditions: Array<ConditionFunc>, handler: HandlerFunc): void {
    this.routes.push({
      conditions,
      handler,
    })
  }

  connect(url: string, handler: HandlerFunc) {
    return this.handle([Connect, Path(url)], handler)
  }

  delete(url: string, handler: HandlerFunc) {
    return this.handle([Delete, Path(url)], handler)
  }

  get(url: string, handler: HandlerFunc) {
    return this.handle([Get, Path(url)], handler)
  }

  head(url: string, handler: HandlerFunc) {
    return this.handle([Head, Path(url)], handler)
  }

  options(url: string, handler: HandlerFunc) {
    return this.handle([Options, Path(url)], handler)
  }

  patch(url: string, handler: HandlerFunc) {
    return this.handle([Patch, Path(url)], handler)
  }

  post(url: string, handler: HandlerFunc) {
    return this.handle([Post, Path(url)], handler)
  }

  put(url: string, handler: HandlerFunc) {
    return this.handle([Put, Path(url)], handler)
  }

  trace(url: string, handler: HandlerFunc) {
    return this.handle([Trace, Path(url)], handler)
  }

  all(url: string, handler: HandlerFunc) {
    return this.handle([Path(url)], handler)
  }

  route(req: Request) {
    const route = this.resolve(req)
    if (route) {
      return route.handler(req)
    } else {
      return new Response('resource not found', {
        status: 404,
        statusText: 'not found',
        headers: {
          'content-type': 'text/plan',
        },
      })
    }
  }

  resolve(req: Request) {
    return this.routes.find(r => {
      if (!r.conditions || r.conditions.length == 0) {
        return true
      }
      return r.conditions.every(c => c(req))
    })
  }
}

export {
  Router,
  Connect,
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put,
  Trace,
  Header,
  Host,
  Referrer,
  Path,
}
