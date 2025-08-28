import { type User, type InsertUser, type Project, type InsertProject, type Experience, type InsertExperience, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Experiences
  getExperiences(): Promise<Experience[]>;
  getExperiencesByType(type: string): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  // Contact submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private experiences: Map<string, Experience>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.experiences = new Map();
    this.contactSubmissions = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // AI Projects
    const aiProjects: Omit<Project, 'id'>[] = [
      {
        title: "Job Application Assistant Agent",
        description: "AI-powered agent that automates job applications by analyzing job descriptions, customizing resumes, and generating personalized cover letters.",
        longDescription: "An intelligent AI agent that revolutionizes the job application process by automating resume customization, cover letter generation, and application tracking. The system analyzes job descriptions using NLP techniques and matches candidate skills with requirements to create tailored applications.",
        category: "ai",
        technologies: ["Python", "LangChain", "OpenAI GPT", "FastAPI", "SQLAlchemy"],
        features: [
          "Automated resume customization based on job requirements",
          "AI-powered cover letter generation with company research",
          "Application tracking and follow-up scheduling",
          "Skills gap analysis and recommendations"
        ],
        tags: ["AI Agent", "Python", "LangChain"],
        githubUrl: "https://github.com/alexjohnson/job-assistant",
        demoUrl: "https://job-assistant-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "true",
        createdAt: new Date()
      },
      {
        title: "Super Knowledge Agent",
        description: "Advanced RAG system connecting 5000+ data sources with intelligent retrieval, semantic search, and context-aware responses.",
        longDescription: "A comprehensive RAG (Retrieval-Augmented Generation) system that connects to over 5000 data sources, providing intelligent information retrieval with semantic search capabilities and context-aware responses for enterprise knowledge management.",
        category: "ai",
        technologies: ["Python", "Vector Database", "Semantic Search", "RAG", "LangChain"],
        features: [
          "5000+ data source connectivity",
          "Advanced semantic search capabilities",
          "Context-aware response generation",
          "Enterprise-grade knowledge management"
        ],
        tags: ["RAG System", "Vector DB"],
        githubUrl: "https://github.com/alexjohnson/super-knowledge",
        demoUrl: "https://knowledge-agent-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "true",
        createdAt: new Date()
      },
      {
        title: "Code-to-Documentation Agent",
        description: "Automated documentation generator that analyzes codebases and creates comprehensive technical documentation with examples and diagrams.",
        longDescription: "An intelligent documentation generation system that automatically analyzes code repositories and creates comprehensive technical documentation, including API references, code examples, and architectural diagrams.",
        category: "ai",
        technologies: ["Python", "AST Analysis", "OpenAI", "Documentation Generation"],
        features: [
          "Automated codebase analysis",
          "Comprehensive documentation generation",
          "API reference creation",
          "Architectural diagram generation"
        ],
        tags: ["Code Analysis", "Auto-Gen"],
        githubUrl: "https://github.com/alexjohnson/doc-agent",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "true",
        createdAt: new Date()
      },
      {
        title: "SQL Query Assistant",
        description: "Open-source natural language to SQL converter using OSS Granite models, making database queries accessible to non-technical users.",
        longDescription: "A natural language to SQL conversion system built with open-source Granite models, enabling non-technical users to query databases using plain English while maintaining data security and accuracy.",
        category: "ai",
        technologies: ["Python", "Granite Models", "NL2SQL", "Database Integration"],
        features: [
          "Natural language to SQL conversion",
          "Support for multiple database types",
          "Query optimization suggestions",
          "Non-technical user friendly interface"
        ],
        tags: ["NL2SQL", "OSS"],
        githubUrl: "https://github.com/alexjohnson/sql-assistant",
        demoUrl: "https://sql-assistant-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "true",
        createdAt: new Date()
      },
      {
        title: "Dialysis Diet Planner",
        description: "AI-powered health application that creates personalized meal plans for dialysis patients, considering dietary restrictions and nutritional requirements.",
        longDescription: "A specialized healthcare AI application that generates personalized meal plans for dialysis patients, taking into account specific dietary restrictions, nutritional requirements, and medical conditions to improve patient outcomes.",
        category: "ai",
        technologies: ["React", "Python", "Healthcare AI", "Nutrition Database"],
        features: [
          "Personalized meal plan generation",
          "Dietary restriction compliance",
          "Nutritional requirement tracking",
          "Medical condition considerations"
        ],
        tags: ["HealthTech", "AI"],
        githubUrl: "https://github.com/alexjohnson/dialysis-planner",
        demoUrl: "https://dialysis-planner-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "true",
        createdAt: new Date()
      }
    ];

    // Web Projects
    const webProjects: Omit<Project, 'id'>[] = [
      {
        title: "Modern E-commerce Platform",
        description: "Full-featured e-commerce solution with React frontend, Node.js backend, payment integration, and advanced admin dashboard.",
        longDescription: "A complete e-commerce platform featuring modern React frontend, robust Node.js backend, secure payment processing, inventory management, and comprehensive admin dashboard for business management.",
        category: "web",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
        features: [
          "Complete e-commerce functionality",
          "Secure payment processing",
          "Inventory management system",
          "Advanced admin dashboard"
        ],
        tags: ["E-commerce", "Full Stack"],
        githubUrl: "https://github.com/alexjohnson/ecommerce-platform",
        demoUrl: "https://ecommerce-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "false",
        createdAt: new Date()
      },
      {
        title: "Task Management System",
        description: "Collaborative task management platform with real-time updates, team collaboration features, and advanced project tracking.",
        longDescription: "A comprehensive project and task management platform designed for teams, featuring real-time collaboration, advanced project tracking, time management, and productivity analytics.",
        category: "web",
        technologies: ["React", "Socket.io", "Express", "MongoDB", "WebRTC"],
        features: [
          "Real-time collaboration",
          "Advanced project tracking",
          "Team management tools",
          "Productivity analytics"
        ],
        tags: ["Productivity", "Real-time"],
        githubUrl: "https://github.com/alexjohnson/task-manager",
        demoUrl: "https://task-manager-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "false",
        createdAt: new Date()
      },
      {
        title: "Data Analytics Dashboard",
        description: "Interactive dashboard for data visualization with advanced filtering, real-time metrics, and customizable reporting features.",
        longDescription: "A powerful data analytics and visualization platform that provides interactive dashboards, real-time metrics tracking, advanced filtering capabilities, and customizable reporting for business intelligence.",
        category: "web",
        technologies: ["React", "D3.js", "Python", "FastAPI", "ClickHouse"],
        features: [
          "Interactive data visualization",
          "Real-time metrics tracking",
          "Advanced filtering system",
          "Customizable reporting"
        ],
        tags: ["Analytics", "Data Viz"],
        githubUrl: "https://github.com/alexjohnson/analytics-dashboard",
        demoUrl: "https://analytics-demo.com",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        featured: "false",
        createdAt: new Date()
      }
    ];

    // Add projects to storage
    [...aiProjects, ...webProjects].forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { ...project, id });
    });

    // Add experiences
    const experiences: Omit<Experience, 'id'>[] = [
      {
        title: "Senior AI Engineer",
        company: "TechCorp Solutions",
        location: "San Francisco, CA",
        startDate: "2022",
        endDate: null,
        description: [
          "Led development of 5 AI-powered applications serving 10,000+ users",
          "Implemented RAG systems and intelligent agents using LangChain and OpenAI",
          "Mentored junior developers and established AI development best practices"
        ],
        technologies: ["Python", "LangChain", "React", "AWS"],
        type: "work"
      },
      {
        title: "Full Stack Developer",
        company: "InnovateLabs",
        location: "San Francisco, CA",
        startDate: "2020",
        endDate: "2022",
        description: [
          "Developed and maintained 15+ web applications using React and Node.js",
          "Designed and implemented RESTful APIs serving millions of requests daily",
          "Optimized application performance resulting in 40% faster load times"
        ],
        technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
        type: "work"
      },
      {
        title: "Software Developer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        startDate: "2019",
        endDate: "2020",
        description: [
          "Built core features for SaaS platform used by 1000+ businesses",
          "Collaborated with design team to implement pixel-perfect UIs",
          "Participated in agile development process and code reviews"
        ],
        technologies: ["Java", "Spring Boot", "JavaScript", "MySQL"],
        type: "work"
      },
      {
        title: "Master of Science in Computer Science",
        company: "University of Technology",
        location: "California",
        startDate: "2017",
        endDate: "2019",
        description: [
          "Specialized in Machine Learning and Artificial Intelligence",
          "Thesis: \"Natural Language Processing for Code Documentation Generation\"",
          "GPA: 3.8/4.0, Dean's List recognition"
        ],
        technologies: [],
        type: "education"
      }
    ];

    experiences.forEach(experience => {
      const id = randomUUID();
      this.experiences.set(id, { ...experience, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.category === category
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.featured === "true"
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date() 
    };
    this.projects.set(id, project);
    return project;
  }

  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperiencesByType(type: string): Promise<Experience[]> {
    return Array.from(this.experiences.values()).filter(
      experience => experience.type === type
    );
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = randomUUID();
    const experience: Experience = { ...insertExperience, id };
    this.experiences.set(id, experience);
    return experience;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
