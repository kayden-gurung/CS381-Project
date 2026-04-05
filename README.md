# CS381 — Prompt Injection Attack & Defense Lab on a RAG Chatbot

## Overview
This project investigates prompt injection vulnerabilities in a Retrieval-Augmented Generation (RAG)
system. We build a small RAG chatbot backed by a local document knowledge base, demonstrate several
classes of prompt injection attacks, then implement and evaluate defensive countermeasures.

## Scope & Target
- **Target system:** A locally hosted RAG pipeline (LangChain + FAISS or Chroma + a local/API-hosted LLM)
- **Attack surface:** User query field, retrieved document chunks injected into the LLM context
- **Out of scope:** External production systems; all testing is performed on our own controlled environment

## Project Direction
1. Stand up a minimal RAG demo with 5–10 documents as the knowledge base
2. Execute three attack categories:
   - Direct injection ("ignore previous instructions…")
   - Data exfiltration (extracting content from retrieved docs)
   - Indirect injection (malicious instructions embedded in the documents themselves)
3. Implement defenses (input sanitization, output filtering, instruction hierarchy)
4. Measure and report: refusal rate improvement and leakage reduction

## Tools & Stack
| Tool | Purpose |
|---|---|
| Python 3.11+ | Primary language |
| LangChain | RAG orchestration |
| FAISS / ChromaDB | Vector store |
| OpenAI API / Ollama | LLM backend |
| Jupyter Notebooks | Experiment logging |
| Pytest | Automated evaluation |

## Setup Plan
> Full setup instructions will be added in Week 2 once the development environment is finalized.

## Team
- [Your Name] — UMKC CS381

## Ethics & Safety
All attack demonstrations are conducted exclusively against systems we own and operate.
No real user data, production APIs, or third-party systems are targeted.
