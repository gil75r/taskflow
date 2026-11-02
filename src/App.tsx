
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ProjectsProvider } from './context/ProjectsContext';
import { TasksProvider } from './context/TasksContext';
import { TeamProvider } from './context/TeamContext';
import { SettingsProvider } from './context/SettingsContext';
import Sidebar from './components/Sidebar';
import './App.css';

const Dashboard=lazy(()=> import('./pages/Dashboard'));
const Projects=lazy(()=> import('./pages/Projects'));
const Tasks=lazy(()=> import('./pages/Tasks'));
const Team=lazy(()=> import('./pages/Team'));
const Calendar=lazy(()=> import('./pages/Calendar'));
const Analytics=lazy(()=> import('./pages/Analytics'));
const Settings=lazy(()=> import('./pages/Settings'));

function App()
{
    return(
      <SettingsProvider>
        <ProjectsProvider>
          <TasksProvider>
            <TeamProvider>
              <BrowserRouter>
                <div className="app-layout">
                  <Sidebar/>

                  <main className="main-content">
                    <Suspense
                      fallback=
                      {
                        <div className="page-loading">
                          Loading...
                        </div>
                      }
                    >
                      <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/tasks" element={<Tasks/>}/>
                        <Route path="/team" element={<Team/>}/>
                        <Route path="/calendar" element={<Calendar/>}/>
                        <Route path="/analytics" element={<Analytics/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                      </Routes>
                    </Suspense>
                  </main>
                </div>
              </BrowserRouter>
            </TeamProvider>
          </TasksProvider>
        </ProjectsProvider>
      </SettingsProvider>
    );
}

export default App;