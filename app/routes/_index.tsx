import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type TransactionType = "income" | "expense";

type Expense = {
  id: number;
  year: number;
  month: number;
  day: number;
  use: string;
  price: number;
  transactionType: TransactionType;
  genre: string;
  who: string;
  memo: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare Workers!",
    },
  ];
};

export const loader = async () => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbxI7AxP_WciY4DKOR8BGc8FmHnkFajujx7EWG4SNq0fTFn-TJMoO9LSv0foKRmFeIOA/exec?action=getAllData"
  ); // GASからデータ取得
  const data = await res.json();
  return json({ data });
};

export default function Index() {
  const expenses = useLoaderData<typeof loader>().data as Expense[];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-fit overflow-x-auto w-full mb-3">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>日付</th>
              <th>使い道</th>
              <th>金額</th>
              <th>収入/支出</th>
              <th>ジャンル</th>
              <th>利用者</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.id}</td>
                <td>
                  {expense.year}/{expense.month}/{expense.day}
                </td>
                <td>{expense.use}</td>
                <td>{expense.price}</td>
                <td>
                  {expense.transactionType === "income" ? "収入" : "支出"}
                </td>
                <td>{expense.genre}</td>
                <td>{expense.who}</td>
                <td className="break-words word-wrap">{expense.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full max-w-fit bg-white shadow-md rounded-lg p-6 mb-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4 md:col-span-2">
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4" htmlFor="income">
                <input
                  type="radio"
                  name="transactionType"
                  id="income"
                  value="income"
                  className="form-radio"
                />
                <span className="ml-2">収入</span>
              </label>
              <label className="inline-flex items-center" htmlFor="expense">
                <input
                  type="radio"
                  name="transactionType"
                  id="expense"
                  value="expense"
                  className="form-radio"
                />
                <span className="ml-2">支出</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="date"
            >
              日付
            </label>
            <input
              type="date"
              id="date"
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="who"
            >
              利用者
            </label>
            <input
              type="text"
              id="who"
              className="input input-bordered w-full"
              placeholder="利用者を入力してください"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="usage"
            >
              使い道
            </label>
            <input
              type="text"
              id="usage"
              className="input input-bordered w-full"
              placeholder="使い道を入力してください"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="genre"
            >
              ジャンル
            </label>
            <select id="genre" className="select select-bordered w-full">
              <option value="">ジャンルを選んでください</option>
              <option value="food">食費</option>
              <option value="transportation">交通費</option>
              <option value="entertainment">趣味・娯楽</option>
              <option value="other">その他</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="amount"
            >
              金額
            </label>
            <input
              type="number"
              id="amount"
              className="input input-bordered w-full"
              placeholder="金額を入力してください"
            />
          </div>

          <div className="mb-4 md:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="memo"
            >
              メモ
            </label>
            <textarea
              id="memo"
              className="textarea textarea-bordered w-full"
              placeholder="メモを入力してください"
            ></textarea>
          </div>

          <div className="mt-6 md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
