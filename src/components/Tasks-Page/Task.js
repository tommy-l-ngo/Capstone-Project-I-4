import { useState } from "react";

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      if (collapsed) {
        setCollapsed(false);
      } else {
        let newTask = {
          id: task.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          urgency: urgencyLevel,
          status: task.status,
          isCollapsed: true
        };

        addTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";

    if (task.status === "In Progress") {
      newStatus = "Not Started";
    } else if (task.status === "Done") {
      newStatus = "In Progress";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";

    if (task.status === "Not Started") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Done";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      <button onClick={handleMoveLeft} className="button moveTask">
        &#171;
      </button>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <button
          onClick={() => {
            setFormAction("delete");
          }}
          className="button delete"
        >
          X
        </button>

        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          disabled={collapsed}
          defaultValue={task.description}
        />
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Low
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
             Medium
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
             High
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
      </form>
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  );
}
