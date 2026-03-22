import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface SalesData {
    month: string;
    sales: number;
}

interface SalesChartProps {
    data: SalesData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
    // map to include index
    const indexedData = data.map((d, i) => ({ ...d, index: i }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-black/60 border border-white/10 rounded-2xl p-4"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-[#FFFFFF]">Course Sales</h2>

                <div className="relative inline-block">
                    <select className="appearance-none bg-[#111] border border-[#2a2a2a] text-xs rounded-lg px-4 pr-8 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#48ff75] transition">
                        <option>Overall</option>
                        <option>This Year</option>
                        <option>This Month</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60" />
                </div>
            </div>

            <div style={{ width: "80%", height: 500 }}>
                <ResponsiveContainer>
                    <LineChart data={indexedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="#1D1C1F" />

                        {/* numeric axis keeps points tight together */}
                        <XAxis
                            dataKey="month"         // use the course name/initial
                            type="category"         // category axis instead of number
                            stroke="#757575"
                            interval={0}               // show all labels
                            padding={{ left: 0, right: 0 }}
                        />

                        <YAxis
                            stroke="#757575"
                            tick={{ fontSize: 12 }}
                            domain={[0, 20]}
                            ticks={[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#888",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#48ff75"
                            strokeWidth={0.5}
                            dot={{ r: 1 }}
                            isAnimationActive={true}
                            animationDuration={1200}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SalesChart;