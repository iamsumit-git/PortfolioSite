import { Button } from "@/components/ui/button";
import { ChevronDown, Rocket, Mail, Github, Linkedin, Twitter } from "lucide-react";
// Use a public asset path. Place your file at: client/public/images/sumitjpg.jpg
const myImage = "/images/sumitjpg.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="animate-fade-in">
          <img 
            src={myImage} 
            alt="Sumit Vijay - Professional headshot" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-8 shadow-2xl border-4 border-primary/20"
            data-testid="profile-image"
          />
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="hero-title">
            Hi, I'm <span className="text-primary">Sumit Vijay</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4" data-testid="hero-subtitle">
            Full Stack Developer & AI Engineer
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed" data-testid="hero-description">
          Passionate about crafting innovative solutions to enhance telecom services. Experienced in OSS/BSS Architecture, I thrive on tackling complex challenges to drive technological advancements. An AI enthusiast, I am committed to continuous learning and collaborative problem-solving. Let's connect and explore opportunities in the dynamic world of telecommunications and artificial intelligence!          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('projects')} 
              className="bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
              data-testid="button-view-projects"
            >
              <Rocket className="mr-2 h-4 w-4" />
              View My Projects
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection('contact')} 
              className="border border-border px-8 py-3 font-medium hover:bg-muted transition-all transform hover:scale-105"
              data-testid="button-contact"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              data-testid="link-github"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              data-testid="link-linkedin"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              data-testid="link-twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a 
              href="mailto:sumity.vijay@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              data-testid="link-email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-16 animate-bounce">
          <ChevronDown className="mx-auto h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
