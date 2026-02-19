import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SidebarTopics from "../components/SidebarTopics";
import IntroAudio from "../components/IntroAudio";
import P5VideoPlayer from "../components/P5VideoPlayer";
import {
  Book,
  Play,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Target,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import "../styles/LessonDetails.css";

// Define interfaces
interface Topic {   
  id: string;
  title: string;
  videoUrl: string;
  notes: string;
  introAudio: string;
  duration?: string;
  completed?: boolean;
}

interface Lesson {
  title: string;
  topics: Topic[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  icon: string;
  category?: string;
  description?: string;
}

// Complete mock lessons data for all branches
const mockLessons: Record<string, Lesson> = {
  crop: {
    title: "Crop Farming Mastery",
    difficulty: "Beginner",
    duration: "6 weeks",
    icon: "🌾",
    category: "Crop Production",
    description: "Comprehensive guide to modern crop farming techniques",
    topics: [
      {
        id: "crop-1",
        title: "Soil Science & Testing",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Understanding soil types, pH testing techniques (optimal 5.8-7.0), nutrient analysis, and soil amendment strategies for maximum crop yield. Learn how to collect soil samples, interpret test results, and apply appropriate amendments.",
        introAudio:
          "/audio/crop-farming.mp3",
        duration: "45 min",
      },
      {
        id: "crop-2",
        title: "Seed Selection & Planting",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Learn about hybrid vs heirloom seeds, planting depth, spacing requirements, and timing for different seasons. Understanding germination rates, seed treatment, and optimal planting conditions.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
      {
        id: "crop-3",
        title: "Irrigation Management",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Drip irrigation systems, sprinkler systems, water conservation techniques, and scheduling. Learn to calculate water requirements based on crop type, growth stage, and weather conditions.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
      {
        id: "crop-4",
        title: "Pest & Disease Control",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Integrated pest management (IPM), biological controls, organic pesticides, and disease prevention strategies. Identify common pests and diseases, their life cycles, and control measures.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "55 min",
      },
    ],
  },
  maize: {
    title: "Maize Production Excellence",
    difficulty: "Intermediate",
    duration: "4 weeks",
    icon: "🌽",
    category: "Cereal Crops",
    description: "Advanced techniques for high-yield maize cultivation",
    topics: [
      {
        id: "maize-1",
        title: "Maize Varieties & Selection",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Understanding different maize varieties: dent, flint, sweet, popcorn. Selection criteria based on climate, market demand, and disease resistance. Hybrid vs. open-pollinated varieties.",
        introAudio:
          "/audio/maize-production.mp3",
        duration: "40 min",
      },
      {
        id: "maize-2",
        title: "Land Preparation & Planting",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Optimal land preparation techniques, planting depth (2-3 inches), spacing (75cm x 25cm), and plant population calculations. Timing based on rainfall patterns and soil temperature.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
      {
        id: "maize-3",
        title: "Nutrient Management",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "NPK requirements at different growth stages. Side-dressing techniques, foliar feeding, and micronutrient deficiencies. Organic fertilizer options and application rates.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
      {
        id: "maize-4",
        title: "Maize Pest Management",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Controlling fall armyworm, stalk borers, and maize weevils. Early detection methods, biological controls, and judicious pesticide use. Post-harvest pest prevention.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
    ],
  },
  poultry: {
    title: "Modern Poultry Farming",
    difficulty: "Beginner",
    duration: "3 weeks",
    icon: "🐔",
    category: "Livestock Production",
    description:
      "Complete guide to starting and managing a successful poultry farm",
    topics: [
      {
        id: "poultry-1",
        title: "Poultry Breeds Selection",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Choosing between layers, broilers, and dual-purpose breeds. Popular breeds: Rhode Island Red, Leghorn, Cornish Cross. Factors affecting breed selection: climate, market, and management capability.",
        introAudio:
          "/audio/poulty-farming.mp3",
        duration: "35 min",
      },
      {
        id: "poultry-2",
        title: "Housing & Equipment",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Deep litter vs. battery cage systems. Ventilation requirements, lighting programs, and space requirements. Essential equipment: feeders, drinkers, brooders, and egg collection systems.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
      {
        id: "poultry-3",
        title: "Feeding & Nutrition",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Nutritional requirements at different stages: starter, grower, layer. Feed formulation, commercial feeds vs. home mixing. Water quality and consumption monitoring.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
      {
        id: "poultry-4",
        title: "Health Management",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Common diseases: Newcastle, Gumboro, coccidiosis, fowl typhoid. Vaccination schedules, biosecurity measures, and early disease detection. Treatment protocols and prevention strategies.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
    ],
  },
  animal: {
    title: "Animal Husbandry Mastery",
    difficulty: "Intermediate",
    duration: "5 weeks",
    icon: "🐄",
    category: "Livestock Management",
    description:
      "Comprehensive animal farming and livestock management techniques",
    topics: [
      {
        id: "animal-1",
        title: "Cattle Breeds & Selection",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Dairy vs. beef breeds. Holstein, Jersey, Angus, Hereford characteristics. Selection criteria: milk production, growth rate, disease resistance, and adaptability.",
        introAudio:
          "/audio/Animal-farming.mp3",
        duration: "45 min",
      },
      {
        id: "animal-2",
        title: "Housing & Facility Design",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Free-stall barns, tie-stall systems, and open lots. Ventilation, waste management, and milking parlor design. Comfortable housing for optimal production.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
      {
        id: "animal-3",
        title: "Nutrition & Feeding",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Ruminant digestive system, forage quality assessment, concentrate feeding. Total Mixed Ration (TMR) formulation. Mineral and vitamin supplementation.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "55 min",
      },
      {
        id: "animal-4",
        title: "Breeding & Reproduction",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Artificial insemination techniques, estrus detection, pregnancy diagnosis. Genetic improvement strategies, calving management, and record keeping.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
    ],
  },
  fish: {
    title: "Sustainable Aquaculture",
    difficulty: "Intermediate",
    duration: "4 weeks",
    icon: "🐟",
    category: "Aquaculture",
    description: "Modern fish farming and sustainable aquaculture practices",
    topics: [
      {
        id: "fish-1",
        title: "Pond Construction & Preparation",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Site selection, pond design, water source, and soil quality. Pond lining, inlet/outlet structures, and pond fertilization. Water quality parameters: pH, dissolved oxygen, temperature.",
        introAudio:
          "/audio/aquaculture.mp3",
        duration: "45 min",
      },
      {
        id: "fish-2",
        title: "Fish Species Selection",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Tilapia, catfish, carp, and trout farming. Species characteristics, growth rates, and market demand. Polyculture vs. monoculture systems.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
      {
        id: "fish-3",
        title: "Feeding & Nutrition",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Feed types: floating vs. sinking pellets. Feeding rates and frequency. Feed formulation, protein requirements, and feeding strategies for optimal growth.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
      {
        id: "fish-4",
        title: "Disease Management",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Common fish diseases: bacterial, fungal, parasitic. Prevention strategies, water quality management, and treatment options. Biosecurity measures in aquaculture.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
    ],
  },
  bee: {
    title: "Beekeeping Essentials",
    difficulty: "Beginner",
    duration: "3 weeks",
    icon: "🐝",
    category: "Apiculture",
    description: "Modern beekeeping techniques and honey production",
    topics: [
      {
        id: "bee-1",
        title: "Bee Biology & Colony Structure",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Queen, worker, and drone roles. Life cycle of honey bees. Colony organization, communication through dance, and swarming behavior.",
        introAudio:
          "/audio/bee- keeping.mp3",
        duration: "35 min",
      },
      {
        id: "bee-2",
        title: "Equipment & Hive Setup",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Langstroth hives, protective gear, smokers, and tools. Hive components: bottom board, brood boxes, supers, frames, and covers. Proper hive placement.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
      {
        id: "bee-3",
        title: "Hive Management",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Regular inspections, swarm prevention, requeening, and feeding. Seasonal management practices. Honey harvesting and processing techniques.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
      {
        id: "bee-4",
        title: "Pests & Diseases",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Varroa mites, small hive beetles, wax moths. American and European foulbrood. Integrated pest management and organic treatment options.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
    ],
  },
  mushroom: {
    title: "Mushroom Cultivation",
    difficulty: "Beginner",
    duration: "3 weeks",
    icon: "🍄",
    category: "Specialty Crops",
    description: "Commercial mushroom farming from spawn to harvest",
    topics: [
      {
        id: "mushroom-1",
        title: "Mushroom Biology & Species",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Button, oyster, shiitake, and specialty mushrooms. Life cycle: spawn, mycelium, pinheads, fruiting bodies. Substrate preferences for different species.",
        introAudio:
          "/audio/Mushroom-farming.mp3",
        duration: "35 min",
      },
      {
        id: "mushroom-2",
        title: "Growing Environment",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Temperature, humidity, light, and air exchange requirements. Growing rooms, shelving systems, and environmental controls. Sterilization vs. pasteurization.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
      {
        id: "mushroom-3",
        title: "Substrate Preparation",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Composting process, straw preparation, sawdust blocks. Supplementation, pH adjustment, and moisture content. Spawn running and casing layer.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
      {
        id: "mushroom-4",
        title: "Harvesting & Marketing",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Optimal harvest timing, proper picking technique, grading, and packaging. Fresh vs. dried products. Market channels and value-added products.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
    ],
  },
  urban: {
    title: "Urban Farming Innovation",
    difficulty: "Beginner",
    duration: "3 weeks",
    icon: "🏙️",
    category: "Sustainable Agriculture",
    description: "Maximizing food production in urban environments",
    topics: [
      {
        id: "urban-1",
        title: "Vertical Farming Systems",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Tower gardens, wall-mounted systems, and stacked planters. Space optimization, lighting requirements, and irrigation systems for vertical setups.",
        introAudio:
          "/audio/urban-farming.mp3",
        duration: "35 min",
      },
      {
        id: "urban-2",
        title: "Container & Rooftop Gardens",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Selecting containers, soil mixes, and plants for limited spaces. Rooftop weight considerations, wind protection, and water drainage systems.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
      {
        id: "urban-3",
        title: "Hydroponics & Aquaponics",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Nutrient film technique, deep water culture, ebb and flow systems. Integrating fish and plants in aquaponic systems. Nutrient solutions and monitoring.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
      {
        id: "urban-4",
        title: "Community Farming",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Starting community gardens, organizing volunteer programs, sharing harvests. Urban agriculture policies, land access, and community engagement strategies.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "40 min",
      },
    ],
  },
  "agri-biz": {
    title: "Agribusiness Management",
    difficulty: "Advanced",
    duration: "6 weeks",
    icon: "📊",
    category: "Business & Economics",
    description: "Strategic business skills for modern agriculture enterprises",
    topics: [
      {
        id: "agribiz-1",
        title: "Farm Business Planning",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Creating comprehensive business plans, mission/vision statements, SWOT analysis, and goal setting. Risk assessment and contingency planning for agricultural enterprises.",
        introAudio:
          "/audio/Agribusiness.mp3",
        duration: "50 min",
      },
      {
        id: "agribiz-2",
        title: "Financial Management",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Budgeting, cash flow analysis, profit/loss statements, and balance sheets. Agricultural loans, grants, and investment strategies. Record keeping and accounting software.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "55 min",
      },
      {
        id: "agribiz-3",
        title: "Marketing & Branding",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Developing brand identity, packaging design, and product positioning. Digital marketing, social media strategies, and e-commerce platforms for farm products.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
      {
        id: "agribiz-4",
        title: "Supply Chain Management",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "Post-harvest handling, storage, transportation, and distribution. Cold chain management, quality control, and traceability systems. Building relationships with buyers.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "45 min",
      },
    ],
  },
  machinery: {
    title: "Farm Machinery Operations",
    difficulty: "Intermediate",
    duration: "4 weeks",
    icon: "🚜",
    category: "Agricultural Engineering",
    description: "Operation, maintenance, and management of farm equipment",
    topics: [
      {
        id: "machinery-1",
        title: "Tractor Operations",
        videoUrl: "/videos/soil-testing.mp4",
        notes:
          "Tractor types and sizes, controls and instruments, safe operation practices. Three-point hitch systems, PTO operation, and hydraulic systems. Pre-operation checks and maintenance.",
        introAudio:
          "/audio/Farm-machinery.mp3",
        duration: "45 min",
      },
      {
        id: "machinery-2",
        title: "Tillage Equipment",
        videoUrl: "/videos/poultry farming.mp4",
        notes:
          "Plows, harrows, cultivators, and planters. Primary vs. secondary tillage. Conservation tillage equipment. Adjustment and calibration for optimal performance.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
      {
        id: "machinery-3",
        title: "Harvesting Machinery",
        videoUrl: "/videos/animal farming.mp4",
        notes:
          "Combine harvesters, forage harvesters, and specialized harvesters. Header types, threshing mechanisms, and cleaning systems. Loss assessment and efficiency optimization.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "55 min",
      },
      {
        id: "machinery-4",
        title: "Precision Agriculture Tech",
        videoUrl: "/videos/aquaculture.mp4",
        notes:
          "GPS guidance systems, yield monitors, variable rate technology, and drones. Data collection and analysis, field mapping, and implementing precision agriculture strategies.",
        introAudio:
          "/audio/Agriculture_Lesson_Intro_Alfred_Mwai.mp3",
        duration: "50 min",
      },
    ],
  },
};

const LessonDetails = () => {
  const { id } = useParams();
  // Get the lesson based on the ID from URL, fallback to crop if not found
  const lesson = mockLessons[id || "crop"] || mockLessons["crop"];
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set(),
  );
  const [progress, setProgress] = useState(0);

  // Initialize active topic when lesson loads
  useEffect(() => {
    if (lesson && lesson.topics.length > 0) {
      setActiveTopic(lesson.topics[0]);
    }
  }, [lesson]);

  // Calculate progress when completed topics change
  useEffect(() => {
    if (lesson) {
      const progressPercentage =
        (completedTopics.size / lesson.topics.length) * 100;
      setProgress(Math.round(progressPercentage));
    }
  }, [completedTopics, lesson]);

  if (!lesson || !activeTopic) {
    return (
      <div className="lesson-container">
        <div className="lesson-wrapper">
          <div className="back-navigation">
            <Link to="/lessons" className="back-button">
              <ChevronLeft className="back-icon" />
              <span>Back to Lessons</span>
            </Link>
          </div>
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">
              Lesson not found
            </h2>
            <p className="mt-4 text-gray-600">
              The lesson you're looking for doesn't exist.
            </p>
            <Link
              to="/lessons"
              className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Browse All Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const markTopicComplete = (topicId: string) => {
    setCompletedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleNextTopic = () => {
    const currentIndex = lesson.topics.findIndex(
      (t) => t.id === activeTopic.id,
    );
    if (currentIndex < lesson.topics.length - 1) {
      const nextTopic = lesson.topics[currentIndex + 1];
      setActiveTopic(nextTopic);
    }
  };

  const handlePrevTopic = () => {
    const currentIndex = lesson.topics.findIndex(
      (t) => t.id === activeTopic.id,
    );
    if (currentIndex > 0) {
      setActiveTopic(lesson.topics[currentIndex - 1]);
    }
  };

  const isFirstTopic =
    lesson.topics.findIndex((t) => t.id === activeTopic.id) === 0;
  const isLastTopic =
    lesson.topics.findIndex((t) => t.id === activeTopic.id) ===
    lesson.topics.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="lesson-container"
    >
      <div className="lesson-wrapper">
        <div className="back-navigation">
          <Link to="/lessons" className="back-button">
            <ChevronLeft className="back-icon" />
            <span>Back to Lessons</span>
          </Link>
        </div>

        <div className="lesson-layout">
          {/* Main Content Area */}
          <div className="main-content">
            <header className="lesson-header">
              <div className="header-content">
                <div className="header-info">
                  <div className="lesson-intro">
                    <span className="lesson-icon">{lesson.icon}</span>
                    <div>
                      <h1 className="lesson-title">{lesson.title}</h1>
                      {lesson.description && (
                        <p className="lesson-description">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="lesson-meta">
                    <span
                      className={`difficulty-badge ${lesson.difficulty.toLowerCase()}`}
                    >
                      {lesson.difficulty}
                    </span>
                    <span className="duration-badge">
                      <Clock className="meta-icon" />
                      <span>{lesson.duration}</span>
                    </span>
                    {lesson.category && (
                      <span className="category-badge">{lesson.category}</span>
                    )}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="progress-indicator">
                  <div className="progress-header">
                    <span className="progress-label">Progress</span>
                    <span className="progress-percentage">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="progress-detail">
                    {completedTopics.size} of {lesson.topics.length} topics
                    completed
                  </p>
                </div>
              </div>

              <div className="current-topic-bar">
                <div className="topic-info">
                  <Book className="topic-icon" />
                  <span className="current-topic-label">Current Topic:</span>
                  <span className="current-topic-name">
                    {activeTopic.title}
                  </span>
                </div>

                <div className="topic-actions">
                  {activeTopic.duration && (
                    <span className="topic-duration">
                      <Clock className="duration-icon" />
                      {activeTopic.duration}
                    </span>
                  )}
                  <button
                    onClick={() => markTopicComplete(activeTopic.id)}
                    className={`complete-button ${completedTopics.has(activeTopic.id) ? "completed" : ""}`}
                  >
                    <CheckCircle className="check-icon" />
                    {completedTopics.has(activeTopic.id)
                      ? "Completed"
                      : "Mark as Complete"}
                  </button>
                </div>
              </div>
            </header>

            <div className="lesson-content">
              <div className="video-wrapper">
                <P5VideoPlayer videoUrl={activeTopic.videoUrl} />
              </div>

              <div className="content-body">
                <div className="notes-header">
                  <div className="notes-title-section">
                    <div className="play-icon-wrapper">
                      <Play className="play-icon" />
                    </div>
                    <div>
                      <h2 className="notes-title">Lesson Notes</h2>
                      <p className="notes-subtitle">
                        Synchronized study material
                      </p>
                    </div>
                  </div>
                  <IntroAudio audioUrl={activeTopic.introAudio} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTopic.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="notes-content"
                  >
                    <div className="notes-header-row">
                      <h3 className="topic-title">{activeTopic.title}</h3>
                      {completedTopics.has(activeTopic.id) && (
                        <span className="completed-badge">
                          <CheckCircle className="completed-icon" />
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="notes-text">{activeTopic.notes}</div>

                    {/* Learning Objectives */}
                    <div className="objectives-card">
                      <h4 className="objectives-title">
                        <Target className="objectives-icon" />
                        Learning Objectives
                      </h4>
                      <ul className="objectives-list">
                        <li>
                          <Award className="objective-icon" />
                          <span>
                            Master the key concepts and techniques presented
                          </span>
                        </li>
                        <li>
                          <TrendingUp className="objective-icon" />
                          <span>
                            Apply knowledge to improve farming practices
                          </span>
                        </li>
                        <li>
                          <Users className="objective-icon" />
                          <span>
                            Share insights with fellow farmers and community
                          </span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="navigation-section">
                  <button
                    onClick={handlePrevTopic}
                    className={`nav-button prev-button ${isFirstTopic ? "disabled" : ""}`}
                    disabled={isFirstTopic}
                  >
                    <ChevronLeft className="nav-icon" />
                    Previous Topic
                  </button>

                  <div className="action-buttons">
                    <button className="action-button quiz-button">
                      Take Quiz
                      <HelpCircle className="action-icon" />
                    </button>
                    <button className="action-button download-button">
                      Download Notes
                    </button>
                  </div>

                  <button
                    onClick={handleNextTopic}
                    className={`nav-button next-button ${isLastTopic ? "disabled" : ""}`}
                    disabled={isLastTopic}
                  >
                    Next Topic
                    <ChevronRight className="nav-icon" />
                  </button>
                </div>

                {/* Progress Summary */}
                <div className="progress-summary">
                  <h4 className="summary-title">Course Progress Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <p className="summary-value completed-count">
                        {completedTopics.size}
                      </p>
                      <p className="summary-label">Topics Completed</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-value total-count">
                        {lesson.topics.length}
                      </p>
                      <p className="summary-label">Total Topics</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-value progress-percent">
                        {progress}%
                      </p>
                      <p className="summary-label">Overall Progress</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-value next-action">
                        {isLastTopic ? "Complete!" : "Continue"}
                      </p>
                      <p className="summary-label">Next Step</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <SidebarTopics
              topics={lesson.topics.map((topic) => ({
                ...topic,
                completed: completedTopics.has(topic.id),
              }))}
              activeTopicId={activeTopic.id}
              onTopicSelect={(topicId: string) => {
                const selectedTopic = lesson.topics.find(
                  (t) => t.id === topicId,
                );
                if (selectedTopic) {
                  setActiveTopic(selectedTopic);
                }
              }}
            />
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonDetails;
