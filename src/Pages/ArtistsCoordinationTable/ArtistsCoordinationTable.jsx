import React, { useState } from 'react';
import './ArtistsCoordinationTable.css'; // Reuse same style

const artistData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Singer',
    ratings: 4.5,
    events: 12,
    description: 'Energetic performer with a soulful voice.',
    genres: 'Pop, Jazz',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: 2,
    name: 'Emma Watson',
    role: 'Violinist',
    ratings: 4.8,
    events: 20,
    description: 'Graceful violinist with 10+ years experience.',
    genres: 'Classical, Instrumental',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: 3,
    name: 'David Lee',
    role: 'DJ',
    ratings: 4.2,
    events: 30,
    description: 'Popular EDM DJ with amazing energy.',
    genres: 'EDM, House',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: 4,
    name: 'Maya Rao',
    role: 'Dancer',
    ratings: 4.6,
    events: 18,
    description: 'Classical Bharatanatyam performer.',
    genres: 'Indian Classical',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: 5,
    name: 'Zayn Malik',
    role: 'Guitarist',
    ratings: 4.3,
    events: 22,
    description: 'Expert guitarist for rock and blues.',
    genres: 'Rock, Blues',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: 6,
    name: 'Anna Bell',
    role: 'Magician',
    ratings: 4.9,
    events: 25,
    description: 'Captivating stage magician for all ages.',
    genres: 'Magic Show',
    image: 'https://via.placeholder.com/60',
  }
];

function ArtistsCoordinationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

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
              <th>Performer Name</th>
              <th>Role</th>
              <th>Ratings</th>
              <th>No of Events</th>
              <th>Description</th>
              <th>Genres</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((artist, index) => (
              <tr key={artist.id}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td className="bold">{artist.name}</td>
                <td>{artist.role}</td>
                <td>{artist.ratings}</td>
                <td>{artist.events}</td>
                <td>{artist.description}</td>
                <td>{artist.genres}</td>
                <td><img src={artist.image} alt="artist" className="equipment-img" /></td>
                <td className="action-btns">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
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
