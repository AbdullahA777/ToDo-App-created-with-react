import React, { useState, useEffect } from "react";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    showTask();
  }, []);

  const addFunc = () => {
    if (inputValue === "") {
      alert("Kindly fill the text box.");
    } else {
      const newTasks = [...tasks, inputValue];
      setTasks(newTasks);
      saveData(newTasks);
      setInputValue("");
    }
  };

  const handleDelete = (e) => {
    if (e.target.tagName === "SPAN") {
      const updatedTasks = tasks.filter(
        (task, index) =>
        index.toString() !== e.target.parentElement.getAttribute("data-key")
        );
        console.log(updatedTasks);
      setTasks(updatedTasks);
      saveData(updatedTasks);
    } else if (e.target.tagName === "LI") {
      e.target.classList.toggle("through");
      saveData(tasks);
    }
  };

  function saveData(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  function showTask() {
    const savedTasks = localStorage.getItem("data");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }

  return (
    <>
      <div className="Container">
        <div className="fazool"></div>
        <div className="todo-app">
          <h2>ToDo List</h2>
          <div className="row">
            <input
              type="text"
              placeholder="Add your task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button id="addBtn" onClick={addFunc}>
              Add
            </button>
          </div>
          <div className="tasks">
            <ol onClick={handleDelete}>
              {tasks.map((task, index) => (
                <li key={index} data-key={index}>
                  {task} <span className="cross">&#10060;</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
