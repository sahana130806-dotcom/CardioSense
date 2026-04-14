import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Analytics = () => {
  const [history, setHistory] = useState<any[]>([]);

  // 🔥 Load real data
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // ===============================
  // DATA TRANSFORMATIONS
  // ===============================

  // 1. Vitals progression
  const vitalsData = useMemo(() => {
    return history.map((h, i) => ({
      day: i + 1,
      heartRate: Number(h.maxHeartRate),
      bloodPressure: Number(h.restingBP),
      cholesterol: Number(h.cholesterol),
    }));
  }, [history]);

  // 2. Risk distribution
  const riskDistribution = useMemo(() => {
    return [
      {
        name: "High Risk",
        value: history.filter((h) => h.result === 1).length,
        fill: "hsl(0 72% 55%)",
      },
      {
        name: "Low Risk",
        value: history.filter((h) => h.result === 0).length,
        fill: "hsl(152 55% 42%)",
      },
    ];
  }, [history]);

  // 3. Monthly predictions
  const monthlyPredictions = useMemo(() => {
    const data: any = {};

    history.forEach((h) => {
      const month = new Date(h.timestamp).toLocaleString("default", {
        month: "short",
      });

      if (!data[month]) {
        data[month] = { month, high: 0, low: 0 };
      }

      if (h.result === 1) data[month].high++;
      else data[month].low++;
    });

    return Object.values(data);
  }, [history]);

  // 4. Heart rate trend
  const heartRateTrend = useMemo(() => {
    return history.map((h, i) => ({
      time: i + 1,
      rate: Number(h.maxHeartRate),
    }));
  }, [history]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Visual insights from cardiac risk predictions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Vitals Progression */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">
              Patient Vitals Progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="heartRate" stroke="hsl(0 72% 55%)" name="Heart Rate" />
                <Line type="monotone" dataKey="bloodPressure" stroke="hsl(211 65% 45%)" name="Blood Pressure" />
                <Line type="monotone" dataKey="cholesterol" stroke="hsl(45 90% 50%)" name="Cholesterol" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Predictions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">
              Monthly Predictions: High vs Low Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" fill="hsl(0 72% 55%)" name="High Risk" />
                <Bar dataKey="low" fill="hsl(152 55% 42%)" name="Low Risk" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Heart Rate Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">
              Heart Rate Trend Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={heartRateTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(0 72% 55%)"
                  fill="hsl(0 72% 55% / 0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Analytics;