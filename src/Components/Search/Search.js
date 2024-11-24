import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchbycriteria ,deleteEmployee} from '../../feature/Employee/EmployeeAction';
import './Search.scss';
import { useDispatch ,useSelector } from 'react-redux';


export default function Search() {
  const dispatch= useDispatch()

  const{searchResult,pagination ,isLoading,error}= useSelector((state)=>state.Employee);
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const [pagination, setPagination] = useState({
  //   currentPage: 1,
  //   totalPages: 1,
  //   totalElements: 0,
  // });

  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleSubmit = async (event, pageInt) => {
  //   if (event && event.preventDefault) {
  //     event.preventDefault();
  //   }
  //   console.log("pageInt in handleSubmit "+ pageInt +"searchTerm "+ searchTerm)

  //   if (searchTerm.trim() !== '') {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const pageNumber = pageInt || 0; // Default to 0 if pageInt is undefined
  //       const response = await axios.post('http://localhost:8080/Employee/searchbycriteria', {
  //         cin: searchTerm,
  //         prenom: '',
  //         nom: '',
  //         page: pageNumber,
  //         limit: 5,
  //         isDeleted: false,
  //         withPagination: true,
  //       });

  //       const { content, totalPages, totalElements, page } = response.data.data;

  //       setSearchResults(content);
  //       setPagination({
  //         currentPage:  response.data.data.page.number + 1, // Adjust for 0-based index
  //         totalPages :response.data.data.page.totalPages,
  //         totalElementsresponse: response.data.data.page.totalElementsresponse,
  //       });
  //       console.log(pagination.totalPages);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      dispatch(searchbycriteria({ searchTerm, pageNumber: newPage  }));
    }
    };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= pagination.totalPages) {
  //     console.log("newPage in handlePageChange :"+newPage)
  //     handleSubmit(null, newPage); // Adjust for 0-based index
  //   }
  // };
  const handleSubmit = (e)=>
    {
      e.preventDefault();
      console.log("component SearchTerm :"+searchTerm)
      dispatch(searchbycriteria({ searchTerm, pageNumber: 0 }));
    };
  

  const handleEdit = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleRowClick = (employeeId) => {
    navigate(`/etat-engagement/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(employeeId));
    }
    // if (window.confirm('Are you sure you want to delete this employee?')) {
    //   try {
    //     await axios.delete(`http://localhost:8080/Employee/${employeeId}`);
    //     setSearchResults((prevResults) =>
    //       prevResults.filter((result) => result.employeeId !== employeeId)
    //     );
    //     console.log('Employee deleted successfully.');
    //   } catch (error) {
    //     console.error('Error deleting employee:', error);
    //     setError('Failed to delete employee. Please try again.');
    //   }
    // }
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {error && <p>Error: {error.message || error}</p>}

          {searchResult.length > 0 && (
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
                {searchResult.map((result) => (
                  <tr key={result.employeeId}>
                    <td onClick={() => handleRowClick(result.employeeId)} style={{ cursor: 'pointer' }}>
                      {result.cin}
                    </td>
                    <td onClick={() => handleRowClick(result.employeeId)} style={{ cursor: 'pointer' }}>
                      {result.nom}
                    </td>
                    <td onClick={() => handleRowClick(result.employeeId)} style={{ cursor: 'pointer' }}>
                      {result.prenom}
                    </td>
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
            </table>
          )}

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                Précédent
              </button>
              <span>
                Page {pagination.currentPage} sur {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
