import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading development of enterprise applications, mentoring junior developers, and implementing best practices.",
  },
  {
    type: "work",
    title: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: "Built scalable web applications using React and Node.js, improved performance by 40%.",
  },
  {
    type: "work",
    title: "Junior Developer",
    company: "StartUp Labs",
    period: "2019 - 2020",
    description: "Developed features for SaaS products, collaborated with design team on UI/UX improvements.",
  },
];

const education = [
  {
    type: "education",
    title: "Master's in Computer Science",
    company: "Stanford University",
    period: "2017 - 2019",
    description: "Specialized in Software Engineering and Machine Learning.",
  },
  {
    type: "education",
    title: "Bachelor's in Computer Science",
    company: "MIT",
    period: "2013 - 2017",
    description: "Dean's List, focused on algorithms and data structures.",
  },
];

interface TimelineItemProps {
  item: typeof experiences[0];
  index: number;
  isLeft: boolean;
}

const TimelineItem = ({ item, index, isLeft }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-center gap-4 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}
    >
      {/* Content */}
      <div className="flex-1 glass-card p-6 space-y-2 hover-glow">
        <div className="flex items-center gap-2 text-primary text-sm">
          <Calendar className="h-4 w-4" />
          <span>{item.period}</span>
        </div>
        <h3 className="text-lg font-display font-semibold">{item.title}</h3>
        <p className="text-muted-foreground text-sm">{item.company}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
      </div>

      {/* Icon */}
      <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
        {item.type === "work" ? (
          <Briefcase className="h-5 w-5 text-primary-foreground" />
        ) : (
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        )}
      </div>

      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allItems = [
    ...experiences.map((e) => ({ ...e, type: "work" as const })),
    ...education.map((e) => ({ ...e, type: "education" as const })),
  ].sort((a, b) => {
    const yearA = parseInt(a.period.split(" - ")[1] === "Present" ? "2024" : a.period.split(" - ")[1]);
    const yearB = parseInt(b.period.split(" - ")[1] === "Present" ? "2024" : b.period.split(" - ")[1]);
    return yearB - yearA;
  });

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-secondary/20">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

          {/* Items */}
          <div className="space-y-8">
            {allItems.map((item, index) => (
              <TimelineItem
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
