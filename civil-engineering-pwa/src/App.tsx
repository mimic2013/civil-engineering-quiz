import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Study from './pages/Study';
import Layout from './components/Layout';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<Study />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;