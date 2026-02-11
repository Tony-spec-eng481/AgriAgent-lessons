import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import "../styles/Lessons.css";

// Updated branches to match lesson categories
const branches = [
  {
    id: "crop",
    name: "Crop Farming",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    description: "Master modern crop farming techniques and soil management",
    difficulty: "Beginner",
    duration: "6 weeks",
    lessons: 12,
    icon: "🌾",
  },
  {
    id: "maize",
    name: "Maize Production",
    image:
      "https://images.unsplash.com/photo-1597328290889-415786b4e50e?w=800&q=80",
    description: "Advanced techniques for high-yield maize cultivation",
    difficulty: "Intermediate",
    duration: "4 weeks",
    lessons: 7,
    icon: "🌽",
  },
  {
    id: "animal",
    name: "Animal Farming",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80",
    description: "Comprehensive animal husbandry and livestock management",
    difficulty: "Intermediate",
    duration: "5 weeks",
    lessons: 8,
    icon: "🐄",
  },
  {
    id: "poultry",
    name: "Poultry Farming",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    description: "Modern poultry farming and management practices",
    difficulty: "Beginner",
    duration: "3 weeks",
    lessons: 5,
    icon: "🐔",
  },
  {
    id: "fish",
    name: "Aquaculture",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80",
    description: "Sustainable fish farming and aquaculture systems",
    difficulty: "Intermediate",
    duration: "4 weeks",
    lessons: 7,
    icon: "🐟",
  },
  {
    id: "bee",
    name: "Bee Keeping",
    image:
      "https://images.unsplash.com/photo-1473973266408-ed4e27ab309c?w=800&q=80",
    description: "Modern beekeeping techniques and pollination services",
    difficulty: "Beginner",
    duration: "3 weeks",
    lessons: 4,
    icon: "🐝",
  },
  {
    id: "mushroom",
    name: "Mushroom Cultivation",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    description: "Commercial mushroom farming techniques",
    difficulty: "Beginner",
    duration: "3 weeks",
    lessons: 3,
    icon: "🍄",
  },
  {
    id: "urban",
    name: "Urban Farming",
    image:
      "https://images.unsplash.com/photo-1589923186741-7d1d2c165c66?w=800&q=80",
    description: "Farming in urban environments and limited spaces",
    difficulty: "Beginner",
    duration: "3 weeks",
    lessons: 3,
    icon: "🏙️",
  },
  {
    id: "agri-biz",
    name: "Agribusiness",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    description: "Business skills for modern agriculture",
    difficulty: "Advanced",
    duration: "6 weeks",
    lessons: 10,
    icon: "📊",
  },
  {
    id: "machinery",
    name: "Farm Machinery",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    description: "Operation and maintenance of agricultural equipment",
    difficulty: "Intermediate",
    duration: "4 weeks",
    lessons: 6,
    icon: "🚜",
  },
];

const Lessons = () => {
  const totalLessons = branches.reduce(
    (sum, branch) => sum + branch.lessons,
    0,
  );
  const totalDuration = branches.reduce(
    (sum, branch) => sum + parseInt(branch.duration),
    0,
  );

  return (
    <div className="lessons-page">
      <header className="lessons-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="header-content pt-16 pb-8">
            <motion.h1
              className="page-title fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Agricultural Learning Hub
            </motion.h1>

            <motion.p
              className="page-subtitle fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Select a specialized branch of agriculture to explore
              comprehensive courses and lessons. Master modern farming
              techniques with expert-led content and practical applications.
            </motion.p>

            <motion.div
              className="stats-container fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="stats-grid">
                <div className="stat-card">
                  <BookOpen className="stat-icon" />
                  <div>
                    <p className="stat-number">{totalLessons}+</p>
                    <p className="stat-label">Total Lessons</p>
                  </div>
                </div>
                <div className="stat-card">
                  <Clock className="stat-icon" />
                  <div>
                    <p className="stat-number">{totalDuration}+</p>
                    <p className="stat-label">Weeks of Content</p>
                  </div>
                </div>
                <div className="stat-card">
                  <Target className="stat-icon" />
                  <div>
                    <p className="stat-number">{branches.length}</p>
                    <p className="stat-label">Specializations</p>
                  </div>
                </div>
                <div className="stat-card">
                  <TrendingUp className="stat-icon" />
                  <div>
                    <p className="stat-number">100%</p>
                    <p className="stat-label">Practical Focus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="branches-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="branches-grid">
            {branches.map((branch, idx) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="branch-card"
              >
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="branch-image"
                />

                <div className="card-content">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{branch.icon}</span>
                    <span
                      className={`difficulty-tag ${
                        branch.difficulty === "Beginner"
                          ? "beginner"
                          : branch.difficulty === "Intermediate"
                            ? "intermediate"
                            : "advanced"
                      }`}
                    >
                      {branch.difficulty}
                    </span>
                  </div>

                  <h3 className="branch-name">{branch.name}</h3>
                  <p className="branch-description">{branch.description}</p>

                  <div className="branch-meta">
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <span>{branch.duration}</span>
                    </div>
                    <div className="meta-item">
                      <BookOpen className="meta-icon" />
                      <span>{branch.lessons} lessons</span>
                    </div>
                  </div>

                  <Link to={`/lessons/${branch.id}`} className="explore-button">
                    Explore Lessons
                    <span className="explore-arrow">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-600">
              Can't find what you're looking for?{" "}
              <Link
                to="/contact"
                className="text-green-600 font-semibold hover:underline"
              >
                Suggest a new branch
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
