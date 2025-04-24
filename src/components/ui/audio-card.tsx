
import { Link } from "react-router-dom";
import { FileAudio, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface AudioCardProps {
  id: string;
  title: string;
  date: string;
  duration: string;
}

const AudioCard = ({ id, title, date, duration }: AudioCardProps) => {
  return (
    <Link to={`/summary/${id}`}>
      <Card className="card-hover h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
              <FileAudio className="h-6 w-6 text-secondary" />
            </div>
            <div className="font-medium text-lg line-clamp-1">{title}</div>
          </div>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm pb-4">
          <p className="line-clamp-2">Audio summary and Q&A ready for review</p>
        </CardContent>
        <CardFooter className="border-t pt-3 text-xs text-muted-foreground flex justify-between">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <div>{duration}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AudioCard;
