export interface Question {
  id: string;
  text: string;
  options: Array<string>;
  correctAnswer: string;
}

export interface GameState {
  status: "idle" | "playing" | "success" | "failure";
  currentQuestionIndex: number;
  playerHeight: number;
  lavaHeight: number;
  correctAnswers: number;
  totalQuestions: number;
  questions: Array<Question>;
  isFalling: boolean;
}

export interface AssignmentData {
  id: string;
  title: string;
  description: string;
  questions: Array<Question>;
  teacherId: string;
  classId: string;
}
