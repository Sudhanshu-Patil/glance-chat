<!-- Replace everything below with your own details. Keep the first line as "# Your Name". Plain facts work best. -->
# Sudhanshu Patil

AI Engineer. Immediate joiner. Pune, Hyderabad, Bangalore, Mumbai or remote.

## Contact
- Email: sudhanshupatil588@gmail.com
- GitHub: https://github.com/Sudhanshu-Patil
- LinkedIn: https://www.linkedin.com/in/sudhpatil
- LeetCode: https://leetcode.com/u/sudh000

## Highlights
- 94%: PII redaction latency cut, 8s to 0.5s
- 10+: production MCP tools across 9 CRM modules
- 8,000+: lines of production code as a team of one
- Top 5%: LeetCode Knight

## Experience
### Freelance AI Engineer (Jul 2026 - Present, Remote)
Client work on MCP and backend systems, plus production-shaped AI builds of my own.
- For a startup client (Sep - Oct 2026), built multi-tenant MCP servers with OAuth 2.1 + PKCE, dynamic client registration and per-tenant protected-resource discovery (RFC 9728), tested until sign-in was clean on all three clients.
- Added an approval layer re-checked on every tool call, so revoking access cuts a user off mid-session, and per-call metered credits charged in a single conditional UPDATE so balances never go negative under concurrency.
- Deployed on AWS ECS Fargate behind an ALB with secrets in SSM, multi-arch images and rolling deploys at 100% minimum healthy.
- Shipped 19 PRs in about a week on a WhatsApp CRM over Meta's Cloud API: error-code-aware retries, pre-send broadcast checks, and a region fix that removed inbox lag.
- Alongside client work, shipped Redline, AI Email Reply, a multi-tenant chatbot platform, a restaurant reception agent and a settlement feasibility engine (all below).

### AI Solutions Developer, SimpleWorks (Aug 2025 - Jun 2026, Nagpur)
Sole AI engineer for banking and enterprise clients, from architecture to production.
- Built a hub-and-spoke agentic RAG framework (orchestrator, intent recogniser, dynamic query splitting, math sandbox) that passed QA for BFSI clients including Bank of India, with up to 2 levels of human-in-the-loop review.
- Architected a cloud-hosted FastMCP server exposing 10+ tools across 9 CRM modules to Claude, Gemini CLI and internal apps, with configurable 40k-token memory.
- Cut PII redaction from 8s to 0.5s by replacing a spaCy transformer with a fine-tuned DistilBERT NER model, plus triple-verification guardrails that keep excluded fields out of every LLM payload.
- Designed the end-to-end MVP architecture and UX for an internal AI platform: multi-DB connectors, RBAC, Langfuse traceability and @mention cross-mode queries.
- Solo-led Python 3.11 to 3.13 and LlamaIndex migrations on Azure AI Foundry with zero rollbacks, including offline wheel packaging for air-gapped banking systems, unblocking GPT-5 series adoption.

### Associate Data Scientist (Intern), Novartis (Jan 2025 - Jul 2025, Hyderabad)
Received a full-time pre-placement offer for performance.
- Built an on-prem LLM chatbot trained on internal R-coding files. It answered in R without being prompted to, with quality comparable to OSS tools, and no data left the network.
- Removed manual work for 60+ data managers with VBA and Office Scripts automations, and replaced SAS reporting with an interactive RShiny dashboard.

## Projects
### MediClaim: Agentic RAG for insurance claims adjudication
A friend spent six weeks fighting a denied claim. The answer sat in a 140-page policy nobody could cite.
Pipeline: Input guardrails > Intent routing > Dense + BM25 + Neo4j > RRF + rerank > Grounding check > LLM judge > Human review
- 3B Llama fine-tuned with QLoRA, merged and quantized
- Policy lookup, claim search and fraud detection as MCP tools
- RAGAS regression on a golden dataset for every change
- Load-tested, red-teamed, traced in Langfuse and LangSmith
Links: [Watch demo](https://www.loom.com/share/248fda054e1f455087bacdba58c52b00) · [Code](https://github.com/Sudhanshu-Patil/MediClaim)

### Redline: Deterministic diffs and grounded chat for engineering drawings
Two revisions of a drawing. Which tags, dimensions and entities actually changed?
Pipeline: PDF, OCR, DWG ingest > 3-tier alignment > Delta report > Hybrid retrieval > Cite or refuse
- No LLM in the diff path, enforced by tests
- Tesseract OCR with a vision-LLM second read
- Exact-tag lookup unioned with vector search, cross-encoder rerank
- OTel-shaped trace on every stage
Links: [Watch demo](https://drive.google.com/file/d/1PZXix5YPPk2Vv7bS1BxfMjkkR7xWPG0K/view) · [Code](https://github.com/Sudhanshu-Patil/Redline)

### Telecom Triage: Confidence-gated AI triage for a customer-operations inbox
Act on clear requests automatically. Hand anything uncertain to a human.
Pipeline: Intake > Classify (JSON mode) > Confidence gate > Remediation branch > Audit log
- LangGraph state machine with config-driven branches
- Deterministic guardrail caps confidence the model cannot justify
- SLA flags, full audit trail and a live dashboard
- 41 offline tests with the LLM mocked
Links: [Live app](https://telecom-request.streamlit.app) · [Code](https://github.com/Sudhanshu-Patil/telecom-request-workflow)

### AI Email Reply: Suggested replies, and a metric that shows whether they are any good
A generator is easy. Knowing whether a draft is worth sending is the hard part.
Pipeline: Past email corpus > Grounded draft > 5-dimension score > Metric validation
- Scores grounding, intent, similarity, style and sendability
- Metric validated with discriminant probes
- Runs fully offline with a mock provider
- 96 tests
Links: [Code](https://github.com/Sudhanshu-Patil/AI-Email-Reply)

### ATS-Ready: AI resume engineering platform, built solo on a zero-cost stack
Built during my own job hunt. One master profile in, a role-specific resume, ATS score and cover letter out.
Pipeline: Parse JD > Match skills > Tailor > DOCX export
- Redis-backed async workers, so LLM jobs never block requests
- Job feed aggregated from 7 sources, ranked against your skills
- JWT with refresh tokens, rate limiting, Razorpay billing
- 37 tests and Playwright end-to-end in 3-stage CI
Links: [Live app](https://ats-ready.onrender.com/)

### Glance: Open-source AI assistant for any portfolio, with a robot that has moods
Most portfolio chatbots need a paid API, a vector database and a React rewrite. This one needs a free key and a script tag.
Pipeline: knowledge.md > Vercel function > Groq gpt-oss-120b > Fallback model > Streamed answer
- Zero dependencies, Shadow DOM, works on any site
- Happy, thinking, surprised, sad and sleepy moods
- Origin lock and per-visitor rate limit for the free tier
- Five-step setup with a one-click Vercel deploy
Links: [Live demo](https://glance-chat.vercel.app) · [Code](https://github.com/Sudhanshu-Patil/glance-chat)

### Multi-tenant Chatbot Platform
JWT auth, versioned prompts, file uploads, and one Responses API client that runs on OpenAI, Groq or Ollama.
Links: [Live](https://chatbot-sooty-eight-42.vercel.app) · [Demo](https://drive.google.com/file/d/1g-iSS7p6ZR8o6qGr6mXd7UN8F8d7nIGj/view) · [Code](https://github.com/Sudhanshu-Patil/Chatbot)

### Context-Aware Retrieval Engine
Benchmarks raw vector search against LLM query expansion. Expansion lifted average cosine score by 9% to 31%.
Links: [Code](https://github.com/Sudhanshu-Patil/Context-aware-retrieval-engine)

### Automation Workflows
Airtable to AI company summaries to Google Docs, a daily 7 AM Slack report, a weekly outreach bot and a YouTube scraper.
Links: [Demo](https://www.loom.com/share/5af18aeb60834d799ebd3cdd7988222d) · [Code](https://github.com/Sudhanshu-Patil/make-daily-company-reports)

### Restaurant Reception Agent
Multi-turn booking, ordering, menu Q&A and customer memory over a black-box FastAPI backend, streamed over SSE.
Links: [Code](https://github.com/Sudhanshu-Patil/Restaurant-reception-Agent)

### Settlement Feasibility Engine
Decides whether a debt can be settled on time without the account going negative, and finds the smallest top-up if not.
Links: [Code](https://github.com/Sudhanshu-Patil/Settlement-Feasibility-Fee-Engine)

### Git-Msg
VS Code extension that reads your staged diff and writes a Conventional Commit message with Gemini or OpenAI.
Links: [Code](https://github.com/Sudhanshu-Patil/Git-Msg)

## Skills
- AI and ML: LLMs, RAG, Agentic AI, MCP, LangGraph, LangChain, LlamaIndex, NER, QLoRA / PEFT, PyTorch, RAGAS, Guardrails
- Backend: Python, FastAPI, Pydantic, Async (ARQ), OAuth 2.1, REST APIs, C++, SQL, React, Next.js
- Data: PostgreSQL, Redis, Qdrant, ChromaDB, Neo4j, MySQL, SQLite
- Cloud and Ops: Azure AI Foundry, AWS Bedrock, AWS ECS Fargate, GCP, Docker, Kubernetes, GitHub Actions, Nginx, Langfuse, Linux

## Education
- B.E. (Hons.) Electronics and Communication Engineering, Minor in Computing and Intelligence, BITS Pilani, Hyderabad Campus (Oct 2021 - Jul 2025)

## Honors
- INSPIRE-SHE Scholar, top 1% of the Maharashtra HSC board (97.5%)
- Naukri EROH University, 2nd runner-up
- LeetCode Knight, top 5%

## Certifications
- Oracle Agentic AI Certified Professional (2026)
- Oracle Agentic AI Foundations Associate (2026)
- Kubernetes LFS158, Linux Foundation (2026)
- Docker Foundations Professional (2026)
- Databricks Fundamentals (2026)
- Oracle Gen AI Certified Professional (2024)
- Multi AI Agent Systems with CrewAI
- Mastering AutoGen
