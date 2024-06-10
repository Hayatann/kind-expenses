import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type Expense = {
  year: number;
  month: number;
  day: number;
  use: string;
  price: number;
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
  );
  const data = await res.json();
  return json({ data });
};

export default function Index() {
  const expenses = useLoaderData<typeof loader>().data as Expense[];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix on Cloudflare Workers</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://developers.cloudflare.com/workers/"
            rel="noreferrer"
          >
            Cloudflare Workers Docs
          </a>
        </li>
      </ul>
      <div>
        {expenses.map((expense: Expense, index: number) => (
          <div key={index}>
            <p>
              {expense.year}/{expense.month}/{expense.day} {expense.use}{" "}
              {expense.price} {expense.who} {expense.memo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
