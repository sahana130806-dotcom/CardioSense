import { Activity, AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockHistory } from "@/lib/mock-data";

const stats = [
  {
    title: "Total Predictions",
    value: mockHistory.length.toString(),
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "High Risk Cases",
    value: mockHistory.filter((r) => r.result === "high").length.toString(),
    icon: AlertTriangle,
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    title: "Low Risk Cases",
    value: mockHistory.filter((r) => r.result === "low").length.toString(),
    icon: ShieldCheck,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    title: "Accuracy Rate",
    value: "94.2%",
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const Dashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground">Overview of cardiac risk predictions</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.title} className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
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

    {/* Recent predictions */}
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Recent Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockHistory.slice(0, 5).map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${r.result === "high" ? "bg-danger" : "bg-success"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">Patient, Age {r.age}</p>
                  <p className="text-xs text-muted-foreground">{r.date} at {r.timestamp}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${r.result === "high" ? "text-danger" : "text-success"}`}>
                {r.result === "high" ? "High Risk" : "Low Risk"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
