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
import {
  mockVitalsProgression,
  mockRiskDistribution,
  mockMonthlyPredictions,
  mockHeartRateTrend,
} from "@/lib/mock-data";

const Analytics = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
      <p className="text-muted-foreground">Visual insights from cardiac risk predictions</p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Vitals Progression Line Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Patient Vitals Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockVitalsProgression}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0 0% 100%)",
                  border: "1px solid hsl(214 20% 90%)",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="heartRate" stroke="hsl(0 72% 55%)" name="Heart Rate" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="bloodPressure" stroke="hsl(211 65% 45%)" name="Blood Pressure" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="cholesterol" stroke="hsl(45 90% 50%)" name="Cholesterol" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution Pie Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={mockRiskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockRiskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Predictions Bar Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Monthly Predictions: High vs Low Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockMonthlyPredictions}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0 0% 100%)",
                  border: "1px solid hsl(214 20% 90%)",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                }}
              />
              <Legend />
              <Bar dataKey="high" fill="hsl(0 72% 55%)" name="High Risk" radius={[4, 4, 0, 0]} />
              <Bar dataKey="low" fill="hsl(152 55% 42%)" name="Low Risk" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Heart Rate Trend Area Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Heart Rate Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockHeartRateTrend}>
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0 72% 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0 72% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0 0% 100%)",
                  border: "1px solid hsl(214 20% 90%)",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="rate" stroke="hsl(0 72% 55%)" fill="url(#heartGradient)" name="Heart Rate (bpm)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Analytics;
