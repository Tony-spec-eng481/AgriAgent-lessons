import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SidebarTopics from '../components/SidebarTopics';
import IntroAudio from '../components/IntroAudio';
import { Book, Play, HelpCircle } from 'lucide-react';

const mockLessons = {
  'crop': {
    title: 'Maize Farming Mastery',
    topics: [
      { id: '1', title: 'Land Preparation', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Prepare your land by clearing weeds and plowing...', introAudio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: '2', title: 'Seed Selection', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Select high-quality certified seeds for maximum yield...', introAudio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: '3', title: 'Planting Techniques', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Proper spacing is key to avoiding competition for nutrients...', introAudio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    ]
  }
};

const LessonDetails = () => {
  const { id } = useParams();
  const lesson = (mockLessons as any)[id || 'crop'] || mockLessons['crop'];
  const [activeTopic, setActiveTopic] = useState(lesson.topics[0]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-grow space-y-8">
            <header className="bg-white p-8 rounded-3xl shadow-sm border border-agriculture-green/5">
              <h1 className="text-3xl font-bold text-agriculture-green mb-2">{lesson.title}</h1>
              <p className="text-agriculture-brown font-medium flex items-center gap-2">
                <Book className="h-4 w-4" /> Current Topic: {activeTopic.title}
              </p>
            </header>

            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-agriculture-green/10">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="w-full h-full"
                  src={activeTopic.videoUrl}
                  title={activeTopic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-agriculture-green/10 rounded-2xl">
                      <Play className="h-6 w-6 text-agriculture-green" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-agriculture-green">Lesson Notes</h2>
                      <p className="text-sm text-agriculture-brown">Synchronized study material</p>
                    </div>
                  </div>
                  <IntroAudio audioUrl={activeTopic.introAudio} />
                </div>

                <div className="prose prose-agriculture max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {activeTopic.notes}
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <button className="flex items-center gap-2 px-6 py-3 bg-agriculture-cream/50 text-agriculture-green rounded-xl font-bold transition-all hover:bg-agriculture-cream">
                     Previous Topic
                  </button>
                  <button className="flex items-center gap-2 px-8 py-3 bg-agriculture-green text-white rounded-xl font-bold transition-all hover:bg-agriculture-lightGreen shadow-md">
                    Take Quiz <HelpCircle className="h-5 w-5" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-agriculture-green text-white rounded-xl font-bold transition-all hover:bg-agriculture-lightGreen shadow-sm">
                    Next Topic
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <SidebarTopics 
              topics={lesson.topics} 
              activeTopicId={activeTopic.id} 
              onTopicSelect={(id: string) => setActiveTopic(lesson.topics.find((t: any) => t.id === id))}
            />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
