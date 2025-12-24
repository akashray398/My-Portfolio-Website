import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, MapPin, Calendar, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Technologies", value: "20+" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know me better and discover my journey in the world of technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden glass-card p-1">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold">
                Passionate Backend Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm Akash Kumar Yadav, a backend developer with expertise in building 
                scalable, high-performance server-side applications. My journey started 
                with a curiosity for how systems work under the hood, and has evolved 
                into a passion for crafting robust APIs and microservices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in Java, Spring Boot, Node.js, and cloud technologies like Docker 
                and AWS. I believe in writing clean, maintainable code and designing systems 
                that can handle millions of requests efficiently.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 glass-card px-4 py-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">India</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">Available for hire</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2">
                <Code className="h-4 w-4 text-primary" />
                <span className="text-sm">Open to remote work</span>
              </div>
            </div>

            {/* Download Resume */}
            <Button variant="hero" className="mt-6">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="glass-card p-6 text-center hover-glow"
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
