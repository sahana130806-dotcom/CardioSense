import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import PredictionForm, { type PatientData } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import PredictionHistory, { type PredictionRecord } from "@/components/PredictionHistory";
import { Heart } from "lucide-react";

const Index = () => {
  const [result, setResult] = useState<"high" | "low" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PredictionRecord[]>([]);

  const handlePredict = useCallback(async (data: PatientData) => {
    setIsLoading(true);
    setResult(null);

    // Simulate API call — replace with actual Flask backend call:
    // const res = await fetch("http://localhost:5000/predict", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // const json = await res.json();
    // const prediction = json.prediction; // "high" | "low"

    await new Promise((r) => setTimeout(r, 1800));

    // Mock logic based on inputs
    const age = parseInt(data.age) || 0;
    const chol = parseInt(data.cholesterol) || 0;
    const prediction: "high" | "low" =
      age > 55 || chol > 250 || data.chestPainType === "asymptomatic"
        ? "high"
        : "low";

    setResult(prediction);
    setHistory((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        age: data.age,
        cholesterol: data.cholesterol,
        maxHeartRate: data.maxHeartRate,
        result: prediction,
      },
      ...prev,
    ]);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Hero blurb */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Heart Disease Risk Assessment
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Enter patient vitals below to get an AI-powered cardiac risk prediction in seconds.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            <PredictionResult result={result} />
          </div>

          {/* History */}
          <div className="mt-10">
            <PredictionHistory records={history} />
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Cardiac Risk Predictor — For educational purposes only
      </footer>
    </div>
  );
};

export default Index;
