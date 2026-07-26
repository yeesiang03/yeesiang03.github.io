import { useState, useRef } from "react";
import RobotPlayground from "./RobotPlayground";
import {
  ArrowUpRight,
  ArrowLeft,
  FileText,
  Languages,
  X,
  Brain,
  Stethoscope,
  Map,
  Sparkles,
  GitBranch,
  Cloud,
  Database,
  Compass,
  Wallet,
  Globe,
  ShieldCheck,
  Users,
  Utensils,
  MessageSquare,
  Target,
  BarChart3,
  Layers3,
  UserRoundCheck,
} from "lucide-react";

/* Brand icons — lucide-react deprecated brand glyphs, so inline SVG. */
function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */

type Lang = "en" | "zh";

const assetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      tagline: "AI Researcher · Agent Engineer · Full-Stack Developer",
      name: "Henry Ku",
      intro:
        "Recent graduate from Beijing Institute of Technology with a Bachelor's in Artificial Intelligence. I specialize in AI agent engineering, AI research, and end-to-end AI development — from benchmark design to agentic systems.",
      cta: "View Projects",
    },
    projects: {
      title: "Projects",
      subtitle: "Selected work in AI research, agents & full-stack systems",
      p1: {
        tag: "Benchmark Evaluation · Causal Reasoning",
        title: "Medical LLM Causal Consistency Evaluation Benchmark",
        desc: "Constructed and analyzed a benchmark for measuring causal consistency in medical large language models — probing whether responses hold up under causal perturbation and reasoning stress tests.",
        links: { paper: "Paper", code: "Slides" },
        detail: {
          badge: "Causal Reasoning",
          tagline:
            "A thesis focused on one question: can explicit causal structure make medical reasoning more reliable?",
          summaryTitle: "What I built",
          summary:
            "I built a causal-consistency evaluation system for medical clinical decision making, constructed MedCausalBenchmark from NCCN guidelines, and compared Pure LLM, RAG, and CausalSCM on the same causal task family.",
          workTitle: "Three contributions",
          work: [
            "Built a causal-consistency evaluation framework for medical clinical decision making.",
            "Created MedCausalBenchmark from six NCCN clinical guidelines with balanced counterfactual coverage.",
            "Systematically compared Pure LLM, RAG, and CausalSCM on medical causal reasoning tasks.",
          ],
          thinkingTitle: "Design idea",
          thinking:
            "The benchmark uses a dual-axis causal taxonomy: logic dimension × medical dimension. The logical axis spans Basic, Joint, Nested, and Conditional counterfactual reasoning, while the medical axis keeps the clinical decision scenarios aligned with real guideline structure.",
          pipelineTitle: "Construction pipeline",
          pipeline: [
            "Causal relation extraction",
            "Causal graph construction",
            "Clinical scenario design",
            "Variable space definition",
            "Question-answer sample generation",
          ],
          pipelineNote:
            "The workflow was centered on the two-dimensional taxonomy, used three sample families in parallel rather than sequentially, and combined automatic format checks with expert review.",
          resultsTitle: "Key results",
          results: [
            {
              label: "Average accuracy",
              value: "91.39%",
              note: "CausalSCM achieved the highest average performance.",
            },
            {
              label: "Stability",
              value: "Balanced",
              note: "The explicit causal graph improved consistency across task types and model backbones.",
            },
            {
              label: "Research value",
              value: "Benchmark",
              note: "This work fills a gap in medical counterfactual evaluation and provides a reusable reference for future causal reasoning research.",
            },
          ],
          figuresTitle: "Experimental results",
          figures: [
            {
              src: assetPath("1.png"),
              title: "Performance by logical dimension",
              desc: "Basic, Joint, Nested, and Conditional counterfactual settings.",
            },
            {
              src: assetPath("2.png"),
              title: "Performance by question type",
              desc: "Fact, Counterfactual, and Adversarial prompts under the same benchmark.",
            },
            {
              src: assetPath("3.png"),
              title: "Model comparison overview",
              desc: "Across Qwen, LLaMA, and DeepSeek backbones, CausalSCM remains the strongest line.",
            },
            {
              src: assetPath("24.png"),
              title: "Disease-wise comparison",
              desc: "Accuracy across ALL, AML, CNS, PS, SCLC, and WM/LPL scenarios.",
            },
            {
              src: assetPath("35.png"),
              title: "Causal metric matrix",
              desc: "CC, CCR, SS, and RS scores across all models.",
            },
          ],
          closingTitle: "Why it matters",
          closing:
            "The thesis does not just test a prompt style. It asks whether an explicit causal structure can make medical decision reasoning more stable, more interpretable, and easier to evaluate. The answer from the benchmark is yes: it helps.",
        },
      },
      p2: {
        tag: "Full-Stack AI · Prompt Engineering",
        title: "Intelligent Nutrition Assistant",
        desc: "A full-stack health platform that turns personal profiles and meal records into nutrition analytics, distinct TCM and Western advice, and a multi-round expert consensus.",
        links: { details: "Case study" },
        detail: {
          badge: "Intelligent health system",
          tagline:
            "From every meal to an actionable plan: a full-stack nutrition platform combining structured health data, differentiated AI personas, and a four-round consultation workflow.",
          overviewTitle: "Project overview",
          overview:
            "The system closes the loop between tracking and guidance. Users build a health profile, set calorie and macronutrient goals, log meals from a 70+ item food database, inspect daily and seven-day trends, then consult a TCM or Western nutritionist grounded in the same personal context. A consultation mode lets both personas challenge, refine, and consolidate their recommendations.",
          metrics: [
            { value: "2", label: "Specialist AI personas" },
            { value: "4", label: "Consultation rounds" },
            { value: "70+", label: "Foods in the database" },
            { value: "7D", label: "Nutrition trend view" },
          ],
          architectureTitle: "System architecture",
          architectureIntro:
            "A separated React and Node.js architecture keeps the interface, business rules, model orchestration, and durable health data independently maintainable.",
          architectureLayers: [
            {
              eyebrow: "Experience",
              title: "React 18 client",
              desc: "Responsive views for authentication, meal capture, goal editing, trend charts, profile management, and streamed chat.",
            },
            {
              eyebrow: "Application",
              title: "Context + service layer",
              desc: "AuthContext and typed service modules coordinate session state and REST calls for auth, chat, meals, users, and goals.",
            },
            {
              eyebrow: "Orchestration",
              title: "Express API + AI services",
              desc: "Controllers validate requests while advisor routing, context assembly, consultation turns, and provider fallbacks live in dedicated services.",
            },
            {
              eyebrow: "Intelligence",
              title: "Gemini / OpenAI",
              desc: "Provider-independent prompts produce role-consistent TCM, Western, and final-consensus responses.",
            },
            {
              eyebrow: "Data",
              title: "PostgreSQL + Sequelize",
              desc: "Users, profiles, health goals, meal records, messages, and sessions form a durable longitudinal health record.",
            },
          ],
          promptTitle: "Prompt engineering",
          promptIntro:
            "The model is not asked to “give health advice” in one generic instruction. Each request is assembled from four controlled layers so answers stay personal, role-consistent, conversational, and useful.",
          promptLayers: [
            {
              label: "01 · Persona contract",
              title: "Separate the clinical lens",
              desc: "TCM receives a food-therapy and seasonal-regulation role; Western nutrition receives a BMI, energy, and macronutrient role. Both retain their professional vocabulary and scope.",
            },
            {
              label: "02 · Profile grounding",
              title: "Inject relevant user facts",
              desc: "Age, sex, BMI, chronic conditions, goals, activity level, dietary preferences, and allergies are converted into concise context before inference.",
            },
            {
              label: "03 · Conversation memory",
              title: "Preserve the last six turns",
              desc: "A bounded recent-history window maintains continuity without allowing stale conversation to dominate the current question.",
            },
            {
              label: "04 · Output contract",
              title: "Make advice executable",
              desc: "The prompt asks for an assessment, rationale, concrete meal changes, quantities where appropriate, and a safety-minded next step.",
            },
          ],
          consultationTitle: "Multi-agent consultation",
          consultationIntro:
            "The same prompt framework becomes a staged discussion protocol. Each turn has an explicit role, shared question, accumulated context, and expected output.",
          consultationSteps: [
            {
              step: "01",
              title: "Independent assessment",
              desc: "TCM and Western advisors evaluate the user question from their own knowledge systems.",
            },
            {
              step: "02",
              title: "Cross-review",
              desc: "Each advisor sees the other view, identifies agreement or tension, and responds with evidence from its own lens.",
            },
            {
              step: "03",
              title: "Plan refinement",
              desc: "The agents converge on practical energy, food-combination, activity, and habit recommendations.",
            },
            {
              step: "04",
              title: "Consensus",
              desc: "A dedicated synthesis role removes duplication and returns one balanced, user-facing action plan.",
            },
          ],
          showcaseTitle: "Product walkthrough",
          showcaseIntro:
            "The interface turns the architecture into a complete health-management journey. Each step below is backed by the same profile, nutrition goals, and longitudinal records.",
          showcase: [
            {
              step: "01 · Account & profile",
              title: "Start with a secure personal health context",
              desc: "JWT-based authentication protects each user’s records. The profile behind the account supplies age, sex, body measurements, health conditions, preferences, and activity level to every downstream calculation and AI request.",
              images: [
                { src: "nutrition-system/01-auth.png", alt: "Nutrition assistant sign-in screen" },
              ],
            },
            {
              step: "02 · Meal capture",
              title: "Convert daily food into structured nutrition data",
              desc: "Users select meal type, date, time, and foods from a 70+ item database. The system calculates calories, protein, carbohydrates, and fat, then groups entries into readable meal cards.",
              images: [
                { src: "nutrition-system/03-meal-entry.png", alt: "Meal entry form and food database" },
                { src: "nutrition-system/04-daily-meals.png", alt: "Daily meal cards with calculated nutrients" },
              ],
            },
            {
              step: "03 · Goal engine",
              title: "Turn body data and intent into measurable targets",
              desc: "The platform recommends targets from body and activity data, while keeping them editable. Weight intent, daily calories, protein, carbohydrates, fat, and activity level become the reference frame for later analysis.",
              images: [
                { src: "nutrition-system/05-smart-goals.png", alt: "Automatically recommended nutrition goals" },
                { src: "nutrition-system/06-goal-editor.png", alt: "Editable body and nutrition goals" },
              ],
            },
            {
              step: "04 · Nutrition analytics",
              title: "Read today in context, not in isolation",
              desc: "Daily progress bars show goal attainment; seven-day bar and line views expose intake patterns, averages, and outliers. A shared table keeps the chart interpretable and makes adjustments traceable.",
              images: [
                { src: "nutrition-system/07-daily-summary.png", alt: "Daily nutrition progress summary" },
                { src: "nutrition-system/08-weekly-bars.png", alt: "Seven-day nutrition bar chart" },
                { src: "nutrition-system/09-weekly-lines.png", alt: "Seven-day nutrition line chart" },
              ],
            },
            {
              step: "05 · Dual-advisor chat",
              title: "Ask one question through two professional lenses",
              desc: "Users switch between TCM and Western nutritionists while retaining session history and profile context. The color-coded dialogue makes the active role, reasoning style, and recommendations easy to distinguish.",
              images: [
                { src: "nutrition-system/02-dual-advisor-chat.png", alt: "TCM and Western nutrition advisor responses" },
                { src: "nutrition-system/10-personalized-plan.png", alt: "Personalized Western nutrition plan based on BMI" },
              ],
            },
            {
              step: "06 · Expert consensus",
              title: "Move from parallel opinions to one coordinated plan",
              desc: "Consultation mode runs a structured multi-round exchange. Both advisors inspect the user’s constraints, respond to each other, and produce a concise consensus that preserves complementary insights without repeating the same advice.",
              images: [
                { src: "nutrition-system/11-consultation.png", alt: "Multi-round nutrition consultation" },
                { src: "nutrition-system/12-consensus.png", alt: "Expert consensus response" },
              ],
            },
          ],
          stackTitle: "Technology & design decisions",
          stack: [
            {
              title: "React 18 · Router · Context",
              desc: "A modular client separates chat, meal records, nutrition history, goals, authentication, and profile concerns.",
            },
            {
              title: "Node.js · Express · REST",
              desc: "A service-oriented backend owns validation, identity, session history, nutrition calculations, and AI-provider access.",
            },
            {
              title: "PostgreSQL · Sequelize",
              desc: "Relational models keep goals, meals, users, and conversations consistent enough for longitudinal analysis.",
            },
            {
              title: "Gemini · OpenAI fallback",
              desc: "A provider abstraction keeps the prompt contract stable while allowing model routing and fallback behavior.",
            },
          ],
          safetyTitle: "Responsible scope",
          safety:
            "The experience frames responses as nutrition and lifestyle guidance rather than diagnosis. Profile grounding improves relevance, while explicit role boundaries, conservative wording, and escalation cues help keep high-risk medical decisions with qualified clinicians.",
        },
      },
      p3: {
        tag: "Hackathon · Google Cloud Rapid Agent",
        title: "Mini-Map — Gemini-Powered Virtual Travel Journal",
        desc: "A Gemini-powered travel journal that unfolds a trip one day at a time — every day ends with choices, each geographically valid, within budget, and unique. Built with Google Cloud Agent Builder + MongoDB Atlas.",
        links: { demo: "Demo", code: "GitHub", devpost: "Devpost" },
        detail: {
          tagline:
            "Live your trip before you spend a cent — a Gemini-powered journal that unfolds one day at a time, every choice yours, grounded in real geography and budget.",
          overviewTitle: "Overview",
          overview:
            "Mini-Map is a choice-driven, progressive travel journaling agent built for the Google Cloud Rapid Agent Devpost hackathon. Instead of generating a static itinerary, it unfolds a trip one day at a time: each day ends with 3–4 options for where to go next, each geographically reachable, within remaining budget, and contextually unique. The user picks one, and that choice seeds the next day — until the journey completes and one click exports it as a real, executable itinerary.",
          featuresTitle: "Core Features",
          features: [
            {
              title: "Virtual Travel Journal",
              desc: "Each day is a rich, multi-layered journal entry — logistics, five-sense storytelling, dialogues with locals, cultural tips, and practical info, all grounded in real GeoJSON locations and real prices.",
            },
            {
              title: "Daily Choice Engine",
              desc: "Gemini generates 3–4 forward options constrained by geographic reachability, a remaining-budget guard, deduplication via Vector Search, and type diversity. The user’s pick becomes the seed for the next day.",
            },
            {
              title: "Real → Real Conversion",
              desc: "Once the virtual journey is complete, one click exports the full journal as an executable real-world itinerary with real prices and bookings.",
            },
            {
              title: "Virtual Passport",
              desc: "Every completed destination adds a GeoJSON stamp to a personal world map. Full journey history is stored in MongoDB Atlas and searchable across sessions.",
            },
          ],
          techTitle: "Tech Stack",
          tech: [
            {
              name: "Google Cloud Agent Builder + Gemini Pro",
              desc: "The agent orchestrates the journey and reaches data only through validated MCP tool calls — no raw queries.",
            },
            {
              name: "MongoDB Atlas MCP Server",
              desc: "The bridge between Gemini and Atlas. Typed tools like get_reachable_locations and create_node enforce schema validation and the geographic + budget guards.",
            },
            {
              name: "Atlas Vector Search + Voyage AI",
              desc: "Each node’s story + tags are embedded into a 1024-dim vector. Vector Search matches user interests to location “vibes” and powers deduplication.",
            },
            {
              name: "Atlas Search + Aggregation Pipeline",
              desc: "Full-text index over saved journals makes travel history searchable; aggregations compute budget analytics and the real-plan export.",
            },
            {
              name: "FastAPI + Next.js",
              desc: "Python backend orchestrates the agent and journey state machine; Next.js frontend renders the progressive journal.",
            },
          ],
          architectureTitle: "Architecture",
          architecture:
            "The frontend never touches Atlas directly. It speaks structured JSON to a FastAPI backend, which orchestrates the Gemini agent in Google Cloud Agent Builder. The agent reaches data only through the MongoDB MCP Server, which enforces geographic and budget guards before any document is read or written. Real APIs (Weather, Places, FX Rate), Vertex AI / Voyage AI embeddings, and Atlas all sit behind validated tool calls.",
          linksTitle: "Links",
        },
      },
      p4: {
        tag: "Agent Engineering · Enterprise AI",
        title: "Harness Agent — Enterprise Procurement Workbench",
        desc: "A production-minded Agent Harness for enterprise procurement, combining task planning, specialist sub-agents, human approval, long-term memory, progressive skills, ERP tools, and isolated OpenSandbox execution.",
        detail: {
          tagline:
            "More than a chatbot: an enterprise procurement agent that plans, delegates, uses real tools, pauses for approval, and executes inside a secure user-isolated sandbox.",
          overviewTitle: "Overview",
          overview:
            "Harness Agent is an end-to-end procurement workbench built with Vue 3, FastAPI, DeepSeek, MCP/ERP tools, MongoDB, and OpenSandbox. It supports product sourcing, supplier comparison, inventory analysis, purchase-order workflows, product onboarding, report generation, and authenticated file delivery while keeping every user's business data and execution environment isolated.",
          metrics: [
            { value: "3", label: "Cooperating agents" },
            { value: "8", label: "Custom middleware layers" },
            { value: "26→1", label: "Chart tools unified" },
            { value: "5", label: "Sandbox lifecycle states" },
          ],
          featuresTitle: "Harness Capabilities",
          features: [
            {
              title: "Planning & Live Execution",
              desc: "Complex goals are decomposed into structured steps and streamed to the UI with live reasoning, tool calls, progress, and results.",
            },
            {
              title: "Specialist Sub-agents",
              desc: "Procurement analysis and order operations run in isolated contexts with restricted toolsets, supporting safe parallel delegation.",
            },
            {
              title: "Human-in-the-Loop",
              desc: "The agent requests missing information and requires explicit approval before creating or modifying purchase orders.",
            },
            {
              title: "Memory, Context & Skills",
              desc: "Long conversations are summarized, large tool outputs are offloaded, user preferences persist, and skills load progressively when needed.",
            },
            {
              title: "Dynamic File Routing",
              desc: "A composite backend routes durable memories and user-created skills to MongoDB while temporary data, analysis, and scripts stay inside OpenSandbox.",
            },
            {
              title: "Progressive Skill System",
              desc: "Agents initially see only skill metadata, then load the relevant SKILL.md, references, and scripts on demand instead of filling the context window upfront.",
            },
            {
              title: "Context Engineering",
              desc: "Tool results above 20k tokens are offloaded to files, conversations are summarized near 85% of the context window, and sub-agent work stays isolated.",
            },
            {
              title: "Resilient Sandbox Runtime",
              desc: "Health checks, a circuit breaker, lifecycle recovery, a stable proxy, and hot backend replacement allow interrupted sandboxes to recover without rebuilding the agent.",
            },
          ],
          showcaseTitle: "End-to-end product walkthrough",
          showcaseIntro:
            "The interface exposes more than final answers. It makes the Harness visible: users can inspect delegated work, loaded skills and tool execution, approve high-impact actions, then verify the resulting ERP state.",
          showcase: [
            {
              src: "/harness-agent/01-workbench.png",
              step: "01 · Unified workbench",
              title: "Start from a procurement goal, not a rigid form",
              desc: "The home workspace combines authenticated sessions, searchable history, agent selection, and ready-made entry points for sourcing, inventory analysis, and purchase orders. Natural-language requests become structured workflows behind the scenes.",
            },
            {
              src: "/harness-agent/03-agent-trace.png",
              step: "02 · Planning and delegation",
              title: "Every important execution step remains inspectable",
              desc: "For a Bosch sourcing request, the main agent loads the procurement skill, decides that external work is required, and delegates the task to the procurement-analyst sub-agent. The live trace exposes the skill, reasoning category, function call, timestamp, and running status without mixing the analyst's long intermediate context into the main conversation.",
            },
            {
              src: "/harness-agent/04-sourcing-result.png",
              step: "03 · Grounded procurement result",
              title: "Separate order-ready catalog items from external leads",
              desc: "Structured results combine part IDs, prices, inventory, safety-stock status, supplier rating, and lead time. Enterprise catalog items are explicitly marked as directly orderable; external findings follow the product-onboarding path instead of bypassing ERP controls.",
            },
            {
              src: "/harness-agent/05-hitl-approval.png",
              step: "04 · Human-in-the-Loop",
              title: "Business writes pause at a deliberate approval boundary",
              desc: "After the order sub-agent validates supplier, part, quantity, and applicant, the workflow interrupts before the ERP write. The user can inspect parameters, approve, or reject. Without explicit approval, no purchase order is created.",
            },
            {
              src: "/harness-agent/02-user-assets.png",
              step: "05 · User-scoped business state",
              title: "Inventory, orders, applications, and suppliers in one view",
              desc: "The asset dashboard shows only the signed-in user's purchased inventory while still relating it to enterprise master data. Summary cards expose SKU count, quantity, value, and pending onboarding requests, with tabs for orders, product applications, and suppliers.",
            },
            {
              src: "/harness-agent/06-order-created.png",
              step: "06 · Verifiable ERP feedback loop",
              title: "Approved actions become traceable business records",
              desc: "Once approved, the MCP/ERP gateway creates the order and the dashboard reflects the new record, amount, applicant, supplier, and status. Inventory totals update from 50 to 52 and value from ¥13,400 to ¥13,936, closing the loop from conversation to durable enterprise state.",
            },
          ],
          techTitle: "System Layers",
          tech: [
            {
              name: "Vue 3 Procurement Workbench",
              desc: "Responsive chat, execution trace, approval cards, session history, settings, report downloads, and ERP asset dashboards.",
            },
            {
              name: "FastAPI + Harness Runtime",
              desc: "Authenticated REST and SSE APIs orchestrate the main agent, middleware, specialist agents, conversations, and reports.",
            },
            {
              name: "MCP / ERP Tool Gateway",
              desc: "Typed procurement tools connect suppliers, parts, inventory, orders, and product-onboarding workflows to the agent.",
            },
            {
              name: "OpenSandbox Security Boundary",
              desc: "Commands, files, web access, skill scripts, and report generation run in per-user sandboxes with path and network controls.",
            },
            {
              name: "MongoDB + SQLite Persistence",
              desc: "User profiles, preferences, conversations, sandbox registrations, skills, orders, inventory, and approvals remain user-scoped.",
            },
          ],
          architectureTitle: "Architecture",
          architecture:
            "The Vue workbench communicates with an authenticated FastAPI backend over REST and SSE. The backend orchestrates the main Harness Agent, specialist procurement agents, context and memory middleware, and the DeepSeek tool-calling model. Business actions pass through a typed MCP/ERP gateway, while file, command, web, and report operations execute inside a user-specific OpenSandbox environment. MongoDB and SQLite provide durable, identity-scoped state across the stack.",
          safetyTitle: "Designed for safe execution",
          safety:
            "Write operations bind to trusted user identity and require approval. Sandboxes default to deny-by-default networking, paths are validated, tool loops are bounded, report filenames use strict allowlists, passwords are salted and hashed, and each user's data, memory, skills, and runtime are isolated.",
        },
      },
    },
    contact: {
      title: "Get in touch",
      desc: "Open to AI research roles, collaborations, and conversations.",
    },
    resume: "Resume",
    langLabel: "中文",
  },
  zh: {
    nav: {
      about: "关于",
      projects: "项目",
      contact: "联系",
    },
    hero: {
      tagline: "AI 研究员 · 模型工程师 · 全栈开发者",
      name: "Henry Ku",
      intro:
        "刚毕业于北京理工大学人工智能专业（本科）。擅长 AI 模型调试、AI 研究与 AI 相关全栈开发——从评测基准设计到 Agent 系统落地。",
      cta: "查看项目",
    },
    projects: {
      title: "项目",
      subtitle: "AI 研究、智能体与全栈系统方向的代表性工作",
      p1: {
        tag: "毕业设计",
        title: "医学大语言模型因果一致性评测基准构建与分析",
        desc: "构建并分析了一个用于衡量医学大语言模型因果一致性的评测基准——在因果扰动与推理压力测试下检验模型回答的稳定性与可靠性。",
        links: { paper: "论文", code: "答辩稿" },
        detail: {
          badge: "毕业设计",
          tagline:
            "本文聚焦一个核心问题：显式因果结构，是否能够稳定提升医学决策推理的可靠性？",
          summaryTitle: "我完成了什么",
          summary:
            "本文构建了面向医学临床决策的因果一致性评测体系，以 NCCN 指南为基础构建 MedCausalBenchmark，并在同一类因果任务上系统比较 Pure LLM、RAG 与 CausalSCM。",
          workTitle: "三个方面的工作",
          work: [
            "构建面向医学临床决策的因果一致性评测体系。",
            "基于 6 份 NCCN 权威临床指南，构建医学反事实问答数据集 MedCausalBenchmark。",
            "系统比较 Pure LLM、RAG、CausalSCM 三类方案在医学因果推理任务中的表现。",
          ],
          thinkingTitle: "核心思路",
          thinking:
            "本文提出“逻辑维度 × 医学维度”的双维度因果分类体系。逻辑维度从基础型单变量局部干预，扩展到联合型多变量同时变化、嵌套型链式传播推理，以及条件型反事实回溯；医学维度则让任务始终贴合真实临床决策路径。",
          pipelineTitle: "数据集构建流程",
          pipeline: [
            "因果关系抽取",
            "因果图构建",
            "临床场景设计",
            "定义变量空间",
            "问答样本生成",
          ],
          pipelineNote:
            "构建流程有三个关键设计：第一，将双维度分类框架置于流程中心，确保 16 种类型组合的均衡覆盖；第二，三类样本并行生成而非顺序派生，保证三元组始终围绕同一因果图协同构建；第三，自动化格式检查与专家审核两轮质控并行反馈。",
          resultsTitle: "主要成果",
          results: [
            {
              label: "平均准确率",
              value: "91.39%",
              note: "CausalSCM 在整体 benchmark 上取得最高且最稳定的表现。",
            },
            {
              label: "对比基线",
              value: "79.03% / 79.44%",
              note: "Pure LLM 与 RAG 的平均表现显著低于 CausalSCM。",
            },
            {
              label: "研究意义",
              value: "Benchmark",
              note: "补齐医学反事实推理评测空白，并为后续医学因果推理研究提供方法参考。",
            },
          ],
          figuresTitle: "实验结果",
          figures: [
            {
              src: assetPath("1.png"),
              title: "逻辑维度结果",
              desc: "基础型、联合型、嵌套型、条件型四类反事实任务对比。",
            },
            {
              src: assetPath("2.png"),
              title: "问题类型结果",
              desc: "事实、反事实、对抗性三类问题上的表现。",
            },
            {
              src: assetPath("3.png"),
              title: "模型总体对比",
              desc: "不同底座模型上，CausalSCM 始终保持领先。",
            },
            {
              src: assetPath("24.png"),
              title: "疾病类别对比",
              desc: "按 ALL、AML、CNS、PS、SCLC、WM/LPL 分类的结果。",
            },
            {
              src: assetPath("35.png"),
              title: "指标矩阵",
              desc: "CC、CCR、SS、RS 四项因果指标的整体结果。",
            },
          ],
          closingTitle: "结论",
          closing:
            "本文不仅在做提示词比较，而是在验证：显式因果结构能否让医学决策推理更稳定、更可解释、也更可评测。实验结果表明，答案是肯定的。",
        },
      },
      p2: {
        tag: "全栈 AI · Prompt Engineering",
        title: "智能营养助手",
        desc: "把个人健康档案与饮食记录转化为营养分析、中西医差异化建议和多轮专家共识的全栈健康管理平台。",
        links: { details: "查看案例" },
        detail: {
          badge: "智能健康系统",
          tagline:
            "从每一餐到可执行的健康方案：融合结构化健康数据、中西医双角色 Prompt 与四轮专家会诊的全栈营养平台。",
          overviewTitle: "项目概述",
          overview:
            "系统打通“记录—分析—建议—行动”闭环。用户先建立健康档案并设置热量与宏量营养素目标，再从 70+ 种食物数据库记录饮食、查看当天与近 7 天趋势，最后由共享同一份个人上下文的中医或西医营养师提供咨询。专家会诊模式让两种观点互相审阅、修正并形成统一方案。",
          metrics: [
            { value: "2", label: "专业 AI 角色" },
            { value: "4", label: "专家会诊轮次" },
            { value: "70+", label: "食物数据库" },
            { value: "7 天", label: "营养趋势分析" },
          ],
          architectureTitle: "系统架构",
          architectureIntro:
            "前后端分离架构将交互体验、业务规则、模型编排与持久化健康数据解耦，便于独立维护与扩展。",
          architectureLayers: [
            {
              eyebrow: "交互层",
              title: "React 18 前端",
              desc: "覆盖用户认证、饮食记录、目标编辑、趋势图表、个人档案与流式聊天的响应式界面。",
            },
            {
              eyebrow: "应用层",
              title: "Context + Service",
              desc: "AuthContext 维护登录状态；认证、聊天、饮食、用户与目标服务统一组织 REST 请求。",
            },
            {
              eyebrow: "编排层",
              title: "Express API + AI 服务",
              desc: "Controller 负责校验请求，Service 负责营养师路由、上下文组装、会诊轮次与模型降级。",
            },
            {
              eyebrow: "智能层",
              title: "Gemini / OpenAI",
              desc: "与模型供应商解耦的 Prompt 生成风格稳定的中医、西医与最终共识回答。",
            },
            {
              eyebrow: "数据层",
              title: "PostgreSQL + Sequelize",
              desc: "持久化用户、健康目标、饮食记录、聊天消息与会话，形成纵向健康数据。",
            },
          ],
          promptTitle: "Prompt Engineering",
          promptIntro:
            "系统并非用一句笼统指令要求模型“给出健康建议”，而是把每次请求拆成四个受控层，使回答保持个性化、角色一致、上下文连贯且可以执行。",
          promptLayers: [
            {
              label: "01 · 角色契约",
              title: "区分专业视角",
              desc: "中医角色强调体质、季节与食疗；西医角色强调 BMI、能量与宏量营养素。两个角色分别保持专业术语、推理方式与能力边界。",
            },
            {
              label: "02 · 用户画像注入",
              title: "只注入相关事实",
              desc: "年龄、性别、BMI、慢性病、健康目标、活动水平、饮食偏好和过敏史会在推理前被整理成精简上下文。",
            },
            {
              label: "03 · 对话记忆",
              title: "保留最近 6 条消息",
              desc: "有限长度的对话窗口保证连续性，同时避免陈旧信息挤占当前问题所需的上下文。",
            },
            {
              label: "04 · 输出契约",
              title: "让建议真正可执行",
              desc: "Prompt 明确要求给出判断、依据、具体饮食调整、必要时的份量建议，以及安全、清晰的下一步行动。",
            },
          ],
          consultationTitle: "多 Agent 专家会诊",
          consultationIntro:
            "同一套 Prompt 框架被扩展为分阶段讨论协议。每一轮都有明确角色、共享问题、累计上下文和预期输出。",
          consultationSteps: [
            {
              step: "01",
              title: "独立评估",
              desc: "中医与西医营养师从各自知识体系独立分析用户问题。",
            },
            {
              step: "02",
              title: "交叉审阅",
              desc: "双方读取对方观点，标记共识或分歧，并从自身专业视角回应。",
            },
            {
              step: "03",
              title: "方案细化",
              desc: "围绕热量、食物组合、活动与生活习惯收敛为可执行建议。",
            },
            {
              step: "04",
              title: "形成共识",
              desc: "独立的综合角色去除重复内容，输出一份平衡且面向用户的行动方案。",
            },
          ],
          showcaseTitle: "功能展示",
          showcaseIntro:
            "界面把技术架构落实为完整的健康管理旅程；所有功能共享同一份个人档案、营养目标与纵向记录。",
          showcase: [
            {
              step: "01 · 账户与档案",
              title: "从安全的个人健康上下文开始",
              desc: "JWT 认证保护每位用户的数据。账户背后的个人档案提供年龄、性别、身体数据、健康状况、偏好与活动水平，为后续计算与 AI 请求提供依据。",
              images: [
                { src: "nutrition-system/01-auth.png", alt: "智能营养助手登录界面" },
              ],
            },
            {
              step: "02 · 饮食记录",
              title: "把每日饮食转化为结构化营养数据",
              desc: "用户可选择餐食类型、日期、时间和 70+ 种食物；系统自动计算卡路里、蛋白质、碳水和脂肪，并把记录整理成清晰的餐食卡片。",
              images: [
                { src: "nutrition-system/03-meal-entry.png", alt: "饮食记录表单与食物数据库" },
                { src: "nutrition-system/04-daily-meals.png", alt: "包含营养计算的今日饮食卡片" },
              ],
            },
            {
              step: "03 · 目标引擎",
              title: "把身体数据与目标转成可衡量指标",
              desc: "系统依据身体与活动数据推荐营养目标，同时保留人工编辑能力。体重目标、每日热量、蛋白质、碳水、脂肪与活动水平共同构成分析基准。",
              images: [
                { src: "nutrition-system/05-smart-goals.png", alt: "系统智能推荐的营养目标" },
                { src: "nutrition-system/06-goal-editor.png", alt: "可编辑的体重与营养目标" },
              ],
            },
            {
              step: "04 · 营养分析",
              title: "让今天的数据拥有趋势上下文",
              desc: "每日进度条呈现目标达成率；7 天柱状图和折线图揭示摄入趋势、均值与异常点；配套表格让图表可解释、调整可追踪。",
              images: [
                { src: "nutrition-system/07-daily-summary.png", alt: "当日营养摄入进度" },
                { src: "nutrition-system/08-weekly-bars.png", alt: "过去七天营养柱状图" },
                { src: "nutrition-system/09-weekly-lines.png", alt: "过去七天营养折线图" },
              ],
            },
            {
              step: "05 · 双营养师对话",
              title: "用两种专业视角回答同一个问题",
              desc: "用户可以在中医与西医营养师之间切换，同时保留会话历史和个人档案上下文。颜色编码让当前角色、推理风格与建议来源一目了然。",
              images: [
                { src: "nutrition-system/02-dual-advisor-chat.png", alt: "中医与西医营养师的差异化回答" },
                { src: "nutrition-system/10-personalized-plan.png", alt: "基于 BMI 的个性化西医营养方案" },
              ],
            },
            {
              step: "06 · 专家共识",
              title: "从平行观点走向一份协调方案",
              desc: "会诊模式运行结构化多轮交流。两位营养师分析用户限制、相互回应，并生成保留互补洞见但不重复的简洁专家共识。",
              images: [
                { src: "nutrition-system/11-consultation.png", alt: "中西医多轮专家会诊" },
                { src: "nutrition-system/12-consensus.png", alt: "专家共识与综合建议" },
              ],
            },
          ],
          stackTitle: "技术与设计选择",
          stack: [
            {
              title: "React 18 · Router · Context",
              desc: "模块化前端将聊天、饮食记录、营养历史、健康目标、认证与个人档案分离。",
            },
            {
              title: "Node.js · Express · REST",
              desc: "服务化后端统一负责校验、身份认证、会话历史、营养计算和模型供应商访问。",
            },
            {
              title: "PostgreSQL · Sequelize",
              desc: "关系模型保证目标、饮食、用户与对话的一致性，为纵向分析提供数据基础。",
            },
            {
              title: "Gemini · OpenAI fallback",
              desc: "模型抽象层保持 Prompt 契约稳定，并支持路由与故障降级。",
            },
          ],
          safetyTitle: "负责任的能力边界",
          safety:
            "系统将回答定位为营养与生活方式指导，而非医疗诊断。用户画像让建议更相关；明确的角色边界、审慎措辞与就医提示，则让高风险医疗决策仍然交由专业医务人员。",
        },
      },
      p3: {
        tag: "黑客松 · Google Cloud Rapid Agent",
        title: "Mini-Map — Gemini 驱动的虚拟旅行日志",
        desc: "一个由 Gemini 驱动的旅行日志 Agent，让旅程逐天展开——每一天结束时给出多个选择，每个选择在地理上可达、预算内可行且体验不重复。基于 Google Cloud Agent Builder + MongoDB Atlas 构建。",
        links: { demo: "演示", code: "GitHub", devpost: "Devpost" },
        detail: {
          tagline:
            "在花一分钱之前先体验你的旅程——由 Gemini 驱动、逐天展开的旅行日志，每个选择都由你做主，并基于真实地理与预算。",
          overviewTitle: "项目概述",
          overview:
            "Mini-Map 是为 Google Cloud Rapid Agent Devpost 黑客松打造的“选择驱动、渐进式”旅行日志 Agent。它不生成静态行程，而是让旅程逐天展开：每一天结束时给出 3–4 个“明天去哪”的选项，每个选项在地理上可达、在剩余预算内、且体验不重复。用户选择其一，该选择即成为下一天的种子——直到旅程完成，一键导出为可执行的真实行程。",
          featuresTitle: "核心功能",
          features: [
            {
              title: "虚拟旅行日志",
              desc: "每一天都是一份多层次的日志——后勤信息、五感叙事、与当地人的对话、文化贴士与实用信息，全部基于真实 GeoJSON 地点与真实价格。",
            },
            {
              title: "每日选择引擎",
              desc: "Gemini 生成 3–4 个前进选项，受地理可达性、剩余预算护栏、Vector Search 去重与类型多样性约束。用户的选择成为下一天的种子。",
            },
            {
              title: "虚拟 → 现实转换",
              desc: "虚拟旅程完成后，一键将完整日志导出为可执行的真实行程，含真实价格与预订信息。",
            },
            {
              title: "虚拟护照",
              desc: "每完成一个目的地即在个人世界地图上盖一枚 GeoJSON 印章。完整旅程历史存储于 MongoDB Atlas，可跨会话检索。",
            },
          ],
          techTitle: "技术栈",
          tech: [
            {
              name: "Google Cloud Agent Builder + Gemini Pro",
              desc: "Agent 编排整段旅程，仅通过经过校验的 MCP 工具调用访问数据——不执行任何原始查询。",
            },
            {
              name: "MongoDB Atlas MCP Server",
              desc: "Gemini 与 Atlas 之间的桥梁。get_reachable_locations、create_node 等类型化工具强制执行 schema 校验与地理/预算护栏。",
            },
            {
              name: "Atlas Vector Search + Voyage AI",
              desc: "每个节点的叙事 + 标签被嵌入为 1024 维向量。向量搜索将用户兴趣与地点“氛围”匹配，并驱动去重。",
            },
            {
              name: "Atlas Search + 聚合管道",
              desc: "对已保存日志的全文索引让旅行历史可被检索；聚合管道计算预算分析与真实行程导出。",
            },
            {
              name: "FastAPI + Next.js",
              desc: "Python 后端编排 Agent 与旅程状态机；Next.js 前端渲染渐进式日志。",
            },
          ],
          architectureTitle: "架构",
          architecture:
            "前端从不直接访问 Atlas。它通过结构化 JSON 与 FastAPI 后端通信，后者编排 Google Cloud Agent Builder 中的 Gemini Agent。Agent 仅通过 MongoDB MCP Server 访问数据——在读写任何文档前强制执行地理与预算护栏。真实 API（天气、地点、汇率）、Vertex AI / Voyage AI 嵌入与 Atlas 均位于经过校验的工具调用之后。",
          linksTitle: "链接",
        },
      },
      p4: {
        tag: "Agent 工程 · 企业 AI",
        title: "Harness Agent — 企业采购智能工作台",
        desc: "面向企业采购场景的完整 Agent Harness：融合任务规划、专业子 Agent、人工审批、长期记忆、渐进式 Skills、ERP 工具与 OpenSandbox 隔离执行。",
        detail: {
          tagline:
            "不只是聊天机器人：它能够规划、委派、调用真实业务工具，在关键操作前等待审批，并在用户隔离的安全沙箱中执行任务。",
          overviewTitle: "项目概述",
          overview:
            "Harness Agent 是基于 Vue 3、FastAPI、DeepSeek、MCP/ERP、MongoDB 与 OpenSandbox 构建的端到端采购工作台。系统覆盖产品寻源、供应商比较、库存分析、采购下单、产品准入、报告生成与鉴权下载，同时对每位用户的业务数据与执行环境进行隔离。",
          metrics: [
            { value: "3", label: "协作 Agent" },
            { value: "8", label: "自定义中间件" },
            { value: "26→1", label: "图表工具统一入口" },
            { value: "5", label: "沙箱生命周期状态" },
          ],
          featuresTitle: "Harness 核心能力",
          features: [
            {
              title: "任务规划与实时执行",
              desc: "将复杂目标拆解为结构化步骤，并在界面实时呈现推理、工具调用、执行进度与结果。",
            },
            {
              title: "专业子 Agent",
              desc: "采购分析与订单操作在独立上下文和受限工具集中运行，支持安全的并行任务委派。",
            },
            {
              title: "Human-in-the-Loop",
              desc: "信息缺失时主动追问，创建或修改采购订单前必须获得用户的明确批准。",
            },
            {
              title: "记忆、上下文与 Skills",
              desc: "自动总结长对话、卸载大型工具结果、跨会话保存用户偏好，并在需要时渐进加载技能。",
            },
            {
              title: "动态文件系统路由",
              desc: "CompositeBackend 将长期记忆和用户 Skills 路由到 MongoDB，同时让临时数据、分析文件与脚本留在 OpenSandbox 中。",
            },
            {
              title: "渐进式技能系统",
              desc: "Agent 启动时只读取 Skill 元数据；真正需要时再加载对应的 SKILL.md、参考文档和脚本，避免提前占满上下文。",
            },
            {
              title: "上下文工程",
              desc: "超过 20k tokens 的工具结果自动卸载到文件；上下文接近 85% 时生成摘要；子 Agent 的大量中间过程保持隔离。",
            },
            {
              title: "可恢复沙箱运行时",
              desc: "健康检查、熔断器、生命周期恢复、稳定代理与后端热替换，让沙箱故障恢复时无需重建整个 Agent。",
            },
          ],
          showcaseTitle: "端到端产品演示",
          showcaseIntro:
            "界面呈现的不只是最终答案，也把 Harness 的关键过程变得可见：用户可以检查任务委派、技能加载和工具执行，在高影响操作前审批，并在 ERP 资产中验证最终结果。",
          showcase: [
            {
              src: "/harness-agent/01-workbench.png",
              step: "01 · 统一工作台",
              title: "从采购目标出发，而不是填写僵硬表单",
              desc: "首页整合登录会话、历史检索、Agent 选择，以及产品寻源、库存分析、创建订单等快捷入口。用户只需用自然语言描述需求，系统会在后台将目标转换为结构化工作流。",
            },
            {
              src: "/harness-agent/03-agent-trace.png",
              step: "02 · 规划与委派",
              title: "关键执行过程始终可检查",
              desc: "面对 Bosch 产品寻源请求，主 Agent 先加载采购技能，判断任务需要外部执行，再委派给 procurement-analyst 子 Agent。实时过程展示 Skill、思考类型、函数调用、时间和运行状态，同时将分析专家的大量中间上下文隔离在子任务内。",
            },
            {
              src: "/harness-agent/04-sourcing-result.png",
              step: "03 · 有依据的采购结果",
              title: "区分可直接下单的目录物料与外部线索",
              desc: "结构化结果同时展示物料编号、价格、库存、安全库存状态、供应商评分与交期。企业目录物料会明确标记为可直接采购；外部搜索结果必须进入产品准入流程，不能绕过 ERP 管控。",
            },
            {
              src: "/harness-agent/05-hitl-approval.png",
              step: "04 · Human-in-the-Loop",
              title: "业务写操作在明确的审批边界前暂停",
              desc: "订单子 Agent 校验供应商、物料、数量和申请人后，流程会在写入 ERP 前中断。用户可以检查即将执行的参数，选择批准或拒绝；没有明确批准，系统不会创建采购订单。",
            },
            {
              src: "/harness-agent/02-user-assets.png",
              step: "05 · 用户级业务状态",
              title: "库存、订单、准入申请与供应商统一管理",
              desc: "资产看板仅展示当前登录用户的已购库存，同时与企业公共主数据建立关联。顶部汇总 SKU、数量、金额和待认证产品，并通过标签页统一呈现订单、产品准入和供应商。",
            },
            {
              src: "/harness-agent/06-order-created.png",
              step: "06 · 可验证的 ERP 闭环",
              title: "批准后的动作成为可追踪业务记录",
              desc: "用户批准后，MCP/ERP 网关创建订单，看板同步显示订单编号、金额、申请人、供应商与状态。库存从 50 更新到 52，金额从 ¥13,400 更新到 ¥13,936，形成从对话到企业持久状态的完整闭环。",
            },
          ],
          techTitle: "系统分层",
          tech: [
            {
              name: "Vue 3 采购工作台",
              desc: "提供响应式聊天、执行过程、审批卡片、历史会话、个人设置、报告下载与 ERP 资产看板。",
            },
            {
              name: "FastAPI + Harness Runtime",
              desc: "通过带身份认证的 REST 与 SSE API 编排主 Agent、中间件、专业子 Agent、会话和报告。",
            },
            {
              name: "MCP / ERP 工具网关",
              desc: "使用类型化采购工具连接供应商、物料、库存、订单和产品准入工作流。",
            },
            {
              name: "OpenSandbox 安全边界",
              desc: "命令、文件、网页访问、技能脚本与报告生成均在用户专属沙箱内运行，并受路径和网络策略约束。",
            },
            {
              name: "MongoDB + SQLite 持久化",
              desc: "用户资料、偏好、会话、沙箱注册、Skills、订单、库存与审批状态均按用户隔离保存。",
            },
          ],
          architectureTitle: "系统架构",
          architecture:
            "Vue 工作台通过 REST 与 SSE 连接带身份认证的 FastAPI 后端。后端统一编排 Harness 主 Agent、采购专业子 Agent、上下文与记忆中间件，以及支持工具调用的 DeepSeek 模型。业务动作经类型化 MCP/ERP 网关执行；文件、命令、网页与报告任务则进入用户专属 OpenSandbox。MongoDB 与 SQLite 为整套系统提供按身份隔离的持久状态。",
          safetyTitle: "面向安全执行的设计",
          safety:
            "所有写操作绑定可信用户身份并经过人工审批；沙箱网络默认拒绝、文件路径严格校验、工具循环设置上限、报告文件名采用白名单、密码加盐哈希存储，并对每位用户的数据、记忆、Skills 与运行环境进行隔离。",
        },
      },
    },
    contact: {
      title: "联系我",
      desc: "欢迎交流 AI 研究岗位、合作与任何想法。",
    },
    resume: "简历",
    langLabel: "EN",
  },
};

/* ------------------------------------------------------------------ */
/*  Social links — update these with your real URLs                    */
/* ------------------------------------------------------------------ */

const socialLinks = {
  github: "https://github.com/yeesiang03/", // TODO: your GitHub username
  linkedin: "https://www.linkedin.com/in/yee-siang-ku-11b069315/", // TODO: your LinkedIn profile
  resume: assetPath("Ku_Yee_Siang_Resume.pdf"),
};

const projectsLinks = {
  p1: {
    paper: assetPath("1820221046_丘宇翔_大语言模型医学场景反事实.pdf"),
    code: assetPath("1820221046_丘宇翔_答辩稿.pptx"),
  },
  p3: {
    demo: "https://project-mini-map.vercel.app/",
    code: "https://github.com/tanvihang/project-mini-map/tree/main",
    devpost: "https://devpost.com/software/wanderless#updates",
  },
};

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const t = translations[lang];
  const backLabel = lang === "en" ? "Back to projects" : "返回项目列表";

  // Refs for text elements the ball can bounce off
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const textRefs = [nameRef, taglineRef, introRef, ctaRef];

  const toggleLang = () => setLang((p) => (p === "en" ? "zh" : "en"));

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <div className="site-shell min-h-screen bg-black font-inter text-white">
      {/* ============================ NAV ============================ */}
      <nav className="nav-shell fixed top-0 z-40 flex w-full items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md sm:px-10 lg:px-16">
        {/* Name / logo */}
        <a
          href="#top"
          className="group flex items-center gap-3 font-inter text-base font-semibold tracking-tight text-white sm:text-lg"
        >
          <span className="logo-mark" aria-hidden="true">HK</span>
          <span>Henry Ku</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right cluster: social links + lang toggle */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-white/70 transition-colors hover:text-white"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 transition-colors hover:text-white"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            {t.resume}
          </a>
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/70 transition-colors hover:text-white"
          >
            <Languages className="h-4 w-4" />
            {t.langLabel}
          </button>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-white/70"
          >
            <Languages className="h-4 w-4" />
            {t.langLabel}
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col space-y-1.5"
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-4 bg-white" />
          </button>
        </div>
      </nav>

      {/* ====================== MOBILE MENU ====================== */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <span className="text-lg font-semibold tracking-tight text-white">
            Henry Ku
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="flex h-[calc(100%-80px)] flex-col items-center justify-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl uppercase text-white sm:text-4xl"
              style={{
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </a>
          ))}

          <div
            className="mt-6 flex items-center gap-8"
            style={{
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: `${navLinks.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-white/80"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/80"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 border border-white/30 px-4 py-2 text-[11px] uppercase tracking-widest text-white"
            >
              <FileText className="h-3.5 w-3.5" />
              {t.resume}
            </a>
          </div>
        </div>
      </div>

      {/* ============================ HERO / ABOUT ============================ */}
      <section
        id="top"
        className="hero-section relative flex min-h-[calc(100vh-80px)] flex-col justify-center overflow-hidden px-6 pt-24 sm:px-10 lg:px-16"
      >
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        {/* Robot playground canvas — overlays entire hero */}
        <div className="absolute inset-0 z-10">
          <RobotPlayground textRefs={textRefs} />
        </div>

        <div className="pointer-events-none relative z-20 flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left — Text content */}
          <div className="flex flex-col justify-center lg:max-w-[55%]">
            {/* Tagline */}
            <div
              ref={taglineRef}
              className="eyebrow mb-6 flex w-fit animate-fade-up items-center gap-2 lg:mb-8"
            >
              <span className="accent-dot" aria-hidden="true" />
              <Brain className="h-4 w-4 text-emerald-200/70" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 sm:text-xs">
                {t.hero.tagline}
              </span>
            </div>

            {/* Name */}
            <h1
              ref={nameRef}
              id="about"
              className="hero-title animate-fade-up-delay-1 text-[clamp(3.4rem,10vw,8.4rem)] font-bold leading-[0.82] tracking-[-0.07em] text-white"
            >
              {t.hero.name}
            </h1>

            {/* Intro */}
            <p
              ref={introRef}
              className="hero-intro mt-10 max-w-xl animate-fade-up-delay-2 text-sm leading-7 text-white/65 sm:text-base lg:mt-12"
            >
              {t.hero.intro}
            </p>

            {/* CTA */}
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap items-center gap-4 sm:gap-6">
              <a
                ref={ctaRef}
                href="#projects"
                className="primary-cta group pointer-events-auto flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest text-black sm:px-7 sm:py-4"
              >
                {t.hero.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="pointer-events-auto text-[10px] uppercase tracking-[0.24em] text-white/35">
                {lang === "en" ? "Research → prototype → product" : "研究 → 原型 → 产品"}
              </span>
            </div>
          </div>

          {/* Right — spacer (robot is drawn on canvas overlay) */}
          <div className="hidden lg:block lg:w-[40%]" />
        </div>
      </section>

      {/* ============================ PROJECTS ============================ */}
      <section
        id="projects"
        className="content-section border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        {/* Section header */}
        <div className="mb-16 animate-fade-up lg:mb-20 lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-emerald-200/60">
              01 / {lang === "en" ? "Selected work" : "精选作品"}
            </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mt-3 text-sm text-white/50 sm:text-base">
            {t.projects.subtitle}
          </p>
          </div>
          <p className="mt-8 max-w-xs text-xs leading-6 text-white/35 lg:mt-0 lg:text-right">
            {lang === "en"
              ? "Four projects across causal AI, health intelligence, travel agents and agent infrastructure."
              : "四个项目，覆盖因果 AI、健康智能、旅行智能体与 Agent 基础设施。"}
          </p>
        </div>

        {/* Project cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Project 1 — Graduation thesis */}
          <article
            onClick={() => setSelectedProject("p1")}
            onKeyDown={(event) => event.key === "Enter" && setSelectedProject("p1")}
            role="button"
            tabIndex={0}
            data-project="01"
            className="project-card group flex cursor-pointer flex-col border border-white/10 p-8 lg:p-10"
          >
            <div className="mb-5 flex items-center gap-2">
              <Brain className="h-4 w-4 text-white/50" />
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                {t.projects.p1.tag}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              {t.projects.p1.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
              {t.projects.p1.desc}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/40">
              {lang === "en" ? "Open thesis details" : "点击查看毕业设计详情"}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={projectsLinks.p1.paper}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {t.projects.p1.links.paper}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={projectsLinks.p1.code}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {t.projects.p1.links.code}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>

          {/* Project 2 — Agentic Medical chat */}
          <article
            onClick={() => setSelectedProject("p2")}
            onKeyDown={(event) => event.key === "Enter" && setSelectedProject("p2")}
            role="button"
            tabIndex={0}
            data-project="02"
            className="project-card group flex cursor-pointer flex-col border border-white/10 p-8 lg:p-10"
          >
            <div className="mb-5 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-white/50" />
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                {t.projects.p2.tag}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              {t.projects.p2.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
              {t.projects.p2.desc}
            </p>
            <p className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors group-hover:text-white/75">
              {t.projects.p2.links.details}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </p>
          </article>

          {/* Project 3 — Mini-Map (hackathon) */}
          <article
            onClick={() => setSelectedProject("p3")}
            onKeyDown={(event) => event.key === "Enter" && setSelectedProject("p3")}
            role="button"
            tabIndex={0}
            data-project="03"
            className="project-card group flex cursor-pointer flex-col border border-white/10 p-8 lg:p-10"
          >
            <div className="mb-5 flex items-center gap-2">
              <Map className="h-4 w-4 text-white/50" />
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                {t.projects.p3.tag}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              {t.projects.p3.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
              {t.projects.p3.desc}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={projectsLinks.p3.demo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {t.projects.p3.links.demo}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={projectsLinks.p3.code}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {t.projects.p3.links.code}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={projectsLinks.p3.devpost}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {t.projects.p3.links.devpost}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>

          {/* Project 4 — Harness Agent */}
          <article
            onClick={() => setSelectedProject("p4")}
            onKeyDown={(event) => event.key === "Enter" && setSelectedProject("p4")}
            role="button"
            tabIndex={0}
            data-project="04"
            className="project-card group flex cursor-pointer flex-col border border-white/10 p-8 lg:p-10"
          >
            <div className="mb-5 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-white/50" />
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                {t.projects.p4.tag}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              {t.projects.p4.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
              {t.projects.p4.desc}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/40">
              {lang === "en" ? "Open project details" : "点击查看项目详情"}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-white/50">
              <span>Vue 3</span>
              <span aria-hidden="true">·</span>
              <span>FastAPI</span>
              <span aria-hidden="true">·</span>
              <span>DeepSeek</span>
              <span aria-hidden="true">·</span>
              <span>OpenSandbox</span>
            </div>
          </article>
        </div>
      </section>

      {/* ============================ CONTACT / FOOTER ============================ */}
      <footer
        id="contact"
        className="contact-section border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
      >
        <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-emerald-200/60">
          02 / {lang === "en" ? "Contact" : "联系"}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {t.contact.title}
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/60 sm:text-base">
          {t.contact.desc}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <GithubIcon className="h-5 w-5" />
            GitHub
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <LinkedinIcon className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <FileText className="h-5 w-5" />
            {t.resume}
          </a>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Henry Ku
        </div>
      </footer>

      {/* ============================ PROJECT DETAIL OVERLAY ============================ */}
      {selectedProject === "p1" && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="mx-auto min-h-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-white/50" />
                  <span className="text-[11px] uppercase tracking-widest text-white/50">
                    {t.projects.p1.detail.badge}
                  </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t.projects.p1.title}
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                  {t.projects.p1.detail.tagline}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={projectsLinks.p1.paper}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {t.projects.p1.links.paper}
                  </a>
                  <a
                    href={projectsLinks.p1.code}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {t.projects.p1.links.code}
                  </a>
                </div>

                <section className="mt-16">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {t.projects.p1.detail.summaryTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                    {t.projects.p1.detail.summary}
                  </p>
                </section>

                <section className="mt-14">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {t.projects.p1.detail.workTitle}
                  </h3>
                  <div className="mt-6 grid gap-4">
                    {t.projects.p1.detail.work.map((item, i) => (
                      <div
                        key={i}
                        className="border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/75"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-14">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {t.projects.p1.detail.thinkingTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                    {t.projects.p1.detail.thinking}
                  </p>
                </section>

                <section className="mt-14">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {t.projects.p1.detail.pipelineTitle}
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {t.projects.p1.detail.pipeline.map((step, i) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 border border-white/10 p-4 text-sm text-white/75"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 text-[11px] text-white/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    {t.projects.p1.detail.pipelineNote}
                  </p>
                </section>

                <section className="mt-14">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {t.projects.p1.detail.resultsTitle}
                  </h3>
                  <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {t.projects.p1.detail.results.map((result) => (
                      <div
                        key={result.label}
                        className="border border-white/10 bg-white/5 p-5"
                      >
                        <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                          {result.label}
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">
                          {result.value}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {result.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-6">
                <div className="border border-white/10 bg-white/5 p-6">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                    {lang === "en" ? "In short" : "一句话总结"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                    {lang === "en"
                      ? "A benchmark, a taxonomy, and a head-to-head comparison show that explicit causal structure materially improves medical reasoning reliability."
                      : "一个评测基准、一套分类体系、一次横向比较，共同说明显式因果结构能够实质提升医学推理可靠性。"}
                  </p>
                </div>

                <div className="border border-white/10 bg-white/5 p-6">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                    {t.projects.p1.detail.closingTitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {t.projects.p1.detail.closing}
                  </p>
                </div>

                <div>
                  <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-white/40">
                    {t.projects.p1.detail.figuresTitle}
                  </p>
                  <div className="grid gap-4">
                    {t.projects.p1.detail.figures.map((figure) => (
                      <figure
                        key={figure.src}
                        className="overflow-hidden border border-white/10 bg-black/30"
                      >
                        <img
                          src={figure.src}
                          alt={figure.title}
                          className="h-auto w-full object-cover"
                        />
                        <figcaption className="border-t border-white/10 p-4">
                          <h4 className="text-sm font-semibold text-white">
                            {figure.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-white/55">
                            {figure.desc}
                          </p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-16 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>
          </div>
        </div>
      )}

      {selectedProject === "p2" && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="mx-auto min-h-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>

            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-emerald-300/70" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">
                  {t.projects.p2.detail.badge}
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.projects.p2.title}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-xl">
                {t.projects.p2.detail.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["React 18", "Express", "PostgreSQL", "Gemini", "Prompt Engineering"].map(
                  (item) => (
                    <span
                      key={item}
                      className="border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/55"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <section className="mt-20">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
                    01 · Product
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                    {t.projects.p2.detail.overviewTitle}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                  {t.projects.p2.detail.overview}
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
                {t.projects.p2.detail.metrics.map((metric) => (
                  <div key={metric.label} className="bg-black p-5 sm:p-7">
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-24">
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
                02 · Architecture
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                {t.projects.p2.detail.architectureTitle}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
                {t.projects.p2.detail.architectureIntro}
              </p>
              <div className="mt-10 grid gap-3 lg:grid-cols-5">
                {t.projects.p2.detail.architectureLayers.map((layer, i) => {
                  const icons = [Globe, Layers3, GitBranch, Brain, Database];
                  const Icon = icons[i];
                  return (
                    <div key={layer.title} className="relative">
                      <div className="h-full border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-emerald-300/30">
                        <div className="flex items-center justify-between">
                          <Icon className="h-5 w-5 text-emerald-300/55" />
                          <span className="text-[10px] tabular-nums text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-8 text-[9px] uppercase tracking-[0.24em] text-white/35">
                          {layer.eyebrow}
                        </p>
                        <h4 className="mt-2 text-sm font-semibold text-white">
                          {layer.title}
                        </h4>
                        <p className="mt-3 text-xs leading-relaxed text-white/55">
                          {layer.desc}
                        </p>
                      </div>
                      {i < t.projects.p2.detail.architectureLayers.length - 1 && (
                        <div className="flex h-3 items-center justify-center text-white/20 lg:absolute lg:-right-3 lg:top-1/2 lg:z-10 lg:h-auto lg:-translate-y-1/2">
                          <ArrowUpRight className="h-4 w-4 rotate-45 lg:rotate-0" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-l border-emerald-300/30 pl-4 text-[10px] uppercase tracking-[0.18em] text-white/35">
                <span>REST API</span>
                <span>JWT Auth</span>
                <span>Provider fallback</span>
                <span>Longitudinal records</span>
              </div>
            </section>

            <section className="mt-24">
              <div className="max-w-3xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
                  03 · Intelligence
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  {t.projects.p2.detail.promptTitle}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                  {t.projects.p2.detail.promptIntro}
                </p>
              </div>
              <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
                {t.projects.p2.detail.promptLayers.map((layer, i) => {
                  const icons = [UserRoundCheck, Target, MessageSquare, ShieldCheck];
                  const Icon = icons[i];
                  return (
                    <div key={layer.label} className="bg-black p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-emerald-300/55" />
                        <p className="text-[10px] uppercase tracking-[0.23em] text-white/35">
                          {layer.label}
                        </p>
                      </div>
                      <h4 className="mt-6 text-lg font-semibold text-white">
                        {layer.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {layer.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 border border-white/10 bg-white/[0.025] p-5 font-mono text-xs leading-7 text-white/50 sm:p-7">
                <span className="text-emerald-300/65">system</span>
                {" = persona + safety_boundary"}
                <br />
                <span className="text-emerald-300/65">context</span>
                {" = profile + health_goals + recent_6_messages"}
                <br />
                <span className="text-emerald-300/65">response</span>
                {" = assessment + rationale + actions + next_step"}
              </div>
            </section>

            <section className="mt-24">
              <div className="max-w-3xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
                  04 · Orchestration
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  {t.projects.p2.detail.consultationTitle}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                  {t.projects.p2.detail.consultationIntro}
                </p>
              </div>
              <div className="mt-10 grid gap-4 lg:grid-cols-4">
                {t.projects.p2.detail.consultationSteps.map((item, i) => (
                  <div
                    key={item.step}
                    className="relative border border-white/10 p-6"
                  >
                    <p className="text-3xl font-light tabular-nums text-emerald-300/45">
                      {item.step}
                    </p>
                    <h4 className="mt-8 text-base font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {item.desc}
                    </p>
                    {i < t.projects.p2.detail.consultationSteps.length - 1 && (
                      <div className="absolute -bottom-3 left-1/2 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center border border-white/15 bg-black text-white/35 lg:-right-3 lg:bottom-auto lg:left-auto lg:top-8 lg:translate-x-0">
                        <ArrowUpRight className="h-3.5 w-3.5 rotate-45 lg:rotate-0" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-28">
              <div className="max-w-3xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
                  05 · Experience
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  {t.projects.p2.detail.showcaseTitle}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                  {t.projects.p2.detail.showcaseIntro}
                </p>
              </div>
              <div className="mt-12 space-y-20">
                {t.projects.p2.detail.showcase.map((item) => (
                  <article key={item.step}>
                    <div className="grid gap-5 border-l border-white/15 pl-5 sm:grid-cols-[13rem_1fr] sm:gap-10 sm:pl-7">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300/55">
                        {item.step}
                      </p>
                      <div>
                        <h4 className="text-xl font-semibold text-white sm:text-2xl">
                          {item.title}
                        </h4>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`mt-8 grid gap-4 ${
                        item.images.length === 1
                          ? "mx-auto max-w-4xl"
                          : item.images.length === 3
                            ? "lg:grid-cols-3"
                            : "lg:grid-cols-2"
                      }`}
                    >
                      {item.images.map((image) => (
                        <figure
                          key={image.src}
                          className="overflow-hidden border border-white/15 bg-[#f4f8f6] p-1.5 sm:p-2"
                        >
                          <img
                            src={assetPath(image.src)}
                            alt={image.alt}
                            loading="lazy"
                            className="h-auto w-full"
                          />
                        </figure>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-28">
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
                06 · Engineering
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                {t.projects.p2.detail.stackTitle}
              </h3>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {t.projects.p2.detail.stack.map((item, i) => {
                  const icons = [Globe, Cloud, Database, Brain];
                  const Icon = icons[i];
                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 border border-white/10 p-6 transition-colors hover:border-white/30"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300/55" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/55">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 border border-emerald-300/20 bg-emerald-300/[0.035] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-300/65" />
                  <h4 className="text-lg font-semibold text-white">
                    {t.projects.p2.detail.safetyTitle}
                  </h4>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/65 sm:text-base">
                  {t.projects.p2.detail.safety}
                </p>
              </div>
            </section>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-20 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>
          </div>
        </div>
      )}

      {selectedProject === "p3" && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="mx-auto min-h-full max-w-6xl px-6 py-24 sm:px-10 lg:py-32"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>

            {/* Header */}
            <div className="mb-10 flex items-center gap-2">
              <Map className="h-4 w-4 text-white/50" />
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                {t.projects.p3.tag}
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.projects.p3.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t.projects.p3.detail.tagline}
            </p>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={projectsLinks.p3.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                {t.projects.p3.links.demo}
              </a>
              <a
                href={projectsLinks.p3.code}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
              >
                <GitBranch className="h-3.5 w-3.5" />
                {t.projects.p3.links.code}
              </a>
              <a
                href={projectsLinks.p3.devpost}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.projects.p3.links.devpost}
              </a>
            </div>

            {/* Overview */}
            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p3.detail.overviewTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {t.projects.p3.detail.overview}
              </p>
            </section>

            {/* Features */}
            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p3.detail.featuresTitle}
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {t.projects.p3.detail.features.map((f, i) => {
                  const icons = [Compass, Wallet, Globe, Map];
                  const Icon = icons[i % icons.length];
                  return (
                    <div
                      key={i}
                      className="border border-white/10 p-6 transition-colors hover:border-white/30"
                    >
                      <Icon className="h-5 w-5 text-white/50" />
                      <h4 className="mt-4 text-sm font-semibold text-white">
                        {f.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {f.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Tech stack */}
            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p3.detail.techTitle}
              </h3>
              <div className="mt-6 space-y-4">
                {t.projects.p3.detail.tech.map((tech, i) => {
                  const icons = [
                    Cloud,
                    Database,
                    Sparkles,
                    Database,
                    GitBranch,
                  ];
                  const Icon = icons[i % icons.length];
                  return (
                    <div
                      key={i}
                      className="flex gap-4 border border-white/10 p-5 transition-colors hover:border-white/30"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/50" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {tech.name}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Architecture */}
            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p3.detail.architectureTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {t.projects.p3.detail.architecture}
              </p>
            </section>

            {/* Bottom links */}
            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p3.detail.linksTitle}
              </h3>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={projectsLinks.p3.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                >
                  {t.projects.p3.links.demo}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={projectsLinks.p3.code}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                >
                  {t.projects.p3.links.code}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={projectsLinks.p3.devpost}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                >
                  {t.projects.p3.links.devpost}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </section>

            {/* Close button (bottom) */}
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-16 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>
          </div>
        </div>
      )}

      {selectedProject === "p4" && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="mx-auto min-h-full max-w-3xl px-6 py-24 sm:px-10 lg:py-32"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>

            <div className="mb-10 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-white/50" />
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                {t.projects.p4.tag}
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.projects.p4.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t.projects.p4.detail.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Vue 3", "FastAPI", "DeepSeek", "MCP / ERP", "MongoDB", "OpenSandbox"].map(
                (item) => (
                  <span
                    key={item}
                    className="border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/60"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>

            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p4.detail.overviewTitle}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
                {t.projects.p4.detail.overview}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
                {t.projects.p4.detail.metrics.map((metric) => (
                  <div key={metric.label} className="bg-black p-5 sm:p-6">
                    <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/45">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {t.projects.p4.detail.showcaseTitle}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                  {t.projects.p4.detail.showcaseIntro}
                </p>
              </div>
              <div className="mt-8 space-y-12 sm:space-y-16">
                {t.projects.p4.detail.showcase.map((item) => (
                  <figure key={item.src}>
                    <div className="overflow-hidden border border-white/15 bg-white/[0.03] p-1.5 sm:p-2">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="h-auto w-full bg-[#f4f7f5]"
                      />
                    </div>
                    <figcaption className="mt-5 grid gap-3 border-l border-white/20 pl-5 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:pl-6">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                        {item.step}
                      </p>
                      <div>
                        <h4 className="text-base font-semibold text-white sm:text-lg">
                          {item.title}
                        </h4>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
                          {item.desc}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="mt-20">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p4.detail.featuresTitle}
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {t.projects.p4.detail.features.map((feature, i) => {
                  const icons = [GitBranch, Brain, Users, Sparkles];
                  const Icon = icons[i % icons.length];
                  return (
                    <div
                      key={feature.title}
                      className="border border-white/10 p-5 transition-colors hover:border-white/30 sm:p-6"
                    >
                      <Icon className="h-5 w-5 text-white/50" />
                      <h4 className="mt-4 text-sm font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p4.detail.architectureTitle}
              </h3>
              <div className="mt-6 border border-white/10 bg-white/[0.025] p-5 sm:p-8">
                <div className="mx-auto max-w-sm border border-white/15 bg-black px-4 py-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {lang === "en" ? "Presentation" : "交互层"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Vue 3 Procurement Workbench
                  </p>
                </div>
                <div className="mx-auto h-7 w-px bg-white/20" />
                <div className="mx-auto max-w-sm border border-white/15 bg-black px-4 py-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                    REST · SSE · Auth
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    FastAPI Backend · :8090
                  </p>
                </div>
                <div className="mx-auto h-7 w-px bg-white/20" />
                <div className="mx-auto max-w-sm border border-white/30 bg-white/[0.06] px-4 py-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {lang === "en" ? "Orchestration core" : "编排核心"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Harness Main Agent
                  </p>
                  <p className="mt-2 text-xs text-white/45">
                    Planning · Middleware · Memory · Skills
                  </p>
                </div>
                <div className="mx-auto h-7 w-px bg-white/20" />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["DeepSeek LLM", lang === "en" ? "Tool calling" : "工具调用"],
                    ["Specialist Agents", lang === "en" ? "Analyst · Order" : "分析 · 订单"],
                    ["MCP / ERP · :8000", lang === "en" ? "Business actions" : "业务动作"],
                    ["OpenSandbox · :8080", lang === "en" ? "Files · Web · Code" : "文件 · 网页 · 代码"],
                  ].map(([title, note]) => (
                    <div key={title} className="border border-white/10 bg-black p-4 text-center">
                      <p className="text-xs font-semibold text-white/80">{title}</p>
                      <p className="mt-1.5 text-[10px] uppercase tracking-wider text-white/35">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mx-auto h-7 w-px bg-white/20" />
                <div className="mx-auto max-w-xl border border-white/15 bg-black px-4 py-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {lang === "en" ? "Durable state" : "持久状态"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    MongoDB · SQLite · User-scoped Store
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-4xl text-sm leading-relaxed text-white/70 sm:text-base">
                {t.projects.p4.detail.architecture}
              </p>
            </section>

            <section className="mt-16">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {t.projects.p4.detail.techTitle}
              </h3>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {t.projects.p4.detail.tech.map((tech, i) => {
                  const icons = [Globe, Cloud, GitBranch, Compass, Database];
                  const Icon = icons[i % icons.length];
                  return (
                    <div
                      key={tech.name}
                      className="flex gap-4 border border-white/10 p-5 transition-colors hover:border-white/30"
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/50" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {tech.name}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-16 border border-white/10 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-white/50" />
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {t.projects.p4.detail.safetyTitle}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {t.projects.p4.detail.safety}
              </p>
            </section>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-16 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
