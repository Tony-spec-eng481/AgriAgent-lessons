import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SidebarTopics from "../components/SidebarTopics";
import IntroAudio from "../components/IntroAudio";
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

// Define interfaces (keep the same)
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

// Expanded mock lessons data (keep the same)
const mockLessons: Record<string, Lesson> = {
  // ... (keep all your mock lessons data exactly as is)
  crop: {
    title: "Crop Farming Mastery",
    difficulty: "Beginner",
    duration: "6 weeks",
    icon: "🌾",
    category: "Crop Production",
    description: "Comprehensive guide to modern crop farming techniques",
    topics: [
      {
        id: "1",
        title: "Soil Science & Testing",
        videoUrl: "https://www.youtube.com/embed/6zAq4MQxE1M",
        notes: "Understanding soil types, pH testing techniques (optimal 5.8-7.0), nutrient analysis, and soil amendment strategies for maximum crop yield.",
        introAudio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "45 min",
      },
      // ... rest of topics
    ],
  },
  // ... rest of lessons
};

const LessonDetails = () => {
  const { id } = useParams();
  const lesson = mockLessons[id || "crop"] || mockLessons["crop"];
  const [activeTopic, setActiveTopic] = useState(lesson.topics[0]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set(),
  );
  const [progress, setProgress] = useState(0);

  // Calculate progress when completed topics change
  useEffect(() => {
    const progressPercentage =
      (completedTopics.size / lesson.topics.length) * 100;
    setProgress(Math.round(progressPercentage));
  }, [completedTopics, lesson.topics.length]);

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
      // Auto-mark as completed when user moves to next topic
      if (!completedTopics.has(nextTopic.id)) {
        markTopicComplete(nextTopic.id);
      }
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
                      <h1 className="lesson-title">
                        {lesson.title}
                      </h1>
                      {lesson.description && (
                        <p className="lesson-description">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="lesson-meta">
                    <span className={`difficulty-badge ${lesson.difficulty.toLowerCase()}`}>
                      {lesson.difficulty}
                    </span>
                    <span className="duration-badge">
                      <Clock className="meta-icon" /> 
                      <span>{lesson.duration}</span>
                    </span>
                    {lesson.category && (
                      <span className="category-badge">
                        {lesson.category}
                      </span>
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
                    {completedTopics.size} of {lesson.topics.length} topics completed
                  </p>
                </div>
              </div>

              <div className="current-topic-bar">
                <div className="topic-info">
                  <Book className="topic-icon" />
                  <span className="current-topic-label">Current Topic:</span>
                  <span className="current-topic-name">{activeTopic.title}</span>
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
                    className={`complete-button ${completedTopics.has(activeTopic.id) ? 'completed' : ''}`}
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
                <iframe
                  className="lesson-video"
                  src={activeTopic.videoUrl}
                  title={activeTopic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="content-body">
                <div className="notes-header">
                  <div className="notes-title-section">
                    <div className="play-icon-wrapper">
                      <Play className="play-icon" />
                    </div>
                    <div>
                      <h2 className="notes-title">Lesson Notes</h2>
                      <p className="notes-subtitle">Synchronized study material</p>
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
                    <div className="notes-text">
                      {activeTopic.notes}
                    </div>

                    {/* Learning Objectives */}
                    <div className="objectives-card">
                      <h4 className="objectives-title">
                        <Target className="objectives-icon" />
                        Learning Objectives
                      </h4>
                      <ul className="objectives-list">
                        <li>
                          <Award className="objective-icon" />
                          <span>Master the key concepts and techniques presented</span>
                        </li>
                        <li>
                          <TrendingUp className="objective-icon" />
                          <span>Apply knowledge to improve farming practices</span>
                        </li>
                        <li>
                          <Users className="objective-icon" />
                          <span>Share insights with fellow farmers and community</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="navigation-section">
                  <button
                    onClick={handlePrevTopic}
                    className={`nav-button prev-button ${isFirstTopic ? 'disabled' : ''}`}
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
                    className={`nav-button next-button ${isLastTopic ? 'disabled' : ''}`}
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
                      <p className="summary-value completed-count">{completedTopics.size}</p>
                      <p className="summary-label">Topics Completed</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-value total-count">{lesson.topics.length}</p>
                      <p className="summary-label">Total Topics</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-value progress-percent">{progress}%</p>
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
                  if (!completedTopics.has(topicId)) {
                    markTopicComplete(topicId);
                  }
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