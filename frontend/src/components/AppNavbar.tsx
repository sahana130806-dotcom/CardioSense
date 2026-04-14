import { Heart, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AppNavbar = () => {
  const navigate = useNavigate();

  // 🔥 Get logged-in user
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("cardiosense_user") || "{}");
    } catch {
      return {};
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("cardiosense_user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-card/80 px-4 backdrop-blur-md">

      {/* LEFT */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="mr-1" />

        

        <span className="text-lg font-bold tracking-tight text-foreground">
          CardioSense
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* 👤 USER NAME */}
        <span className="hidden text-sm text-muted-foreground sm:block">
          {user?.name || "Doctor"}
        </span>

        {/* PROFILE */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => navigate("/profile")}
        >
          <User className="h-5 w-5" />
        </Button>

        {/* LOGOUT */}
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>

      </div>
    </header>
  );
};

export default AppNavbar;