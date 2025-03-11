import {useDispatch, useSelector} from 'react-redux';
import "./landing.css";
import {fetchUserDetails} from "../../redux/slices/userDetailsSlice";
import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Button, FormControlLabel, FormGroup, Input, Switch} from '@mui/material';
import {Card, CardBody, CardTitle, Container, Row} from 'react-bootstrap';
import {fetchLists} from '../../redux/slices/dashboardSlice';
import Home from "./Home.jsx";

/*
  manage account
  notifications
  security

  change profile picture
  change username
  change password
  notifications

   */

const drawerWidth = 290;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({open}) => open,
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
})(({theme}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({open}) => open,
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

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Settings() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch()
  const user_details = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (user_details.status === "idle") {
      dispatch(fetchUserDetails());
    }
  }, [user_details.status, dispatch]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    const result = await dispatch(
      updateAccountSettings({first_name, last_name, email, username})
    );

    if (updateAccountSettings.fulfilled.match(result)) {
      // do summin
    }
  };

  return (
    <Home>
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
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
                open && {display: 'none'},
              ]}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Settings
            </Typography>
          </Toolbar>
        </AppBar>

        <Main open={open}>
          <Container>
            <Row>
              <Card>
                <CardTitle>Manage Account</CardTitle>
                <CardBody>
                  <form onSubmit={onSubmit}>
                    <Input
                      placeholder="First Name"
                      value={first_name === "" ? user_details.user?.first_name : first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                    />
                    <Input
                      placeholder="Last Name"
                      value={user_details.user?.last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={user_details.user?.email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                    />
                    <Input
                      placeholder="Username"
                      value={username === "" ? user_details.user?.username : username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                      type="filled"
                    />
                    <Button type="submit" variant="contained">Confirm Changes</Button>
                  </form>
                </CardBody>
              </Card>
            </Row>
            <br/>
            <Row>
              <Card>
                <CardTitle>Notifications</CardTitle>
                <CardBody>
                  <form>
                    <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked />} label="Send Email Notifcations" />
                    </FormGroup>
                  </form>
                </CardBody>
              </Card>
            </Row>
            <br/>
            <Row>
              <Card>
                <CardTitle>Security</CardTitle>
                <CardBody>
                  <form>
                    <Input
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                    />
                    <Input
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                    />
                    <Input
                      placeholder="Confirm New Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      fullWidth
                      sx={{mt: 2, mb: 2}}
                    />
                  </form>
                </CardBody>
              </Card>
            </Row>
          </Container>
        </Main>
      </Box>
    </Home>
  );
}
