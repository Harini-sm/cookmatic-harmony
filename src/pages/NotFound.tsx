
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="glass text-center p-8 rounded-xl max-w-md mx-auto">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl mb-8">Oops! This page is not on our menu.</p>
          <Link to="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" /> Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
