import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          土木施工管理问答系统
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          专为土木施工管理考试设计的学习工具
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/study"
            sx={{ mr: 2 }}
          >
            开始学习
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            disabled
          >
            模拟测试 (即将上线)
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;