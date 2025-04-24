
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AudioCard from "@/components/ui/audio-card";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration - in a real app this would come from an API/database
  const mockAudios = [
    { id: "1", title: "Introduction to Psychology", date: "Apr 20, 2025", duration: "45 min" },
    { id: "2", title: "Advanced Mathematics Lecture 3", date: "Apr 18, 2025", duration: "60 min" },
    { id: "3", title: "History of Art - Renaissance Period", date: "Apr 15, 2025", duration: "55 min" },
    { id: "4", title: "Organic Chemistry Fundamentals", date: "Apr 12, 2025", duration: "70 min" },
    { id: "5", title: "Modern Literature Analysis", date: "Apr 10, 2025", duration: "65 min" },
    { id: "6", title: "Economics 101 - Market Structures", date: "Apr 5, 2025", duration: "50 min" },
  ];
  
  const filteredAudios = mockAudios.filter(audio => 
    audio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {filteredAudios.map((audio, index) => (
              <div 
                key={audio.id}
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AudioCard {...audio} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
