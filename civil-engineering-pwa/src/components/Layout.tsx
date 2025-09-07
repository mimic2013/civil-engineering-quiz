import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <ConstructionIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            土木施工管理问答系统
          </Typography>
          <Tabs 
            value={location.pathname} 
            textColor="inherit" 
            indicatorColor="secondary"
          >
            <Tab label="首页" value="/" component={Link} to="/" />
            <Tab label="学习" value="/study" component={Link} to="/study" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;