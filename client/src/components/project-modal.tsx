import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X, Check } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid={`project-modal-${project.id}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2" data-testid={`modal-title-${project.id}`}>
            {project.title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" data-testid={`modal-tag-${project.id}-${index}`}>
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        {/* Project Image */}
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={`${project.title} interface`}
            className="w-full h-64 object-cover rounded-lg mb-6"
            data-testid={`modal-image-${project.id}`}
          />
        )}
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3" data-testid={`modal-overview-title-${project.id}`}>Project Overview</h4>
            <p className="text-muted-foreground leading-relaxed" data-testid={`modal-overview-description-${project.id}`}>
              {project.longDescription || project.description}
            </p>
          </div>
          
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3" data-testid={`modal-features-title-${project.id}`}>Key Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2" data-testid={`modal-feature-${project.id}-${index}`}>
                    <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold mb-3" data-testid={`modal-tech-title-${project.id}`}>Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, index) => (
                <Badge key={index} variant="outline" data-testid={`modal-tech-${project.id}-${index}`}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {project.githubUrl && (
              <Button asChild variant="default" data-testid={`modal-github-${project.id}`}>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild variant="outline" data-testid={`modal-demo-${project.id}`}>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
