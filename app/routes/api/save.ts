import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import type { FormData, GASResponse } from "~/types";

const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwgNROyWXsCXLkXsop0X-UPOAhuUBeVA94m0QMEascEBDZKUSAsY4rVQWzsJW0GpLJz/exec";

export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  console.log("Received form data:", Object.fromEntries(formData));
  const data: FormData = {
    date: formData.get("date") as string,
    who: formData.get("who") as string,
    usage: formData.get("usage") as string,
    genre: formData.get("genre") as string,
    amount: formData.get("amount") as string,
    memo: formData.get("memo") as string,
    transactionType: formData.get("transactionType") as "income" | "expense",
  };
  const response = await fetch(GAS_WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data).toString(),
  });

  console.log(response);

  const result: GASResponse = await response.json();

  if (result.result === "success") {
    return redirect("/");
  } else {
    return json({ success: false });
  }
};
