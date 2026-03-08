export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    techStack: string[];
    type: "work" | "education";
}

export const experiences: Experience[] = [
    {
        id: "myntra",
        role: "Data Science Intern",
        company: "Myntra (Flipkart Group)",
        location: "Bangalore, India",
        period: "Jan 2026 – Present",
        description:
            "Working on large-scale recommendation systems and customer analytics for India's leading fashion e-commerce platform.",
        achievements: [
            "Building ML models for personalized product recommendations serving 50M+ users",
            "Developing customer segmentation pipelines using clustering and behavioral analytics",
            "Optimizing search relevance algorithms with NLP and deep learning techniques",
            "Collaborating with cross-functional teams on A/B testing frameworks for model evaluation",
        ],
        techStack: ["Python", "PySpark", "TensorFlow", "SQL", "Hive", "Airflow"],
        type: "work",
    },
    {
        id: "irillic",
        role: "Software Intern",
        company: "Irillic Private Limited",
        location: "Bengaluru, India",
        period: "Jun 2025 – Aug 2025",
        description:
            "Developed enterprise analytics solutions and ML-driven business intelligence dashboards.",
        achievements: [
            "Built predictive analytics models for customer churn prediction with 89% accuracy",
            "Designed automated reporting pipelines reducing manual effort by 60%",
            "Implemented NLP-based sentiment analysis for customer feedback processing",
        ],
        techStack: ["Python", "Scikit-learn", "Power BI", "SQL", "Pandas"],
        type: "work",
    },
    {
        id: "drdo",
        role: "Machine Learning Research Intern",
        company: "DRDO (Defence R&D Organisation)",
        location: "India",
        period: "Jun 2024 – Aug 2024",
        description:
            "Conducted ML research for defense applications, focusing on signal processing and classification systems.",
        achievements: [
            "Developed deep learning models for radar signal classification achieving 96.5% accuracy",
            "Optimized model inference for real-time deployment on edge devices",
            "Published research findings in IEEE conference proceedings",
        ],
        techStack: ["Python", "TensorFlow", "CUDA", "NumPy", "OpenCV"],
        type: "work",
    },
    {
        id: "hcl",
        role: "Data Analytics Intern",
        company: "HCL Technologies",
        location: "India",
        period: "Jul 2023 – Aug 2023",
        description:
            "Supported enterprise data analytics initiatives and built automated data processing workflows.",
        achievements: [
            "Developed ETL pipelines processing 1M+ records daily for business reporting",
            "Created interactive dashboards in Tableau for executive decision-making",
            "Automated data quality checks reducing data errors by 45%",
        ],
        techStack: ["Python", "SQL", "Tableau", "Excel", "ETL"],
        type: "work",
    },
];

export const education: Experience[] = [
    {
        id: "muj",
        role: "B.Tech (Hons) — CSE (IoT & Information Security)",
        company: "Manipal University Jaipur",
        location: "Jaipur, RJ",
        period: "2022 – 2026 (Expected)",
        description:
            "Specialization in Internet of Things and Information Security with focus on embedded systems and cybersecurity research.",
        achievements: [
            "CGPA: 9.2 / 10",
            "Student Placement Coordinator — DCRP, MUJ",
            "Managing Director — Cyber Space Club (60+ team, 500+ members)",
            "Published 2 research papers in IoT security and AI simulation",
        ],
        techStack: [],
        type: "education",
    },
];
