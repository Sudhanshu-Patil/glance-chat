// Local preview without the Vercel CLI: serves public/ and api/chat.js on http://localhost:3000
// Run: GROQ_API_KEY=your_key npm run dev
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { Readable } from 'node:stream'

const { GET, POST, OPTIONS } = await import('../api/chat.js')
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' }
const port = Number(process.env.PORT) || 3000

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`)
  if (url.pathname === '/api/chat') {
    const body = req.method === 'POST' ? Readable.toWeb(req) : undefined
    const request = new Request(url, { method: req.method, headers: req.headers, body, duplex: 'half' })
    const handler = { GET, POST, OPTIONS }[req.method]
    if (!handler) return res.writeHead(405).end()
    const response = await handler(request)
    res.writeHead(response.status, Object.fromEntries(response.headers))
    if (response.body) for await (const chunk of response.body) res.write(chunk)
    return res.end()
  }
  const file = normalize(join('public', url.pathname === '/' ? 'index.html' : url.pathname))
  if (!file.startsWith('public')) return res.writeHead(403).end()
  try {
    const data = await readFile(file)
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(data)
  } catch {
    res.writeHead(404).end('Not found')
  }
}).listen(port, () => console.log(`Glance running on http://localhost:${port}`))
