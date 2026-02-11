import { ChevronRight, PlayCircle, CheckCircle } from 'lucide-react';

const SidebarTopics = ({ topics, activeTopicId, onTopicSelect }: any) => {
  return (
    <div className="bg-white border border-agriculture-lightGreen/20 rounded-2xl p-6 h-full shadow-sm sticky top-24">
      <h3 className="text-xl font-bold text-agriculture-green mb-6 border-b border-agriculture-green/10 pb-4">
        Lesson Topics
      </h3>
      <div className="space-y-3 font-medium">
        {topics.map((topic: any) => (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              activeTopicId === topic.id
                ? 'bg-agriculture-green text-white shadow-md scale-105'
                : 'bg-agriculture-cream/30 text-agriculture-brown hover:bg-agriculture-cream/60'
            }`}
          >
            <div className="flex items-center gap-3">
              {activeTopicId === topic.id ? (
                <PlayCircle className="h-5 w-5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-gray-300" />
              )}
              <span className="text-left text-sm">{topic.title}</span>
            </div>
            <ChevronRight className={`h-4 w-4 transition-transform ${activeTopicId === topic.id ? 'rotate-90' : ''}`} />
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-agriculture-green/5 rounded-xl border border-dashed border-agriculture-green/20">
        <p className="text-xs text-agriculture-green/70 font-bold uppercase tracking-wider mb-2">Progress</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-agriculture-green w-1/3 rounded-full" />
        </div>
        <p className="text-xs text-agriculture-brown mt-2">2 of 6 topics completed</p>
      </div>
    </div>
  );
};

export default SidebarTopics;
