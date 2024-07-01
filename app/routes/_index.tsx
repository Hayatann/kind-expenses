import { json, MetaFunction, LoaderFunction } from "@remix-run/cloudflare";
import { Expense } from "~/types";
import TransactionForm from "~/components/TransactionForm";
import TransactionTable from "~/components/TransactionTable";
import { useLoaderData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import type { FormData, GASResponse, TransactionType } from "~/types";
import MyPieChart from "~/components/MyPieChart";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare Workers!",
    },
  ];
};

const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwPE08cMqvFblzbRZ_i0MsXFtMfk3MDn6b7E93DVUaJOcu8uKvkXAlu5XPpVGiiHf1e/exec";

export const loader: LoaderFunction = async () => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbwPE08cMqvFblzbRZ_i0MsXFtMfk3MDn6b7E93DVUaJOcu8uKvkXAlu5XPpVGiiHf1e/exec?action=getAllData"
  ); // GASからデータ取得
  const data: Expense[] = await res.json();
  return json({ data });
};
export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const action = formData.get("action") as "add" | "edit" | "delete";

  if (action === "edit") {
    const updatedData = {
      id: formData.get("id"),
      date: formData.get("date"),
      who: formData.get("who"),
      usage: formData.get("usage"),
      genre: formData.get("genre"),
      amount: formData.get("amount"),
      memo: formData.get("memo"),
      transactionType: formData.get("transactionType"),
    };
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "edit", ...updatedData }),
    });

    const result: GASResponse = await response.json();
    return json({ success: result.result === "success" });
  } else if (action === "delete") {
    const id = formData.get("id");
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "delete", id }),
    });

    const result: GASResponse = await response.json();
    return json({ success: result.result === "success" });
  } else {
    let transactionTypeValue = formData.get("transactionType");
    if (formData.get("transactionType") === "") {
      transactionTypeValue = "undefined";
    }
    const data: FormData = {
      date: formData.get("date") as string,
      who: formData.get("who") as string,
      usage: formData.get("usage") as string,
      genre: formData.get("genre") as string,
      amount: formData.get("amount") as string,
      memo: formData.get("memo") as string,
      transactionType: transactionTypeValue as TransactionType,
    };
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "add", ...data }),
    });

    const result: GASResponse = await response.json();
    return json({ success: result.result === "success" });
  }
};

export default function Index() {
  const { data } = useLoaderData<{ data: Expense[] }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <TransactionTable expenses={data} />
      <MyPieChart Expenses={data} />
      <div className="w-full max-w-fit bg-white shadow-md rounded-lg p-6 mb-6">
        <TransactionForm />
      </div>
    </div>
  );
}
