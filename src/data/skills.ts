export interface SkillCategory {
    id: string;
    title: string;
    icon: string;
    skills: string[];
}

export const skillCategories: SkillCategory[] = [
    {
        id: "aiml",
        title: "AI & Machine Learning",
        icon: "brain",
        skills: [
            "TensorFlow",
            "PyTorch",
            "Scikit-learn",
            "Deep Learning",
            "NLP",
            "Transformers",
            "Computer Vision",
            "Recommendation Systems",
            "XGBoost",
            "LightGBM",
            "MLflow",
            "MLOps",
        ],
    },
    {
        id: "analytics",
        title: "Data Science & Analytics",
        icon: "bar-chart",
        skills: [
            "Pandas",
            "NumPy",
            "Statistical Modeling",
            "Feature Engineering",
            "A/B Testing",
            "Time Series Analysis",
            "Data Visualization",
            "EDA",
            "Hypothesis Testing",
            "Causal Inference",
        ],
    },
    {
        id: "genai",
        title: "GenAI & LLMs",
        icon: "sparkles",
        skills: [
            "Janus",
            "Bifrost",
            "LangChain",
            "RAG",
            "Prompt Engineering",
            "Fine-Tuning",
            "HuggingFace",
            "OpenAI API",
            "Vector Databases",
        ],
    },
    {
        id: "cloud",
        title: "Cloud & Infrastructure",
        icon: "cloud",
        skills: [
            "Azure",
            "GCP",
            "AWS",
            "Databricks",
            "Docker",
            "Kubernetes",
            "Apache Airflow",
            "PySpark",
            "Hadoop",
            "CI/CD",
        ],
    },
    {
        id: "languages",
        title: "Programming & Tools",
        icon: "code",
        skills: [
            "Python",
            "SQL",
            "R",
            "JavaScript",
            "C++",
            "Git / GitHub",
            "Jupyter",
            "VS Code",
            "Linux / Bash",
        ],
    },
    {
        id: "tools",
        title: "BI & Visualization",
        icon: "layout-dashboard",
        skills: [
            "Tableau",
            "Power BI",
            "Matplotlib",
            "Seaborn",
            "Plotly",
            "Excel Advanced",
            "Streamlit",
            "Dash",
        ],
    },
];
