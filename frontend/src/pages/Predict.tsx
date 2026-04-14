import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import type { PatientData } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";

const Predict = () => {
  const [result, setResult] = useState<"high" | "low" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = useCallback(async (data: PatientData) => {
    setIsLoading(true);
    setResult(null);

    try {
      // 🔥 MAP chest pain
      const mapChestPain = (type: string) => {
        switch (type) {
          case "typical": return 0;
          case "atypical": return 1;
          case "non-anginal": return 2;
          case "asymptomatic": return 3;
          default: return 0;
        }
      };

      // 🔥 SEND TO BACKEND
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          gender: data.gender,
          age: Number(data.age),
          trestbps: Number(data.restingBP),
          chol: Number(data.cholesterol),
          thalach: Number(data.maxHeartRate),
          fbs: data.fastingBS ? 1 : 0,
          cp: mapChestPain(data.chestPainType),
        }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const res = await response.json();

      const prediction: "high" | "low" =
        res.final_prediction === 1 ? "high" : "low";

      setResult(prediction);

      // 🔥 SAVE HISTORY (global)
      const newRecord = {
        name: data.name,
        gender: data.gender,
        age: data.age,
        restingBP: data.restingBP,
        cholesterol: data.cholesterol,
        maxHeartRate: data.maxHeartRate,
        result: res.final_prediction,
        timestamp: new Date().toLocaleString(),
      };

      const existing = localStorage.getItem("history");
      const parsed = existing ? JSON.parse(existing) : [];

      localStorage.setItem("history", JSON.stringify([newRecord, ...parsed]));

    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check backend.");
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-foreground">New Prediction</h1>
        <p className="text-muted-foreground">
          Enter patient vitals for AI-powered cardiac risk assessment
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
        <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
        <PredictionResult result={result} />
      </div>

    </div>
  );
};

export default Predict;