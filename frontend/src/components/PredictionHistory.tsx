import { History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface PredictionRecord {
  id: number;
  timestamp: string;
  age: string;
  cholesterol: string;
  maxHeartRate: string;
  result: "high" | "low";
}

interface Props {
  records: PredictionRecord[];
}

const PredictionHistory = ({ records }: Props) => {
  if (records.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <History className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Prediction History</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Cholesterol</TableHead>
              <TableHead>Max HR</TableHead>
              <TableHead className="text-right">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((r, i) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium text-muted-foreground">{records.length - i}</TableCell>
                <TableCell className="text-muted-foreground">{r.timestamp}</TableCell>
                <TableCell>{r.age}</TableCell>
                <TableCell>{r.cholesterol}</TableCell>
                <TableCell>{r.maxHeartRate}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={r.result === "high" ? "destructive" : "default"}
                    className={
                      r.result === "low"
                        ? "bg-success text-success-foreground hover:bg-success/90"
                        : ""
                    }
                  >
                    {r.result === "high" ? "High Risk" : "Low Risk"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PredictionHistory;
