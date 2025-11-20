import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ui/components/ProtectedRoute";
import { AppLayout } from "./ui/layouts/AppLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz from "./pages/EditQuiz";
import QuizDetail from "./pages/QuizDetail";
import TakeQuiz from "./pages/TakeQuiz";
import TakeQuizEntry from "./pages/TakeQuizEntry";
import QuizCompleted from "./pages/QuizCompleted";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import AIGenerate from "./pages/AIGenerate";
import Invite from "./pages/Invite";
import Participants from "./pages/Participants";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/take-quiz" element={<TakeQuizEntry />} />
            <Route path="/take/:id" element={<TakeQuiz />} />
            <Route path="/quiz-completed" element={<QuizCompleted />} />
            <Route path="/history" element={<History />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quizzes" element={<Navigate to="/dashboard" replace />} />
              <Route path="/quizzes/create" element={<CreateQuiz />} />
              <Route path="/quizzes/:id" element={<QuizDetail />} />
              <Route path="/quizzes/:id/edit" element={<EditQuiz />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/participants" element={<Participants />} />
              <Route path="/ai-generate" element={<AIGenerate />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:id" element={<Reports />} />
              <Route path="/invite" element={<Invite />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ToastProvider>
  </QueryClientProvider>
);

export default App;
