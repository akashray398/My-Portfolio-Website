import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "🛒",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "#",
    demo: "#",
    category: "fullstack",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, team features, and project analytics.",
    image: "📋",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    github: "#",
    demo: "#",
    category: "fullstack",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather visualization with location-based forecasts and interactive maps.",
    image: "🌤️",
    tech: ["React", "Chart.js", "OpenWeather API"],
    github: "#",
    demo: "#",
    category: "frontend",
  },
  {
    id: 4,
    title: "REST API Service",
    description: "Scalable microservices architecture with authentication, rate limiting, and documentation.",
    image: "⚡",
    tech: ["Java", "Spring Boot", "Docker", "Redis"],
    github: "#",
    demo: "#",
    category: "backend",
  },
  {
    id: 5,
    title: "Portfolio Generator",
    description: "AI-powered portfolio builder that creates stunning websites from simple inputs.",
    image: "🎨",
    tech: ["React", "OpenAI", "Tailwind", "Framer Motion"],
    github: "#",
    demo: "#",
    category: "frontend",
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time messaging with WebSocket, file sharing, and end-to-end encryption.",
    image: "💬",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
    category: "fullstack",
  },
];

const categories = ["all", "frontend", "backend", "fullstack"];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className="capitalize"
            >
              {category === "all" && <Filter className="h-4 w-4 mr-2" />}
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card overflow-hidden group"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-6xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {project.image}
                </motion.span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  <Button variant="ghost" size="sm" asChild className="flex-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="default" size="sm" asChild className="flex-1">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
