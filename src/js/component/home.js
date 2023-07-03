import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "../../styles/index.css";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api();
  }, []);

  const api = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/fluxfeint", requestOptions)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log("error", error));
  };

  const addTask = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let tasksAdded = tasks.concat({
      label: input,
      done: false,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(tasksAdded),
      redirect: "follow",
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/fluxfeint", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        api();
      })
      .catch((error) => console.log(error));

    setInput("");
  };

  const deleteTask = (index) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let tasksAdded = tasks.filter((activity, i) => i !== index);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(tasksAdded),
      redirect: "follow",
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/fluxfeint", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        api();
      })
      .catch((error) => console.log(error));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const renderTaskCounter = () => {
    if (tasks.length === 1) {
      return <div className="taskcounter">You have 1 task left</div>;
    } else if (tasks.length === 0) {
      return <div className="taskcounter">You don't have any tasks left, add some</div>;
    } else {
      return <div className="taskcounter">You have {tasks.length} tasks left</div>;
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">To-Do List</h1>
      <div className="add-todo-input">
        <input
          placeholder="Add a new task..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} 
        />
        <button className="add-buton" onClick={addTask}>
          Add task
        </button>
      </div>
      {tasks.length === 0 ? (
        <h1>There are no tasks, add some</h1>
      ) : (
        <ul className="todo-list">
          {tasks.map((activity, index) => (
            <li className="todo-item" key={index}>
              {activity.label}
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      )}
      {renderTaskCounter()}
    </div>
  );
}

export default App;
