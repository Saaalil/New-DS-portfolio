export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  live?: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "radar-ml",
    title: "ML Implementation for Radar Receiver",
    summary:
      "Built a deep learning architecture for real-time radar signal classification in defense systems, achieving mission-critical accuracy thresholds.",
    problem:
      "Traditional radar signal processing relied on static rule-based systems, leading to high false-positive rates and inability to adapt to evolving electromagnetic environments.",
    approach:
      "Designed a CNN-LSTM hybrid architecture for sequential signal classification, implemented real-time inference pipeline with optimized TensorRT deployment, and trained on 50K+ labeled radar signal samples.",
    outcome:
      "Achieved 96.5% classification accuracy with <50ms inference latency, deployed in production defense systems processing 1000+ signals/second.",
    techStack: ["Python", "TensorFlow", "CUDA", "TensorRT", "NumPy", "Scikit-learn"],
    metrics: [
      { label: "Accuracy", value: "96.5%" },
      { label: "Latency", value: "<50ms" },
      { label: "Signals/sec", value: "1000+" },
    ],
    github: "https://github.com/Saaalil/Advanced-Flight-Radar-reciver-tool-ML-",
    image: "/projects/radar.jpg",
    featured: true,
  },
  {
    id: "medicure-ai",
    title: "MediCure — AI Health Companion",
    summary:
      "Full-stack AI-powered healthcare platform providing symptom analysis, medication recommendations, and health monitoring dashboards.",
    problem:
      "Healthcare facilities face overwhelming patient loads for routine consultations, with long wait times and overburdened medical staff for non-critical inquiries.",
    approach:
      "Built an NLP-driven symptom analysis engine using transformer models, integrated with a knowledge graph of 10K+ medical conditions, and developed an intuitive React dashboard for patient interaction.",
    outcome:
      "Reduced preliminary consultation load by 35%, serving 500+ daily active users with 92% symptom-match accuracy validated by medical professionals.",
    techStack: ["Python", "Flask", "React", "NLP", "Transformers", "MongoDB", "Docker"],
    metrics: [
      { label: "Load Reduction", value: "35%" },
      { label: "Match Accuracy", value: "92%" },
      { label: "Daily Users", value: "500+" },
    ],
    github: "https://github.com/Saaalil/MediCure",
    image: "/projects/medicure.jpg",
    featured: true,
  },
  {
    id: "sales-forecasting",
    title: "AI Analytics Engine for Sales Forecasting",
    summary:
      "Enterprise-grade ML pipeline for multi-horizon sales prediction with automated feature engineering and model selection.",
    problem:
      "Enterprise sales teams relied on manual forecasting with spreadsheets, resulting in 30-40% forecast errors and poor inventory planning decisions.",
    approach:
      "Engineered an automated ML pipeline with time-series decomposition, ARIMA/Prophet ensemble models, and XGBoost for feature-rich forecasting. Built interactive Tableau dashboards for stakeholder consumption.",
    outcome:
      "Achieved R² of 0.94 on 90-day forecasts, reducing forecast error from 35% to 8%.",
    techStack: ["Python", "XGBoost", "Prophet", "ARIMA", "Tableau", "SQL", "Airflow"],
    metrics: [
      { label: "R² Score", value: "0.94" },
      { label: "Error Reduction", value: "35%→8%" },
    ],
    github: "https://github.com/Saaalil",
    image: "/projects/sales.jpg",
    featured: true,
  },
  {
    id: "blockchain-iot",
    title: "Blockchain-Secured IoT Communication",
    summary:
      "Decentralized security framework for IoT device networks using blockchain consensus and ML-based anomaly detection.",
    problem:
      "IoT networks face critical security vulnerabilities with 70% of devices lacking encryption, enabling man-in-the-middle attacks and data tampering in industrial settings.",
    approach:
      "Implemented a lightweight blockchain consensus protocol optimized for IoT resource constraints, paired with an LSTM-based anomaly detection system monitoring network traffic patterns in real-time.",
    outcome:
      "Achieved 99.2% anomaly detection rate with 0.1% false positives, securing communications across 200+ IoT nodes with <5% computational overhead.",
    techStack: ["Python", "Solidity", "LSTM", "MQTT", "Raspberry Pi", "Docker"],
    metrics: [
      { label: "Detection Rate", value: "99.2%" },
      { label: "False Positives", value: "0.1%" },
      { label: "Nodes Secured", value: "200+" },
    ],
    github: "https://github.com/Saaalil",
    image: "/projects/blockchain.jpg",
    featured: true,
  },
];
