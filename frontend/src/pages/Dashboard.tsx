import { useEffect, useState, useMemo } from "react";
import { Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [history, setHistory] = useState<any[]>([]);

  // 🔥 Load real data
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // ===============================
  // STATS (REAL DATA)
  // ===============================
  const stats = useMemo(() => {
    const total = history.length;
    const high = history.filter((r) => r.result === 1).length;
    const low = history.filter((r) => r.result === 0).length;

    return [
      {
        title: "Total Predictions",
        value: total.toString(),
        icon: Activity,
        color: "text-primary",
        bg: "bg-primary/10",
      },
      {
        title: "High Risk Cases",
        value: high.toString(),
        icon: AlertTriangle,
        color: "text-danger",
        bg: "bg-danger/10",
      },
      {
        title: "Low Risk Cases",
        value: low.toString(),
        icon: ShieldCheck,
        color: "text-success",
        bg: "bg-success/10",
      },
    ];
  }, [history]);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of cardiac risk predictions
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.title}
              </CardTitle>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RECENT PREDICTIONS */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">

            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No predictions yet
              </p>
            ) : (
              history.slice(0, 5).map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        r.result === 1 ? "bg-danger" : "bg-success"
                      }`}
                    />

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {r.name || "Patient"}, Age {r.age}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {r.timestamp}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      r.result === 1 ? "text-danger" : "text-success"
                    }`}
                  >
                    {r.result === 1 ? "High Risk" : "Low Risk"}
                  </span>
                </div>
              ))
            )}

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;