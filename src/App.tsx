import { BrowserRouter, Routes, Route } from 'react-router';
import { ProjectsProvider } from './context/ProjectsContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import './App.css';

function App()
{
  return(
    <ProjectsProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Sidebar/>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/projects" element={<Projects/>}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProjectsProvider>
  );
}

export default App;