import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import zestOFiesta from "@/assets/certificates/zest-o-fiesta.jpeg";
import accentureForage from "@/assets/certificates/accenture-forage.jpeg";
import mongodbAiAgents from "@/assets/certificates/mongodb-ai-agents.jpeg";
import awsDataEngineering from "@/assets/certificates/aws-data-engineering.jpeg";
import bgmiEminece from "@/assets/certificates/bgmi-eminece.jpeg";
import awsCloudOperations from "@/assets/certificates/aws-cloud-operations.jpeg";
import hackheist from "@/assets/certificates/hackheist.jpeg";
import flutterSimplilearn from "@/assets/certificates/flutter-simplilearn.jpeg";
import awsGenerativeAi from "@/assets/certificates/aws-generative-ai.jpeg";
import gitUdemy from "@/assets/certificates/git-udemy.jpeg";
import sih2024 from "@/assets/certificates/sih-2024.jpeg";
import introMongodb from "@/assets/certificates/intro-mongodb.jpeg";
import javaConceptsInfosys from "@/assets/certificates/java-concepts-infosys.jpeg";
import logoCompetition from "@/assets/certificates/logo-competition.jpeg";
import mongodbUdemy from "@/assets/certificates/mongodb-udemy.jpg";
import sih2023 from "@/assets/certificates/sih-2023.jpeg";
import aiVoiceMernSkillected from "@/assets/certificates/ai-voice-mern-skillected.jpeg";
import fullstackHopingMinds from "@/assets/certificates/fullstack-hoping-minds.jpeg";
import bgmiAaveg2k25 from "@/assets/certificates/bgmi-aaveg-2k25.jpeg";
import deloitteCyberForage from "@/assets/certificates/deloitte-cyber-forage.jpeg";
import awsCloudSecurity from "@/assets/certificates/aws-cloud-security.jpeg";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
}

const certificates: Certificate[] = [
  {
    id: "1",
    title: "AWS Academy Graduate - Data Engineering",
    issuer: "AWS Academy",
    date: "November 2023",
    imageUrl: awsDataEngineering,
    credentialUrl: "https://www.credly.com/go/7a06H8eN",
  },
  {
    id: "2",
    title: "AWS Academy Graduate - Cloud Operations",
    issuer: "AWS Academy",
    date: "March 2025",
    imageUrl: awsCloudOperations,
    credentialUrl: "https://www.credly.com/go/iB2PJzji",
  },
  {
    id: "3",
    title: "AWS Academy Graduate - Generative AI Foundations",
    issuer: "AWS Academy",
    date: "November 2025",
    imageUrl: awsGenerativeAi,
    credentialUrl: "https://www.credly.com/badges/fb34e5df-5005-43ef-8514-1e926a589ebe",
  },
  {
    id: "4",
    title: "AWS Academy Graduate - Cloud Security Foundations",
    issuer: "AWS Academy",
    date: "September 2024",
    imageUrl: awsCloudSecurity,
    credentialUrl: "https://www.credly.com/go/23iRZqkG",
  },
  {
    id: "5",
    title: "Full Stack Development - 45 Days Internship",
    issuer: "Hoping Minds / NSDC",
    date: "June-July 2025",
    imageUrl: fullstackHopingMinds,
  },
  {
    id: "6",
    title: "Software Engineering Job Simulation",
    issuer: "Accenture via Forage",
    date: "September 2025",
    imageUrl: accentureForage,
  },
  {
    id: "7",
    title: "Cyber Job Simulation",
    issuer: "Deloitte via Forage",
    date: "June 2025",
    imageUrl: deloitteCyberForage,
  },
  {
    id: "8",
    title: "AI Agents with MongoDB",
    issuer: "MongoDB",
    date: "August 2025",
    imageUrl: mongodbAiAgents,
  },
  {
    id: "9",
    title: "Introduction to MongoDB (For Students)",
    issuer: "MongoDB",
    date: "July 2025",
    imageUrl: introMongodb,
  },
  {
    id: "10",
    title: "MongoDB - The Complete MongoDB Developers Course",
    issuer: "Udemy",
    date: "November 2025",
    imageUrl: mongodbUdemy,
    credentialUrl: "https://ude.my/UC-b246dae1-78e8-4e4b-9ddd-f95a63855844",
  },
  {
    id: "11",
    title: "Java Concepts",
    issuer: "Infosys Springboard",
    date: "November 2025",
    imageUrl: javaConceptsInfosys,
    credentialUrl: "https://verify.onwingspan.com",
  },
  {
    id: "12",
    title: "Introduction to Flutter Course",
    issuer: "Simplilearn SkillUp",
    date: "July 2025",
    imageUrl: flutterSimplilearn,
  },
  {
    id: "13",
    title: "GIT, GitLab, GitHub Fundamentals for Software Developers",
    issuer: "Udemy",
    date: "July 2025",
    imageUrl: gitUdemy,
    credentialUrl: "https://ude.my/UC-23ee7eab-f365-49ee-8d34-cd91d3bb87bf",
  },
  {
    id: "14",
    title: "Build an AI Voice Assistant with MERN Stack!",
    issuer: "SkillEcted Campus Program",
    date: "July 2025",
    imageUrl: aiVoiceMernSkillected,
  },
  {
    id: "15",
    title: "Smart India Hackathon 2024 - Team DigiDreamers",
    issuer: "CGC College of Engineering",
    date: "September 2024",
    imageUrl: sih2024,
  },
  {
    id: "16",
    title: "Smart India Hackathon 2023 - Team Law Legacy Inforcers",
    issuer: "CEC-CGC Landran",
    date: "2023",
    imageUrl: sih2023,
  },
  {
    id: "17",
    title: "HackHeist - Certificate of Appreciation",
    issuer: "CGC Landran",
    date: "2024",
    imageUrl: hackheist,
  },
  {
    id: "18",
    title: "Logo Making Competition",
    issuer: "Event Participation",
    date: "August 2024",
    imageUrl: logoCompetition,
  },
  {
    id: "19",
    title: "Zest-O-fiesta 2024 - Certificate of Participation",
    issuer: "CEC-CGC Landran",
    date: "2024",
    imageUrl: zestOFiesta,
  },
  {
    id: "20",
    title: "BGMI Event - EMINECE 2K24",
    issuer: "CEC-CGC Landran, Dept. of IT",
    date: "2024",
    imageUrl: bgmiEminece,
  },
  {
    id: "21",
    title: "Tournament Takedown (BGMI) - AAVEG 2K25",
    issuer: "CGC-COE Landran, Kerberos Club",
    date: "March 2025",
    imageUrl: bgmiAaveg2k25,
  },
];

export const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="py-20 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            My <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements that validate my skills and expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="glass-card overflow-hidden group hover-glow"
            >
              {/* Certificate Image */}
              <div className="aspect-[4/3] overflow-hidden bg-secondary/50">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Certificate Info */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-1 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4">
                  {cert.date}
                </p>

                {cert.credentialUrl && cert.credentialUrl !== "#" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Credential
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
