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

interface Props {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

const PredictionForm = ({ onPredict, isLoading }: Props) => {
  const [form, setForm] = useState<PatientData>({
    age: "",
    restingBP: "",
    cholesterol: "",
    maxHeartRate: "",
    fastingBS: false,
    chestPainType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Activity className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Patient Information</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g. 55"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bp">Resting Blood Pressure (mm Hg)</Label>
          <Input
            id="bp"
            type="number"
            placeholder="e.g. 130"
            value={form.restingBP}
            onChange={(e) => setForm({ ...form, restingBP: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chol">Cholesterol (mg/dL)</Label>
          <Input
            id="chol"
            type="number"
            placeholder="e.g. 240"
            value={form.cholesterol}
            onChange={(e) => setForm({ ...form, cholesterol: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hr">Maximum Heart Rate</Label>
          <Input
            id="hr"
            type="number"
            placeholder="e.g. 150"
            value={form.maxHeartRate}
            onChange={(e) => setForm({ ...form, maxHeartRate: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chest">Chest Pain Type</Label>
          <Select
            value={form.chestPainType}
            onValueChange={(v) => setForm({ ...form, chestPainType: v })}
            required
          >
            <SelectTrigger id="chest">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typical">Typical Angina</SelectItem>
              <SelectItem value="atypical">Atypical Angina</SelectItem>
              <SelectItem value="non-anginal">Non-Anginal Pain</SelectItem>
              <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
          <Label htmlFor="fbs" className="cursor-pointer">Fasting Blood Sugar &gt; 120 mg/dL</Label>
          <Switch
            id="fbs"
            checked={form.fastingBS}
            onCheckedChange={(v) => setForm({ ...form, fastingBS: v })}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="relative flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary-foreground/40 animate-pulse-ring" />
              <Heart className="relative h-5 w-5 animate-heartbeat" />
            </span>
            Analyzing…
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
