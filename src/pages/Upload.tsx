
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/ui/file-upload";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = (file: File, title: string) => {
    // In a real app, this would send the file to your backend
    setIsUploading(true);
    
    // Simulate upload and processing delay
    setTimeout(() => {
      setIsUploading(false);
      // Show success message
      toast({
        title: "Upload successful!",
        description: "Your audio has been processed successfully.",
      });
      
      // Navigate to the summary page with a mock ID
      navigate("/summary/1");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-bold">Upload Audio</h1>
          <p className="text-muted-foreground">
            Convert your lectures into summaries and Q&A pairs
          </p>
        </div>
        
        <div className={`transition-opacity duration-300 ${isUploading ? "opacity-60 pointer-events-none" : ""}`}>
          <div className="flex justify-center">
            <FileUpload onFileSelect={handleFileUpload} />
          </div>
          
          <div className="mt-12 bg-accent rounded-xl p-6">
            <h3 className="font-medium text-lg mb-4">Tips for best results:</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Use clear audio recordings with minimal background noise</li>
              <li>Lectures between 30-90 minutes work best</li>
              <li>Supported formats: MP3, WAV, M4A, FLAC</li>
              <li>Maximum file size: 200MB</li>
            </ul>
          </div>
        </div>
        
        {isUploading && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-lg font-medium">Processing your audio...</div>
              <p className="text-sm text-muted-foreground">This may take a few minutes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
