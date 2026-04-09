import { Heart, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("cardiosense_user");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-card/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="mr-1" />
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">CardioSense</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/profile")}>
          <User className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default AppNavbar;
