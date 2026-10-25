# Glance

A floating AI assistant for your portfolio, with a little robot that has moods. It follows the cursor, blinks, gets happy, thinks while it answers, dozes off when you leave it alone, and answers visitors' questions using only what you write in `knowledge.md`.

**Free to run.** It needs a free [Groq](https://console.groq.com/keys) API key and a free [Vercel](https://vercel.com) account. Nothing else, no database, no paid API.

**Works anywhere.** One script tag, no dependencies, no framework. Plain HTML, React, Next.js, Astro, WordPress, Webflow: if your site can include a script, it can have Glance. It renders in a Shadow DOM, so your site's CSS and the widget never clash.

**Live demo:** [glance-chat.vercel.app](https://glance-chat.vercel.app). Also running on [sudhanshu-patil.vercel.app](https://sudhanshu-patil.vercel.app) (bottom-right corner).

## Setup in 5 steps

1. **Get a free Groq API key** at [console.groq.com/keys](https://console.groq.com/keys).

2. **Deploy your copy.** Click the button and paste the key when Vercel asks for `GROQ_API_KEY`. Vercel copies this repo into your GitHub account and deploys it.

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSudhanshu-Patil%2Fglance-chat&env=GROQ_API_KEY&envDescription=Free%20API%20key%20from%20Groq&envLink=https%3A%2F%2Fconsole.groq.com%2Fkeys&project-name=glance-chat&repository-name=glance-chat)

3. **Tell it about you.** In your new repo, edit `knowledge.md` (GitHub's web editor is fine). Keep the first line as `# Your Name`, then paste your experience, projects, skills and contact details. Commit, and Vercel redeploys on its own.

4. **Add it to your site.** Paste this before `</body>`, using your deployment's URL:

   ```html
   <script defer src="https://YOUR-PROJECT.vercel.app/widget.js" data-name="Your Name"></script>
   ```

5. **Lock it to your site** (recommended). In Vercel, open Settings, then Environment Variables, and add `ALLOWED_ORIGINS` with your site's address, for example `https://yourname.dev`. This stops other sites from using your bot and your free quota. Redeploy once after adding it.

That's it. Your deployment's home page is also a live demo with the snippet ready to copy.

## Make the robot yours

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

The whole of `knowledge.md` is sent with each question to Groq's `openai/gpt-oss-120b`, with instructions to answer only from it, never invent facts, and point to your contact details when it doesn't know. Answers stream in, and each one ends with two suggested follow-up questions.

**Free tier limits.** Groq's free tier allows about 8,000 tokens per minute per model. If the main model is busy, Glance retries on `openai/gpt-oss-20b`, which has its own quota. With a typical `knowledge.md`, that is roughly 5 questions a minute and over 100 a day. Each visitor is also limited to 20 questions per 10 minutes. Keep `knowledge.md` focused, since shorter means more questions per minute.

**Models change.** Groq retires models every few months. If answers start failing, set `GROQ_MODEL` in Vercel to a current model from [console.groq.com/docs/models](https://console.groq.com/docs/models).

## Settings

| Environment variable | Required | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Yes | Your free Groq key |
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

- Questions go from the visitor's browser to your Vercel function, then to Groq. Nothing is stored.
- Model output is only ever inserted as text, never as HTML.
- Everything in `knowledge.md` can be repeated to anyone who asks, so only include what you'd put on your public site.

## License

MIT
