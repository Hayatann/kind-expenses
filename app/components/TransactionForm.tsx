import { useActionData, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import type { FormData } from "~/types";

export default function TransactionForm() {
	const fetcher = useFetcher<{ success: boolean }>();
	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
			window.location.reload();
		}
	}, [fetcher]);
	const actionData = useActionData<FormData | null>();

	return (
		<fetcher.Form
			method="post"
			className="grid grid-cols-1 md:grid-cols-2 gap-4"
		>
			<input type="hidden" name="action" value="add" />
			<div className="mb-4 md:col-span-2">
				<div className="flex items-center">
					<label className="inline-flex items-center mr-4" htmlFor="income">
						<input
							type="radio"
							name="transactionType"
							id="income"
							value="income"
							className="form-radio"
							defaultChecked={
								actionData ? actionData.transactionType === "income" : false
							}
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
							defaultChecked={
								actionData ? actionData.transactionType === "expense" : false
							}
						/>
						<span className="ml-2">支出</span>
					</label>
				</div>
			</div>

			<div className="mb-4">
				<label className="block font-medium text-gray-700 mb-2" htmlFor="date">
					日付
				</label>
				<input
					type="date"
					id="date"
					name="date"
					className="input input-bordered w-full"
					defaultValue={actionData ? actionData.date : ""}
				/>
			</div>

			<div className="mb-4">
				<label className="block font-medium text-gray-700 mb-2" htmlFor="who">
					利用者
				</label>
				<input
					type="text"
					id="who"
					name="who"
					className="input input-bordered w-full"
					placeholder="利用者を入力してください"
					defaultValue={actionData ? actionData.who : ""}
				/>
			</div>

			<div className="mb-4">
				<label className="block font-medium text-gray-700 mb-2" htmlFor="usage">
					使い道
				</label>
				<input
					type="text"
					id="usage"
					name="usage"
					className="input input-bordered w-full"
					placeholder="使い道を入力してください"
					defaultValue={actionData ? actionData.usage : ""}
				/>
			</div>

			<div className="mb-4">
				<label className="block font-medium text-gray-700 mb-2" htmlFor="genre">
					ジャンル
				</label>
				<select
					id="genre"
					name="genre"
					className="select select-bordered w-full"
					defaultValue={actionData ? actionData.genre : ""}
				>
					<option value="">ジャンルを選んでください</option>
					<option value="食費">食費</option>
					<option value="交通費">交通費</option>
					<option value="趣味・娯楽">趣味・娯楽</option>
					<option value="給料">給料</option>
					<option value="その他">その他</option>
				</select>
			</div>

			<div className="mb-4">
				<label
					className="block font-medium text-gray-700 mb-2"
					htmlFor="amount"
				>
					金額
				</label>
				<input
					type="number"
					id="amount"
					name="amount"
					className="input input-bordered w-full"
					placeholder="金額を入力してください"
					defaultValue={actionData ? actionData.amount : ""}
				/>
			</div>

			<div className="mb-4 md:col-span-2">
				<label className="block font-medium text-gray-700 mb-2" htmlFor="memo">
					メモ
				</label>
				<textarea
					id="memo"
					name="memo"
					className="textarea textarea-bordered w-full"
					placeholder="メモを入力してください"
					defaultValue={actionData ? actionData.memo : ""}
				/>
			</div>

			<div className="mt-6 md:col-span-2">
				<button type="submit" className="btn btn-accent w-full">
					{fetcher.state !== "idle" ? (
						<span className="loading loading-spinner" />
					) : (
						"送信"
					)}
				</button>
			</div>
		</fetcher.Form>
	);
}
