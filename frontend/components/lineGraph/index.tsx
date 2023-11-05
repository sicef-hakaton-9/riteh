"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type {
  Formatter,
  Payload,
  ValueType
} from "recharts/types/component/DefaultTooltipContent";
import type { ReactNode } from "react";

export type ChartData<T extends string | number> = {
  [K in T]: string | number;
};

interface Props<T extends string> {
  xKey: T;
  yKey: T;
  data: ChartData<string | number>[] | object[];
  unit?: string;
  className?: string;
  height: number;
  formatter?: Formatter<ValueType, string | number>;
  labelFormatter?: (
    label: string,
    payload: Payload<ValueType, string | number>[]
  ) => ReactNode;
  yTickFormatter?: (value: string, index: number) => string;
}

export default function Graph({
  className,
  data,
  formatter,
  height,
  labelFormatter,
  unit,
  xKey,
  yKey,
  yTickFormatter
}: Props<string>) {
  return data && data.length > 0 ? (
    <ResponsiveContainer width={"90%"} height={height} className={className}>
      <LineChart
        data={data}
        margin={{
          bottom: 5,
          top: 20
        }}
      >
        <CartesianGrid strokeDasharray="0" vertical={false} />
        <XAxis
          dataKey={xKey}
          tickFormatter={yTickFormatter}
          axisLine={false}
          tickLine={false}
          minTickGap={20}
          tick={{ fill: "#999999" }}
          dy={10}
        />
        <YAxis
          dataKey={yKey}
          unit={unit}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#999999" }}
          width={70}
        />
        <Tooltip labelFormatter={labelFormatter} formatter={formatter} />
        <Line dataKey={yKey} stroke="#000" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <div
      style={{
        height
      }}
    ></div>
  );
}
