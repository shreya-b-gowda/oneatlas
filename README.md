# ONEATLAS – AI Model Discovery & Intelligence Platform

ONEATLAS is a centralized, developer-first intelligence platform designed to discover, compare, analyze, and benchmark state-of-the-art Artificial Intelligence models from global providers (including OpenAI, Anthropic, Google DeepMind, Meta, DeepSeek, Mistral, and more).

---

## 🌟 Executive Summary

As the modern AI ecosystem rapidly expands, software engineers, AI architects, and tech leaders face significant friction when selecting the optimal Large Language Model (LLM) or multimodal model for their production workloads. Pricing structures, context window limits, architectural trade-offs, supported modalities, and real-world benchmark performance vary drastically between models.

**ONEATLAS** bridges this intelligence gap by providing:
- **Centralized Model Discovery**: Dynamic catalog with multi-dimensional filtering, searching, and sorting.
- **Deep Model Profiles**: Granular specifications, pricing breakdowns (per 1M input/output tokens), benchmark radars, and provider availability.
- **Side-by-Side Model Comparison Engine**: Real-time evaluation of up to 3 models simultaneously across technical and economic criteria.
- **Dynamic Leaderboards & Benchmarks**: Real-time evaluation metrics across Reasoning (MMLU, GPQA), Coding (HumanEval), Mathematics (MATH), and Context Retention.
- **AI Labs & Provider Directories**: Structural profiles of research laboratories (OpenAI, DeepMind, Anthropic, etc.) and inference infrastructure hosts.

---

## 🛠️ Mandatory Technology Stack

| Domain | Technology | Justification & Role |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14+ (App Router)** | Hybrid Server/Client rendering, optimized routing, nested layouts, top-tier SEO, and production performance. |
| **UI Library** | **React 18 / 19** | Declarative component-driven architecture for complex interactive interfaces. |
| **Language** | **TypeScript** | Strict compile-time type safety preventing runtime null/undefined defects and establishing reliable data contracts. |
| **Styling Engine** | **Tailwind CSS** | Utility-first styling enabling a bespoke, dark-themed, sleek developer-dashboard aesthetic. |
| **Icons & Micro-interactions** | **Lucide React** | Consistent, lightweight SVG icon system. |
| **Backend & API** | **Next.js API Route Handlers** | Serverless RESTful endpoints in TypeScript handling search, pagination, filtering, and aggregation. |
| **Database ORM** | **Prisma ORM** | Type-safe schema definition, database migrations, and clean query builder for relational data. |
| **Relational Database** | **PostgreSQL (Neon / Cloud)** | Battle-tested relational database modeling models, providers, labs, and benchmark metrics with strict referential integrity. |
| **Version Control** | **Git & GitHub** | Atomic commit history, feature branch management, and CI/CD readiness. |
| **Deployment Target** | **Vercel** | Zero-configuration global edge network deployment for Next.js and serverless APIs. |

---

## 🏛️ System Architecture Overview

```
                                  +---------------------------------------------+
                                  |                 Client Layer                |
                                  |   (Next.js App Router / React Server &      |
                                  |           Client Components)                |
                                  +---------------------------------------------+
                                                         |
                                                         | HTTPS / JSON (REST)
                                                         v
                                  +---------------------------------------------+
                                  |              Backend API Layer              |
                                  |         (Next.js Route Handlers)            |
                                  |   /api/models, /api/providers, /api/rankings|
                                  +---------------------------------------------+
                                                         |
                                                         | Type-safe Query API
                                                         v
                                  +---------------------------------------------+
                                  |               ORM Data Layer                |
                                  |                (Prisma ORM)                 |
                                  +---------------------------------------------+
                                                         |
                                                         | SQL (Connection Pooling)
                                                         v
                                  +---------------------------------------------+
                                  |              Persistence Layer              |
                                  |           (PostgreSQL on Neon)              |
                                  +---------------------------------------------+
```

---

## 📁 Project Structure

```
d:/One atlas
├── .git/                      # Git Version Control metadata
├── prisma/                    # Prisma ORM schema & seed scripts
│   ├── schema.prisma          # Database schema (Models, Providers, Labs, Benchmarks)
│   └── seed.ts                # Database seeder with realistic AI model data
├── public/                    # Static assets (favicons, logos, diagrams)
├── src/
│   ├── app/                   # Next.js App Router structure
│   │   ├── api/               # Serverless Backend API Routes
│   │   │   ├── labs/          # /api/labs endpoint
│   │   │   ├── models/        # /api/models & /api/models/[id] endpoints
│   │   │   ├── providers/     # /api/providers endpoint
│   │   │   └── rankings/      # /api/rankings endpoint
│   │   ├── compare/           # /compare route (Side-by-side model comparison)
│   │   ├── labs/              # /labs route (AI Labs directory)
│   │   ├── models/            # /models route (Catalog & dynamic [id] detail page)
│   │   ├── providers/         # /providers route (Inference providers directory)
│   │   ├── rankings/          # /rankings route (Leaderboards & benchmarks)
│   │   ├── layout.tsx         # Root layout with Sidebar and Top Navigation
│   │   ├── page.tsx           # Dashboard home view
│   │   └── globals.css        # Global CSS variables, theme, and Tailwind imports
│   ├── components/            # Reusable UI component library
│   │   ├── common/            # Badges, Buttons, Cards, Inputs, Modals, Loaders
│   │   ├── compare/           # Model comparison matrix and metric cards
│   │   ├── dashboard/         # StatCards, TrendingModels, QuickLaunch
│   │   ├── layout/            # Sidebar, TopNav, MobileNav, Footer
│   │   └── models/            # ModelCard, ModelTable, ModelFilters, SearchBar
│   ├── data/                  # Static baseline/fallback data and interfaces
│   │   └── mockData.ts        # Structured data for offline/standalone execution
│   ├── lib/                   # Utility helpers and singleton clients
│   │   ├── prisma.ts          # Prisma Client singleton
│   │   └── utils.ts           # Class merge (clsx/twMerge), formatting helpers
│   └── types/                 # Shared TypeScript interfaces & types
│       └── index.ts           # Model, Provider, Lab, Benchmark type contracts
├── DEVELOPMENT_PROGRESS.md    # Living progress tracker and test validation log
├── README.md                  # Comprehensive architectural and project guide
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and build scripts
├── tailwind.config.ts         # Custom dark-theme tokens and extensions
└── tsconfig.json              # TypeScript strict configuration
```

---

## 🚀 Key Features

1. **Intelligent Dashboard**: High-level telemetry of AI models, providers, context window records, and cost-efficiency highlights.
2. **Explore & Search Matrix**: Filter by modalities (Text, Multimodal, Vision, Audio, Code), license (Open Source vs Proprietary), context length, and pricing tiers with instant debounce search.
3. **Deep Technical Profiles**: Detailed overview of model token limits, tokenizer details, maximum output tokens, and multi-provider pricing.
4. **Interactive Multi-Model Comparator**: Compare up to 3 models side-by-side across architecture, pricing, context windows, and real benchmark scores with difference highlighting.
5. **Verified Benchmarking Hub**: Transparent scores across standard industry evaluations (MMLU, HumanEval, GSM8K, MATH, GPQA) with methodology context.
6. **Provider & Lab Ecosystem**: Comprehensive mapping of AI creators (Labs) and their deployment networks (Inference Providers).

---

## 👨‍💻 Author & Academic Project
 
- **Author**: Shreya B
- **Focus**: Professional Full-Stack Architecture, Clean Code, Enterprise Next.js UI/UX Engineering
