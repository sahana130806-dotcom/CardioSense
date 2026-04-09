import { Heart, ShieldCheck, ShieldAlert } from "lucide-react";

interface Props {
  result: "high" | "low" | null;
}

const PredictionResult = ({ result }: Props) => {
  if (!result) return null;

  const isHigh = result === "high";

  return (
    <div
      className={`mt-6 flex items-center gap-4 rounded-xl border-2 p-5 transition-all ${
        isHigh
          ? "border-danger/30 bg-danger/5"
          : "border-success/30 bg-success/5"
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
          isHigh ? "bg-danger/15 text-danger" : "bg-success/15 text-success"
        }`}
      >
        {isHigh ? <ShieldAlert className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">Prediction Result</p>
        <p className={`text-xl font-bold ${isHigh ? "text-danger" : "text-success"}`}>
          {isHigh ? "High Risk" : "Low Risk"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isHigh
            ? "The patient may be at elevated cardiac risk. Further evaluation recommended."
            : "The patient appears to have lower cardiac risk. Continue routine monitoring."}
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;
