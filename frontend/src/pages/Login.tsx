import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  const user = localStorage.getItem("cardiosense_user");
  if (user) navigate("/dashboard");
}, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 Basic validation
    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      // simulate API delay
      await new Promise((r) => setTimeout(r, 800));

      // 🔥 store user
      const user = {
        name: isSignUp ? name : "Doctor",
        email,
      };

      localStorage.setItem("cardiosense_user", JSON.stringify(user));

      // 🔥 redirect
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">

      {/* background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-elevated">
            <Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CardioSense</h1>
          <p className="mt-1 text-muted-foreground">
            AI-powered Cardiac Risk Prediction
          </p>
        </div>

        {/* card */}
        <div className="rounded-2xl border bg-card p-8 shadow-elevated">

          <h2 className="mb-6 text-xl font-semibold text-foreground">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME (signup only) */}
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dr. Jane Smith"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="doctor@hospital.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTON */}
            <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Heart className="h-5 w-5 animate-pulse" />
                  {isSignUp ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {isSignUp ? "Sign Up" : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

          </form>

          {/* toggle */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="font-medium text-primary hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

        </div>

        {/* footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CardioSense — For educational purposes only
        </p>

      </div>
    </div>
  );
};

export default Login;