import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Placement Ambassador",
    company: "Chandigarh Group of Colleges, Landran",
    period: "Dec 2025 - Present",
    description: "Serving as Placement Ambassador, bridging the gap between students and placement opportunities. Facilitating communication between the placement cell and students.",
  },
  {
    type: "work",
    title: "MERN Stack Developer Training",
    company: "Hoping Minds, Mohali",
    period: "2024 - 45 Days",
    description: "Completed hands-on training in MERN stack, focusing on modern web application architecture. Gained practical experience in frontend and backend integration, REST APIs.",
  },
  {
    type: "work",
    title: "Campus Ambassador",
    company: "LaunchED Global",
    period: "Sep 2025",
    description: "Representing LaunchED Global on campus, promoting entrepreneurship and innovation among students.",
  },
  {
    type: "work",
    title: "Event Coordinator",
    company: "CGC Landran",
    period: "2024 - 2025",
    description: "Served as Coordinator for National Science Day 2024 and Freshers 2025. Actively participated in events like Eminence, Code-Rush, HackHeist and Zest-o-Festa.",
  },
];

const education = [
  {
    type: "education",
    title: "B.Tech in Information Technology",
    company: "Chandigarh Group of Colleges, Landran",
    period: "2023 - 2027",
    description: "Currently pursuing IT Engineering with 8.15 CGPA. Secured 5 Star badge at HackerRank in Java and 50 days completed badge at LeetCode.",
  },
  {
    type: "education",
    title: "Intermediate (12th - BSEB)",
    company: "A.S.R.L.S College, Nabiganj Bazar, Siwan",
    period: "2020 - 2021",
    description: "Completed with 71% marks. Secured 2nd Position at District level in GK & GS in 2019.",
  },
  {
    type: "education",
    title: "Matriculation (10th - BSEB)",
    company: "+2 High School, Nabiganj Bazar, Siwan",
    period: "2018 - 2019",
    description: "Completed with 80% marks.",
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
