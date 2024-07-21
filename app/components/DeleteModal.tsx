import { useFetcher } from "@remix-run/react";
import type { Expense } from "~/types";
import { useEffect } from "react";

interface DeleteModalProps {
	expense: Expense | null;
	isOpen: boolean;
	onClose: () => void;
}

const DeleteModal = ({ expense, isOpen, onClose }: DeleteModalProps) => {
	const fetcher = useFetcher<{ success: boolean }>();

	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
			onClose();
			window.location.reload();
		}
	}, [fetcher, onClose]);

	if (!isOpen || !expense) return null;

	return (
		<div className={`modal ${isOpen ? "modal-open" : ""}`}>
			<div className="modal-box">
				<h2 className="text-xl mb-4">削除確認</h2>
				<p className="mb-4">本当に削除しますか？</p>
				<fetcher.Form method="post">
					<input type="hidden" name="id" value={expense.id} />
					<input type="hidden" name="action" value="delete" />
					<div className="modal-action">
						<button type="button" className="btn" onClick={onClose}>
							キャンセル
						</button>
						<button type="submit" className="btn btn-error">
							{fetcher.state !== "idle" ? (
								<span className="loading loading-spinner" />
							) : (
								"削除"
							)}
						</button>
					</div>
				</fetcher.Form>
			</div>
		</div>
	);
};

export default DeleteModal;
