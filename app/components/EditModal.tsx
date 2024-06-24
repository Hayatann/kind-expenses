import { useFetcher, useActionData } from "@remix-run/react";
import type { Expense } from "~/types";
import { useEffect } from "react";

interface EditModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditModal = ({ expense, isOpen, onClose }: EditModalProps) => {
  const fetcher = useFetcher<{ success: boolean }>();
  const actionData = useActionData<Expense | null>();

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
        <h2 className="text-xl mb-4">編集</h2>
        <fetcher.Form
          method="post"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input type="hidden" name="id" value={expense.id} />
          <input type="hidden" name="action" value="edit" />
          <div className="mb-4 md:col-span-2">
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4" htmlFor="income">
                <input
                  type="radio"
                  name="transactionType"
                  id="income"
                  value="income"
                  className="form-radio"
                  defaultChecked={expense.transactionType === "income"}
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
                  defaultChecked={expense.transactionType === "expense"}
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
              name="date"
              className="input input-bordered w-full"
              defaultValue={expense.date}
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
              name="who"
              className="input input-bordered w-full"
              defaultValue={expense.who}
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
              name="usage"
              className="input input-bordered w-full"
              defaultValue={expense.usage}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="genre"
            >
              ジャンル
            </label>
            <select
              id="genre"
              name="genre"
              className="select select-bordered w-full"
              defaultValue={expense.genre}
            >
              <option value="食費">食費</option>
              <option value="交通費">交通費</option>
              <option value="趣味・娯楽">趣味・娯楽</option>
              <option value="給料">給料</option>
              <option value="その他">その他</option>
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
              name="amount"
              className="input input-bordered w-full"
              defaultValue={expense.amount}
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
              name="memo"
              className="textarea textarea-bordered w-full"
              defaultValue={expense.memo}
            ></textarea>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className="btn btn-primary">
              {fetcher.state !== "idle" ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "更新"
              )}
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default EditModal;
