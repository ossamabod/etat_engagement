import React, { useState, useEffect } from "react";
import './SideBar.css';
import 'boxicons/css/boxicons.min.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmployeMenuOpen, setIsEmployeMenuOpen] = useState(false);
  const [isGradeMenuOpen, setIsGradeMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newIsSidebarOpen = !prev;

      // Close sub-menus when the sidebar is closed
      if (!newIsSidebarOpen) {
        setIsEmployeMenuOpen(false);
        setIsGradeMenuOpen(false);
      }

      return newIsSidebarOpen;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  };

  // Handle opening the sidebar if it's closed and a nav link is clicked
  const handleNavLinkClick = (setMenuOpen) => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
        <header>
          <div className="image-text">
            <span className="image">
              {/* <img src="./logo2.png" alt="logo" />  */}
            </span>
            <div className="text logo-text">
              <span className="name">Fiche technique </span>
              {/* <span className="profession">technique</span> */}
            </div>
          </div>

          <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              {/* Employé Menu */}
              <li className={`nav-link ${isEmployeMenuOpen ? 'active' : ''}`} onClick={() => handleNavLinkClick(setIsEmployeMenuOpen)}>
                <a>
                  <i className='bx bx-user icon'></i>
                  <span className="text nav-text">Gestion Employé</span>
                  <i className='bx bx-chevron-down dropdown-icon'></i>
                </a>
              </li>
              {isEmployeMenuOpen && (
                <ul className="menu-list">
                  <div className="sub-menu-list">
                    <li className="nav-link">
                      <Link to="/search-form">
                        <i className='bx bx-search-alt icon'></i>
                        <span className="text nav-text">Consulter</span>
                      </Link>
                    </li>
                  </div>
                  <div className="sub-menu-list">
                    <li className="nav-link">
                      <Link to="/employe-form">
                        <i className='bx bx-plus-circle icon'></i>
                        <span className="text nav-text">Créer Employé</span>
                      </Link>
                    </li>
                    <li className="nav-link">
                      <a href="#">
                        <i className='bx bx-edit icon'></i>
                        <span className="text nav-text">Modifier</span>
                      </a>
                    </li>
                    <li className="nav-link">
                      <a href="#">
                        <i className='bx bx-trash icon'></i>
                        <span className="text nav-text">Supprimer</span>
                      </a>
                    </li>
                  </div>
                </ul>
              )}

              {/* Grade Menu */}
              <li className={`nav-link ${isGradeMenuOpen ? 'active' : ''}`} onClick={() => handleNavLinkClick(setIsGradeMenuOpen)}>
                <a>
                  <i className='bx bx-list-check icon'></i>
                  <span className="text nav-text">Gestion Grades</span>
                  <i className='bx bx-chevron-down dropdown-icon'></i>
                </a>
              </li>
              {isGradeMenuOpen && (
                <ul className="menu-list">
                  <div className="sub-menu-list">
                    <li className="nav-link">
                      <Link to="/GradeForm">
                        <i className='bx bx-plus-circle icon'></i>
                        <span className="text nav-text">Créer Grade</span>
                      </Link>
                    </li>
                    <li className="nav-link">
                      <Link to="/GradePage">
                        <i className='bx bx-search-alt icon'></i>
                        <span className="text nav-text">Consulter</span>
                      </Link>
                    </li>
                  </div>
                </ul>
              )}

              {/* Etat Engagement Button */}
              <li className="nav-link">
                <Link to="/etat-engagement">
                  <i className='bx bx-file icon'></i>
                  <span className="text nav-text">Etat Engagement</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a href="#">
                <i className='bx bx-log-out icon'></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className='bx bx-moon icon moon'></i>
                <i className='bx bx-sun icon sun'></i>
              </div>
              <span className="mode-text text">
                {isDarkMode ? "Light mode" : "Dark mode"}
              </span>

              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
