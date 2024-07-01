import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Expense } from "../types/";

// 色の設定
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#7c7c7c"];

// MyPieChart コンポーネントの定義
const MyPieChart = (props: { Expenses: Expense[] }) => {
  // TransactionType が expense のデータをフィルタリング
  const expenseData = props.Expenses.filter(
    (expense) => expense.transactionType === "expense"
  );

  // ジャンルごとの合計値を集計
  const genreTotals = expenseData.reduce((acc, expense) => {
    if (!acc[expense.genre]) {
      acc[expense.genre] = 0;
    }
    acc[expense.genre] += expense.amount;
    return acc;
  }, {} as { [key: string]: number });

  // 円グラフ用のデータを生成
  const data = Object.keys(genreTotals).map((genre) => ({
    name: genre,
    value: genreTotals[genre],
  }));

  return (
    <div className="flex justify-center w-full">
      <PieChart width={500} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MyPieChart;
