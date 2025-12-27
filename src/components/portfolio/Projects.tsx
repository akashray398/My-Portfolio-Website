import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  status?: "completed" | "in-progress" | "upcoming";
}

const projectEmojis: Record<string, string> = {
  "Room Finder": "🏠",
  "TOMATO": "🍕",
  "Coffee": "☕",
  "Battery": "🔋",
  "E-Commerce": "🛒",
  "default": "💻"
};

const getProjectStatus = (title: string): "completed" | "in-progress" | "upcoming" => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("coffee")) return "in-progress";
  if (lowerTitle.includes("e-commerce")) return "upcoming";
  return "completed";
};

const getProjectEmoji = (title: string): string => {
  for (const [key, emoji] of Object.entries(projectEmojis)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return emoji;
    }
  }
  return projectEmojis.default;
};

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order');
      
      if (data && !error) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </motion.div>

        {/* Current Projects Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No projects added yet. Add projects from the admin panel.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const status = getProjectStatus(project.title);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`glass-card overflow-hidden group ${status === "upcoming" ? "border-2 border-dashed border-primary/30" : ""}`}
                >
                  {/* Project Image */}
                  <div className={`h-48 flex items-center justify-center text-6xl relative overflow-hidden ${status === "upcoming" ? "bg-gradient-to-br from-blue-500/10 to-primary/10" : "bg-gradient-to-br from-primary/10 to-accent/10"}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {getProjectEmoji(project.title)}
                    </motion.span>
                    {status === "upcoming" && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full font-medium border border-blue-500/30">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {status === "in-progress" && (
                        <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded-full font-medium whitespace-nowrap">
                          Currently Working
                        </span>
                      )}
                      {status === "upcoming" && (
                        <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full font-medium whitespace-nowrap">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links / Status */}
                    <div className="flex gap-3 pt-2">
                      {status === "upcoming" ? (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          In Planning Phase
                        </div>
                      ) : (
                        <>
                          {project.github_url && (
                            <Button variant="ghost" size="sm" asChild className="flex-1">
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.live_url && (
                            <Button variant="default" size="sm" asChild className="flex-1">
                              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                              </a>
                            </Button>
                          )}
                          {!project.github_url && !project.live_url && (
                            <span className="text-muted-foreground text-sm">Coming soon</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
