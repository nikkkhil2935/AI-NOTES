import { useState } from "react";
import { RotateCcw, Check, X, Star, StarOff, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  isFavorite: boolean;
  lastReviewed?: Date;
  accuracy?: number;
}

interface FlashcardGridProps {
  cards: Flashcard[];
  onCardFlip?: (cardId: string) => void;
  onCardRate?: (cardId: string, rating: "easy" | "medium" | "hard") => void;
  onCardEdit?: (cardId: string) => void;
  onCardDelete?: (cardId: string) => void;
  onCardFavorite?: (cardId: string) => void;
}

function FlashcardItem({
  card,
  onFlip,
  onRate,
  onEdit,
  onDelete,
  onFavorite,
}: {
  card: Flashcard;
  onFlip?: (cardId: string) => void;
  onRate?: (cardId: string, rating: "easy" | "medium" | "hard") => void;
  onEdit?: (cardId: string) => void;
  onDelete?: (cardId: string) => void;
  onFavorite?: (cardId: string) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.(card.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="group relative">
      <div
        className={cn(
          "relative w-full h-64 cursor-pointer transition-all duration-500 transform-gpu preserve-3d",
          isFlipped && "rotate-y-180",
        )}
        onClick={handleFlip}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side - Question */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow backface-hidden",
            "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",
          )}
        >
          <div className="flex justify-between items-start mb-4">
            <Badge
              variant="outline"
              className={getDifficultyColor(card.difficulty)}
            >
              {card.difficulty}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.(card.id);
              }}
            >
              {card.isFavorite ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-foreground font-medium leading-relaxed">
              {card.question}
            </p>
          </div>

          <div className="flex justify-between items-end">
            <Badge variant="secondary" className="text-xs">
              {card.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <RotateCcw className="h-3 w-3 mr-1" />
              Click to flip
            </div>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm rotate-y-180 backface-hidden",
            "bg-gradient-to-br from-primary/5 to-accent/50",
          )}
        >
          <div className="flex justify-between items-start mb-4">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Answer
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit?.(card.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Card
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete?.(card.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Card
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-foreground leading-relaxed">
              {card.answer}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onRate?.(card.id, "easy");
                }}
              >
                <Check className="h-4 w-4 mr-1" />
                Easy
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onRate?.(card.id, "hard");
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Hard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlashcardGrid({
  cards,
  onCardFlip,
  onCardRate,
  onCardEdit,
  onCardDelete,
  onCardFavorite,
}: FlashcardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-card rounded-xl p-8 max-w-md mx-auto">
          <div className="text-muted-foreground mb-4">
            <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No flashcards yet
          </h3>
          <p className="text-muted-foreground">
            Upload some content to get started with AI-generated flashcards
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <FlashcardItem
          key={card.id}
          card={card}
          onFlip={onCardFlip}
          onRate={onCardRate}
          onEdit={onCardEdit}
          onDelete={onCardDelete}
          onFavorite={onCardFavorite}
        />
      ))}
    </div>
  );
}
