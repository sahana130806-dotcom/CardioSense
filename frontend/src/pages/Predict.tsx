import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import PredictionForm, { type PatientData } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";

const Predict = () => {
  const [result, setResult] = useState<"high" | "low" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = useCallback(async (data: PatientData) => {
    setIsLoading(true);
    setResult(null);

    // Simulate API call — replace with Flask backend:
    // const res = await fetch("http://localhost:5000/predict", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // const json = await res.json();
    // const prediction = json.prediction;

    await new Promise((r) => setTimeout(r, 1800));

    const age = parseInt(data.age) || 0;
    const chol = parseInt(data.cholesterol) || 0;
    const prediction: "high" | "low" =
      age > 55 || chol > 250 || data.chestPainType === "asymptomatic" ? "high" : "low";

    setResult(prediction);
    setIsLoading(false);
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">New Prediction</h1>
        <p className="text-muted-foreground">Enter patient vitals for AI-powered cardiac risk assessment</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
        <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
        <PredictionResult result={result} />
      </div>
    </div>
  );
};

export default Predict;
