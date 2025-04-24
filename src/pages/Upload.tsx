
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/ui/file-upload";
import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = async (file: File, title: string) => {
    setIsUploading(true);
    console.log("Starting upload process for:", file.name);
    
    try {
      const formData = new FormData();
      formData.append('audio_file', file);
      formData.append('name', title);
      
      console.log("Sending to backend:", { fileName: file.name, fileSize: file.size, title });
      
      const response = await axios.post('/STT/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Upload successful, response:", response.data);

      toast({
        title: "Upload successful!",
        description: "Your audio has been processed successfully.",
      });
      
      // Navigate to the summary page with the actual ID from response
      navigate(`/summary/${response.data.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your audio file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
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
