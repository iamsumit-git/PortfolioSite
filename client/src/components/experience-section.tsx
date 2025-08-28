import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight } from "lucide-react";
import type { Experience } from "@shared/schema";

const ExperienceSection = () => {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['/api/experiences'],
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="animate-pulse">Loading experience...</div>
          </div>
        </div>
      </section>
    );
  }

  // Sort experiences by start date (most recent first)
  const sortedExperiences = experiences.sort((a: Experience, b: Experience) => {
    const aYear = parseInt(a.startDate);
    const bYear = parseInt(b.startDate);
    return bYear - aYear;
  });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="experience-title">Experience & Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-border"></div>
          
          <div className="space-y-12">
            {sortedExperiences.map((experience: Experience, index: number) => (
              <div key={experience.id} className="timeline-item relative" data-testid={`experience-${index}`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-background z-10"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:pl-8 lg:order-2'}`}>
                    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                      <div className="flex flex-col lg:items-start mb-4">
                        <h3 className="text-xl font-semibold" data-testid={`experience-title-${index}`}>{experience.title}</h3>
                        <p className="text-primary font-medium" data-testid={`experience-company-${index}`}>{experience.company}</p>
                        {experience.location && (
                          <p className="text-sm text-muted-foreground" data-testid={`experience-location-${index}`}>{experience.location}</p>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span data-testid={`experience-dates-${index}`}>
                            {experience.startDate} - {experience.endDate || 'Present'}
                          </span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 text-muted-foreground mb-4">
                        {experience.description.map((item, descIndex) => (
                          <li key={descIndex} className="flex items-start space-x-2" data-testid={`experience-desc-${index}-${descIndex}`}>
                            <ChevronRight className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {experience.technologies && experience.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs" data-testid={`experience-tech-${index}-${techIndex}`}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
