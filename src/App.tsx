import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Route, Link as RouterLink, Routes } from 'react-router-dom';
import LogList from './pages/LogList';
import SendNotification from './pages/SendNotification';

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notification System
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Send
          </Button>
          <Button color="inherit" component={RouterLink} to="/logs">
            Logs
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<SendNotification />} />
          <Route path="/logs" element={<LogList />} />
        </Routes>
      </Container>
    </>
  );
}
