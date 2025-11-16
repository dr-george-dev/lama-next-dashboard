"use client"
import Image from "next/image"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// #region Sample data
const data = [
    {
        name: 'Jan',
        income: 4000,
        expense: 2400,

    },
    {
        name: 'Feb',
        income: 3000,
        expense: 1398,

    },
    {
        name: 'Mar',
        income: 2000,
        expense: 9800,

    },
    {
        name: 'Apr',
        income: 2780,
        expense: 3908,

    },
    {
        name: 'May',
        income: 1890,
        expense: 4800,

    },
    {
        name: 'Jun',
        income: 2390,
        expense: 3800,

    },
    {
        name: 'Jul',
        income: 3490,
        expense: 4300,

    },
    {
        name: 'Aug',
        income: 3490,
        expense: 4300,

    },
    {
        name: 'Sept',
        income: 3490,
        expense: 4300,

    },
    {
        name: 'Oct',
        income: 3490,
        expense: 4300,

    },
    {
        name: 'Nov',
        income: 3490,
        expense: 4300,

    },
    {
        name: 'Dec',
        income: 3490,
        expense: 4300,
    },
];
// #endregion


const FinanceChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold'>Finance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>

            <LineChart
                style={{ width: '100%', maxWidth: '890px', height: '90%', maxHeight: '80vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis 
                    dataKey="name" 
                    tickMargin={10}
                    axisLine={false}
                    tick={{ fill: "#d1d5db" }}
                    tickLine={false} />
                <YAxis 
                    width="auto" 
                    tickMargin={20}
                    axisLine={false}
                    tick={{ fill: "#d1d5db" }}
                    tickLine={false} />
                <Tooltip />
                <Legend
                    align="center"
                    verticalAlign="top"
                    wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
                    iconType="circle"
                />
                <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#c3ebfa"
                strokeWidth={5}  />
                <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="#cfceff"
                strokeWidth={5} />
            </LineChart>
        </div>
    )
}

export default FinanceChart