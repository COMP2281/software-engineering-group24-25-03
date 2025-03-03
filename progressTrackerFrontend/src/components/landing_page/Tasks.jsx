import React from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateTaskModal from './NewTaskModal';
import './tasks.css'
const Tasks = ({ project, projectName }) => {
  const dashboard = useSelector((state) => state.dashboard);
  const tasks = dashboard.tasks[project] || { notStarted: [], inProgress: [], completed: [] };

  const [openTaskModal, setOpenTaskModal] = React.useState(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => setOpenTaskModal(false);

  return (
    <div style={{ display: "block", alignItems: "flex-start", justifyContent: "flex-start" }}>
      <h1>{projectName}</h1>
      <Container >
          <Row>
            <Card>
              <CardTitle className='red-text'>Not Started</CardTitle>
              <CardBody>
                {tasks.notStarted.length > 0 ? (
                  tasks.notStarted.map((task, index) => (
                    <Row key={index} className="mb-3">
                      <Col>
                        <Card>
                          <CardBody>
                            <strong>{task.name}:</strong> {task.description}
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p>No tasks</p>
                )}
              </CardBody>
            </Card>
          </Row>
          <br/>
          <Row >
            <Card>
              <CardTitle className='orange-text'>In Progress</CardTitle>
              <CardBody>
                {tasks.inProgress.length > 0 ? (
                  tasks.inProgress.map((task, index) => (
                    <Row key={index} className="mb-3">
                      <Col>
                        <Card>
                          <CardBody>
                            <strong>{task.name}:</strong> {task.description}
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p>No tasks</p>
                )}
              </CardBody>
            </Card>
          </Row>      
          <br/>
          <Row>
            <Card>
              <CardTitle className="green-text">Completed</CardTitle>
              <CardBody>
                {tasks.completed.length > 0 ? (
                  tasks.completed.map((task, index) => (
                    <Row key={index} className="mb-3">
                      <Col>
                        <Card>
                          <CardBody>
                            <strong>{task.name}:</strong> {task.description}
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))
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
        onClick={() => handleOpenTaskModal()}
      >
        <AddIcon />
      </Fab>

      <CreateTaskModal handleClose={handleCloseTaskModal} open={openTaskModal} projectId={project}/>
    </div>
  );
};

export default Tasks;
