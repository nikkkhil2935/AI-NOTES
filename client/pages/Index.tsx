import { Link } from "react-router-dom";
import {
  Brain,
  Upload,
  Zap,
  BarChart3,
  Star,
  ArrowRight,
  Play,
  FileText,
  Image,
  Video,
  Sparkles,
  Users,
  Trophy,
  Clock,
} from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";

const features = [
  {
    icon: Upload,
    title: "Multi-Format Upload",
    description:
      "Upload PDFs, images, videos, or YouTube links. Our AI handles the rest.",
    color: "text-blue-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description:
      "Advanced AI creates relevant questions and answers from your content.",
    color: "text-purple-500",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track your learning progress with detailed insights and heatmaps.",
    color: "text-green-500",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description:
      "Get flashcards in seconds, not hours. Lightning-fast AI processing.",
    color: "text-yellow-500",
  },
];

const stats = [
  { icon: Users, value: "10K+", label: "Active Learners" },
  { icon: Sparkles, value: "500K+", label: "Cards Generated" },
  { icon: Trophy, value: "95%", label: "Success Rate" },
  { icon: Clock, value: "< 30s", label: "Average Processing" },
];

const supportedFormats = [
  {
    icon: FileText,
    name: "PDF Documents",
    description: "Research papers, textbooks, notes",
  },
  {
    icon: Image,
    name: "Images",
    description: "Screenshots, diagrams, handwritten notes",
  },
  {
    icon: Video,
    name: "Videos",
    description: "Lectures, tutorials, YouTube content",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-card border-primary/20"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Learning Revolution
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Transform Any Content Into
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Smart Flashcards
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload PDFs, images, or YouTube videos and let our AI instantly
              generate personalized flashcards. Study smarter, not harder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <GradientButton size="xl" asChild>
                <Link to="/dashboard">
                  <Brain className="h-5 w-5 mr-2" />
                  Start Learning Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </GradientButton>

              <Button variant="outline" size="xl" className="group">
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to study effectively
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools that adapt to your learning style and help you
              master any subject.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-background/50 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Upload anything, study everything
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI processes multiple content formats to create the perfect
              study material for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {supportedFormats.map((format, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-6 rounded-2xl bg-gradient-card border border-border/50 mb-4 group-hover:scale-105 transition-transform">
                  <format.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {format.name}
                </h3>
                <p className="text-muted-foreground">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to revolutionize your learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of students who are already studying smarter with
              FlashMind. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton
                size="xl"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </GradientButton>

              <Button
                variant="ghost"
                size="xl"
                className="text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                FlashMind
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              © 2024 FlashMind. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
