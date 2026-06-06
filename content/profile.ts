// Single source of truth for all structured data on the site.
// Edit this file to update name, experience, skills, metrics, etc.
// After editing resume.md, run `pnpm ingest` to update the RAG chatbot.

export const profile = {
  name: "Sai Vikas Reddy Yeddulamala",
  shortName: "Sai Vikas",
  role: "AI / ML Engineer",
  location: "Raleigh, NC",
  email: "saivikasreddy717@gmail.com",
  phone: "+1 919-672-0116",
  github: "https://github.com/saivikasreddy717",
  linkedin: "https://www.linkedin.com/in/saivikasy/",
  resumePdf: "/resume.pdf",
  availability:
    "Open to: AI Engineer · ML Engineer · LLM Engineer · Generative AI Engineer · Applied AI Engineer · Forward Deployed Engineer",

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
      body: "LangGraph + MCP agents, hybrid BM25 + dense retrieval with ColBERT rerank, RAGAS-evaluated in production at Cardinal Health.",
    },
    {
      title: "Fine-tuning & LLM serving",
      body: "LoRA/QLoRA on 7B SLMs hitting 98% field accuracy; vLLM + Triton with dynamic batching and FlashAttention at 8x throughput.",
    },
    {
      title: "Classical ML & Data Science",
      body: "GraphSAGE fraud detection, two-tower recommenders, LightGBM forecasting, SHAP explanations. Production DS across banking and healthcare.",
    },
    {
      title: "Client-Facing Delivery & Integration",
      body: "Consulting background at TCS delivering directly into client environments. Scope ambiguous problems, integrate AI into existing systems via APIs and MCP tools, prototype fast, and drive adoption. Comfortable with regulated environments (healthcare, banking) and non-technical stakeholders.",
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
    "Full-Stack & Integration": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "REST & API Design",
      "gRPC",
      "Git",
      "Webhooks",
      "Docker",
      "Kubernetes",
    ],
    "Delivery & Collaboration": [
      "Customer & Stakeholder Scoping",
      "Solution Design",
      "Rapid Prototyping",
      "Production Delivery",
      "Cross-functional Communication",
      "Regulated Environments (Healthcare, Banking)",
    ],
  },

  // Three positions — Cardinal Health + 2x TCS — each as a mini case study
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
        "LoRA/QLoRA",
        "vLLM",
        "Triton",
        "React",
        "Next.js",
        "FastAPI",
        "AWS EKS",
        "MLflow",
        "LightGBM",
      ],
      problem:
        "Analysts spent hours daily manually triaging regulatory recalls, shortage alerts, and clinical document extraction, with no scalable evaluation harness for the LLM systems replacing them.",
      solution:
        "Built an agentic LangGraph workflow with MCP tools, stateful routing, and human-in-the-loop guardrails for auto-triage. Paired it with a hybrid-retrieval RAG assistant (BM25 + dense + ColBERT rerank) evaluated with RAGAS, and LoRA-fine-tuned 7B SLMs for structured extraction.",
      bullets: [
        "Designed and shipped a production agentic compliance workflow on LangGraph with MCP tool integration, stateful routing, and human-in-the-loop guardrails, auto-triaging ~300 alerts/day, auto-resolving 60% without analyst review, and cutting triage time to same-day.",
        "Built a compliance-grade RAG research assistant (hybrid BM25 + dense retrieval, knowledge-graph lookup, ColBERT reranking) governed by a RAGAS evaluation harness, raising retrieval precision **3x** and cutting analyst research time **40%**.",
        "Fine-tuned 7B-parameter SLMs with LoRA/QLoRA for structured extraction from clinical and regulatory documents, reaching **98% exact-match** with schema-validated JSON and human-in-the-loop review across ~10K documents/month.",
        "Optimized LLM inference with vLLM and NVIDIA Triton using dynamic batching and FlashAttention, raising throughput **8x**, holding p95 latency under **150ms**, and cutting GPU serving cost ~60%.",
        "Built React and Next.js front-ends on FastAPI back-ends so analysts could use deployed AI tools directly, turning back-end models into self-serve products and driving adoption through rapid, feedback-driven iteration.",
        "Owned LLMOps tooling on AWS EKS: MLflow, Docker, CodePipeline CI/CD, Evidently quality monitoring; cut deployment time from weeks to days across 5+ LLM services.",
        "Built a pharmaceutical demand forecasting model (LightGBM, temporal cross-validation, conformal prediction intervals) across 2,000+ SKUs; improved WAPE ~15% and reduced stockouts **20%**.",
        "Segmented SKU portfolio by demand volatility and lifecycle stage for tiered forecasting policies, lifting accuracy on long-tail items ~10%.",
        "Translated forecast outputs into safety-stock and reorder-point recommendations, partnering with planning teams to improve on-time product availability ~5% and reducing excess inventory ~10%.",
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
        "Built an NLP document-intelligence pipeline for onboarding and KYC (fine-tuned BERT + FAISS similarity matching), cutting manual handling time ~35% across ~2,000 documents/day and reducing data-entry errors 40%.",
        "Rapidly prototyped and delivered a collections-prioritization tool for the client in under ~4 weeks, proving value fast and expanding the engagement into additional risk and analytics use cases.",
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
      {
        title: "Client-Facing Delivery & Integration",
        detail: "Consulting background · API and MCP integration · Rapid prototyping · Regulated environments",
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
      "Forward Deployed Engineer roles: client-facing AI deployment in enterprise and regulated environments",
    ],
    knownConstraints: [
      "Depth over breadth: production systems, not resume padding",
      "Deep domain context in healthcare and banking",
      "US-based roles only, hybrid or remote",
    ],
    technicalSpecs: [
      { label: "Languages", value: "Python · TypeScript · JavaScript" },
      { label: "Frameworks", value: "PyTorch · LangChain · LangGraph · HuggingFace" },
      { label: "Infrastructure", value: "AWS · Azure · Kubernetes · Docker" },
      { label: "Observability", value: "MLflow · Langfuse · Evidently · Promptfoo" },
      { label: "Certifications", value: "AWS ML Engineer (MLA-C01) · Azure Data Scientist (DP-100)" },
    ],
  },

  // Personal projects — shown on the site as a "Currently building" roadmap.
  roadmap: [
    {
      title: "voyager",
      status: "in-progress" as const,
      description:
        "Full-stack AI travel planner where a LangGraph agent builds multi-day itineraries from a natural-language request by calling flight, hotel, places, and weather APIs, refined through chat and rendered as an interactive map and itinerary in a React/Next.js dashboard. Containerized with Docker.",
      github: "https://github.com/saivikasreddy717/voyager",
      tags: ["React", "Next.js", "FastAPI", "LangGraph", "Tool Calling", "Docker"],
    },
    {
      title: "agentic-rag-lab",
      status: "in-progress" as const,
      description:
        "Open-source LangGraph multi-agent research assistant with MCP tools, hybrid retrieval, and a visible trace viewer.",
      github: "https://github.com/saivikasreddy717/agentic-rag-lab",
      tags: ["LangGraph", "MCP", "RAG", "Python"],
    },
    {
      title: "rag-eval-harness",
      status: "in-progress" as const,
      description:
        "Benchmark suite comparing naïve / hybrid / HyDE / rerank RAG strategies with RAGAS scorecards + cost/latency.",
      github: "https://github.com/saivikasreddy717/rag-eval-harness",
      tags: ["RAGAS", "RAG", "Python", "Benchmarking"],
    },
    {
      title: "lora-extractor",
      status: "planned" as const,
      description:
        "Upload a PDF, fine-tune a 7B SLM with LoRA, serve via vLLM. HF Space + full notebook.",
      github: "https://github.com/saivikasreddy717/lora-extractor",
      tags: ["LoRA", "vLLM", "HuggingFace", "Python"],
    },
  ],
} as const;
