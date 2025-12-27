import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/akashray398", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/akash-yadav-878906286", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/akashray398", label: "Twitter" },
  ];

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-display font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Akash
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Made with
            <Heart className="h-4 w-4 text-destructive fill-destructive" /> by
            Akash Yadav
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
