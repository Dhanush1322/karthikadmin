import React, { useEffect, useState } from 'react';
import './ArtistsCoordinationTable.css';
import { useNavigate } from 'react-router-dom';
function ArtistsCoordinationTable() {
  const [artistData, setArtistData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate(); // ✅ FIX: Declare navigate here
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch('https://karthikcreation.ap-1.evennode.com/api/admin/getAllArtist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.Status) {
          setArtistData(result.data);
          fetchImages(result.data); // Fetch images after artist data
        } else {
          console.error('Failed to fetch artist data');
        }
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };

    const fetchImages = async (artists) => {
      const newImageUrls = {};
      for (const artist of artists) {
        try {
          const response = await fetch(`https://karthikcreation.ap-1.evennode.com/api/admin/viewArtistFile/${artist.img}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          newImageUrls[artist._id] = imageUrl;
        } catch (err) {
          console.error('Image fetch failed:', err);
        }
      }
      setImageUrls(newImageUrls);
    };

    fetchArtistData();
  }, []);

  const totalPages = Math.ceil(artistData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = artistData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Artist Coordination</h2>
      <div className="table-scroll">
        <table className="equipment-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Image</th>
              <th>Number Of Events</th>
              <th>Ratings</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((artist, index) => (
              <tr key={artist._id}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>
                  {imageUrls[artist._id] ? (
                    <img
                      src={imageUrls[artist._id]}
                      alt="Artist"
                      width="50"
                      height="50"
                      style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                  ) : (
                    'Loading...'
                  )}
                </td>
                <td>{artist.number_of_events}</td>
                <td>{artist.rating}</td>
                <td style={{ color: artist.availability_status === 1 ? 'green' : 'red' }}>
                  {artist.availability_status === 1 ? 'Available' : 'Not Available'}
                </td>
                <td>{new Date(artist.createdAt).toLocaleDateString()}</td>
                <td>{new Date(artist.updatedAt).toLocaleDateString()}</td>

                <td >
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/EditArtistCoordination/${artist._id}`)}
                  >
                    ✏️
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ArtistsCoordinationTable;
