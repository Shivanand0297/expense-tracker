import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

type PiechartBreakDownProps = {
  title: string;
  data: { name: string; value: number }[];
};

const PiechartBreakDown = ({ title, data }: PiechartBreakDownProps) => {
  return (
    <Card className="transition-shadow ease-in-out hover:shadow-md">
      <CardHeader className="pb-2">
        <CardDescription className="font-semibold text-foreground dark:text-white">{title}</CardDescription>
      </CardHeader>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={250} height={250}>
            <Pie
              label
              dataKey="value"
              cx="50%"
              cy="50%"
              fill="#8884d8"
              isAnimationActive={true}
              data={data}
              outerRadius={100}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PiechartBreakDown;
