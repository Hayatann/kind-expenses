import type { Expense } from "../types/index";
import { useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type Props = {
  expenses: Expense[];
};

export default function TransactionTable({ expenses }: Props) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="max-w-fit overflow-x-scroll w-full mb-3 max-h-80">
      <table className="table table-pin-rows w-full text-center text-lg">
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.id}</td>
              <td>
                {expense.year}/{expense.month}/{expense.date}
              </td>
              <td>{expense.usage}</td>
              <td>{expense.amount}</td>
              <td>
                {expense.transactionType === "income"
                  ? "収入"
                  : expense.transactionType === "expense"
                  ? "支出"
                  : "不明"}
              </td>
              <td>{expense.genre}</td>
              <td>{expense.who}</td>
              <td className="break-words word-wrap">{expense.memo}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => handleEditClick(expense)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDeleteClick(expense)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal
        expense={selectedExpense}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteModal
        expense={selectedExpense}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
