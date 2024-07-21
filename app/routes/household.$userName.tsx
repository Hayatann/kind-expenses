import {
	type LoaderFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from "@remix-run/cloudflare";
import type { ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MyPieChart from "~/components/MyPieChart";
import TransactionForm from "~/components/TransactionForm";
import TransactionTable from "~/components/TransactionTable";
import type { Expense } from "~/types";
import type { FormData, GASResponse, TransactionType } from "~/types";
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
	"https://script.google.com/macros/s/AKfycbygcbT1gM_VUYtyo_e3aVe7Vs8hcmeX_JjU_fof7NpyJ4dJ84wCvW2bXNhZltZQtvkO/exec";

export const loader: LoaderFunction = async ({
	params,
}: LoaderFunctionArgs) => {
	const userName = params.userName;
	const res = await fetch(
		`${GAS_WEB_APP_URL}?action=getAllData&userName=${userName}`,
	); // GASからデータ取得
	const data: Expense[] = await res.json();
	return json({ data });
};
export const action: ActionFunction = async ({ request, params }) => {
	const formData = new URLSearchParams(await request.text());
	const action = formData.get("action") as "add" | "edit" | "delete";
	const userName = params.userName;

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
			body: JSON.stringify({
				action: "edit",
				...updatedData,
				userName: userName,
			}),
		});

		console.log(JSON.stringify({ action: "edit", ...updatedData }));
		const result: GASResponse = await response.json();
		return json({ success: result.result === "success" });
	}
	if (action === "delete") {
		const id = formData.get("id");
		const response = await fetch(GAS_WEB_APP_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ action: "delete", id }),
		});

		console.log(response);
		const result: GASResponse = await response.json();
		return json({ success: result.result === "success" });
	}
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
		body: JSON.stringify({ action: "add", ...data, userName: userName }),
	});
	console.log(response);

	const result: GASResponse = await response.json();
	return json({ success: result.result === "success" });
};

export default function Index() {
	const { data } = useLoaderData<{ data: Expense[] }>();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<TransactionTable expenses={data} />
			<div className="w-full max-w-4xl mt-6 flex justify-center mb-6">
				<MyPieChart Expenses={data} />
			</div>
			<div className="w-full max-w-fit bg-white shadow-md rounded-lg p-6 mb-6">
				<TransactionForm />
			</div>
		</div>
	);
}
