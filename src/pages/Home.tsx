import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Award, ShieldCheck } from "lucide-react";
import "../styles/Home.css"; // Import the external CSS file

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Multimedia Lessons",
      desc: "Engage with interactive videos, audio guides, and dynamic learning materials.",
    },
    {
      icon: Users,
      title: "Agribusiness Focus",
      desc: "Master both farming techniques and profitable business management strategies.",
    },
    {
      icon: Award,
      title: "Quiz & Rewards",
      desc: "Test your knowledge with smart quizzes and track your learning journey.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Expertise",
      desc: "Learn proven techniques certified by agricultural professionals.",
    },
  ];

  const branches = [
    "Crop Farming",
    "Animal Farming",
    "Poultry",
    "Dairy",
    "Bee Farming",
    "Fish Farming",
    "Agribusiness",
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-background" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Empowering the Next Generation
            <br className="hidden sm:block" /> of Farmers
          </h1>
          <p className="hero-subtitle">
            Interactive, multimedia-driven agriculture education at your
            fingertips.
          </p>
          <div className="hero-buttons">
            <Link to="/lessons" className="primary-button">
              Start Learning Now
            </Link>
            <Link to="/about" className="secondary-button">
              Discover More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why AgriAgent School?</h2>
            <p className="section-description">
              We provide a comprehensive learning experience combining modern
              technology with traditional farming wisdom.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Branches Preview */}
      <section className="branches-section">
        <div className="section-container text-center">
          <h2 className="section-title">Learn Various Branches</h2>
          <p className="section-description">
            Comprehensive courses covering all aspects of modern agriculture
          </p>

          <div className="branches-grid">
            {branches.map((branch) => (
              <div key={branch} className="branch-item">
                <span className="branch-text">{branch}</span>
              </div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/lessons" className="view-all-link">
              View all lessons &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
