import { useState, useCallback } from "react";
import Navbar from "@/components/AppNavbar";
import PredictionForm, { type PatientData } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { Heart } from "lucide-react";

const Index = () => {
  const [result, setResult] = useState<"high" | "low" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = useCallback(async (data: PatientData) => {
    setIsLoading(true);
    setResult(null);

    try {
      // 🔥 CALL BACKEND
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

      // 🔥 SAVE TO LOCAL STORAGE
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

    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend.");
    }

    setIsLoading(false);
  }, []);

  // 🔥 chest pain mapping
  const mapChestPain = (type: string) => {
    switch (type) {
      case "typical":
        return 0;
      case "atypical":
        return 1;
      case "non-anginal":
        return 2;
      case "asymptomatic":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-3xl px-4">

          {/* HERO */}
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

          {/* FORM */}
          <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            <PredictionResult result={result} />
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