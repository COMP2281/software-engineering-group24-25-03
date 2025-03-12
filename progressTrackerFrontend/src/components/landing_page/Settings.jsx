import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  FormControlLabel,
  FormGroup,
  TextField,
  Switch,
  Divider,
  Paper,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  PersonOutline,
  NotificationsOutlined,
  LockOutlined,
  CameraAltOutlined,
  LogoutOutlined
} from '@mui/icons-material';
import { fetchUserDetails } from "../../redux/slices/userDetailsSlice";
import { fetchLists } from '../../redux/slices/dashboardSlice';
import Home from "./Home.jsx";

const drawerWidth = 290;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#ffffff',
  color: '#714834',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#714834',
  },
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  '&.Mui-selected': {
    color: '#714834',
  },
});

const SettingsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
  }
}));

const SettingsHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#333333',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: '#714834',
    borderRadius: 10,
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#714834',
  color: 'white',
  fontWeight: 600,
  padding: '10px 24px',
  borderRadius: 8,
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#5a3a29',
    boxShadow: '0 4px 12px rgba(113, 72, 52, 0.2)',
  }
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#714834',
    '&:hover': {
      backgroundColor: 'rgba(113, 72, 52, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#714834',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  border: '3px solid white',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}));

const CameraButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#714834',
  color: 'white',
  padding: 8,
  '&:hover': {
    backgroundColor: '#5a3a29',
  },
}));

export default function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const user_details = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (user_details.status === "idle") {
      dispatch(fetchUserDetails());
    }
  }, [user_details.status, dispatch]);

  useEffect(() => {
    if (user_details.user) {
      setFirstName(user_details.user.first_name || "");
      setLastName(user_details.user.last_name || "");
      setEmail(user_details.user.email || "");
      setUsername(user_details.user.username || "");
    }
  }, [user_details.user]);

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual action
      const result = await dispatch(
        {type: 'userDetails/updateAccountSettings', payload: {first_name, last_name, email, username}}
      );

      setSnackbarMessage("Account details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update account details.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage("New passwords don't match!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      // Replace with your actual action
      const result = await dispatch(
        {type: 'userDetails/updatePassword', payload: {currentPassword, newPassword}}
      );

      setSnackbarMessage("Password updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setSnackbarMessage("Failed to update password.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };
  
  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };
  
  const handleLogout = () => {
    // Implement logout functionality here
    // This would typically dispatch a logout action to your Redux store
    // Example: dispatch({ type: 'auth/logout' });
    
    // Close the dialog
    setLogoutDialogOpen(false);
    
    // Show success message
    setSnackbarMessage("You have been logged out successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    
    // Redirect to login page
    // This would typically be done by your logout action
    // Example: history.push('/login');
  };

  return (
    <Home>
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
                Account Settings
              </Typography>
            )}
          </Toolbar>
        </AppBar>

        <Main open={open}>
          <Box sx={{ mt: 8, mb: 4 }}>
            <StyledTabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="settings tabs"
              variant="fullWidth"
            >
              <StyledTab icon={<PersonOutline />} label="Profile" iconPosition="start" />
              <StyledTab icon={<NotificationsOutlined />} label="Notifications" iconPosition="start" />
              <StyledTab icon={<LockOutlined />} label="Security" iconPosition="start" />
            </StyledTabs>
          </Box>

          {/* Profile Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <SettingsCard>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <ProfileAvatar 
                      src={user_details.user?.profile_picture || ""}
                      alt={`${first_name} ${last_name}`}
                    >
                      {first_name && last_name ? `${first_name[0]}${last_name[0]}` : ""}
                    </ProfileAvatar>
                    <CameraButton aria-label="change profile picture">
                      <CameraAltOutlined fontSize="small" />
                    </CameraButton>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                      {first_name} {last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {username ? `@${username}` : ""}
                    </Typography>
                  </Box>
                </SettingsCard>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <SettingsCard component="form" onSubmit={handleAccountSubmit}>
                  <SettingsHeader variant="h5">Account Information</SettingsHeader>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <StyledButton type="submit" variant="contained">
                          Save Changes
                        </StyledButton>
                      </Box>
                    </Grid>
                  </Grid>
                </SettingsCard>
              </Grid>
            </Grid>
          )}

          {/* Notifications Tab */}
          {tabValue === 1 && (
            <SettingsCard>
              <SettingsHeader variant="h5">Notification Preferences</SettingsHeader>
              
              <FormGroup>
                <Box sx={{ py: 2 }}>
                  <FormControlLabel 
                    control={<StyledSwitch defaultChecked />} 
                    label="Email Notifications" 
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 0.5 }}>
                    Receive updates, alerts, and important information via email
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ py: 2 }}>
                  <FormControlLabel 
                    control={<StyledSwitch defaultChecked />} 
                    label="Project Updates" 
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 0.5 }}>
                    Get notified when changes are made to your projects
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ py: 2 }}>
                  <FormControlLabel 
                    control={<StyledSwitch />} 
                    label="Marketing Communications" 
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 0.5 }}>
                    Receive promotional offers and updates about new features
                  </Typography>
                </Box>
              </FormGroup>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <StyledButton variant="contained">
                  Save Preferences
                </StyledButton>
              </Box>
            </SettingsCard>
          )}

          {/* Security Tab */}
          {tabValue === 2 && (
            <SettingsCard component="form" onSubmit={handlePasswordSubmit}>
              <SettingsHeader variant="h5">Password & Security</SettingsHeader>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    error={newPassword !== confirmNewPassword && confirmNewPassword !== ""}
                    helperText={newPassword !== confirmNewPassword && confirmNewPassword !== "" ? "Passwords don't match" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <StyledButton type="submit" variant="contained">
                      Update Password
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 4 }} />
              
              <SettingsHeader variant="h5">Two-Factor Authentication</SettingsHeader>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add an extra layer of security to your account by enabling two-factor authentication.
              </Typography>
              
              <StyledButton variant="outlined" sx={{ 
                backgroundColor: 'transparent', 
                color: '#714834',
                border: '1px solid #714834',
                '&:hover': {
                  backgroundColor: 'rgba(113, 72, 52, 0.08)',
                  borderColor: '#5a3a29',
                }
              }}>
                Enable 2FA
              </StyledButton>
              
              <Divider sx={{ my: 4 }} />
              
              <SettingsHeader variant="h5">Session</SettingsHeader>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Need to step away? Securely log out from your account here.
              </Typography>
              
              <StyledButton 
                variant="outlined" 
                color="error"
                onClick={handleLogoutDialogOpen}
                startIcon={<LogoutOutlined />}
                sx={{ 
                  backgroundColor: 'transparent', 
                  color: '#d32f2f',
                  border: '1px solid #d32f2f',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.08)',
                    borderColor: '#b71c1c',
                  }
                }}
              >
                Log Out
              </StyledButton>
            </SettingsCard>
          )}
        </Main>
      </Box>
      
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          {"Are you sure you want to log out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            You will need to sign in again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Home>
  );
}