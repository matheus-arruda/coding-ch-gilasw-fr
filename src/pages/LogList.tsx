import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function LogList() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/logs').then((res) => setLogs(res.data));
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Notification Logs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.userName}</TableCell>
              <TableCell>{log.userEmail}</TableCell>
              <TableCell>{log.channel}</TableCell>
              <TableCell>{log.category}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
