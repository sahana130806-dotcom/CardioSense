import { useEffect, useState } from "react";
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

interface PredictionRecord {
  id: number;
  name: string;
  gender: string;
  timestamp: string;
  age: string;
  cholesterol: string;
  maxHeartRate: string;
  result: number; // 1 or 0
}

const PredictionHistory = () => {
  const [records, setRecords] = useState<PredictionRecord[]>([]);

  // 🔥 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      const parsed = JSON.parse(saved);

      // add IDs if not present
      const withIds = parsed.map((item: any, index: number) => ({
        id: index + 1,
        ...item,
      }));

      setRecords(withIds);
    }
  }, []);

  // ✅ Empty state
  if (records.length === 0) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        No prediction history available
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-primary">
        <History className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Prediction History</h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
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
                <TableCell className="text-muted-foreground">
                  {records.length - i}
                </TableCell>

                <TableCell className="font-medium">
                  {r.name || "N/A"}
                </TableCell>

                <TableCell>
                  {r.gender || "N/A"}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {r.timestamp}
                </TableCell>

                <TableCell>{r.age}</TableCell>
                <TableCell>{r.cholesterol}</TableCell>
                <TableCell>{r.maxHeartRate}</TableCell>

                <TableCell className="text-right">
                  <Badge
                    variant={r.result === 1 ? "destructive" : "default"}
                    className={
                      r.result === 0
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : ""
                    }
                  >
                    {r.result === 1 ? "⚠️ High Risk" : "✅ Low Risk"}
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