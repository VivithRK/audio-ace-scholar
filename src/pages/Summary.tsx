
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileAudio, Headphones } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { secondsToHMS } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface QA { question: string; answer: string }
interface AudioDetail {
  id: number;
  audio_path: string;
  summary: string;
  qa_pairs: QA[];
  created_at: string;
  duration_sec: number;
}

const Summary = () => {
  const { id } = useParams<{ id: string }>();
  const [showQuestions, setShowQuestions] = useState(false);
  
  useEffect(() => {
    console.log("Summary component mounted for ID:", id);
  }, [id]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["audio-detail", id],
    queryFn: async () => {
      console.log(`Fetching audio details for ID: ${id}`);
      try {
        const response = await axios.get<AudioDetail>(`/audio-files/${id}/`);
        console.log("Audio details fetched successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error(`Error fetching audio details for ID ${id}:`, error);
        throw error;
      }
    },
    enabled: !!id,
    onSettled: (data, error) => {
      if (error) {
        console.error("Query error in Summary:", error);
        toast({
          title: "Error loading summary",
          description: "Could not load the audio summary. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  if (isLoading) return <div className="p-10 text-center">Loading…</div>;
  if (error || !data) return <div className="p-10 text-center text-red-500">Error loading file</div>;

  // Extract filename from path for title
  const title = data.audio_path.split('/').pop() || `Audio ${id}`;
  const date = new Date(data.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
              <FileAudio className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground">
                {date} • {secondsToHMS(data.duration_sec)}
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
                  {data.summary.split('\n').map((paragraph, i) => (
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
                  {data.qa_pairs.map((qa, i) => (
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
