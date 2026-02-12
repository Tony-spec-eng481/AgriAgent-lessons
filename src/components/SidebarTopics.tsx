import { ChevronRight, PlayCircle, CheckCircle } from "lucide-react";
import "../styles/SidebarTopics.css";

const SidebarTopics = ({
  topics,
  activeTopicId,
  onTopicSelect,
  progress = 33,
}: any) => {
  const completedCount = topics?.filter((t: any) => t.completed).length || 2;
  const totalCount = topics?.length || 6;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="sidebar-topics">
      <h3 className="sidebar-title">Lesson Topics</h3>

      <div className="topics-list">
        {topics.map((topic: any, index: number) => {
          const isActive = activeTopicId === topic.id;
          const isCompleted = topic.completed;

          return (
            <button
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className={`topic-button ${isActive ? "active" : "inactive"}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="topic-content">
                {isActive ? (
                  <PlayCircle className={`topic-icon active`} />
                ) : (
                  <CheckCircle
                    className={`topic-icon inactive ${isCompleted ? "completed" : ""}`}
                  />
                )}
                <span className={`topic-title ${isActive ? "active" : ""}`}>
                  {topic.title}
                </span>
              </div>
              <ChevronRight
                className={`chevron-icon ${isActive ? "active" : "inactive"}`}
              />
            </button>
          );
        })}
      </div>

      <div className="progress-section">
        <div className="progress-label">
          <span className="progress-title">Course Progress</span>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="progress-stats">
          <span>
            <strong>{completedCount}</strong> of <strong>{totalCount}</strong>{" "}
            topics completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarTopics;
