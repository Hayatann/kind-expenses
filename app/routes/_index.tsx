import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type TransactionType = "income" | "expense";

type Expense = {
  year: number;
  month: number;
  day: number;
  use: string;
  price: number;
  transactionType: TransactionType;
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
    <div>
      <div className="w-full h-full min-h-screen items-center justify-center p-0 m-0">
        <div className="overflow-x-auto mt-6 w-full max-w-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Use</th>
                <th>Price</th>
                <th>Type</th>
                <th>Who</th>
                <th>Memo</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>
                    {expense.year}/{expense.month}/{expense.day}
                  </td>
                  <td>{expense.use}</td>
                  <td>{expense.price}</td>
                  <td>
                    {expense.transactionType === "income" ? "収入" : "支出"}
                  </td>
                  <td>{expense.who}</td>
                  <td>{expense.memo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 m-0">
          <h2 className="text-2xl font-bold mb-4">Expense Form</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="date"
              >
                Date
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
                htmlFor="usage"
              >
                Usage
              </label>
              <input
                type="text"
                id="usage"
                className="input input-bordered w-full"
                placeholder="Enter usage"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="genre"
              >
                Genre
              </label>
              <select id="genre" className="select select-bordered w-full">
                <option value="">Select genre</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="input input-bordered w-full"
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="memo"
              >
                Memo
              </label>
              <textarea
                id="memo"
                className="textarea textarea-bordered w-full"
                placeholder="Enter memo"
              ></textarea>
            </div>

            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
