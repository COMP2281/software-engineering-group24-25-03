import { useState } from "react";
import "./dashboard.css"
import Task from "./Task";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div id="dashboard">
        <h3 style={{color: "red"}}>Not Started</h3>
        <div className="taskSection" id="notStarted">
            <Task/>
            <Task/>
            <Task/>
        </div>
        <h3 style={{color: "orange"}}>In Progress</h3>
        <div className="taskSection" id="inProgress">
            <Task/>
            <Task/>
        </div>
        <h3 style={{color: "green"}}>Completed</h3>
        <div className="taskSection" id="completed">
            <Task/>
        </div>
        <button id="newTask">New Task</button>
    </div>
  );
}