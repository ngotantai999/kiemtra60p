// src/components/TodoList.jsx
import React, { useState, useEffect } from "react";

const TodoList = () => {
  // Lấy danh sách công việc từ localStorage khi ứng dụng load
  const getStoredTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  // State lưu danh sách công việc và công việc mới
  const [todos, setTodos] = useState(getStoredTodos());
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  // Hàm lưu danh sách công việc vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Hàm thêm công việc mới
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(), // Sử dụng thời gian làm id duy nhất
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo(""); // Reset input sau khi thêm công việc
    }
  };

  // Hàm xóa công việc
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos); // Cập nhật lại danh sách công việc
  };

  // Hàm toggle hoàn thành công việc
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos); // Cập nhật trạng thái công việc
  };

  // Hàm lọc công việc theo trạng thái
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
  });

  // Tính tổng số công việc và số công việc đã hoàn thành
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách công việc</h1>
      
      {/* Input và Button để thêm công việc */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-md"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc mới"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Thêm
        </button>
      </div>

      {/* Nút lọc */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Đã hoàn thành
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-4 py-2 rounded ${filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Chưa hoàn thành
        </button>
      </div>

      {/* Hiển thị tổng số công việc */}
      <div className="mb-4 text-center">
        <p className="text-lg font-medium">
          Tổng: {totalTodos} | Hoàn thành: {completedTodos}
        </p>
      </div>

      {/* Danh sách công việc */}
      <ul className="space-y-3">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-100 rounded"
          >
            <div>
              {/* Checkbox hoặc Nút Toggle */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="mr-3"
              />
              <p className={`text-lg ${todo.completed ? "line-through text-gray-400" : ""}`}>
                {todo.title}
              </p>
              <span className={`text-sm ${todo.completed ? "text-green-500" : "text-red-500"}`}>
                {todo.completed ? "Hoàn thành" : "Chưa hoàn thành"}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
