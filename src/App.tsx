import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from './components/Header.tsx';
import Home from './components/welcomePage.tsx';
import SignUp from './pages/signup.tsx';
import LogIn from './pages/login.tsx';
import NewTask from './pages/NewTask.tsx';
import UpdateTask from './pages/Update.tsx';
import CompletedTasks from './pages/Completed.tsx';
import Protected from './components/Protected.tsx';
import Tasks from './pages/Tasks.tsx';
import TrashPage from './pages/Trash.tsx';
import ProfilePage from './pages/Profile.tsx';

const queryClient = new QueryClient();

function App() {
   return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/new-task"
            element={
              <Protected>
                <NewTask />
              </Protected>
            }
          />
          <Route
             path="/tasks"
            element={
               <Protected>
                 <Tasks />
               </Protected>
            }
             />
              <Route
             path="/update/:id"
            element={
               <Protected>
                 <UpdateTask />
               </Protected>
            }
             />
             <Route
             path="/tasks/completed"
            element={
               <Protected>
                 <CompletedTasks />
               </Protected>
            }
             />
             <Route
             path="/trash"
            element={
               <Protected>
                 <TrashPage />
               </Protected>
            }
             />
             <Route
             path="/profile"
            element={
               <Protected>
                 <ProfilePage /> 
               </Protected>
            }
             />
  
        </Routes>
      </Router>
    </QueryClientProvider>
   )


}

export default App
