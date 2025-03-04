import React from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateTaskModal from './NewTaskModal';
import './tasks.css';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../../redux/slices/dashboardSlice';

const Tasks = ({ project, projectName }) => {
  const dispatch = useDispatch()
  const dashboard = useSelector((state) => state.dashboard);
  const tasks = dashboard.tasks[project] || { notStarted: [], inProgress: [], completed: [] };

  const [openTaskModal, setOpenTaskModal] = React.useState(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => setOpenTaskModal(false);

  const handleStatusChange = (task_id, status) => {
    dispatch(updateTaskStatus({ project, task_id, status: status }));
  }


  const renderTaskCard = (task, index) => (
    <Row key={index} className="mb-3">
      <Col>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.name}:</strong> {task.description}
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id={`dropdown-status-${index}`}>
                  Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>handleStatusChange(task.id, "starting")}>Not Started</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleStatusChange(task.id, "started")}>In Progress</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleStatusChange(task.id, "complete")}>Complete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );


  return (
    <div style={{ display: "block", alignItems: "flex-start", justifyContent: "flex-start" }}>
      <h1>{projectName}</h1>
      <Container>
        <Row>
          <Card>
            <CardTitle className='red-text'>Not Started</CardTitle>
            <CardBody>
              {tasks.notStarted.length > 0 ? (
                tasks.notStarted.map((task, index) => renderTaskCard(task, index))
              ) : (
                <p>No tasks</p>
              )}
            </CardBody>
          </Card>
        </Row>
        <br />
        <Row>
          <Card>
            <CardTitle className='orange-text'>In Progress</CardTitle>
            <CardBody>
              {tasks.inProgress.length > 0 ? (
                tasks.inProgress.map((task, index) => renderTaskCard(task, index))
              ) : (
                <p>No tasks</p>
              )}
            </CardBody>
          </Card>
        </Row>
        <br />
        <Row>
          <Card>
            <CardTitle className="green-text">Completed</CardTitle>
            <CardBody>
              {tasks.completed.length > 0 ? (
                tasks.completed.map((task, index) => renderTaskCard(task, index))
              ) : (
                <p>No tasks</p>
              )}
            </CardBody>
          </Card>
        </Row>
      </Container>

      {/* Floating Action Button (FAB) - Positioned at Bottom Right */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpenTaskModal}
      >
        <AddIcon />
      </Fab>

      <CreateTaskModal handleClose={handleCloseTaskModal} open={openTaskModal} projectId={project} />
    </div>
  );
};

export default Tasks;
