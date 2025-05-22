import React, { useState, useEffect } from "react";
import TaskActions from "../actions/TaskActions";
import TaskStore from "../store/TaskStore";

const TaskApp = () => {
  const [tasks, setTasks] = useState(TaskStore.getTasks());
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleChange = () => {
      setTasks([...TaskStore.getTasks()]);
    };

    TaskStore.addChangeListener(handleChange);
    return () => {
      TaskStore.removeChangeListener(handleChange);
    };
  }, []);

  const handleAdd = () => {
    if (input.trim()) {
      TaskActions.addTask(input.trim());
      setInput("");
    }
  };

  const handleDelete = (id) => {
    TaskActions.deleteTask(id);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>tasks list</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="write the task"
      />
      <button onClick={handleAdd}>add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}{" "}
            <button onClick={() => handleDelete(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;
