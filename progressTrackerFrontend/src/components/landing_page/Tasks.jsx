import React from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateTaskModal from './NewTaskModal';
import { useState } from 'react';
const Tasks = ({ project }) => {
  const dashboard = useSelector((state) => state.dashboard);
  const tasks = dashboard.tasks[project] || { notStarted: [], inProgress: [], completed: [] };


  const [openTaskModal, setOpenTaskModal] = React.useState(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => setOpenTaskModal(false);


  return (
    <div>
      <Container>
        <Row>
          {/* Not Started */}
          <Col>
            <Card>
              <CardTitle>Not Started</CardTitle>
              <CardBody>
                {tasks.notStarted.length > 0 ? (
                  <ul>
                    {tasks.notStarted.map((task, index) => (
                      <li key={index}>
                        <strong>{task.name}:</strong> {task.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks</p>
                )}
              </CardBody>
            </Card>
          </Col>

          {/* In Progress */}
          <Col>
            <Card>
              <CardTitle>In Progress</CardTitle>
              <CardBody>
                {tasks.inProgress.length > 0 ? (
                  <ul>
                    {tasks.inProgress.map((task, index) => (
                      <li key={index}>
                        <strong>{task.name}:</strong> {task.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks</p>
                )}
              </CardBody>
            </Card>
          </Col>

          {/* Completed */}
          <Col>
            <Card>
              <CardTitle>Completed</CardTitle>
              <CardBody>
                {tasks.completed.length > 0 ? (
                  <ul>
                    {tasks.completed.map((task, index) => (
                      <li key={index}>
                        <strong>{task.name}:</strong> {task.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks</p>
                )}
              </CardBody>
            </Card>
          </Col>
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
        onClick={()=>handleOpenTaskModal()}
      >
        <AddIcon />
      </Fab>
      <CreateTaskModal handleClose={handleCloseTaskModal} open={openTaskModal} projectId={project}/>
      </div>
  );
};

export default Tasks;
