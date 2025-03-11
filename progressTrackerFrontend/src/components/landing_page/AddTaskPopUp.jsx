import React, { useState } from 'react';
import './AddTask.css';

const AddTaskPopup = ({ onClose, onSave }) => {
    const [isExtended, setIsExtended] = useState(false);
    const [status, setStatus] = useState("not started"); // Default status
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignee, setAssignee] = useState("");
    const [notes, setNotes] = useState("");
    const [checklist, setChecklist] = useState([]);
    const [newChecklistItem, setNewChecklistItem] = useState("");
    const [files, setFiles] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [reminderName, setReminderName] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [reminderTime, setReminderTime] = useState("");

    // Function to handle status change
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    // Function to add checklist item
    const handleAddChecklistItem = () => {
        if (newChecklistItem.trim() !== "") {
            setChecklist([...checklist, newChecklistItem]);
            setNewChecklistItem("");
        }
    };

    // Function to remove checklist item
    const handleRemoveChecklistItem = (index) => {
        setChecklist(checklist.filter((_, i) => i !== index));
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setFiles([...files, ...uploadedFiles]);
    };

    // Function to add a reminder
    const handleAddReminder = () => {
        if (reminderName.trim() !== "" && reminderDate !== "" && reminderTime !== "") {
            const newReminder = { name: reminderName, date: reminderDate, time: reminderTime };

            // Ensure the reminder is added only once
            setReminders((prevReminders) => [...prevReminders, newReminder]);

            // Clear input fields after adding
            setReminderName("");
            setReminderDate("");
            setReminderTime("");
        }
    };

    // Function to remove reminder
    const handleRemoveReminder = (index) => {
        setReminders(reminders.filter((_, i) => i !== index));
    };


    // Function to save task to the database
    const handleSaveTask = () => {
        const taskData = {
            status,
            taskName,
            dueDate,
            assignee,
            notes,
            checklist,
            files: files.map(file => file.name), // Store file names in DB
            reminders,
        };

        // Send task data to backend (replace with your API endpoint)
        fetch('https://your-backend-api.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Task saved successfully:", data);
            onSave(data); // Call callback function after saving
        })
        .catch(error => {
            console.error("Error saving task:", error);
        });
    };

    return (
        <div className="popup-overlay">
            <div className={`newTask ${isExtended ? "newTaskExtended" : ""}`}>
                {/* Header Section */}
                <div className="popup-header">
                    <h2 className="createTask">Create Task</h2>
                    <button className="closeButton" onClick={onClose}>✖</button>
                </div>

                {/* Task Status */}
                <div className="taskStatus">
                    <span
                        className={`statusCircle green ${status === "completed" ? "selected" : ""}`}
                        onClick={() => handleStatusChange("completed")}
                    ></span>
                    <span
                        className={`statusCircle yellow ${status === "in progress" ? "selected" : ""}`}
                        onClick={() => handleStatusChange("in progress")}
                    ></span>
                    <span
                        className={`statusCircle red ${status === "not started" ? "selected" : ""}`}
                        onClick={() => handleStatusChange("not started")}
                    ></span>
                    <span className="statusLabel">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </div>

                {/* Task Form */}
                <div className="taskForm">
                    <div className="formGroup">
                        <label>What do you want to call your task?</label>
                        <input
                            type="text"
                            placeholder="Enter Task Name"
                            className="inputField"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>

                    <div className="formGroup">
                        <label>When must this task be finished?</label>
                        <input
                            type="date"
                            className="inputField"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="formGroup">
                        <label>Who is responsible for this task?</label>
                        <input
                            type="text"
                            placeholder="Assign a team member"
                            className="inputField"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                        />
                    </div>

                    {/* Extended Fields */}
                    {isExtended && (
                        <>
                            <div className="formGroup">
                                <label>Notes</label>
                                <textarea
                                    placeholder="Add your notes here..."
                                    className="textareaField"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="formGroup checklist">
                                <label>Checklist</label>
                                <input
                                    type="text"
                                    placeholder="Add checklist item..."
                                    className="inputField"
                                    value={newChecklistItem}
                                    onChange={(e) => setNewChecklistItem(e.target.value)}
                                />
                                <button className="addChecklistItem" onClick={handleAddChecklistItem}>+</button>

                                {/* Display Checklist Items */}
                                <ul className="checklistItems">
                                    {checklist.map((item, index) => (
                                        <li key={index} className="checklistItem">
                                            {item}
                                            <button className="removeChecklistItem" onClick={() => handleRemoveChecklistItem(index)}>✖</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="formGroup filesField">
                                <label>Attach Files</label>
                                <input
                                    type="file"
                                    className="fileUploadInput"
                                    multiple
                                    onChange={handleFileUpload}
                                />
                            </div>

                            <div className="formGroup remindersField">
                                <label>Add a Reminder</label>
                                <input
                                    type="text"
                                    placeholder="Reminder Name"
                                    className="inputField"
                                    value={reminderName}
                                    onChange={(e) => setReminderName(e.target.value)}
                                />
                                <div className="reminderInputs">
                                    <input
                                        type="date"
                                        className="inputField"
                                        value={reminderDate}
                                        onChange={(e) => setReminderDate(e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        className="inputField"
                                        value={reminderTime}
                                        onChange={(e) => setReminderTime(e.target.value)}
                                    />
                                    <button className="addReminderButton" onClick={handleAddReminder}>+</button>
                                </div>

                                {/* Display Reminders */}
                                <ul className="reminderList">
                                    {reminders.map((rem, index) => (
                                        <li key={index} className="reminderItem">
                                            <span className="reminderIcon">🔔</span>
                                            <span className="reminderText">{rem.name}</span>
                                            <span className="reminderDate">{rem.date}</span>
                                            <span className="reminderTime">{rem.time}</span>
                                            <button className="removeReminderItem" onClick={() => handleRemoveReminder(index)}>✖</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                {/* Buttons */}
                <div className="buttonContainer">
                    <button className="toggleButton" onClick={() => setIsExtended(!isExtended)}>
                        {isExtended ? "Un-extend" : "Extend"}
                    </button>
                    <button className="saveButton" onClick={handleSaveTask}>Add this task</button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskPopup;
