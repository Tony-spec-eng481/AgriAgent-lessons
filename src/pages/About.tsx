import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/About.css";
import {
  FaLeaf,
  FaSeedling,
  FaGlobeAmericas,
  FaUsers,
  FaChartLine,
  FaHandsHelping,
} from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "Promoting eco-friendly farming practices",
    },
    {
      icon: <FaSeedling />,
      title: "Innovation",
      description: "Leveraging technology for better yields",
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Global Impact",
      description: "Contributing to worldwide food security",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Building supportive farming networks",
    },
    {
      icon: <FaChartLine />,
      title: "Growth",
      description: "Focusing on continuous improvement",
    },
    {
      icon: <FaHandsHelping />,
      title: "Collaboration",
      description: "Partnering for greater success",
    },
  ];

  const stats = [
    { number: "5000+", label: "Students Enrolled" },
    { number: "50+", label: "Expert Instructors" },
    { number: "100+", label: "Courses Available" },
    { number: "30+", label: "Countries Reached" },
  ];

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.header
            className="about-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="about-title">About AgriAgent School</h1>
            <p className="about-subtitle">
              Pioneering the future of agricultural education through innovation
              and sustainability
            </p>
          </motion.header>

          {/* Main Content */}
          <motion.div
            className="about-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Introduction */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="about-text">
                SmartAgri School is a cutting-edge multimedia platform dedicated
                to transforming agricultural education. We believe that modern
                technology combined with sustainable farming practices can
                secure the future of food for everyone.
              </p>
              <p className="about-text">
                Our platform brings together experts, farmers, and enthusiasts
                to create a vibrant learning community that bridges traditional
                knowledge with innovative techniques.
              </p>
            </motion.div>

            {/* Mission & Vision Grid */}
            <div className="mission-vision-grid">
              <motion.div
                className="mission-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="card-icon">
                  <FaSeedling />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible, high-quality agricultural training that
                  empowers individuals to build successful agribusinesses and
                  contribute to global food security through sustainable and
                  innovative practices.
                </p>
              </motion.div>

              <motion.div
                className="vision-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="card-icon">
                  <FaGlobeAmericas />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  A world where sustainable agriculture is accessible to all,
                  empowering communities to achieve food sovereignty while
                  preserving our planet for future generations.
                </p>
              </motion.div>
            </div>

            {/* Why It Matters */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="section-title">Why It Matters</h2>
              <p className="about-text">
                With the global population projected to reach 9.7 billion by
                2050, agriculture remains the most vital industry for human
                survival. By educating the next generation of farmers, we're not
                just teaching skills—we're building a resilient and sustainable
                society that can thrive in the face of climate change and
                resource constraints.
              </p>
              <p className="about-text">
                Every farmer we train becomes a catalyst for change in their
                community, creating ripple effects that improve livelihoods,
                protect ecosystems, and ensure food security for generations to
                come.
              </p>
            </motion.div>

            {/* Our Values */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="section-title">Our Core Values</h2>
              <div className="values-list">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="value-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl text-green-600 mb-3">
                      {value.icon}
                    </div>
                    <h3 className="value-title">{value.title}</h3>
                    <p className="value-description">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="stats-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-2xl font-bold mb-8">Our Impact in Numbers</h2>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="cta-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <h2 className="cta-title">Join Our Growing Community</h2>
              <p className="text-gray-600 mb-6">
                Start your journey in sustainable agriculture today. Whether
                you're a beginner or an experienced farmer, we have resources to
                help you grow.
              </p>
              <Link to="/lessons" className="cta-button">
                Explore Our Courses
                <span className="ml-2">&rarr;</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
