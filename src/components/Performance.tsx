"use client";

import Image from "next/image";
import { Pie, PieChart } from "recharts";

// #region Sample data
const data = [
  { name: "Group A", value: 92, fill: "#c3ebfa" },
  { name: "Group B", value: 6, fill: "#fae27c" },
];

const Performance = () => {
  const isAnimationActive = true;
  return (
    <div className="bg-white p-4 rounded-md h-80 relative flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="" width={16} height={16} className="" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <PieChart style={{ width: "100%", maxWidth: "500px", height: "100%" }}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="100%"
            fill="#8884d8"
            isAnimationActive={isAnimationActive}
          />
        </PieChart>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">92%</h1>
        {/*LTS: LamaTotalScore */}
        <p className="text-xs text-gray-300">of 10 max LST</p>
      </div>
      <h2 className="font-mediun absolute bottom-16 left-0 right-0 m-auto text-center">
        1st Semester - 2nd semester
      </h2>
    </div>
  );
};

export default Performance;