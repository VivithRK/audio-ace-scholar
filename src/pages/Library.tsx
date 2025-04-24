
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AudioCard from "@/components/ui/audio-card";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface AudioFile {
  id: string;
  audio_path: string;
  text_file_path: string;
  created_at: string;
}

const fetchAudioFiles = async () => {
  const response = await axios.get('/api/audio-files/');
  return response.data;
};

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: audioFiles = [], isLoading, error } = useQuery({
    queryKey: ['audioFiles'],
    queryFn: fetchAudioFiles,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const calculateDuration = (path: string) => {
    // This would ideally come from audio metadata
    return "45 min"; // Placeholder duration
  };
  
  const filteredAudios = audioFiles.filter((audio: AudioFile) => 
    audio.audio_path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center text-red-500">Error loading audio files</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Library</h1>
            <p className="text-muted-foreground mt-1">Access all your summarized audio files</p>
          </div>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search summaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {filteredAudios.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-accent inline-flex rounded-full p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-medium">No results found</h2>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAudios.map((audio: AudioFile) => (
              <div 
                key={audio.id}
                className="animate-fade-in"
              >
                <AudioCard 
                  id={audio.id}
                  title={audio.audio_path.split('/').pop() || 'Untitled'} 
                  date={formatDate(audio.created_at)}
                  duration={calculateDuration(audio.audio_path)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
