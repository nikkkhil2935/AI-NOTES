import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const routes = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Cards", path: "/cards" },
  { name: "Analytics", path: "/analytics" },
  { name: "Profile", path: "/profile" },
  { name: "Non-existent (404)", path: "/non-existent" },
];

export function RouteTester() {
  const location = useLocation();

  return (
    <Card className="fixed bottom-4 right-4 w-64 z-50 border-2 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Route Tester</CardTitle>
        <p className="text-xs text-muted-foreground">
          Current: {location.pathname}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
              location.pathname === route.path
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
