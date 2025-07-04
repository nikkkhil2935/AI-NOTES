import { useState } from "react";
import {
  Upload,
  Brain,
  BarChart3,
  Filter,
  Search,
  Plus,
  TrendingUp,
  Clock,
  Star,
  Target,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { UploadZone } from "@/components/dashboard/upload-zone";
import { FlashcardGrid } from "@/components/dashboard/flashcard-grid";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const mockFlashcards = [
  {
    id: "1",
    question:
      "What is the primary function of mitochondria in cellular biology?",
    answer:
      "Mitochondria are the powerhouses of the cell, responsible for producing ATP through cellular respiration.",
    category: "Biology",
    difficulty: "medium" as const,
    isFavorite: true,
    lastReviewed: new Date(),
    accuracy: 85,
  },
  {
    id: "2",
    question: "Explain the concept of Big O notation in computer science.",
    answer:
      "Big O notation describes the upper bound of time or space complexity of algorithms, helping analyze their efficiency as input size grows.",
    category: "Computer Science",
    difficulty: "hard" as const,
    isFavorite: false,
    lastReviewed: new Date(),
    accuracy: 72,
  },
  {
    id: "3",
    question: "What year did World War II end?",
    answer:
      "World War II ended in 1945, with Germany surrendering in May and Japan surrendering in September.",
    category: "History",
    difficulty: "easy" as const,
    isFavorite: false,
    lastReviewed: new Date(),
    accuracy: 95,
  },
];

const mockStats = [
  { icon: Brain, label: "Total Cards", value: "324", change: "+12%" },
  { icon: Target, label: "Accuracy", value: "87%", change: "+5%" },
  { icon: Clock, label: "Study Time", value: "2.5h", change: "+15%" },
  { icon: TrendingUp, label: "Streak", value: "7 days", change: "🔥" },
];

export default function Dashboard() {
  const [isUploading, setIsUploading] = useState(false);
  const [flashcards, setFlashcards] = useState(mockFlashcards);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const handleUpload = async (files: File[] | string) => {
    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      // In a real app, this would add new flashcards from the API response
    }, 3000);
  };

  const filteredCards = flashcards.filter((card) => {
    const matchesSearch =
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      card.category.toLowerCase() === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || card.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = Array.from(
    new Set(flashcards.map((card) => card.category)),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey with AI-powered flashcards
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <stat.icon className="h-5 w-5 text-primary mb-1" />
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Content
              </TabsTrigger>
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                My Cards ({flashcards.length})
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-8">
              <Card className="border-dashed border-2 border-primary/20 bg-gradient-card">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-foreground">
                    <Upload className="h-5 w-5" />
                    Create New Flashcards
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Upload your study materials and let AI generate personalized
                    flashcards
                  </p>
                </CardHeader>
                <CardContent>
                  <UploadZone
                    onUpload={handleUpload}
                    isUploading={isUploading}
                  />
                </CardContent>
              </Card>

              {/* Recent Uploads */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Recent Uploads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Biology Chapter 5.pdf",
                        cards: 24,
                        status: "Completed",
                      },
                      {
                        name: "Machine Learning Lecture.mp4",
                        cards: 18,
                        status: "Processing",
                      },
                      {
                        name: "History Notes.png",
                        cards: 12,
                        status: "Completed",
                      },
                    ].map((upload, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {upload.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {upload.cards} cards generated
                          </p>
                        </div>
                        <Badge
                          variant={
                            upload.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {upload.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search flashcards..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full lg:w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedDifficulty}
                      onValueChange={setSelectedDifficulty}
                    >
                      <SelectTrigger className="w-full lg:w-48">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>

                    <GradientButton className="w-full lg:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Manual
                    </GradientButton>
                  </div>
                </CardContent>
              </Card>

              {/* Flashcards Grid */}
              <FlashcardGrid
                cards={filteredCards}
                onCardFlip={(cardId) => console.log("Flipped card:", cardId)}
                onCardRate={(cardId, rating) =>
                  console.log("Rated card:", cardId, rating)
                }
                onCardEdit={(cardId) => console.log("Edit card:", cardId)}
                onCardDelete={(cardId) => {
                  setFlashcards((cards) =>
                    cards.filter((card) => card.id !== cardId),
                  );
                }}
                onCardFavorite={(cardId) => {
                  setFlashcards((cards) =>
                    cards.map((card) =>
                      card.id === cardId
                        ? { ...card, isFavorite: !card.isFavorite }
                        : card,
                    ),
                  );
                }}
              />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Analytics dashboard coming soon!</p>
                        <p className="text-sm">
                          Track your learning progress and performance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Performance Heatmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Heatmap visualization coming soon!</p>
                        <p className="text-sm">
                          See your strengths and weaknesses
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
