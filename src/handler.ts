import {} from '@cloudflare/workers-types'
import { Router } from './router'

function handler(request: Request): Promise<Response> {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify({ some: 'json' })
  return Promise.resolve(new Response(body, init))
}

async function handleRequest(request: Request): Promise<Response> {
  const r = new Router()

  r.get('.*/bar', () => Promise.resolve(new Response('responding for /bar')))
  r.get('.*/foo', request => handler(request))
  r.post('.*/foo.*', request => handler(request))
  r.get('/demos/router/buzz', request => fetch(request)) // return the response from the origin
  r.all('/', () =>
    Promise.resolve(
      new Response('Hello worker!! Request method was: ' + request.method),
    ),
  )

  const resp = await r.route(request)
  return resp
}

export { handleRequest }
