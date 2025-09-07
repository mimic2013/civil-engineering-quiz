import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import QuestionCard from '../components/QuestionCard';
import type { Question } from '../types';
import questionsData from '../data/questions.json';
import './EnhancedStudy.css';

const EnhancedStudy: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // 数据转换逻辑
    const convertedQuestions = questionsData.map(q => ({
      ...q,
      choices: q.choices.map((text, index) => ({
        id: `${q.id}-choice-${index}`,
        text,
        isCorrect: index === q.correctAnswerIndex
      }))
    }));
    setQuestions(convertedQuestions);
  }, []);

  // 处理用户选择答案
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  // 导航到下一题
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  // 导航到上一题
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  // 切换显示/隐藏答案
  const toggleShowAnswer = () => {
    setShowAnswer(prev => !prev);
  };

  if (questions.length === 0) {
    return <div>加载中...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          增强学习模式
        </Typography>
        
        {/* 进度指示器 */}
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1">
            第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题
          </Typography>
        </Paper>
        
        {/* 导航按钮 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            上一题
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            下一题
          </Button>
        </Box>
        
        {/* 显示当前题目 */}
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
    </Container>
  );
};

export default EnhancedStudy;