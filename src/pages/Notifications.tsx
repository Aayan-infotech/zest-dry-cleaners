import React, { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';
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

  return (
    <Box sx={{ minHeight: "100vh", background: "#336B3F" }}>
      <DashboardNavbar />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", mb: 4 }}>
          Today
        </Typography>
        {notifications.map((notif, idx) => (
          <Box key={notif.id}>
            <Box
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
                background: hoverIndex === idx ? "rgba(255,255,255,0.12)" : "transparent",
              }}
            >
              <img src={notif.logo} style={{ width: 70, height: 70 }} />

              <Box>
                <Typography sx={{ color: "white", fontWeight: 600 }}>
                  {notif.title}
                </Typography>

                <Typography sx={{ color: "white", opacity: 0.8 }}>
                  {notif.message}
                </Typography>
              </Box>

              <Typography sx={{ color: "white", opacity: 0.8, ml: "auto" }}>
                {notif.time}
              </Typography>
            </Box>
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
      </Container>
    </Box>
  );
};

export default Notifications;
