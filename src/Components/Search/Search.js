import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Search.scss';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0
  });
  

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePageChange = (newPage) => {
    handleSubmit({ page: newPage });  // Update the page number in the request
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (searchTerm.trim() !== '') {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.get('http://localhost:8080/Employee/searchbycriteria', {
          params: {
            cin: searchTerm,      // Pass CIN from search input
            prenom: '',           // Example values for prenom and nom
            nom: '',
            page: 1,              // Initial page value (can be dynamic later)
            limit: 10,            // Set limit for results per page
            isDeleted: false,     // Control whether to include deleted entries
            withPagination: true  // Enable pagination
          },
        });
  
        // Assuming the response structure is like:
        // {
        //   data: {
        //     content: [/* array of employee results */],
        //     number: 0, // current page (0-based)
        //     totalPages: 5,
        //     totalElements: 50
        //   }
        // }
        const { content, totalPages, totalElements } = response.data.data;
  
        // Set search results with the employee list
        setSearchResults(content);
  
        // Handle pagination state (if you want to track total pages, etc.)
        setPagination({
          currentPage: response.data.data.number + 1,  // Adjust for 0-based index
          totalPages,
          totalElements
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  

  const handleEdit = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };
  const handleRowClick = (employeeId) => {
    navigate(`/etat-engagement/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:8080/Employee/${employeeId}`);
        // Remove the deleted employee from the search results
        setSearchResults((prevResults) => prevResults.filter((result) => result.employeeId !== employeeId));
        console.log('Employee deleted successfully.');
      } catch (error) {
        console.error('Error deleting employee:', error);
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <form className="my-search-form Search-form" onSubmit={handleSubmit} role="search">
          <label className="my-search-label Search-label" htmlFor="search">
            Rechercher un employé par CIN:
          </label>
          <input
            className="my-search-input Search-input"
            id="search"
            type="search"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleChange}
            autoFocus
            required
          />
          <button className="my-search-button Search-button" type="submit">
            Go
          </button>
        </form>
      </div>

      <div className="search-results-container">
        <div className="search-results">
          {isLoading && <p>Chargement des resultats...</p>}
          {error && <p>Error: {error.message}</p>}

          {searchResults.length > 0 && (
            <table className="custom-table table-bordered table-hover dt-responsive">
              <caption>Liste des employés:</caption>
              <thead>
                <tr>
                  <th>CIN</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr >
                    <td key={result.employeeId} onClick={() => handleRowClick(result.employeeId)} style={{ cursor: 'pointer' }}>{result.cin}</td>
                    <td key={result.employeeId} onClick={() => handleRowClick(result.employeeId)} style={{ cursor: 'pointer' }}>{result.nom}</td>
                    <td key={result.employeeId} onClick={() => handleRowClick(result.employeeId)} style={{ cursor: 'pointer' }} >{result.prenom}</td>
                    <td>
                      <button className="custom-edit-btn" onClick={() => handleEdit(result.employeeId)}>
                        Editer
                      </button>
                      <button className="custom-delete-btn" onClick={() => handleDelete(result.employeeId)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-center">
                    {/* Add footer content if needed */}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
