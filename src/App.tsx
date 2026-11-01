import { BrowserRouter, Routes, Route } from 'react-router';
import { ProjectsProvider } from './context/ProjectsContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import './App.css';
import { TasksProvider } from './context/TasksContext';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import { TeamProvider } from './context/TeamContext';

function App()
{
  return(
    <ProjectsProvider>
      <TasksProvider>
        <TeamProvider>
          <BrowserRouter>
            <div className="app-layout">
              <Sidebar/>

              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/projects" element={<Projects/>}/>
                  <Route path="/tasks" element={<Tasks />}/>
                  <Route path="/team" element={<Team />}/>
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TeamProvider>
      </TasksProvider>
    </ProjectsProvider>
  );
}

export default App;