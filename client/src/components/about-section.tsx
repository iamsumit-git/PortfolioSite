import { Code, Users, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  const stats = [
    { icon: Code, label: "5+ Years Experience", value: "5+" },
    { icon: Users, label: "50+ Projects Completed", value: "50+" },
    { icon: Brain, label: "AI Solutions Expert", value: "AI" },
  ];

  const skillCategories = [
    {
      title: "Frontend",
      color: "text-blue-500",
      skills: [
        { name: "React", icon: "fab fa-react", color: "text-blue-500" },
        { name: "JavaScript", icon: "fab fa-js", color: "text-yellow-500" },
        { name: "HTML5", icon: "fab fa-html5", color: "text-orange-500" },
        { name: "CSS3", icon: "fab fa-css3-alt", color: "text-blue-600" },
        { name: "Tailwind", icon: "fas fa-wind", color: "text-cyan-500" },
        { name: "Next.js", icon: "fab fa-node-js", color: "text-green-600" },
      ]
    },
    {
      title: "Backend & AI",
      color: "text-green-500",
      skills: [
        { name: "Python", icon: "fab fa-python", color: "text-yellow-600" },
        { name: "Java", icon: "fab fa-java", color: "text-red-600" },
        { name: "SQL", icon: "fas fa-database", color: "text-blue-700" },
        { name: "Docker", icon: "fab fa-docker", color: "text-blue-600" },
        { name: "LangChain", icon: "fas fa-robot", color: "text-purple-600" },
        { name: "OpenAI", icon: "fas fa-brain", color: "text-pink-600" },
      ]
    },
    {
      title: "Tools & Platforms",
      color: "text-purple-500",
      skills: [
        { name: "Git", icon: "fab fa-git-alt", color: "text-orange-600" },
        { name: "AWS", icon: "fab fa-aws", color: "text-yellow-600" },
        { name: "GitHub", icon: "fab fa-github", color: "text-gray-600" },
        { name: "Firebase", icon: "fas fa-fire", color: "text-orange-500" },
        { name: "MongoDB", icon: "fas fa-leaf", color: "text-green-600" },
        { name: "REST API", icon: "fas fa-cogs", color: "text-gray-600" },
      ]
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="about-title">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4" data-testid="about-subtitle">sv</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="about-description-1">
            With over 5 years of experience in software development, I've evolved from a traditional full-stack developer 
              to an AI-focused engineer. My journey started with Java and Python backends, expanded into modern React frontends, 
              and now encompasses cutting-edge AI and machine learning technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="about-description-2">
            I specialize in building AI-powered applications that bridge the gap between complex algorithms and intuitive user experiences. 
              Whether it's creating intelligent agents, developing RAG systems, or building scalable web applications, 
              I'm passionate about leveraging technology to create meaningful solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2 bg-card border border-border px-4 py-2 rounded-lg" data-testid={`stat-${index}`}>
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6" data-testid="skills-title">Skills & Technologies</h3>
            
            <div className="space-y-8">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h4 className={`text-lg font-medium mb-4 ${category.color}`} data-testid={`skill-category-${categoryIndex}`}>
                    {category.title}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="skill-icon flex flex-col items-center p-3 bg-card border border-border rounded-lg hover:transform hover:scale-110 transition-all duration-300" data-testid={`skill-${categoryIndex}-${skillIndex}`}>
                        <i className={`${skill.icon} text-2xl ${skill.color} mb-2`}></i>
                        <span className="text-xs font-medium text-center">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
