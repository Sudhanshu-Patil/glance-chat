# Glance

<p align="center"><img src="docs/demo.gif" alt="Glance robot following the cursor, answering a question, then switching colours and theme" width="344"></p>

A floating AI assistant for your portfolio, with a little robot that has moods. It follows the cursor, blinks, gets happy, thinks while it answers, dozes off when you leave it alone, and answers visitors' questions about you. **It reads your portfolio by itself**, so there's nothing to write or paste.

**Free to run.** It needs a free [Groq](https://console.groq.com/keys) API key and a free [Vercel](https://vercel.com) account. Nothing else, no database, no paid API.

**Works anywhere.** One script tag, no dependencies, no framework. Plain HTML, React, Next.js, Astro, WordPress, Webflow: if your site can include a script, it can have Glance. It renders in a Shadow DOM, so your site's CSS and the widget never clash.

**Live demo:** [glance-chat.vercel.app](https://glance-chat.vercel.app). Also running on [sudhanshu-patil.vercel.app](https://sudhanshu-patil.vercel.app) (bottom-right corner).

## Setup in 4 steps

1. **Get a free Groq API key.** Sign in at [console.groq.com/keys](https://console.groq.com/keys), click **Create API Key**, and copy it (it starts with `gsk_`). No card needed.

2. **Deploy your copy.** Click the button and paste the key when Vercel asks for `GROQ_API_KEY`. Vercel copies this repo into your GitHub account and deploys it.

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSudhanshu-Patil%2Fglance-chat&env=GROQ_API_KEY&envDescription=Your%20free%20key%20from%20console.groq.com%2Fkeys.%20Nothing%20else%20is%20needed%3A%20Glance%20reads%20your%20portfolio%20by%20itself%20once%20you%20add%20its%20script%20tag.&envLink=https%3A%2F%2Fconsole.groq.com%2Fkeys&project-name=glance-chat&repository-name=glance-chat)

3. **Add it to your portfolio.** Paste this just before `</body>` in your site's HTML, using your deployment's address (in React or Vite apps that's `index.html`):

   ```html
   <script defer src="https://YOUR-PROJECT.vercel.app/widget.js" data-name="Your Name"></script>
   ```

4. **Lock it to your site** (recommended). In Vercel, open Settings, then Environment Variables, and add `ALLOWED_ORIGINS` with your site's address, for example `https://yourname.dev`. This stops other sites from using your bot and your free quota. Redeploy once after adding it.

That's it. Open your deployment's address after step 2 and it walks you through steps 3 and 4 with your snippet already filled in.

**How it fits together:** your portfolio stays wherever it is hosted. Your Glance deployment is a small separate service that serves the robot and talks to Groq. The script tag is the only link between them.

## What it knows

**Your portfolio, read live.** When a visitor asks their first question, the robot reads the page they're on, exactly as they see it, so React and other JavaScript-rendered sites work. It also fetches up to 6 other pages on your site that the current page links to. That happens once per visit, only when someone chats, and nothing is stored.

**Optional extra detail.** For things that aren't on your site, such as your full resume, project write-ups, FAQs or availability, add a `RESUME_TEXT` environment variable in Vercel and redeploy. Open your resume, press **Ctrl+A** then **Ctrl+C**, and paste it as the value. Formatting doesn't matter. Prefer a file? Write `knowledge.md` in your repo instead, starting with `# Your Name`.

Good to know:

- Pages that build all their content with JavaScript are read when they're the page being viewed, but not when fetched as linked pages. Single-page portfolios are covered either way.
- Site text and extra detail share a budget of about 12,000 characters, so each question fits Groq's free limits. Site text gets priority.
- Prefer it not to read your site? Add `data-read-site="off"` to the script tag and give it `RESUME_TEXT` instead.

**Getting updates later:** the Deploy button gives you a snapshot, not a fork. To pull in new Glance improvements, run `git pull https://github.com/Sudhanshu-Patil/glance-chat main` in your copy and push.

## Make the robot yours

**Try every option live** in the configurator at [glance-chat.vercel.app](https://glance-chat.vercel.app): pick a preset or colours, shape, size, corner and theme, watch the robot change, and copy the generated snippet.

Everything is set with attributes on the script tag. All are optional except `data-name`.

| Attribute | Default | What it does |
|---|---|---|
| `data-name` | `me` | Your name, used in the title, greeting and hint |
| `data-accent` | `#bfe36b` | Eye glow and button colour (hex) |
| `data-head` | `#16181d` | Robot head colour (hex) |
| `data-shape` | `rounded` | Head shape: `rounded`, `circle` or `square` |
| `data-size` | `64` | Robot size in pixels (44 to 96) |
| `data-position` | `right` | Corner: `right` or `left` |
| `data-theme` | `dark` | Chat panel: `dark` or `light` |
| `data-title` | `Ask about {name}` | Panel heading |
| `data-greeting` | `Hi, I can answer questions about {name}'s...` | First message in the panel |
| `data-hint` | `Questions about {name}'s work? Ask me.` | Bubble shown once per visit after 5 seconds. `off` disables it |
| `data-suggestions` | three generic questions | Starter questions, separated by `\|` |
| `data-contact` | none | Email shown if the bot is offline or fails |
| `data-api` | `{script origin}/api/chat` | Custom endpoint, if you host the API elsewhere |
| `data-read-site` | on | Read your portfolio's pages for answers. `off` uses only `RESUME_TEXT` or `knowledge.md` |
| `data-manual` | off | Don't mount automatically; call `Glance.mount()` yourself |

Example:

```html
<script defer src="https://glance-alex.vercel.app/widget.js"
  data-name="Alex"
  data-accent="#7c3aed"
  data-head="#1e1b2e"
  data-shape="circle"
  data-theme="light"
  data-position="left"
  data-suggestions="What does Alex build?|Which stack does Alex use?|Is Alex open to work?"
  data-contact="alex@example.com"></script>
```

### Change it from JavaScript

The script exposes `window.Glance.mount(options)`, which re-renders the robot with new options (same names as the attributes, without `data-`) and keeps the current conversation:

```js
Glance.mount({ accent: '#38bdf8', head: '#0f1c2e', shape: 'circle', theme: 'light', open: true })
```

Useful for matching a dark/light toggle on your site.

### Moods

| Mood | When |
|---|---|
| Happy (curved eyes) | Hovered, greeting you, after answering |
| Surprised (wide eyes) | Chat opens, or woken up |
| Thinking (squints and scans) | Waiting for an answer |
| Sad (drooping eyes) | Something went wrong |
| Sleepy (half-closed) | No mouse movement for 30 seconds |
| Idle | Blinks, sometimes twice, follows the cursor and glances around |

Visitors who prefer reduced motion get a still robot.

## How it answers

Each question is sent to Groq's `openai/gpt-oss-120b` together with your site's text and any extra detail, with instructions to answer only from that, never invent facts, and point to your contact details when it doesn't know. Answers stream in, and each one ends with two suggested follow-up questions.

**Free tier limits.** Groq's free tier allows about 8,000 tokens per minute per model. If the main model is busy, Glance retries on `openai/gpt-oss-20b`, which has its own quota. That is roughly 3 to 4 questions a minute and around 100 a day for a typical portfolio. Each visitor is also limited to 20 questions per 10 minutes.

**Models change.** Groq retires models every few months. If answers start failing, set `GROQ_MODEL` in Vercel to a current model from [console.groq.com/docs/models](https://console.groq.com/docs/models).

## Settings

| Environment variable | Required | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Yes | Your free Groq key |
| `RESUME_TEXT` | No | Extra detail that isn't on your site: resume, project notes, FAQs. `KNOWLEDGE` is accepted as an alias |
| `ALLOWED_ORIGINS` | Recommended | Comma-separated sites allowed to use the bot |
| `GROQ_MODEL` | No | Override the main model |

## Run it locally

```bash
GROQ_API_KEY=your_key npm run dev   # http://localhost:3000
npm run check                       # offline tests, no key needed
```

No `npm install` needed: there are no dependencies.

## Framework notes

- **React (Vite or CRA):** put the script tag in `index.html`.
- **Next.js:** `<Script src="https://YOUR-PROJECT.vercel.app/widget.js" data-name="Your Name" strategy="afterInteractive" />` from `next/script`.
- **WordPress:** add the tag through your theme's footer or a "header and footer scripts" plugin.

## Privacy and safety

- Questions, along with your site's public text, go from the visitor's browser to your Vercel function, then to Groq. Nothing is stored. The widget reads only pages on your own site, and never sends cookies when fetching them.
- Model output is only ever inserted as text, never as HTML.
- Everything on your site and in `RESUME_TEXT` or `knowledge.md` can be repeated to anyone who asks, so only include what you'd put on your public site.

## License

MIT
