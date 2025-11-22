import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../Layout";
import Index from "../../Pages/Index";
import Dashboard from "../../Pages/Dashboard";
import CreateQuiz from "@/Pages/CreateQuiz";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Profile from "@/Pages/Profile";
import History from "@/Pages/History";
import Participants from "@/Pages/Participants";
import AIGenerate from "@/Pages/AIGenerate";
import EditQuiz from "@/Pages/EditQuiz";
import QuizDetail from "@/Pages/QuizDetail";

export default function PageRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 
       
        
        <Route path="/take-quiz" element={<TakeQuizEntry />} />
        
        <Route path="/quiz-completed" element={<QuizCompleted />} />
        
        <Route path="/take/:id" element={<TakeQuiz />} />
        
        
        
        
        
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<Reports />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="*" element={<NotFound />} /> */}

        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizzes/create" element={<CreateQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/quizzes" element={<Navigate to="/dashboard" replace />} />
        <Route path="/ai-generate" element={<AIGenerate />} />
        <Route path="/quizzes/:id/edit" element={<EditQuiz />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
      </Route>
    </Routes>
  );
}
