export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  questionNumber: string;
  isEssential: boolean;
  sourceYear: string;
  topic: string;
  questionText: string;
  choices: Choice[];
  correctAnswerIndex: number; // 最好把它改成数字，而不是-1
  explanation: string;
}

export type Topic = '土工' | '混凝土' | '钢筋' | '安全' | '施工';