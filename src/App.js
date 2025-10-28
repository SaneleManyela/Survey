// src/App.js
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';

import { Page0 } from './Pages/Page0.js';
import { Page1 } from './Pages/Page1.js';
import { Page2 } from './Pages/Page2.js';
import { Page3 } from './Pages/Page3.js';
import { Page4 } from './Pages/Page4.js';
import { Admin } from './Pages/Admin.js';
import { getUserId } from './utils/userIdGenerator.js';

// ---------------- MainMenu ----------------
function MainMenu() {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Foundations of Communication Style", path: "/Page0" },
    { title: "Excellent Speaking and Writing Strategies", path: "/Page1" },
    { title: "Fundamentals of Persuasion and Influence", path: "/Page2" },
    { title: "Style of Conflict Resolution Self-Evaluation", path: "/Page3" },
    { title: "Assessing One's Leadership: Potential towards Conflict", path: "/Page4" },
    { title: "Admin Panel", path: "/Admin" }
  ];

  const handleCardClick = (item) => {
    navigate(item.path);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Adaptive Leadership Survey
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {menuItems.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card elevation={4} sx={{ height: '100%' }}>
              <CardActionArea onClick={() => handleCardClick(item)} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" align="center" color="primary" sx={{ fontWeight: 700 }}>
                    {item.title}
                    {console.log(item.title)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ---------------- App ----------------
export default function App() {
  useEffect(() => {
    getUserId();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/Page0" element={<Page0 />} />
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Page3" element={<Page3 />} />
        <Route path="/Page4" element={<Page4 />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
  );
}
