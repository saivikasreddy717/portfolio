// Single source of truth for all structured data on the site.
// Edit this file to update name, experience, skills, metrics, etc.
// After editing resume.md, run `pnpm ingest` to update the RAG chatbot.

export const profile = {
  name: "Sai Vikas Reddy Yeddulamala",
  shortName: "Sai Vikas",
  role: "AI / ML Engineer",
  location: "Raleigh, NC",
  email: "saivikas.y@zohomail.com",
  phone: "+1 919-672-0116",
  github: "https://github.com/saivikasreddy717",
  linkedin: "https://www.linkedin.com/in/saivikasy/",
  resumePdf: "/resume.pdf",
  availability: "Open to AI/ML Engineer roles · Available immediately",

  tagline: "I build production GenAI systems.",
  oneLiner:
    "AI/ML Engineer shipping agentic RAG, LoRA-tuned SLMs, and sub-150ms LLM serving across healthcare and banking. Currently at Cardinal Health; MS CS @ NC State (May 2025).",

  // Recruiter-facing summary — dense factual profile shown before Experience
  summary:
    "AI/ML Engineer with 3+ years shipping production GenAI systems across healthcare (Cardinal Health) and banking (TCS). Specialized in agentic RAG pipelines, LoRA fine-tuning, and sub-150ms LLM serving at scale. Currently completing MS Computer Science at NC State (May 2025).",
  coreStack: ["LangGraph", "vLLM", "PyTorch", "AWS", "Triton", "MLflow", "LangChain", "Hugging Face"],

  // 8 impact numbers pulled from resume — MetricsWall renders these
  headlineMetrics: [
    { value: "3×", label: "retrieval precision" },
    { value: "8×", label: "inference throughput" },
    { value: "98%", label: "extraction accuracy" },
    { value: "<150ms", label: "p95 LLM latency" },
    { value: "40%", label: "analyst time saved" },
    { value: "55%", label: "chatbot containment" },
    { value: "20%", label: "stockouts reduced" },
    { value: "8–9%", label: "approval lift (A/B)" },
  ],

  // Four pillars for the "Why Hire Me" section
  pillars: [
    {
      title: "Agentic & RAG systems",
      body:
        "LangGraph + MCP agents, hybrid BM25 + dense retrieval with ColBERT rerank, RAGAS-evaluated in production at Cardinal Health.",
    },
    {
      title: "Fine-tuning & LLM serving",
      body:
        "LoRA/QLoRA on 7B SLMs hitting 98% field accuracy; vLLM + Triton with dynamic batching and FlashAttention at 8x throughput.",
    },
    {
      title: "Classical ML & Data Science",
      body:
        "GraphSAGE fraud detection, two-tower recommenders, LightGBM forecasting, SHAP explanations. Production DS across banking and healthcare.",
    },
    {
      title: "Measurable impact",
      body:
        "RAGAS, Langfuse, Promptfoo, A/B tests, causal inference. I ship rigorously evaluated systems, not demos.",
    },
  ],

  // Skills by category — renders as a grid of chip clusters
  skills: {
    "GenAI & LLM Systems": [
      "LangChain",
      "LangGraph",
      "MCP",
      "Multi-Agent Orchestration",
      "RAG",
      "GraphRAG",
      "Hybrid Retrieval",
      "ColBERT",
      "Cohere Rerank",
      "LoRA/QLoRA",
      "PEFT",
      "DPO",
      "GRPO",
      "DSPy",
      "Structured Outputs",
      "Guardrails",
    ],
    "Inference & Serving": [
      "vLLM",
      "NVIDIA Triton",
      "TensorRT-LLM",
      "FlashAttention",
      "KV-Cache",
      "Quantization",
      "ONNX",
      "Hugging Face",
    ],
    "ML / Deep Learning": [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "GraphSAGE",
      "TCN",
      "Two-Tower",
      "DeepFM",
      "FSDP",
      "DeepSpeed",
      "SHAP",
    ],
    "Evaluation & Experimentation": [
      "RAGAS",
      "Langfuse",
      "Promptfoo",
      "A/B Testing",
      "Power Analysis",
      "Causal Inference (DiD, PSM)",
      "Uplift Modeling",
      "Conformal Prediction",
    ],
    "MLOps & Cloud": [
      "MLflow",
      "Kubeflow",
      "Docker",
      "Kubernetes (EKS, AKS)",
      "AWS (SageMaker, Lambda, S3)",
      "Azure ML",
      "Vertex AI",
      "CI/CD",
      "Evidently",
      "Feast",
    ],
    "Data & Platform": [
      "Spark",
      "Kafka",
      "Airflow",
      "Snowflake",
      "Databricks",
      "Delta Lake",
      "FAISS",
      "Pinecone",
    ],
  },

  // Three positions — Cardinal Health + 2× TCS — each as a mini case study
  experience: [
    {
      company: "Cardinal Health",
      role: "ML Engineer",
      period: "Nov 2024 – Present",
      location: "Raleigh, NC",
      stack: [
        "LangGraph",
        "MCP",
        "RAG",
        "LoRA",
        "vLLM",
        "Triton",
        "AWS EKS",
        "MLflow",
      ],
      problem:
        "Analysts spent hours daily manually triaging regulatory recalls, shortage alerts, and clinical document extraction, with no scalable evaluation harness for the LLM systems replacing them.",
      solution:
        "Built an agentic LangGraph workflow with MCP tools, stateful routing, and human-in-the-loop guardrails for auto-triage. Paired it with a hybrid-retrieval RAG assistant (BM25 + dense + ColBERT rerank) evaluated with RAGAS, and LoRA-fine-tuned 7B SLMs for structured extraction.",
      bullets: [
        "Agentic compliance workflow on LangGraph with MCP tool integration: auto-triages recall/shortage events for same-day analyst response.",
        "Hybrid BM25 + dense retrieval with ColBERT reranking and RAGAS eval harness: **3× retrieval precision, 40% less analyst research time**.",
        "LoRA/QLoRA fine-tuning of 7B SLMs for clinical/regulatory extraction: **98% exact-match** with schema-validated JSON.",
        "MLOps on AWS EKS (MLflow + Evidently + CodePipeline): deploy time weeks to days, drift caught pre-prod.",
        "vLLM + Triton serving with dynamic batching + FlashAttention: **8× throughput, p95 <150ms**.",
        "Pharma demand forecasting on 2,000+ SKUs with LightGBM + temporal CV + uncertainty: **20% fewer stockouts**.",
      ],
      impact: [
        { metric: "retrieval precision", value: "3×" },
        { metric: "inference throughput", value: "8×" },
        { metric: "extraction accuracy", value: "98%" },
      ],
    },
    {
      company: "Tata Consultancy Services",
      role: "Data Scientist",
      period: "Jun 2022 – Jun 2023",
      location: "India",
      stack: [
        "BM25 + FAISS",
        "Transformers",
        "GraphSAGE",
        "XGBoost",
        "TCN",
        "AKS",
        "Azure Event Hubs",
      ],
      problem:
        "Enterprise banking client faced rising contact-center costs and fraud losses; manual triage and rules-based fraud detection couldn't keep up with volume.",
      solution:
        "Shipped a customer-facing conversational assistant combining intent classification, hybrid retrieval, and a fine-tuned transformer with confidence-based fallback. Built a fraud system pairing GraphSAGE embeddings on the transaction graph with XGBoost and a TCN for behavioral sequences.",
      bullets: [
        "Self-service banking assistant on AKS with hybrid BM25+FAISS + fine-tuned transformer, 200K+ interactions: **~55% containment, 40% cost reduction, 12% CSAT lift**.",
        "Fraud detection with GraphSAGE + XGBoost + TCN: **+4.5% precision @ 95% recall, 20% lower scoring latency** on Azure Event Hubs.",
        "A/B tests with power analysis and matched-cohort post-launch lift attribution: statistically defensible go/no-go decisions.",
      ],
      impact: [
        { metric: "containment", value: "55%" },
        { metric: "cost reduction", value: "40%" },
        { metric: "CSAT lift", value: "12%" },
      ],
    },
    {
      company: "Tata Consultancy Services",
      role: "Junior Data Scientist",
      period: "Jun 2021 – May 2022",
      location: "India",
      stack: [
        "Two-Tower",
        "DeepFM",
        "ANN",
        "LightGBM",
        "CatBoost",
        "SHAP",
        "Snowflake",
        "Power BI",
      ],
      problem:
        "Client needed personalized product recommendations and better credit-risk targeting, with explanations auditors and business stakeholders could trust.",
      solution:
        "Two-stage recommender (two-tower neural retrieval + DeepFM reranker) served via GraphQL for real-time approval decisions. Paired with LightGBM/CatBoost churn and default models with SHAP explanations surfaced in Power BI.",
      bullets: [
        "Two-stage recommender with two-tower retrieval + DeepFM reranker: **7–9% lift in approved applications**, A/B validated.",
        "Churn + loan-default models (LightGBM, CatBoost) with SHAP in Power BI: **4–6% churn reduction, 3–4% fewer high-risk approvals**.",
      ],
      impact: [
        { metric: "approval lift", value: "7–9%" },
        { metric: "churn reduction", value: "4–6%" },
      ],
    },
  ],

  education: [
    {
      school: "North Carolina State University",
      degree: "M.S. Computer Science, Data Science specialization",
      period: "Aug 2023 – May 2025",
    },
    {
      school: "GITAM University, India",
      degree: "B.Tech Electronics & Communication Engineering",
      period: "Jun 2017 – May 2021",
    },
  ],

  certifications: [
    {
      name: "AWS Certified Machine Learning Engineer – Associate",
      id: "MLA-C01",
      issuer: "Amazon Web Services",
    },
    {
      name: "Microsoft Certified: Azure Data Scientist Associate",
      id: "DP-100",
      issuer: "Microsoft",
    },
  ],

  // Model card — Hugging Face style profile card
  modelCard: {
    modelId: "sai-vikas-reddy/ai-ml-engineer",
    version: "3.0",
    description:
      "A production-grade AI/ML Engineer trained on real-world GenAI systems across healthcare and banking. Specializes in agentic RAG, LoRA fine-tuning, and sub-150ms LLM serving. Ships rigorously evaluated systems, not prototypes.",
    capabilities: [
      {
        title: "Agentic & RAG systems",
        detail: "LangGraph, MCP, hybrid BM25 + dense, ColBERT rerank, RAGAS",
      },
      {
        title: "Fine-tuning & LLM serving",
        detail: "LoRA/QLoRA on 7B SLMs · vLLM + Triton · FlashAttention",
      },
      {
        title: "Classical ML & Data Science",
        detail: "GraphSAGE, XGBoost, LightGBM, two-tower, SHAP, causal inference",
      },
      {
        title: "MLOps & Cloud",
        detail: "AWS EKS · MLflow · Evidently · CI/CD · drift detection",
      },
    ],
    evaluationResults: [
      { metric: "Retrieval precision", result: "3x improvement" },
      { metric: "Extraction accuracy", result: "98% exact-match" },
      { metric: "Inference throughput", result: "8x gain" },
      { metric: "p95 LLM latency", result: "< 150ms" },
      { metric: "Analyst time saved", result: "40%" },
      { metric: "Chatbot containment", result: "55%" },
      { metric: "Stockouts reduced", result: "20%" },
      { metric: "Approval lift (A/B)", result: "7 to 9%" },
    ],
    suitedFor: [
      "Teams shipping production ML, not running experiments",
      "Roles in RAG, fine-tuning, LLM serving, or MLOps",
      "Data Science and ML Engineer roles at mature companies",
      "Healthcare, banking, or regulated industry verticals",
      "Hybrid or remote roles based in the USA",
    ],
    knownConstraints: [
      "3+ years production depth, not 5+ years breadth",
      "Domain-trained in healthcare and banking",
      "Practitioner background, no academic publications",
    ],
    technicalSpecs: [
      { label: "Languages", value: "Python · TypeScript" },
      { label: "Frameworks", value: "PyTorch · LangChain · LangGraph · HuggingFace" },
      { label: "Infrastructure", value: "AWS · Azure · Kubernetes · Docker" },
      { label: "Observability", value: "MLflow · Langfuse · Evidently · Promptfoo" },
      { label: "Certifications", value: "AWS ML Engineer (MLA-C01) · Azure Data Scientist (DP-100)" },
    ],
  },

  // Projects you're building — shown on the site as a "Currently building" roadmap.
  // Add real projects to content/projects/*.md and this list as they ship.
  roadmap: [
    {
      title: "agentic-rag-lab",
      status: "in-progress" as const,
      description:
        "Open-source LangGraph multi-agent research assistant with MCP tools, hybrid retrieval, and a visible trace viewer.",
    },
    {
      title: "rag-eval-harness",
      status: "in-progress" as const,
      description:
        "Benchmark suite comparing naïve / hybrid / HyDE / rerank RAG strategies with RAGAS scorecards + cost/latency.",
    },
    {
      title: "lora-extractor",
      status: "planned" as const,
      description:
        "Upload a PDF, fine-tune a 7B SLM with LoRA, serve via vLLM. HF Space + full notebook.",
    },
  ],
} as const;
