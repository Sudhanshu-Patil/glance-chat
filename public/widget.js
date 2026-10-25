/*! Glance chat widget. MIT license. No dependencies.
 * <script defer src="https://YOUR-DEPLOYMENT.vercel.app/widget.js" data-name="Your Name"></script>
 */
;(() => {
  const script = document.currentScript
  if (!script || customElements.get('glance-chat')) return
  const d = script.dataset
  const name = d.name || 'me'
  const cfg = {
    name,
    api: d.api || new URL('/api/chat', script.src).href,
    accent: d.accent || '#bfe36b',
    head: d.head || '#16181d',
    shape: d.shape || 'rounded', // rounded | circle | square
    position: d.position === 'left' ? 'left' : 'right',
    theme: d.theme === 'light' ? 'light' : 'dark',
    size: Math.min(Math.max(parseInt(d.size, 10) || 64, 44), 96),
    title: d.title || `Ask about ${name}`,
    greeting: d.greeting || `Hi, I can answer questions about ${name}'s experience, projects and skills.`,
    hint: d.hint === 'off' ? '' : d.hint || `Questions about ${name}'s work? Ask me.`,
    suggestions: (d.suggestions || `What does ${name} do?|What are ${name}'s best projects?|How can I contact ${name}?`)
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4),
    contact: d.contact || '',
  }

  // Text on accent-coloured bubbles: dark or white, whichever reads better.
  const rgb = (cfg.accent.replace('#', '').match(/../g) || ['bf', 'e3', '6b']).map((h) => parseInt(h, 16) / 255)
  const lum = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)).reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0)
  const onAccent = lum > 0.4 ? '#0b0c0e' : '#ffffff'
  const radius = { rounded: '31%', circle: '50%', square: '14%' }[cfg.shape] || '31%'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  const CSS = `
:host { all: initial; }
.root { --accent:${cfg.accent}; --head:${cfg.head}; --on-accent:${onAccent}; --size:${cfg.size}px; --radius:${radius};
  --bg:#131418; --fg:#ecedee; --muted:#9a9da4; --line:rgba(255,255,255,.09); --bubble:#0b0c0e; --field:#0b0c0e;
  position:fixed; bottom:16px; ${cfg.position}:16px; z-index:2147483000; display:flex; flex-direction:column;
  align-items:${cfg.position === 'left' ? 'flex-start' : 'flex-end'}; gap:12px;
  font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; color:var(--fg); -webkit-font-smoothing:antialiased; }
.root.light { --bg:#ffffff; --fg:#15171a; --muted:#5d636b; --line:rgba(0,0,0,.1); --bubble:#f1f2f4; --field:#f7f7f8; }
@media (min-width:768px) { .root { bottom:24px; ${cfg.position}:24px; } }
button { font:inherit; color:inherit; cursor:pointer; }
*,*::before,*::after { box-sizing:border-box; }
.sr { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }

/* Robot: head > gaze (follows cursor) > scan (thinking) > lid (blinks) > eye (mood shape) */
.head { position:relative; display:flex; align-items:center; justify-content:center; width:var(--size); height:var(--size);
  border-radius:var(--radius); border:1px solid rgba(255,255,255,.1);
  background:linear-gradient(145deg, color-mix(in srgb, var(--head), #fff 10%), var(--head) 60%, color-mix(in srgb, var(--head), #000 30%));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08), 0 0 32px color-mix(in srgb, var(--accent) 22%, transparent), 0 14px 32px rgba(0,0,0,.45);
  transition:transform .6s cubic-bezier(.16,1,.3,1); }
.head.small { --size:36px; box-shadow:none; }
.gaze { display:flex; gap:calc(var(--size) * .2); transition:transform .35s cubic-bezier(.16,1,.3,1); }
.lid { display:flex; align-items:center; justify-content:center; width:calc(var(--size) * .22); height:calc(var(--size) * .33);
  transition:transform .08s ease-in; }
.blink .lid { transform:scaleY(.08); }
.eye { position:relative; display:block; width:100%; height:100%; overflow:hidden; border-radius:50% 50% 50% 50% / 50% 50% 50% 50%;
  background:radial-gradient(ellipse at 50% 38%, color-mix(in srgb, var(--accent), #fff 70%), var(--accent) 58%, color-mix(in srgb, var(--accent), #000 30%));
  box-shadow:0 0 8px var(--accent), 0 0 20px color-mix(in srgb, var(--accent) 45%, transparent);
  transition:height .4s cubic-bezier(.16,1,.3,1), transform .4s cubic-bezier(.16,1,.3,1), border-radius .4s cubic-bezier(.16,1,.3,1); }
.eye i { position:absolute; left:20%; top:12%; width:34%; height:34%; border-radius:50%; background:rgba(255,255,255,.85); }
[data-mood=happy] .eye { height:50%; transform:translateY(-30%); border-radius:50% 50% 15% 15% / 100% 100% 25% 25%; }
[data-mood=thinking] .eye { height:60%; transform:translateY(-15%); }
[data-mood=sleepy] .eye { height:20%; transform:translateY(40%); transition-duration:1.2s; }
[data-mood=sad] .eye { height:60%; transform:translateY(20%); border-radius:15% 15% 50% 50% / 25% 25% 100% 100%; }
[data-mood=surprised] .eye { height:120%; transition-duration:.2s; transition-timing-function:cubic-bezier(.34,1.8,.64,1); }
[data-mood=thinking] .scan { animation:scan .9s ease-in-out infinite alternate; }
.scan { display:flex; gap:inherit; }
@keyframes scan { from { transform:translateX(-3px); } to { transform:translateX(3px); } }

.dock { display:flex; align-items:flex-end; gap:12px; flex-direction:${cfg.position === 'left' ? 'row-reverse' : 'row'}; }
.avatar { padding:0; border:0; background:none; border-radius:var(--radius); animation:float 3.8s ease-in-out infinite; transition:scale .2s; }
.avatar:active { scale:.95; }
@keyframes float { 50% { transform:translateY(-7px); } }
.hint { margin-bottom:12px; padding:8px 14px; max-width:240px; text-align:left; border:1px solid var(--line); border-radius:16px;
  border-bottom-${cfg.position}-radius:4px; background:var(--bg); box-shadow:0 10px 30px rgba(0,0,0,.25); animation:pop .5s cubic-bezier(.16,1,.3,1); }
.hint[hidden] { display:none; }
@keyframes pop { from { opacity:0; transform:translateY(8px); } }

.panel { display:flex; flex-direction:column; width:min(380px, calc(100vw - 2rem)); height:min(520px, 72dvh); overflow:hidden;
  border:1px solid var(--line); border-radius:16px; background:var(--bg); box-shadow:0 24px 80px rgba(0,0,0,.45);
  transform-origin:bottom ${cfg.position}; opacity:0; visibility:hidden; transform:translateY(16px) scale(.96);
  transition:opacity .35s cubic-bezier(.16,1,.3,1), transform .45s cubic-bezier(.16,1,.3,1), visibility 0s .45s; }
.open .panel { opacity:1; visibility:visible; transform:none; transition-delay:0s; }
header { display:flex; align-items:center; gap:12px; padding:12px 16px; border-bottom:1px solid var(--line); }
.title { margin:0; font-weight:600; }
.sub { margin:0; font-size:12px; color:var(--muted); }
.close { margin-left:auto; display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border:0;
  border-radius:50%; background:none; color:var(--muted); }
.close:hover { color:var(--fg); background:var(--line); }
.list { flex:1; overflow-y:auto; overscroll-behavior:contain; padding:16px; display:flex; flex-direction:column; gap:12px;
  scrollbar-width:thin; scrollbar-color:var(--line) transparent; }
.intro { margin:0; color:var(--muted); }
.msg { margin:0; max-width:85%; padding:10px 14px; border-radius:16px; white-space:pre-wrap; overflow-wrap:anywhere; }
.msg.user { align-self:flex-end; background:var(--accent); color:var(--on-accent); }
.msg.bot { align-self:flex-start; background:var(--bubble); }
.msg.wait { color:var(--muted); animation:pulse 1.4s ease-in-out infinite; }
@keyframes pulse { 50% { opacity:.4; } }
.chips { display:flex; flex-wrap:wrap; gap:8px; }
.chip { padding:6px 12px; text-align:left; font-size:12px; border:1px solid var(--line); border-radius:999px; background:none; transition:color .2s, border-color .2s; }
.chip:hover { color:var(--accent); border-color:var(--accent); }
.light .chip:hover { color:var(--fg); }
form { display:flex; gap:8px; padding:12px; border-top:1px solid var(--line); }
input { flex:1; min-width:0; padding:10px 16px; font:inherit; color:var(--fg); background:var(--field); border:1px solid var(--line); border-radius:999px; }
input::placeholder { color:var(--muted); }
input:focus { outline:none; border-color:var(--accent); }
.send { flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border:0; border-radius:50%;
  background:var(--accent); color:var(--on-accent); transition:opacity .2s, scale .2s; }
.send:active { scale:.95; }
.send:disabled { opacity:.4; cursor:default; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation:none !important; transition:none !important; } }
`

  const robot = (small) =>
    `<span class="head${small ? ' small' : ''}"><span class="gaze"><span class="scan">${'<span class="lid"><span class="eye"><i></i></span></span>'.repeat(2)}</span></span></span>`

  // The model ends answers with "FOLLOWUPS: q1 | q2". Hide that line (even mid-stream) and return the questions.
  function splitAnswer(text) {
    const i = text.search(/\n?\s*FOLLOW/)
    if (i < 0) return [text, []]
    const tail = text.slice(i).replace(/^\s*FOLLOWUPS?:?/, '')
    return [text.slice(0, i).trimEnd(), tail.split(/\||(?<=\?)\s+/).map((q) => q.trim()).filter((q) => q.length > 3).slice(0, 2)]
  }

  class GlanceChat extends HTMLElement {
    connectedCallback() {
      const root = this.attachShadow({ mode: 'open' })
      root.innerHTML = `<style>${CSS}</style>
<div class="root ${cfg.theme}" data-mood="idle">
  <section class="panel" role="dialog" aria-label="">
    <header>${robot(true)}<div><p class="title"></p><p class="sub">Answers from this portfolio. Can make mistakes.</p></div>
      <button class="close" type="button" aria-label="Close chat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </header>
    <div class="list" aria-live="polite" data-lenis-prevent></div>
    <form><label class="sr" for="glance-q">Your question</label>
      <input id="glance-q" maxlength="600" autocomplete="off" placeholder="Ask a question">
      <button class="send" type="submit" aria-label="Send" disabled><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/></svg></button>
    </form>
  </section>
  <div class="dock"><button class="hint" type="button" hidden></button><button class="avatar" type="button" aria-expanded="false">${robot(false)}</button></div>
</div>`
      const $ = (s) => root.querySelector(s)
      this.ui = { root: $('.root'), panel: $('.panel'), list: $('.list'), form: $('form'), input: $('input'), send: $('.send'), avatar: $('.avatar'), hint: $('.hint') }
      const { panel, avatar, hint, input, send, form } = this.ui
      panel.setAttribute('aria-label', cfg.title)
      $('.title').textContent = cfg.title
      avatar.setAttribute('aria-label', cfg.title)
      hint.textContent = cfg.hint
      this.messages = []
      this.busy = false
      this.intro()

      avatar.addEventListener('click', () => this.toggle())
      hint.addEventListener('click', () => this.toggle(true))
      $('.close').addEventListener('click', () => this.toggle(false))
      avatar.addEventListener('pointerenter', () => this.mood === 'idle' && this.flash('happy', 1200))
      input.addEventListener('input', () => (send.disabled = this.busy || !input.value.trim()))
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.ask(input.value)
      })
      root.addEventListener('keydown', (e) => e.key === 'Escape' && this.toggle(false))
      this.alive()

      let seen = false
      try {
        seen = sessionStorage.getItem('glance-hint') === '1'
      } catch {}
      if (cfg.hint && !seen)
        setTimeout(() => {
          if (this.isOpen) return
          hint.hidden = false
          this.flash('happy', 1400)
        }, 5000)
    }

    // --- moods -------------------------------------------------------------
    get mood() {
      return this.ui.root.dataset.mood
    }
    setMood(m) {
      this.ui.root.dataset.mood = m
    }
    setBase(m) {
      this.base = m
      clearTimeout(this.back)
      this.setMood(m)
    }
    flash(m, ms, then) {
      clearTimeout(this.back)
      this.setMood(m)
      this.back = setTimeout(() => (then ? then() : this.setMood(this.base || 'idle')), ms)
    }

    // Blink, follow the cursor, glance around when idle, doze off after 30s without movement.
    alive() {
      if (reduced) return
      const { root, avatar } = this.ui
      const gazes = root.querySelectorAll('.gaze')
      const head = avatar.querySelector('.head')
      let last = Date.now()
      let frame = 0
      const look = (dx, dy, tilt) => {
        gazes.forEach((g) => (g.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`))
        if (tilt !== undefined) head.style.transform = `rotate(${tilt.toFixed(1)}deg)`
      }
      addEventListener(
        'pointermove',
        (e) => {
          last = Date.now()
          if (this.mood === 'sleepy') this.flash('surprised', 450)
          if (frame) return
          frame = requestAnimationFrame(() => {
            frame = 0
            if (this.mood === 'thinking') return
            const r = head.getBoundingClientRect()
            const dx = e.clientX - (r.left + r.width / 2)
            const dy = e.clientY - (r.top + r.height / 2)
            const dist = Math.hypot(dx, dy) || 1
            const reach = Math.min(dist / 160, 1) * (cfg.size / 64)
            look((dx / dist) * reach * 6, (dy / dist) * reach * 5, Math.max(-8, Math.min(8, dx / 50)))
          })
        },
        { passive: true },
      )
      const blink = () => {
        setTimeout(() => {
          if (this.mood !== 'sleepy') {
            root.classList.add('blink')
            setTimeout(() => root.classList.remove('blink'), 110)
            if (Math.random() < 0.25) setTimeout(() => (root.classList.add('blink'), setTimeout(() => root.classList.remove('blink'), 110)), 260)
          }
          blink()
        }, 2200 + Math.random() * 3300)
      }
      blink()
      setInterval(() => {
        const still = Date.now() - last
        if (this.mood !== 'idle') return
        if (still > 30000 && !this.isOpen) return this.setMood('sleepy')
        if (still > 3000 && Math.random() < 0.55) look(Math.random() * 12 - 6, Math.random() * 8 - 4)
      }, 1600)
    }

    // --- panel -------------------------------------------------------------
    toggle(force) {
      const open = force ?? !this.isOpen
      if (open === this.isOpen) return
      this.isOpen = open
      const { root, avatar, hint, input } = this.ui
      root.classList.toggle('open', open)
      avatar.setAttribute('aria-expanded', String(open))
      if (open) {
        hint.hidden = true
        try {
          sessionStorage.setItem('glance-hint', '1')
        } catch {}
        this.flash('surprised', 300, () => this.flash('happy', 1000))
        setTimeout(() => input.focus(), 50)
      } else avatar.focus()
    }

    // --- messages ----------------------------------------------------------
    el(tag, cls, text) {
      const n = document.createElement(tag)
      n.className = cls
      if (text) n.textContent = text // text only: model output never becomes HTML
      return n
    }
    chips(list) {
      this.ui.list.querySelector('.chips')?.remove()
      if (!list.length) return
      const box = this.el('div', 'chips')
      list.forEach((q) => {
        const b = this.el('button', 'chip', q)
        b.type = 'button'
        b.addEventListener('click', () => this.ask(q))
        box.append(b)
      })
      this.ui.list.append(box)
    }
    intro() {
      this.ui.list.append(this.el('p', 'intro', cfg.greeting))
      this.chips(cfg.suggestions)
    }
    scroll() {
      this.ui.list.scrollTop = this.ui.list.scrollHeight
    }

    async ask(text) {
      const q = text.trim().slice(0, 600)
      if (!q || this.busy) return
      const { list, input, send } = this.ui
      this.chips([])
      list.querySelector('.intro')?.remove()
      this.messages.push({ role: 'user', content: q })
      list.append(this.el('p', 'msg user', q))
      const bubble = this.el('p', 'msg bot wait', 'Thinking')
      list.append(bubble)
      input.value = ''
      this.busy = true
      send.disabled = true
      this.setBase('thinking')
      this.scroll()

      let out = ''
      try {
        const res = await fetch(cfg.api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: this.messages }),
        })
        if (!res.ok || !res.body) throw new Error((await res.json().catch(() => ({}))).error || 'failed')
        const reader = res.body.getReader()
        const dec = new TextDecoder()
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          if (!out) {
            this.setBase('idle')
            bubble.classList.remove('wait')
          }
          out += dec.decode(value, { stream: true })
          bubble.textContent = splitAnswer(out)[0]
          this.scroll()
        }
        if (!out) throw new Error('empty')
        this.messages.push({ role: 'assistant', content: out })
        const asked = new Set(this.messages.filter((m) => m.role === 'user').map((m) => m.content))
        const next = splitAnswer(out)[1].filter((s) => !asked.has(s))
        this.chips(next.length ? next : cfg.suggestions.filter((s) => !asked.has(s)).slice(0, 2))
        this.flash('happy', 1500)
      } catch (e) {
        this.messages.pop()
        const reach = cfg.contact ? ` You can reach ${cfg.name} at ${cfg.contact}.` : ''
        bubble.classList.remove('wait')
        bubble.textContent =
          e.message === 'offline'
            ? `I'm offline right now.${reach}`
            : e.message === 'rate_limited'
              ? 'Too many questions in a short time. Give it a minute and try again.'
              : `Something went wrong on my side. Try again in a moment.${reach}`
        this.setBase('idle')
        this.flash('sad', 2200)
      } finally {
        this.busy = false
        send.disabled = !input.value.trim()
        this.scroll()
      }
    }
  }

  customElements.define('glance-chat', GlanceChat)
  const mount = () => document.body.append(document.createElement('glance-chat'))
  document.body ? mount() : addEventListener('DOMContentLoaded', mount)
})()
