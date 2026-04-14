import { useState, useMemo, useEffect } from "react";
import { Search, Filter, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [records, setRecords] = useState<any[]>([]);

  // 🔥 LOAD REAL DATA
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  // 🔍 FILTER + SEARCH
  const filtered = useMemo(() => {
    return records.filter((r) => {
      const query = search.toLowerCase();

      const matchesFilter =
        filter === "all" ||
        (filter === "high" && r.result === 1) ||
        (filter === "low" && r.result === 0);

      const matchesSearch =
        !search ||
        r.name?.toLowerCase().includes(query) ||
        r.gender?.toLowerCase().includes(query) ||
        r.age?.toString().includes(query) ||
        r.cholesterol?.toString().includes(query) ||
        r.maxHeartRate?.toString().includes(query) ||
        r.timestamp?.toLowerCase().includes(query) ||
        (r.result === 1 ? "high" : "low").includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, filter, records]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Prediction History
        </h1>
        <p className="text-muted-foreground">
          Review all past cardiac risk predictions
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* SEARCH */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, gender, age, result..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>

      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-16 text-center shadow-card">
          <FileText className="mb-3 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">
            No predictions found
          </p>
          <p className="text-sm text-muted-foreground/70">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>BP</TableHead>
                <TableHead>Cholesterol</TableHead>
                <TableHead>Max HR</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((r, i) => (
                <TableRow key={i}>

                  <TableCell className="text-muted-foreground">
                    {i + 1}
                  </TableCell>

                  <TableCell className="font-medium">
                    {r.name || "N/A"}
                  </TableCell>

                  <TableCell>{r.gender || "N/A"}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {r.timestamp}
                  </TableCell>

                  <TableCell>{r.age}</TableCell>
                  <TableCell>{r.restingBP}</TableCell>
                  <TableCell>{r.cholesterol}</TableCell>
                  <TableCell>{r.maxHeartRate}</TableCell>

                  <TableCell className="text-right">
                    <Badge
                      variant={r.result === 1 ? "destructive" : "default"}
                      className={
                        r.result === 0
                          ? "bg-green-500 text-white"
                          : ""
                      }
                    >
                      {r.result === 1
                        ? "⚠️ High Risk"
                        : "✅ Low Risk"}
                    </Badge>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;