CS381 — Prompt Injection Attack & Defense Lab on a RAG Chatbot

Team: Diddylabs — UMKC CS381
Members: Kayden G, Dylan N, Zach G, Thomas K


📖 Overview
This project investigates prompt injection vulnerabilities in a Retrieval-Augmented Generation (RAG) system. We build a React-based frontend interface backed by a document knowledge base, demonstrate several classes of prompt injection attacks, and then implement and evaluate defensive countermeasures.
Attack Categories Covered

Direct Injection — "ignore previous instructions…" style attacks via the user query field
Data Exfiltration — Extracting content from retrieved document chunks
Indirect Injection — Malicious instructions embedded inside the knowledge base documents themselves


🛠️ Tech Stack
ToolPurposeReact 18 + TypeScriptFrontend UIVite 6Build tool & dev serverTailwind CSS v4Stylingshadcn/ui + Radix UIUI component libraryMUI (Material UI)Additional componentsReact Router v7Client-side routingRechartsData visualizationpnpmPackage manager

📁 Project Structure
CS381-Project/
├── src/                   # Main source code (TypeScript/React)
├── docs/                  # Project documentation
├── guidelines/            # Project guidelines and rubrics
├── index.html             # App entry point
├── vite.config.ts         # Vite configuration
├── package.json           # Dependencies and scripts
├── pnpm-workspace.yaml    # pnpm workspace config
├── postcss.config.mjs     # PostCSS config (Tailwind)
├── default_shadcn_theme.css # shadcn default theme
├── ATTRIBUTIONS.md        # Third-party attributions
└── README.md              # This file

⚙️ Prerequisites
Before running the project, make sure you have the following installed:

Node.js v18 or higher — Download
pnpm v8 or higher

Install pnpm if you don't have it:
bashnpm install -g pnpm

🚀 Getting Started
1. Clone the Repository
bashgit clone https://github.com/kayden-gurung/CS381-Project.git
cd CS381-Project
2. Install Dependencies
bashpnpm install

Note: This project uses pnpm as its package manager. Using npm install or yarn may cause dependency resolution issues.

3. Start the Development Server
bashpnpm dev
The app will be available at http://localhost:5173 by default.
4. Build for Production
bashpnpm build
The production-ready files will be output to the dist/ directory.

🧪 Running Attack & Defense Experiments
Experiment documentation and results can be found in the docs/ folder. The project demonstrates the following workflow:

Stand up the RAG demo — Load 5–10 documents into the knowledge base via the UI.
Execute attacks — Use the query interface to test the three attack categories listed above.
Apply defenses — Enable input sanitization, output filtering, and instruction hierarchy controls.
Measure results — Review refusal rate improvements and reduction in data leakage.

Refer to docs/ for detailed attack scripts and evaluation metrics.

⚠️ Ethics & Safety
All attack demonstrations are conducted exclusively against systems we own and operate. No real user data, production APIs, or third-party systems are targeted. This project is for academic research purposes only, conducted within a controlled lab environment for UMKC CS381.

📄 Attributions
See ATTRIBUTIONS.md for all third-party libraries and resources used in this project.
