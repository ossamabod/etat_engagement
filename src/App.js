import React from 'react';
import './App.css';
import EmployeForm from './Components/EmployeForm/EmployeForm'; // Correct path
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './Components/SideBar/SideBar'; // Correct import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './Components/Search/Search';
import GradePage from './Components/Grade/GradePage';
import GradeForm from './Components/Grade/GradeForm';
import EtatEngagement from './Components/EtatEngagment/EtatEngagement';


function App() {
  const exampleData = {
    dp: 406,
    province: "OUAZZANE",
    cin: "GM31802",
    name: "EL-GHAZOUANI ABDELLAH",
    grade: "MOQ RURAL",
    mutuelle: "A",
    dateNaissance: "1990-01-01",
    dateEffet: "2024-01-01",
    indemniteAnnuelle: 37200,
    nouveau: 37200,
    total: 37200,
    brutMensuel: 3100,
    netAOrdonner: 3100,
    totalSomme: "TROIS MILLE CENT DIRHAMS"
  };
  return (
    <Router>
    <div className="app-container">
      <SideBar />
      <div className="content">
        <Routes>
          <Route path="/employe-form" element={<EmployeForm/>} />
          <Route path="/search-form" element={<Search/>} />
          <Route path="/edit-employee/:employeeId" element={<EmployeForm />} />
          <Route path="/" element={<Search />} />
          <Route path="/edit-employee/:employeeId" element={<EmployeForm />} />
          <Route path="/GradePage" element={<GradePage />} />
          <Route path='/GradeForm' element={<GradeForm/>}/>
          <Route path='/etat-engagement' element={<EtatEngagement data={exampleData} />} />

          
                    {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
