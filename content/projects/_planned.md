# Planned Projects — To Build, Push to GitHub, Then Add to Portfolio

> Source of truth for side projects Sai is building to strengthen the portfolio.
> Once a project is shipped:
>   1. Move its section into its own file at `content/projects/<slug>.md`
>   2. Add a matching card entry to `profile.roadmap` (or a new `profile.projects` list)
>   3. Add GitHub URL + live demo link (HF Space, Streamlit Cloud, etc.)
>   4. Run `pnpm ingest` so the RAG chatbot can cite the project
>
> Ordered roughly by "shows strongest Senior AI Engineer signal first".

---

## 1. Multi-Agent Claims Triage System (A2A + LangGraph)
**slug:** `a2a-claims-triage`
**status:** planned
**stack:** LangGraph · Google A2A protocol · Python · stateful graphs · durable workflows

### Pitch
Multi-agent triage platform using LangGraph with **4 specialized agents** (Triage, Evidence, Policy, QA) that handle claims and disputes end-to-end. Agents discover each other's capabilities and hand off tasks automatically using Google's **A2A protocol**.

### Engineering
- Durable state management with retries, timeouts, and an auditable action log.
- Typed agent contracts with capability descriptors for dynamic discovery.
- Human-in-the-loop guardrail checkpoints.

### Results
- **95%+ workflow success rate** across 200+ test cases.
- **Agent handoff latency < 300ms (p95)**.

---

## 2. AI Tools Gateway using Model Context Protocol (MCP)
**slug:** `mcp-tools-gateway`
**status:** planned
**stack:** MCP · Python · FastAPI · RBAC · JSON-schema validation

### Pitch
MCP server that exposes compliance and risk operations (policy lookup, analytics queries, ticket creation) as **standardized tools for LLM agents** — any MCP-compatible AI client can securely interact with internal systems.

### Engineering
- Tool allowlists, role-based access control, schema validation, audit logging.
- Principle-of-least-privilege enforcement per agent identity.

### Results
- **100% of disallowed tool calls blocked** across 500+ runs.
- **< 2% error rate**, **p95 latency < 500ms**.

---

## 3. LLM Fine-Tuning for Compliant Document Summarization (DPO + LoRA)
**slug:** `dpo-lora-summarizer`
**status:** planned
**stack:** TRL (DPO) · QLoRA · FastAPI · streaming inference · feedback loop

### Pitch
Fine-tuned a small LLM using **DPO (TRL library) with QLoRA** on a curated preference dataset of **2,000+ chosen-vs-rejected pairs** for clinical and financial case-note generation.

### Engineering
- Offline eval pipeline: win-rate vs baseline, rubric scoring, format compliance.
- Deployed behind FastAPI with batching + streaming.
- Feedback capture loop for continuous preference-data collection.

### Results
- **15%+ win-rate uplift** over baseline.
- **> 95% schema adherence** on held-out data.

---

## 4. Customer Lifetime Value Prediction & Segmentation Pipeline
**slug:** `clv-segmentation`
**status:** planned
**stack:** BG/NBD · Gamma-Gamma · XGBoost · K-Means · Airflow · MLflow · Streamlit

### Pitch
CLV prediction pipeline combining a **BG/NBD** model for purchase frequency with a **Gamma-Gamma** model for monetary value, benchmarked against XGBoost regression.

### Engineering
- Engineered recency / frequency / behavioral features.
- K-Means segmentation with silhouette-score-optimized k.
- Airflow for weekly batch retraining, MLflow for model versioning, Streamlit dashboard for stakeholders.

### Results
- **XGBoost outperformed by 12% on MAE**.
- **5 distinct segments** identified; **top 15% of customers contribute 58% of predicted lifetime revenue** → targeted retention strategies.

---

## 5. End-to-End ML Pipeline with Drift Detection & Auto-Retraining
**slug:** `credit-risk-mlops`
**status:** planned
**stack:** LightGBM · Airflow · MLflow · DVC · Docker · GitHub Actions · Evidently · Streamlit

### Pitch
Production-grade ML pipeline for **credit-risk prediction** with full MLOps: orchestration, experiment tracking, model registry, data versioning, CI/CD, and drift-triggered retraining.

### Engineering
- **Evidently AI** for data-drift and prediction-drift monitoring with configurable thresholds that auto-trigger retraining.
- Proper **time-series cross-validation** to prevent leakage.
- Feature-importance tracking across retraining cycles.
- Streamlit dashboard for model health, drift metrics, retraining history.

### Results
- Automated drift → retrain loop keeps model performance within SLA.
- Reduced manual intervention; reproducible training runs via DVC + MLflow.

---

## 6. Search Ranking System with Learning-to-Rank
**slug:** `ltr-search-ranking`
**status:** planned
**stack:** BM25 · sentence-transformers · FAISS · LambdaMART · FastAPI · Elasticsearch · Docker

### Pitch
Two-stage search ranking pipeline: **BM25 sparse retrieval + sentence-transformer embeddings + FAISS semantic retrieval**, followed by a **LambdaMART re-ranker** trained on click-through data with position-bias correction.

### Engineering
- Engineered ranking features: query-doc similarity, historical CTR, freshness signals, user personalization.
- Statistical-significance validation (p < 0.05).
- FastAPI service, Elasticsearch for indexing, FAISS for vector search, Docker for deployment.

### Results
- **+18% NDCG@10**, **+22% MRR** over BM25-only baseline.
- **Sub-100ms end-to-end query latency**.

---

## Shipping checklist (per project)

When a project is ready:

- [ ] Code pushed to public GitHub repo with a clear README (problem · architecture · results · run-it-locally)
- [ ] One-click demo where possible (HF Space, Streamlit Cloud, Vercel)
- [ ] Screenshots / short Loom walkthrough in the README
- [ ] Copy this project's section into `content/projects/<slug>.md`
- [ ] Add card to `profile.roadmap` (or new `profile.projects` array) with status `shipped`
- [ ] Run `pnpm ingest` to refresh the RAG chatbot
- [ ] Commit → Vercel auto-redeploys
