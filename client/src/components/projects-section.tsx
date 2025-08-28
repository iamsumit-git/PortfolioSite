import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Briefcase, Database, FileCode, Heart, Plus } from "lucide-react";
import ProjectModal from "./project-modal";
import type { Project } from "@shared/schema";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: aiProjects = [], isLoading: loadingAI } = useQuery({
    queryKey: ['/api/projects/category/ai'],
  });

  const { data: webProjects = [], isLoading: loadingWeb } = useQuery({
    queryKey: ['/api/projects/category/web'],
  });

  const getProjectIcon = (title: string) => {
    if (title.includes("Job")) return Briefcase;
    if (title.includes("Knowledge") || title.includes("SQL")) return Database;
    if (title.includes("Documentation")) return FileCode;
    if (title.includes("Diet") || title.includes("Health")) return Heart;
    return Database;
  };

  const getProjectIconColor = (title: string) => {
    if (title.includes("Job")) return "text-blue-600";
    if (title.includes("Knowledge")) return "text-purple-600";
    if (title.includes("Documentation")) return "text-green-600";
    if (title.includes("SQL")) return "text-cyan-600";
    if (title.includes("Diet")) return "text-pink-600";
    return "text-gray-600";
  };

  const ProjectCard = ({ project, category }: { project: Project; category: string }) => {
    const Icon = getProjectIcon(project.title);
    const iconColor = getProjectIconColor(project.title);

    return (
      <div 
        className="project-card bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        onClick={() => setSelectedProject(project)}
        data-testid={`project-card-${project.id}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className={`${iconColor} text-xl w-6 h-6`} />
          </div>
          <div className="flex space-x-2">
            {project.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs" data-testid={`project-tag-${project.id}-${index}`}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <h4 className="text-xl font-semibold mb-3" data-testid={`project-title-${project.id}`}>{project.title}</h4>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <i key={index} className={`text-lg ${getTechIcon(tech)} ${getTechColor(tech)}`} data-testid={`project-tech-${project.id}-${index}`}></i>
            ))}
          </div>
          <div className="text-primary font-medium text-sm flex items-center">
            Learn More <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </div>
      </div>
    );
  };

  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case 'python': return 'fab fa-python';
      case 'react': return 'fab fa-react';
      case 'node.js': return 'fab fa-node-js';
      case 'javascript': return 'fab fa-js';
      case 'java': return 'fab fa-java';
      case 'docker': return 'fab fa-docker';
      case 'aws': return 'fab fa-aws';
      case 'github': return 'fab fa-github';
      default: return 'fas fa-code';
    }
  };

  const getTechColor = (tech: string) => {
    switch (tech.toLowerCase()) {
      case 'python': return 'text-yellow-600';
      case 'react': return 'text-blue-500';
      case 'node.js': return 'text-green-600';
      case 'javascript': return 'text-yellow-500';
      case 'java': return 'text-red-600';
      case 'docker': return 'text-blue-600';
      case 'aws': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (loadingAI || loadingWeb) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="projects-title">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="projects-description">
            Here are some of my recent projects, with a special focus on AI-powered applications and intelligent agents.
          </p>
        </div>

        {/* AI Projects Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center" data-testid="ai-projects-title">
            <Database className="inline mr-3 text-primary" />
            AI-Powered Solutions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} category="ai" />
            ))}
            
            {/* Placeholder for additional projects */}
            <div className="project-card bg-card border border-border rounded-xl p-6 shadow-lg opacity-60" data-testid="placeholder-ai-project">
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center">
                  <Plus className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">More Projects Coming</h4>
                  <p className="text-muted-foreground text-sm">Working on exciting new AI solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Web Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center" data-testid="web-projects-title">
            <i className="fas fa-globe text-primary mr-3"></i>
            Web Applications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} category="web" />
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
