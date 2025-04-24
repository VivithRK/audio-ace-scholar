
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileAudio, Headphones } from "lucide-react";

const Summary = () => {
  const { id } = useParams<{ id: string }>();
  const [showQuestions, setShowQuestions] = useState(false);
  
  // Mock data for demonstration - in a real app this would come from an API/database
  const audioData = {
    id: id,
    title: "Introduction to Psychology",
    date: "April 20, 2025",
    duration: "45 min",
    summary: `
      This lecture introduced the fundamental concepts of psychology as a scientific discipline. 
      It began with an overview of the historical development of psychology, from philosophical 
      roots to modern scientific approaches. The lecturer discussed various schools of thought 
      including behaviorism, psychoanalysis, and cognitive psychology, highlighting how each 
      perspective contributes to our understanding of human behavior and mental processes.

      Key topics included:
      - Definition and scope of psychology
      - Major theoretical perspectives
      - Research methods in psychology
      - Ethical considerations in psychological research
      - Applications of psychology in everyday life

      The lecture emphasized the importance of empirical evidence and scientific methodology 
      in psychological studies. It also touched on how psychology intersects with other disciplines 
      such as neuroscience, sociology, and medicine.
    `,
    questions: [
      {
        question: "What are the major theoretical perspectives in psychology discussed in the lecture?",
        answer: "The lecture discussed behaviorism, psychoanalysis, and cognitive psychology as major theoretical perspectives in the field."
      },
      {
        question: "Why is empirical evidence important in psychological research?",
        answer: "Empirical evidence is important because it provides objective, measurable data that can be tested and verified, which is essential for the scientific approach that psychology follows."
      },
      {
        question: "How does psychology intersect with neuroscience?",
        answer: "Psychology intersects with neuroscience in studying how brain structures and neural processes influence behavior, emotions, and cognitive functions."
      },
      {
        question: "What ethical considerations were mentioned in psychological research?",
        answer: "Ethical considerations included obtaining informed consent from participants, ensuring privacy and confidentiality, minimizing harm, and being honest about research procedures and goals."
      },
      {
        question: "What are some applications of psychology in everyday life?",
        answer: "Applications include mental health treatment, improving educational outcomes, optimizing workplace productivity, enhancing athletic performance, and designing more user-friendly products and environments."
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
              <FileAudio className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{audioData.title}</h1>
              <p className="text-muted-foreground">
                {audioData.date} • {audioData.duration}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center bg-accent rounded-full p-1">
              <Toggle
                pressed={!showQuestions}
                onPressedChange={() => setShowQuestions(false)}
                className={`rounded-full px-4 py-2 text-sm ${!showQuestions ? 'bg-white shadow' : ''}`}
                aria-label="Show summary"
              >
                Summary
              </Toggle>
              <Toggle
                pressed={showQuestions}
                onPressedChange={() => setShowQuestions(true)}
                className={`rounded-full px-4 py-2 text-sm ${showQuestions ? 'bg-white shadow' : ''}`}
                aria-label="Show Q&A"
              >
                Q&A
              </Toggle>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Listen to Original
            </Button>
          </div>
        </div>
        
        <div className="animate-fade-in">
          {!showQuestions ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <div className="prose max-w-none">
                  {audioData.summary.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Questions & Answers</h2>
                <div className="space-y-6">
                  {audioData.questions.map((qa, i) => (
                    <div key={i} className="border-b pb-5 last:border-b-0">
                      <h3 className="font-medium text-lg mb-2">Q: {qa.question}</h3>
                      <p className="text-muted-foreground">A: {qa.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
