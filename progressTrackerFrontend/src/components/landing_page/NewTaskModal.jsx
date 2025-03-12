import * as React from 'react';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/slices/dashboardSlice';
import './AddTask.css';

const CreateTaskModal = ({ handleClose, open, projectId }) => {
  const dispatch = useDispatch();
  const [isExtended, setIsExtended] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = () => {
    if (name.trim() !== '') {
      dispatch(createTask({ projectId, taskName: name, taskDescription: description }));
      setName('');
      setDescription('');
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="popup-overlay">
        <div className={`newTask ${isExtended ? "newTaskExtended" : ""}`}>
          {/* Header Section */}
          <div className="popup-header">
            <h2 className="createTask">Create Task</h2>
            <button className="closeButton" onClick={handleClose}>✖</button>
          </div>

          {/* Task Form */}
          <div className="taskForm">
            <div className="formGroup">
              <label>Task Name</label>
              <input 
                type="text" 
                placeholder="Enter Task Name" 
                className="inputField" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label>Description</label>
              <textarea 
                placeholder="Task Description" 
                className="textareaField" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {isExtended && (
              <>
                <div className="formGroup">
                  <label>Due Date</label>
                  <input type="date" className="inputField" />
                </div>

                <div className="formGroup">
                  <label>Assignee</label>
                  <input type="text" placeholder="Assign a team member" className="inputField" />
                </div>

                <div className="formGroup">
                  <label>Notes</label>
                  <textarea placeholder="Add your notes here..." className="textareaField"></textarea>
                </div>

                <div className="formGroup">
                  <label>Checklist</label>
                  <input type="text" placeholder="Add checklist item..." className="inputField" />
                  <button className="addChecklistItem">+</button>
                </div>

                <div className="formGroup">
                  <label>Attach Files</label>
                  <input type="file" className="fileUploadInput" multiple />
                </div>

                <div className="formGroup">
                  <label>Add a Reminder</label>
                  <input type="text" placeholder="Reminder Name" className="inputField" />
                  <div className="reminderInputs">
                    <input type="date" className="inputField" />
                    <input type="time" className="inputField" />
                    <button className="addReminderButton">+</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="buttonContainer">
            <button className="toggleButton" onClick={() => setIsExtended(!isExtended)}>
              {isExtended ? "Un-extend" : "Extend"}
            </button>
            <button className="saveButton" onClick={handleCreateTask}>Add Task</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
