import React, { useState } from 'react';
import { Box, Container, Typography, Divider, Chip, IconButton } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';
import DeleteIcon from '@mui/icons-material/Delete';

import note1 from "../../src/assets/Frame 1000006157.png";
import note2 from "../../src/assets/Frame 1000006158.png";
import note3 from "../../src/assets/Group 33545.png";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  logo: string;
}

const Notifications: React.FC = () => {

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Order Picked Up', message: 'Your order was picked.', date: 'Today', time: '10:30 AM', read: false, logo: note1 },
    { id: 2, title: 'Order In Process', message: 'Your order is being processed.', date: 'Today', time: '2:15 PM', read: false, logo: note2 },
    { id: 3, title: 'Payment Received', message: 'Payment received.', date: 'Yesterday', time: '4:20 PM', read: true, logo: note3 },
  ]);

  // 🔹 Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // 🔹 Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#336B3F" }}>
      <DashboardNavbar />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", mb: 4 }}>
          Notifications
        </Typography>

        {notifications.map((notif, idx) => (
          <Box key={notif.id}>
            <Box
              onClick={() => markAsRead(notif.id)}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.3s",
                background: hoverIndex === idx ? "rgba(255,255,255,0.15)" : "transparent",
                opacity: notif.read ? 0.6 : 1,          // 🔥 Read notification faded
              }}
            >
              <img src={notif.logo} style={{ width: 70, height: 70 }} />

              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: "white", fontWeight: notif.read ? 400 : 700 }}>
                  {notif.title}
                </Typography>

                <Typography sx={{ color: "white", opacity: 0.85 }}>
                  {notif.message}
                </Typography>
              </Box>

              {/* Right side section */}
              <Box sx={{ textAlign: "right" }}>
                {!notif.read && (
                  <Chip
                    label="New"
                    size="small"
                    sx={{
                      background: "#fff",
                      color: "#336B3F",
                      fontWeight: 600,
                      height: 24,
                      mb: 0.5
                    }}
                  />
                )}

                <Typography sx={{ color: "white", opacity: 0.9 }}>
                  {notif.time}
                </Typography>
              </Box>

              {/* Delete Button */}
              <IconButton onClick={() => deleteNotification(notif.id)}>
                <DeleteIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>

            {/* Divider */}
            <Divider
              sx={{
                mx: "auto",
                borderWidth: hoverIndex === idx ? "2px" : "1px",
                borderColor: hoverIndex === idx ? "white" : "rgba(255,255,255,0.3)",
                my: 1,
                transition: "0.3s",
              }}
            />
          </Box>
        ))}

        {notifications.length === 0 && (
          <Typography sx={{ textAlign: "center", color: "#fff", mt: 4, opacity: 0.8 }}>
            No notifications available
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Notifications;
