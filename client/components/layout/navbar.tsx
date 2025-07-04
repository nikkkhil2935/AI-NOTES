import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X, Zap, User } from "lucide-react";
import { useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "My Cards", href: "/cards" },
  { name: "Analytics", href: "/analytics" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isHomePage
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <Zap className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FlashMind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isHomePage && (
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
              <GradientButton size="sm">
                {isHomePage ? "Get Started" : "Upgrade"}
              </GradientButton>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 mt-2 py-4">
            <div className="flex flex-col space-y-3">
              {!isHomePage &&
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                      location.pathname === item.href
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-primary hover:bg-accent",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="ghost" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <GradientButton className="w-full">
                  {isHomePage ? "Get Started" : "Upgrade"}
                </GradientButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
