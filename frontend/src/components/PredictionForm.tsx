import { useState } from "react";
import { Heart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PatientData {
  age: string;
  restingBP: string;
  cholesterol: string;
  maxHeartRate: string;
  fastingBS: boolean;
  chestPainType: string;
}

interface PredictionResult {
  final_prediction: number;
  rf_prediction: number;
  lstm_prediction: number;
}

const PredictionForm = () => {
  const [form, setForm] = useState<PatientData>({
    age: "",
    restingBP: "",
    cholesterol: "",
    maxHeartRate: "",
    fastingBS: false,
    chestPainType: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        age: Number(form.age),
        trestbps: Number(form.restingBP),
        chol: Number(form.cholesterol),
        thalach: Number(form.maxHeartRate),
        fbs: form.fastingBS ? 1 : 0,
        cp: mapChestPain(form.chestPainType),
      };

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Prediction:", data);

      setResult(data);

    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  const mapChestPain = (type: string) => {
    switch (type) {
      case "typical": return 0;
      case "atypical": return 1;
      case "non-anginal": return 2;
      case "asymptomatic": return 3;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex items-center gap-2 text-primary">
          <Activity className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Patient Information</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          <div className="space-y-2">
            <Label>Age</Label>
            <Input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Resting BP</Label>
            <Input
              type="number"
              value={form.restingBP}
              onChange={(e) => setForm({ ...form, restingBP: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Cholesterol</Label>
            <Input
              type="number"
              value={form.cholesterol}
              onChange={(e) => setForm({ ...form, cholesterol: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Max Heart Rate</Label>
            <Input
              type="number"
              value={form.maxHeartRate}
              onChange={(e) => setForm({ ...form, maxHeartRate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Chest Pain Type</Label>
            <Select
              value={form.chestPainType}
              onValueChange={(v) => setForm({ ...form, chestPainType: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="typical">Typical</SelectItem>
                <SelectItem value="atypical">Atypical</SelectItem>
                <SelectItem value="non-anginal">Non-Anginal</SelectItem>
                <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <Label>Fasting Blood Sugar &gt; 120</Label>
            <Switch
              checked={form.fastingBS}
              onCheckedChange={(v) => setForm({ ...form, fastingBS: v })}
            />
          </div>

        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Predict Risk"}
        </Button>

      </form>

      {/* 🔥 RESULT DISPLAY */}
      {result && (
        <div className="text-center space-y-2">

          <div className="text-lg font-semibold">
            Final Result:
            {result.final_prediction === 1 ? (
              <span className="text-red-500"> ⚠️ High Risk</span>
            ) : (
              <span className="text-green-500"> ✅ Low Risk</span>
            )}
          </div>

          <div className="text-sm">
            Random Forest: {result.rf_prediction}
          </div>

          <div className="text-sm">
            LSTM: {result.lstm_prediction}
          </div>

        </div>
      )}
    </div>
  );
};

export default PredictionForm;