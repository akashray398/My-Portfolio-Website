import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
}

// TODO: Replace with your actual certificates
const certificates: Certificate[] = [
  {
    id: "1",
    title: "Certificate Name",
    issuer: "Issuing Organization",
    date: "2024",
    imageUrl: "/placeholder.svg",
    credentialUrl: "#",
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
              transition={{ duration: 0.5, delay: 0.1 * index }}
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
