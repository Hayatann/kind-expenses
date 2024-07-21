import { json } from "@remix-run/cloudflare";
import { Form, redirect, useActionData } from "@remix-run/react";

// Action関数
export const action = async ({ request }) => {
	const formData = new URLSearchParams(await request.text());
	const userName = formData.get("userName");

	if (!userName) {
		return json({ error: "Username is required" }, { status: 400 });
	}

	// return redirect(`/index?userName=${userName}`);
	return redirect(`/household/${userName}`);
};

export default function User() {
	const actionData = useActionData<{ error: string } | null>();
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-4 text-center">
					ユーザー名を入力してください
				</h1>
				<Form method="post" className="space-y-4">
					<div>
						<label
							htmlFor="userName"
							className="block text-sm font-medium text-gray-700"
						>
							ユーザー名
						</label>
						<input
							type="text"
							name="userName"
							id="userName"
							className="input input-bordered w-full mt-1"
							placeholder="Tappy"
						/>
						{actionData?.error && (
							<p className="text-red-600 text-sm mt-2">{actionData.error}</p>
						)}
					</div>
					<button type="submit" className="btn btn-accent w-full">
						Submit
					</button>
				</Form>
			</div>
		</div>
	);
}
