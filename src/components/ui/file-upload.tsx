
import { useState, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File, title: string) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (!file.type.includes("audio")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file",
        variant: "destructive",
      });
      return;
    }
    setFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your audio",
        variant: "destructive",
      });
      return;
    }
    
    onFileSelect(file, title);
  };

  return (
    <div className="w-full max-w-md">
      <Card 
        className={`border-2 border-dashed p-6 ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        } transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <Upload 
            className={`h-10 w-10 mb-4 ${file ? "text-primary" : "text-muted-foreground"}`} 
            aria-hidden="true"
          />
          
          <div className="space-y-2">
            <h3 className="font-medium text-xl">Upload Audio File</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to browse
            </p>
          </div>
          
          <div className="mt-6 w-full">
            <Label htmlFor="audio-file" className="sr-only">
              Choose file
            </Label>
            <Input
              id="audio-file"
              type="file"
              accept="audio/*"
              className="cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </Card>

      {file && (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for your audio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            Selected file: <span className="font-medium text-foreground">{file.name}</span>
          </div>
          
          <Button className="w-full" onClick={handleSubmit}>
            Process Audio
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
