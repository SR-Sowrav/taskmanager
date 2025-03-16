import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    setDarkMode(storedDarkMode || false);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = () => {
    if (!title.trim()) return alert("Task title is required.");

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      status: "To-Do",
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>Task Manager</h1>
        <button onClick={toggleDarkMode} className="dark-mode-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <p>No tasks available.</p>}
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.status.toLowerCase()}`}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Due Date:</strong> {task.dueDate}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <div className="task-actions">
              <button onClick={() => updateTaskStatus(task.id, "In Progress")}>
                In Progress
              </button>
              <button onClick={() => updateTaskStatus(task.id, "Completed")}>
                Completed
              </button>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
