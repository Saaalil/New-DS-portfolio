export interface Publication {
    id: string;
    title: string;
    venue: string;
    year: string;
    description: string;
    link?: string;
    type: "paper" | "certification" | "patent";
}

export const publications: Publication[] = [
    {
        id: "ieee-radar",
        title: "Deep Learning Architecture for Real-Time Radar Signal Classification",
        venue: "IEEE International Conference",
        year: "2024",
        description:
            "Published research on CNN-LSTM hybrid models for radar signal processing, demonstrating 96.5% classification accuracy with real-time inference capabilities for defense applications.",
        link: "https://ieeexplore.ieee.org/author/563939178770817",
        type: "paper",
    },
];

export const certifications: Publication[] = [
    {
        id: "aws-ml",
        title: "AWS Machine Learning Specialty",
        venue: "Amazon Web Services",
        year: "2024",
        description: "Professional certification in designing, implementing, and deploying ML solutions on AWS.",
        link: "https://drive.google.com/drive/folders/11mM61JJrnTjxopnkX_chje7SP_CGBirP",
        type: "certification",
    },
    {
        id: "tensorflow-dev",
        title: "TensorFlow Developer Certificate",
        venue: "Google",
        year: "2024",
        description: "Certification in building and training neural networks using TensorFlow for production deployment.",
        link: "https://drive.google.com/drive/folders/11mM61JJrnTjxopnkX_chje7SP_CGBirP",
        type: "certification",
    },
    {
        id: "data-science-ibm",
        title: "IBM Data Science Professional Certificate",
        venue: "IBM / Coursera",
        year: "2023",
        description: "Comprehensive certification covering data science methodology, Python, SQL, ML, and data visualization.",
        link: "https://drive.google.com/drive/folders/11mM61JJrnTjxopnkX_chje7SP_CGBirP",
        type: "certification",
    },
    {
        id: "deep-learning-specialization",
        title: "Deep Learning Specialization",
        venue: "DeepLearning.AI / Coursera",
        year: "2023",
        description: "Andrew Ng's specialization covering neural networks, CNNs, RNNs, transformers, and optimization strategies.",
        link: "https://drive.google.com/drive/folders/11mM61JJrnTjxopnkX_chje7SP_CGBirP",
        type: "certification",
    },
];

export const patents: Publication[] = [
    {
        id: "ai-market-patent",
        title: "An AI-Powered Market Simulation for Product-Centric Businesses",
        venue: "Patent Filed",
        year: "2024",
        description:
            "Analytics framework using SHAP-enhanced deep learning for demand prediction, enabling product-centric businesses to simulate market dynamics and optimize strategic decisions.",
        link: "https://drive.google.com/file/d/1Ny8n6XrBrdKiXDdod4XbfNVuZOZls0Ox/view?usp=sharing",
        type: "patent",
    },
];
