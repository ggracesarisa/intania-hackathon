"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CourseData {
  timeSpent: string;
  accuracy: string;
}

interface CourseStats {
  [key: string]: CourseData;
}

const courseStats: CourseStats = {
  "Prog meth": { timeSpent: "7 hours 4 mins", accuracy: "89%" },
  "Prob Stat": { timeSpent: "2 hours 0 mins", accuracy: "60%" },
  "Discrete Math": { timeSpent: "1 hour 30 mins", accuracy: "20%" },
  "Data Structure": { timeSpent: "3 hours 10 mins", accuracy: "85%" },
};

const parseTime = (timeStr: string): number => {
  if (!timeStr) return 0;

  try {
    if (timeStr.includes("hours")) {
      const [hoursPart, minsPart] = timeStr.split(" hours ");
      const hours = parseInt(hoursPart) || 0;
      const mins = parseInt(minsPart.replace(" mins", "")) || 0;
      return hours * 60 + mins;
    } else if (timeStr.includes("hour")) {
      const [hoursPart, minsPart] = timeStr.split(" hour ");
      const hours = parseInt(hoursPart) || 0;
      const mins = parseInt(minsPart.replace(" mins", "")) || 0;
      return hours * 60 + mins;
    } else if (timeStr.includes("mins")) {
      const mins = parseInt(timeStr.replace(" mins", "")) || 0;
      return mins;
    }
    return 0;
  } catch (error) {
    console.error("Error parsing time:", timeStr, error);
    return 0;
  }
};

const totalTimeSpent = Object.values(courseStats).reduce(
  (acc, data) => acc + parseTime(data.timeSpent),
  0,
);

const pieData = Object.entries(courseStats).map(([course, data]) => ({
  name: course,
  value: parseTime(data.timeSpent),
  percentage:
    totalTimeSpent > 0 ? (parseTime(data.timeSpent) / totalTimeSpent) * 100 : 0,
  timeSpent: data.timeSpent,
}));

const barData = Object.entries(courseStats).map(([course, data]) => ({
  name: course,
  accuracy: parseInt(data.accuracy.replace("%", "")) || 0,
}));

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

export default function ChartsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="#888888"
          opacity={0.6}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="mx-auto max-w-full p-5">
      {/* Banner */}
      <div className="relative mb-10 max-h-[400px] w-full overflow-hidden">
        <Image
          src="/img/evergrow.png"
          alt="Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-3xl font-bold text-white md:text-5xl">
          self discovery
        </div>
      </div>

      {/* Time Spent Chart with Box */}
      <div className="mx-auto mb-5 w-full max-w-[800px] rounded-[15px] bg-[#FFE4C4] p-[15px] shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-lg font-bold md:text-2xl">
            time spent chart
          </h1>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={false}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const { name, percentage, timeSpent } = payload[0]
                    .payload as {
                    name: string;
                    percentage: number;
                    timeSpent: string;
                  };
                  return (
                    <div className="rounded border bg-white shadow">
                      <h4 className="font-bold">{name}</h4>
                      <p>Time Spent: {timeSpent}</p>
                      <p>Percentage: {percentage.toFixed(1)}%</p>
                    </div>
                  );
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 w-full border-t-2 border-gray-300"></div>

      {/* Accuracy Chart with Box */}
      <div className="mx-auto mb-5 w-full max-w-[800px] rounded-[15px] bg-[#FFE4C4] p-[15px] shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="mb-3 text-center text-lg font-bold md:text-2xl">
            accuracy chart
          </h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#D8A7A7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 w-full border-t-2 border-gray-300"></div>

      {/* Suggestion Box */}
      <div className="mx-auto w-full max-w-[800px] rounded-[15px] bg-[#FFE4C4] p-5 shadow-md">
        <h3 className="mb-2 text-lg font-bold">suggestion</h3>
        <p>
          You spent the least amount of time <br />
          on <span className="font-semibold">Discrete Math</span> and the
          accuracy is <span className="font-semibold">20%</span>
        </p>
        <p className="mt-2 font-semibold text-red-600">
          Try spending more time on "Discrete Math" to improve your
          understanding
        </p>
      </div>
    </div>
  );
}
