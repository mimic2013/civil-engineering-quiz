import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Alert
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  userAnswer?: number;
  showAnswer: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onToggleAnswer: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  showAnswer,
  onAnswerSelect,
  onToggleAnswer
}) => {
  const isCorrect = userAnswer === question.correctAnswerIndex;

  return (
    <Card sx={{ 
      mb: 3,
      border: showAnswer ? (isCorrect ? '2px solid #4caf50' : '2px solid #f44336') : 'none'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" color="primary">
            {question.questionNumber}
          </Typography>
          <Chip 
            label={question.topic} 
            color="primary" 
            variant="outlined"
            size="small" 
          />
        </Box>
        
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, fontSize: '1.1rem' }}>
          {question.questionText}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {/* 答案选择区域 */}
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={userAnswer !== undefined ? userAnswer.toString() : ''}
            onChange={(e) => onAnswerSelect(parseInt(e.target.value))}
          >
            {question.choices.map((choice, index) => {
              const isSelected = userAnswer === index;
              const showCorrectness = showAnswer && (index === question.correctAnswerIndex || isSelected);
              
              return (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={
                    <Radio 
                      color={
                        showAnswer 
                          ? index === question.correctAnswerIndex 
                            ? "success" 
                            : isSelected 
                              ? "error" 
                              : "default"
                          : "primary"
                      } 
                    />
                  }
                  label={
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      backgroundColor: showCorrectness 
                        ? index === question.correctAnswerIndex 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : 'rgba(244, 67, 54, 0.1)'
                        : 'transparent',
                      p: 1,
                      borderRadius: 1,
                      width: '100%'
                    }}>
                      {showCorrectness && (
                        index === question.correctAnswerIndex 
                          ? <CheckCircle color="success" sx={{ mr: 1 }} />
                          : <Cancel color="error" sx={{ mr: 1 }} />
                      )}
                      <Typography>
                        {index + 1}. {choice.text}
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button 
          size="small" 
          onClick={onToggleAnswer}
          variant={showAnswer ? "outlined" : "contained"}
          color={showAnswer ? "secondary" : "primary"}
        >
          {showAnswer ? '隐藏答案' : '显示答案'}
        </Button>
        
        {showAnswer && userAnswer !== undefined && (
          <Alert 
            severity={isCorrect ? "success" : "error"} 
            sx={{ py: 0, width: 'auto' }}
          >
            {isCorrect ? '回答正确!' : '回答错误'}
          </Alert>
        )}
      </CardActions>
      
      {showAnswer && (
        <CardContent sx={{ 
          bgcolor: 'info.light', 
          color: 'info.contrastText',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="body2" paragraph>
            <strong>正确答案:</strong> {question.correctAnswerIndex + 1}
          </Typography>
          <Typography variant="body2">
            <strong>解析:</strong> {question.explanation}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default QuestionCard;