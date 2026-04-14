import { useState } from "react";
import { Activity, Heart } from "lucide-react";
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

// ✅ EXPORT TYPE (VERY IMPORTANT)
export interface PatientData {
  name: string;
  gender: string;
  age: string;
  restingBP: string;
  cholesterol: string;
  maxHeartRate: string;
  fastingBS: boolean;
  chestPainType: string;
}

interface Props {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

const PredictionForm = ({ onPredict, isLoading }: Props) => {
  const [form, setForm] = useState<PatientData>({
    name: "",
    gender: "",
    age: "",
    restingBP: "",
    cholesterol: "",
    maxHeartRate: "",
    fastingBS: false,
    chestPainType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(form); // 🔥 send to Index.tsx
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="flex items-center gap-2 text-primary">
        <Activity className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Patient Information</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        {/* NAME */}
        <div className="space-y-2">
          <Label>Patient Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter name"
            required
          />
        </div>

        {/* GENDER */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={form.gender}
            onValueChange={(v) => setForm({ ...form, gender: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AGE */}
        <div className="space-y-2">
          <Label>Age</Label>
          <Input
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </div>

        {/* BP */}
        <div className="space-y-2">
          <Label>Resting BP</Label>
          <Input
            type="number"
            value={form.restingBP}
            onChange={(e) => setForm({ ...form, restingBP: e.target.value })}
            required
          />
        </div>

        {/* CHOL */}
        <div className="space-y-2">
          <Label>Cholesterol</Label>
          <Input
            type="number"
            value={form.cholesterol}
            onChange={(e) => setForm({ ...form, cholesterol: e.target.value })}
            required
          />
        </div>

        {/* HR */}
        <div className="space-y-2">
          <Label>Max Heart Rate</Label>
          <Input
            type="number"
            value={form.maxHeartRate}
            onChange={(e) => setForm({ ...form, maxHeartRate: e.target.value })}
            required
          />
        </div>

        {/* CHEST PAIN */}
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

        {/* FBS */}
        <div className="flex items-center justify-between border px-4 py-3 rounded">
          <Label>Fasting Blood Sugar &gt; 120</Label>
          <Switch
            checked={form.fastingBS}
            onCheckedChange={(v) => setForm({ ...form, fastingBS: v })}
          />
        </div>

      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Heart className="h-5 w-5 animate-pulse" />
            Analyzing...
          </>
        ) : (
          <>
            <Heart className="h-5 w-5" />
            Predict Risk
          </>
        )}
      </Button>

    </form>
  );
};

export default PredictionForm;