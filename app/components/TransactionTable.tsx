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
    <div className="max-w-fit overflow-x-auto w-full mb-3 max-h-64">
      <table className="table table-pin-rows w-full text-center">
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
              <td>{expense.transactionType === "income" ? "収入" : "支出"}</td>
              <td>{expense.genre}</td>
              <td>{expense.who}</td>
              <td className="break-words word-wrap">{expense.memo}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => handleEditClick(expense)}
                >
                  編集
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDeleteClick(expense)}
                >
                  削除
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
