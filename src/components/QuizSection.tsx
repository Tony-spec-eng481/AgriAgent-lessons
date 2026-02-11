const QuizSection = ({ topicId }: { topicId: string }) => {
  console.log('Quiz for topic:', topicId);
  return (
     <div className="bg-white p-8 rounded-3xl shadow-sm border border-agriculture-green/10 mt-8">
        <h3 className="text-2xl font-bold text-agriculture-green mb-6">Topic Quiz</h3>
        {/* Quiz implementation will go here */}
        <p className="text-gray-500 italic">Complete the video and notes to unlock the quiz.</p>
     </div>
  );
};

export default QuizSection;
