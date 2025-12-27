import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Code, Star, Target, Zap } from "lucide-react";

export const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = [
    {
      icon: Trophy,
      title: "Smart India Hackathon 2024",
      description: "Participated in SIH 2024, India's largest hackathon",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Trophy,
      title: "Smart India Hackathon 2023",
      description: "Participated in SIH 2023 with innovative solutions",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Award,
      title: "HackHeist Winner",
      description: "Won HackHeist hackathon competition",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Star,
      title: "5-Star HackerRank (Java)",
      description: "Achieved 5-star rating in Java on HackerRank",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      title: "Logo Design Competition",
      description: "Winner of college logo design competition",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "BGMI Esports",
      description: "Participated in BGMI Aaveg 2K25 & Eminence tournaments",
      color: "from-red-500 to-orange-500",
    },
  ];

  // GitHub username - replace with actual username
  const githubUsername = "akashray398";
  
  // LeetCode username - replace with actual username
  const leetcodeUsername = "akashray398";

  return (
    <section id="achievements" className="py-20 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Achievements & <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My coding journey, accomplishments, and competitive programming stats
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl font-display font-semibold text-center mb-6">
            GitHub <span className="text-primary">Statistics</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-4 flex justify-center items-center">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=58a6ff&icon_color=58a6ff&text_color=c9d1d9`}
                alt="GitHub Stats"
                className="w-full max-w-md"
                loading="lazy"
              />
            </div>
            <div className="glass-card p-4 flex justify-center items-center">
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=tokyonight&hide_border=true&background=0d1117&stroke=58a6ff&ring=58a6ff&fire=ff6b6b&currStreakLabel=c9d1d9`}
                alt="GitHub Streak"
                className="w-full max-w-md"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="glass-card p-4">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=c9d1d9`}
                alt="Top Languages"
                className="w-full max-w-md"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Coding Platform Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-xl font-display font-semibold text-center mb-6">
            Coding <span className="text-primary">Platforms</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {/* LeetCode Card */}
            <a
              href={`https://leetcode.com/${leetcodeUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover-glow transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">LeetCode</h4>
                  <p className="text-sm text-muted-foreground">@{leetcodeUsername}</p>
                </div>
              </div>
              <img
                src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Karma&ext=heatmap`}
                alt="LeetCode Stats"
                className="mt-4 w-full max-w-sm rounded-lg"
                loading="lazy"
              />
            </a>

            {/* HackerRank Badge */}
            <a
              href="https://www.hackerrank.com/akashray398"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover-glow transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">HackerRank</h4>
                  <p className="text-sm text-muted-foreground">5-Star in Java</p>
                </div>
              </div>
              <div className="flex items-center gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-8 w-8 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-center mt-2 text-sm text-muted-foreground">
                Java Programming
              </p>
            </a>
          </div>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-display font-semibold text-center mb-6">
            Key <span className="text-primary">Achievements</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 group hover-glow"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <achievement.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-display font-semibold text-lg mb-2">
                  {achievement.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
