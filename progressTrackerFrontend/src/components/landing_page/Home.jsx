import { useDispatch, useSelector } from 'react-redux';
import "./landing.css";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Paper, Badge, Tooltip, Modal } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';
import { fetchLists } from '../../redux/slices/dashboardSlice';
import { useEffect, useState } from 'react';
import Tasks from './Tasks';
import { fetchProjectTasks } from '../../redux/slices/dashboardSlice';
import ListModal from './NewListModel';
import ProjectModal from './NewProjectModal';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
<<<<<<< HEAD
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fetchUserDetails } from "../../redux/slices/userDetailsSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import Archive from './Archive';
import RecentlyDeletedContainer from './RecentlyDeletedContainer';
=======
import { fetchUserDetails } from "../../redux/slices/userDetailsSlice";
import { useLocation, useNavigate } from 'react-router-dom';
>>>>>>> origin/main

const drawerWidth = 290;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  })
);

const AppBar = styled(MuiAppBar, { 
  shouldForwardProp: (prop) => prop !== 'open' 
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
  marginLeft: open ? `${drawerWidth}px` : 0,
  backgroundColor: '#ffffff',
  color: '#714834',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const DashboardButton = styled(Button)(({ theme }) => ({
  background: '#d1e7dd !important',
  color: '#2c7065 !important',
  borderRadius: '10px !important',
  padding: '16px !important',
  fontWeight: 'bold !important',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
  }
}));

const NewButton = styled(Button)(({ theme }) => ({
  color: '#714834',
  margin: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontSize: '0.9rem',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  backgroundColor: 'rgba(113, 72, 52, 0.08)',
  '&:hover': {
    backgroundColor: 'rgba(113, 72, 52, 0.15)',
  }
}));

const UtilityButton = styled(Button)(({ theme }) => ({
  color: '#887469',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontSize: '0.85rem',
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: '8px',
  textTransform: 'none',
  marginBottom: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(113, 72, 52, 0.08)',
    color: '#714834',
  }
}));

const ProjectButton = styled(Button)(({ theme, selected }) => ({
  color: selected ? 'white' : '#887469',
  textAlign: 'left',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '8px 12px',
  fontSize: '0.9rem',
  borderRadius: '6px',
  margin: '4px 0',
  backgroundColor: selected ? '#714834' : 'transparent',
  '&:hover': {
    backgroundColor: selected ? '#5a3a29' : 'rgba(113, 72, 52, 0.08)',
  }
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
};

export default function Home({ children }) {
  const dispatch = useDispatch();
  const user_details = useSelector((state) => state.userDetails);
  const dashboard = useSelector((state) => state.dashboard);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState("Your Tasks");
  const location = useLocation();
<<<<<<< HEAD
  const [showArchive, setShowArchive] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
=======
>>>>>>> origin/main

  useEffect(() => {
    if (user_details.status === "idle") {
      dispatch(fetchUserDetails());
    }
  }, [user_details.status, dispatch]);

  useEffect(() => {
    if (dashboard.status === 'idle') {
      dispatch(fetchLists());
    }
  }, [dashboard.status, dispatch]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onTaskSelect = (id, name) => {
    dispatch(fetchProjectTasks(id));
    setSelectedProject(id);
    setSelectedProjectName(name);
  };

  // handles list modal
  const [openListModal, setOpenListModal] = useState(false);
  const handleOpenListModal = () => setOpenListModal(true);
  const handleCloseListModal = () => setOpenListModal(false);

  // handles project modal
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const handleOpenProjectModal = () => setOpenProjectModal(true);
  const handleCloseProjectModal = () => setOpenProjectModal(false);
  const [selectedList, setSelectedList] = useState(null);
  
  // accordion state
  const [activeKey, setActiveKey] = useState("0");
  const navigate = useNavigate();
<<<<<<< HEAD
  
  // Get current page title
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/settings':
        return 'Account Settings';
      case '/reports':
        return 'Reports & Analytics';
      case '/help':
        return 'Help & Support';
      default:
        return selectedProjectName || 'Tasks Dashboard';
    }
  };

  // Handle Archive modal
  const handleOpenArchive = () => {
    setShowArchive(true);
  };

  const handleCloseArchive = () => {
    setShowArchive(false);
  };

  // Handle Trash modal
  const handleOpenTrash = () => {
    setShowTrash(true);
  };

  const handleCloseTrash = () => {
    setShowTrash(false);
  };

=======
>>>>>>> origin/main
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* Only show title in AppBar when drawer is closed */}
          {!open && (
            <Typography variant="h6" noWrap component="div" fontWeight="600">
              {getPageTitle()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'whitesmoke',
            borderRight: 'none',
            boxShadow: '4px 0 10px rgba(0,0,0,0.05)'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between', px: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c7065' }}>
            Progress Tracker
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
<<<<<<< HEAD
        
        <Paper 
          elevation={0} 
          sx={{ 
            margin: '16px', 
            borderRadius: '16px', 
            padding: '16px', 
            backgroundColor: 'rgba(209, 231, 221, 0.4)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              alt="Profile Picture"
              src={user_details.status === "loading" ? "" : user_details.profile_picture}
              sx={{ 
                width: 56, 
                height: 56, 
                border: 2, 
                borderColor: "#16675e", 
                marginRight: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          </StyledBadge>
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#16675e", fontWeight: "bold", mb: 0.5 }}>
              {user_details.status === "loading" ? "Loading..." : user_details.user?.username}
            </Typography>
            <Typography variant="caption" sx={{ color: "#2c7065", opacity: 0.8 }}>
              {user_details.status === "loading" ? "" : user_details.user?.email}
            </Typography>
          </Box>
        </Paper>
        
        <Container className="mt-2">
          <Row className="g-2 mb-3">
            <Col className="d-grid">
              <DashboardButton onClick={()=>navigate("/settings")}>
                <SettingsIcon sx={{ fontSize: 36, mb: 1 }} />
                Settings
              </DashboardButton>
            </Col>
            <Col className="d-grid">
              <DashboardButton onClick={()=>navigate("/")} 
                sx={{ 
                  background: location.pathname === "/" ? 'rgba(209, 231, 221, 0.7) !important' : undefined,
                  boxShadow: location.pathname === "/" ? '0 4px 12px rgba(44, 112, 101, 0.15) !important' : undefined
                }}
              >
                <TaskAltIcon sx={{ fontSize: 36, mb: 1 }} />
                Tasks
              </DashboardButton>
            </Col>
          </Row>
          <Row className="g-2">
            <Col className="d-grid">
              <DashboardButton onClick={()=>navigate("/reports")}>
                <AssessmentIcon sx={{ fontSize: 36, mb: 1 }} />
                Reports
              </DashboardButton>
            </Col>
            <Col className="d-grid">
              <DashboardButton onClick={()=>navigate("/help")}>
                <HelpOutlineIcon sx={{ fontSize: 36, mb: 1 }} />
                Help
              </DashboardButton>
            </Col>
          </Row>
        </Container>
        
        <Divider sx={{ mt: 3, mb: 1 }} />
        
        {/* Archive and Trash buttons */}
        <Box sx={{ px: 2, mb: 2 }}>
          <UtilityButton
            startIcon={<ArchiveIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenArchive}
            fullWidth
          >
            Archived Lists
          </UtilityButton>
          <UtilityButton
            startIcon={<DeleteOutlineIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenTrash}
            fullWidth
          >
            Recently Deleted
          </UtilityButton>
        </Box>
        
        <Divider sx={{ mb: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#555' }}>
            YOUR LISTS
          </Typography>
          <Tooltip title="Create new list">
            <IconButton size="small" color="primary" onClick={handleOpenListModal} sx={{ color: '#714834' }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
=======
        <List>
          <Container className="mt-4">
            <Row className="align-items-center">
              <Col xs="auto">
                <Avatar
                  alt="Profile Picture"
                  src={user_details.status === "loading" ? "Loading..." : user_details.profile_picture}
                  sx={{ width: 56, height: 56, border: 4, borderColor: "#16675e" }}
                />
              </Col>
              <Col>
                <h4 className="mb-0" style={{ color: "#16675e", fontWeight: "bold" }}>
                  {user_details.status === "loading" ? "Loading..." : user_details.user?.username}
                </h4>
              </Col>
            </Row>
            <br />
            <Row className="g-2">
              <Col className="d-grid">
                <Button variant="contained" className="dashboard-button" onClick={()=>navigate("/settings")}>
                  <SettingsIcon style={{ fontSize: 40 }} /> Settings
                </Button>
              </Col>
              <Col className="d-grid">
                <Button variant="contained" className="dashboard-button" onClick={()=>navigate("/")}>
                  <Person2Icon style={{ fontSize: 40 }} /> Tasks
                </Button>
              </Col>
            </Row>
            <br />
            <Row className="g-2">
              <Col className="d-grid">
                <Button variant="contained" className="dashboard-button" onClick={()=>navigate("/reports")}>
                  <PieChartIcon style={{ fontSize: 40 }} /> Reports
                </Button>
              </Col>
              <Col className="d-grid">
                <Button variant="contained" className="dashboard-button" onClick={()=>navigate("/help")}>
                  <HelpOutlineIcon style={{ fontSize: 40 }} /> Help
                </Button>
              </Col>
            </Row>
          </Container>
        </List>
        <Divider />
        <Button variant="text" onClick={handleOpenListModal}>+ New List</Button>
        <Divider />
>>>>>>> origin/main
        {dashboard.status === 'succeeded' && (
          <Accordion activeKey={activeKey} onSelect={(eventKey) => setActiveKey(eventKey)} className="mt-2">
            {dashboard.lists.map((list, index) => (
              <Accordion.Item key={list.listId} eventKey={String(index)}>
                <Accordion.Header>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FolderIcon sx={{ mr: 1, fontSize: 18, color: 'inherit' }} />
                    {list.listName}
                  </Box>
                </Accordion.Header>
                <Accordion.Body>
                  {dashboard.projects[list.listId]?.length > 0 ? (
                    <Container className="px-0">
                      {dashboard.projects[list.listId].map((project) => (
                        <Row key={project.projectId}>
                          <ProjectButton
                            variant="text"
                            selected={selectedProject === project.projectId}
                            onClick={() => onTaskSelect(project.projectId, project.projectName)}
                          >
                            <DescriptionIcon sx={{ mr: 1, fontSize: 16, color: 'inherit' }} />
                            {project.projectName}
                          </ProjectButton>
                        </Row>
                      ))}
                      <NewButton 
                        startIcon={<AddIcon />}
                        onClick={() => {
                          handleOpenProjectModal();
                          setSelectedList(list.listId);
                        }}
                        sx={{ mt: 1 }}
                      >
                        New Project
                      </NewButton>
                    </Container>
                  ) : (
                    <NewButton 
                      startIcon={<AddIcon />}
                      onClick={() => {
                        handleOpenProjectModal();
                        setSelectedList(list.listId);
                      }}
                    >
                      New Project
                    </NewButton>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        
        <Box sx={{ flexGrow: 1 }} />
        
        <NewButton 
          startIcon={<AddIcon />}
          onClick={handleOpenListModal}
          sx={{ mt: 'auto', mb: 2 }}
        >
          New List
        </NewButton>
      </Drawer>
      <Main style={{ width: "100%" }} open={open}>
        <DrawerHeader />
        <ListModal handleClose={handleCloseListModal} open={openListModal} />
        <ProjectModal handleClose={handleCloseProjectModal} open={openProjectModal} listId={selectedList} />
<<<<<<< HEAD
        {/* Archive Modal */}
        <Modal
          open={showArchive}
          onClose={handleCloseArchive}
          aria-labelledby="archive-modal-title"
        >
          <Box sx={modalStyle}>
            <Archive onClose={handleCloseArchive} />
          </Box>
        </Modal>
        {/* Trash Modal */}
        <Modal
          open={showTrash}
          onClose={handleCloseTrash}
          aria-labelledby="trash-modal-title"
        >
          <Box sx={modalStyle}>
            <RecentlyDeletedContainer onClose={handleCloseTrash} />
          </Box>
        </Modal>
=======
>>>>>>> origin/main
        {/* If children are provided, render them; otherwise, render the Tasks view on the "/" route */}
        {children ? (
          children
        ) : (
          location.pathname === "/" &&
          (Object.keys(dashboard.tasks).length === 0
            ? <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: 'calc(100vh - 120px)',
                color: '#714834',
                opacity: 0.7
              }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Select a Project to View Tasks
                </Typography>
                <FolderIcon sx={{ fontSize: 64 }} />
              </Box>
            : <Tasks project={selectedProject} projectName={selectedProjectName} />)
        )}
      </Main>
    </Box>
  );
}
