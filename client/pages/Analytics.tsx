import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                This page will contain detailed learning analytics, performance
                graphs, and progress tracking features. Coming soon!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
