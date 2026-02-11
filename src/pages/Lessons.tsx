import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Lessons.css"; // Import external CSS

const branches = [
  {
    id: "crop",
    name: "Crop Farming",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    count: 12,
  },
  {
    id: "animal",
    name: "Animal Farming",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80",
    count: 8,
  },
  {
    id: "poultry",
    name: "Poultry Farming",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    count: 5,
  },
  {
    id: "dairy",
    name: "Dairy Farming",
    image:
      "https://images.unsplash.com/photo-1527159340868-ebb0cb7fb03b?w=800&q=80",
    count: 6,
  },
  {
    id: "bee",
    name: "Bee Farming",
    image:
      "https://images.unsplash.com/photo-1473973266408-ed4e27ab309c?w=800&q=80",
    count: 4,
  },
  {
    id: "fish",
    name: "Fish Farming",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80",
    count: 7,
  },
  {
    id: "agri-biz",
    name: "Agribusiness",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    count: 10,
  },
];

const Lessons = () => {
  const totalLessons = branches.reduce((sum, branch) => sum + branch.count, 0);

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
              Learning Branches
            </motion.h1>

            <motion.p
              className="page-subtitle fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Select a branch of agriculture to explore our comprehensive
              courses and lessons. Master modern farming techniques with
              expert-led content.
            </motion.p>

            <motion.div
              className="stats-bar fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="total-lessons">
                Total Available Lessons: <span>{totalLessons}+</span> across{" "}
                {branches.length} branches
              </p>
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

                <div className="card-overlay">
                  <span className="lesson-count">
                    {branch.count} {branch.count === 1 ? "Lesson" : "Lessons"}
                  </span>
                  <h3 className="branch-name">{branch.name}</h3>
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
