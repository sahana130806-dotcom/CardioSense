import { useState, useMemo } from "react";
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
import { mockHistory } from "@/lib/mock-data";

const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return mockHistory.filter((r) => {
      const matchesFilter = filter === "all" || r.result === filter;
      const matchesSearch =
        !search ||
        r.age.includes(search) ||
        r.cholesterol.includes(search) ||
        r.date.includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Prediction History</h1>
        <p className="text-muted-foreground">Review all past cardiac risk predictions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by age, cholesterol, date…"
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-16 text-center shadow-card">
          <FileText className="mb-3 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">No predictions found</p>
          <p className="text-sm text-muted-foreground/70">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>BP</TableHead>
                <TableHead>Cholesterol</TableHead>
                <TableHead>Max HR</TableHead>
                <TableHead>Chest Pain</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r, i) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell className="text-muted-foreground">{r.timestamp}</TableCell>
                  <TableCell>{r.age}</TableCell>
                  <TableCell>{r.restingBP}</TableCell>
                  <TableCell>{r.cholesterol}</TableCell>
                  <TableCell>{r.maxHeartRate}</TableCell>
                  <TableCell className="capitalize">{r.chestPainType}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={r.result === "high" ? "destructive" : "default"}
                      className={r.result === "low" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
                    >
                      {r.result === "high" ? "High Risk" : "Low Risk"}
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
