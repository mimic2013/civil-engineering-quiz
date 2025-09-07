import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  LinearProgress,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import QuestionCard from '../components/QuestionCard';
import type { Question } from '../types';
import questionsData from '../data/questions.json';

const Study: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const convertedQuestions = questionsData.map(q => ({
      ...q,
      choices: q.choices.map((text, index) => ({
        id: `${q.id}-choice-${index}`,
        text
      }))
    }));
    setQuestions(convertedQuestions as Question[]);
  }, []);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const toggleShowAnswer = () => {
    setShowAnswer(prev => !prev);
  };

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">加载中...</Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/* 顶部进度条 */}
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1100,
          height: 4
        }} 
      />

      {/* 顶部应用栏 */}
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={1}
        sx={{ 
          backgroundColor: 'background.paper',
          mt: 2,
          borderRadius: 1
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            学习模式
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentQuestionIndex + 1} / {questions.length}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 3 }}>
        {/* 题目卡片 */}
        {currentQuestion && (
          <QuestionCard 
            question={currentQuestion}
            userAnswer={userAnswers[currentQuestion.id]}
            showAnswer={showAnswer}
            onAnswerSelect={(answerIndex) => 
              handleAnswerSelect(currentQuestion.id, answerIndex)
            }
            onToggleAnswer={toggleShowAnswer}
          />
        )}
      </Box>

      {/* 底部导航栏 - 修改后的版本 */}
      <Paper 
        elevation={3}
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          borderRadius: 0,
          p: 1.5
        }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          gap={2}
          sx={{ px: 2 }} // 添加水平内边距
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            size="medium"
            sx={{ 
              flex: 1,
              maxWidth: 120 // 限制最大宽度
            }}
          >
            上一题
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color={showAnswer ? "primary" : "default"}
              onClick={toggleShowAnswer}
              size="medium"
              sx={{ mx: 1 }}
            >
              {showAnswer ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {showAnswer ? "隐藏答案" : "显示答案"}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            size="medium"
            sx={{ 
              flex: 1,
              maxWidth: 120 // 限制最大宽度
            }}
          >
            下一题
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Study;