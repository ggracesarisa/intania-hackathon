import { AssignmentData } from "../../types";

export const sampleAssignment: AssignmentData = {
  id: "003",
  title: "Basic Math Quiz",
  description: "Answer all 10 questions correctly to complete this assignment.",
  teacherId: "teacher-123",
  classId: "003",
  questions: [
    {
      id: "1",
      text: "What is 1+1?",
      options: ["2", "3", "4", "None of these"],
      correctAnswer: "2",
    },
    {
      id: "2",
      text: "What is 5×5?",
      options: ["10", "15", "25", "20"],
      correctAnswer: "25",
    },
    {
      id: "3",
      text: "What is 144÷12?",
      options: ["10", "12", "14", "16"],
      correctAnswer: "12",
    },
    {
      id: "4",
      text: "Which is the largest number?",
      options: ["0.75", "3/4", "0.8", "4/5"],
      correctAnswer: "4/5",
    },
    {
      id: "5",
      text: "What is the area of a square with sides of 7cm?",
      options: ["14cm²", "28cm²", "49cm²", "64cm²"],
      correctAnswer: "49cm²",
    },
    {
      id: "6",
      text: "What is 17+38?",
      options: ["45", "55", "65", "75"],
      correctAnswer: "55",
    },
    {
      id: "7",
      text: "If x=3, what is 2x²-x?",
      options: ["15", "18", "17", "21"],
      correctAnswer: "15",
    },
    {
      id: "8",
      text: "What comes next: 2, 4, 8, 16, ...?",
      options: ["18", "24", "32", "36"],
      correctAnswer: "32",
    },
    {
      id: "9",
      text: "If a triangle has angles of 30° and 60°, what is the third angle?",
      options: ["30°", "60°", "90°", "120°"],
      correctAnswer: "90°",
    },
    {
      id: "10",
      text: "How many sides does a hexagon have?",
      options: ["4", "5", "6", "8"],
      correctAnswer: "6",
    },
  ],
};
