
import { Link } from "react-router-dom";
import { FileAudio, Upload, List, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: <FileAudio className="h-8 w-8 text-primary" />,
      title: "Audio Summaries",
      description: "Convert your lecture recordings into concise, easy-to-review summaries"
    },
    {
      icon: <List className="h-8 w-8 text-primary" />,
      title: "Q&A Generation",
      description: "Get AI-generated questions and answers to test your understanding"
    },
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Simple Uploads",
      description: "Just upload your audio files and get instant study materials"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-fade-in">
        <div className="inline-block p-2 bg-accent rounded-full text-accent-foreground font-medium text-sm mb-2">
          Study smarter, not harder
        </div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto">
          Transform your lecture recordings into 
          <span className="student-gradient bg-clip-text text-transparent"> study notes</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your audio lectures and get instant summaries and Q&A pairs to help you study more effectively.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="font-semibold">
            <Link to="/upload">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/library">View Library</Link>
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Our AI-powered platform makes it easy to create study materials from your lectures
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
              <CardContent className="pt-6 space-y-2 text-center">
                <div className="mx-auto bg-accent rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-accent p-12 rounded-3xl text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to ace your studies?</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Start converting your lectures into comprehensive study materials today.
        </p>
        <Button asChild size="lg" className="font-semibold animate-bounce-small">
          <Link to="/upload">
            Upload Your First Lecture
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
