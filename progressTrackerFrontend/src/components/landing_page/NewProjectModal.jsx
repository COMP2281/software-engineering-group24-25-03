import * as React from 'react';
import { Box, Button, Typography, Modal, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProject } from '../../redux/slices/dashboardSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProjectModal = ({ handleClose, open, listId }) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(''); // Local state for list name

  // Handle input change
  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  // Dispatch createList action with the name
  const handleCreateProject = () => {
    if (name.trim() !== '') {
        dispatch(createProject({ listId, projectName: name }));
        setName(''); // Reset input field after submission
      handleClose(); // Close modal after creation
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6">Create New Project</Typography>

        <Input 
          placeholder="New Project" 
          value={name} 
          onChange={handleInputChange} 
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        />

        <Button variant="contained" onClick={() => handleCreateProject(listId)} fullWidth>
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default ProjectModal;