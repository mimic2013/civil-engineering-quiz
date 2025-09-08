import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

// 扩展全局接口以包含 BeforeInstallPromptEvent
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

const App: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // 阻止默认提示
      e.preventDefault();
      // 保存事件对象
      setDeferredPrompt(e);
      // 显示安装提示
      setShowInstallPrompt(true);
      setSnackbarOpen(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 监听应用安装成功事件
    const handleAppInstalled = () => {
      console.log('PWA已安装');
      setShowInstallPrompt(false);
      setSnackbarOpen(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 清理函数
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // 显示安装提示
    deferredPrompt.prompt();
    
    // 等待用户选择
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('用户接受了安装提示');
      setShowInstallPrompt(false);
      setSnackbarOpen(false);
    } else {
      console.log('用户拒绝了安装提示');
    }
    
    // 清除保存的事件对象
    setDeferredPrompt(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* 安装提示 Snackbar */}
      <Snackbar
        open={snackbarOpen && showInstallPrompt}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={handleInstallClick}>
              安装
            </Button>
          }
        >
          将土木工程测验安装到主屏幕，获得更好的体验！
        </Alert>
      </Snackbar>
      
      {/* 您的主应用内容 */}
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
    </>
  );
};

export default App;