import { useDispatch, useSelector } from 'react-redux';
import "./landing.css";
import { fetchUserDetails } from "../../redux/slices/userDetailsSlice";
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
import { Avatar } from '@mui/material';
import {Container,Row,Col} from 'react-bootstrap';
import {Button} from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';
import { fetchLists } from '../../redux/slices/dashboardSlice';
import { useEffect } from 'react';
import Tasks from './Tasks';
import { fetchProjectTasks } from '../../redux/slices/dashboardSlice';
import { useState } from 'react';
import ListModal from './NewListModel';
import ProjectModal from './NewProjectModal';
const drawerWidth = 290;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home() {
  const dispatch = useDispatch()
  const user_details = useSelector((state) => state.userDetails);
  const dashboard = useSelector((state) => state.dashboard)
  const [selectedProject, setSelectedProject] = useState(null);
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

  const onTaskSelect = (id) => {
    dispatch(fetchProjectTasks(id))
    setSelectedProject(id)
  }
  // handles list modal
  const [openListModal, setOpenListModal] = React.useState(false);
  const handleOpenListModal = () => setOpenListModal(true);
  const handleCloseListModal = () => setOpenListModal(false);
  // handles project modal
  const [openProjectModal, setOpenProjectModal] = React.useState(false);
  const handleOpenProjectModal = () => setOpenProjectModal(true);
  const handleCloseProjectModal = () => setOpenProjectModal(false);
  const [selectedList, setSelectedList] = useState(null);

  // accordian state
  const [activeKey, setActiveKey] = useState("0");
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
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Your Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Container className="mt-4">
            <Row className="align-items-center">
              <Col xs="auto">
                <Avatar
                  alt="Profile Picture"
                  src={user_details.status === "loading" ? "Loading..." : user_details.profile_picture}
                  sx={{ width: 56, height: 56 }} // Adjust size
                />
              </Col>
              <Col>
                <h4 className="mb-0">{user_details.status === "loading" ? "Loading..." : user_details.user?.username}</h4>
              </Col>
            </Row>
            <hr/>
            <Row>              
                <Col><Button variant="outlined">Setting</Button></Col>
                <Col><Button variant="outlined">Pernal</Button></Col>
            </Row>
            <br/>
            <Row>              
                <Col><Button variant="outlined">Repots</Button></Col>
                <Col><Button variant="outlined">Helssp</Button></Col>
            </Row>
          </Container>
        </List>
        <Divider />
        <Button varient='text' onClick={()=>handleOpenListModal()}>+ New List</Button>
        <Divider />
          {dashboard.status === 'succeeded'  && (
            <Accordion activeKey={activeKey} onSelect={(eventKey) => setActiveKey(eventKey)}>
            {dashboard.lists.map((list, index) => (
              <Accordion.Item key={list.listId} eventKey={String(index)}>
                <Accordion.Header>📁 {list.listName}</Accordion.Header>
                <Accordion.Body>
                  {dashboard.projects[list.listId]?.length > 0 ? (
                    <Container>
                      {dashboard.projects[list.listId].map((project) => (
                        <Row key={project.projectId}>
                          <Button variant="text" onClick={() => onTaskSelect(project.projectId)}>
                            📄 {project.projectName}
                          </Button>
                        </Row>
                      ))}
                      <hr/>
                      <Button variant='text' onClick={() => {
                        handleOpenProjectModal();
                        setSelectedList(list.listId);
                      }}>
                        + New Project
                      </Button>
                    </Container>
                  ) : (
                    <Button variant='text' onClick={() => {
                      handleOpenProjectModal();
                      setSelectedList(list.listId);
                    }}>
                      + New Project
                    </Button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>          
          )}
        <List>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader/>
        <ListModal handleClose={handleCloseListModal} open={openListModal}/>
        <ProjectModal handleClose={handleCloseProjectModal} open={openProjectModal} listId={selectedList}/>
        {Object.keys(dashboard.tasks).length === 0 ? "Select A Project" : <Tasks project={selectedProject} />}
        </Main>
    </Box>
  );
}
