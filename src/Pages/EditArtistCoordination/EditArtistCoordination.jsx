import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditArtistCoordination() {
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [events, setEvents] = useState('');
  const [name, setName] = useState('');
  const [ratings, setRatings] = useState('');
  const [isBookable, setIsBookable] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    const fetchArtistFromAll = async () => {
      try {
        const token = localStorage.getItem('adminToken');

        // Fetch all artists
        const response = await axios.get(
          'https://karthikcreation.ap-1.evennode.com/api/admin/getAllArtist',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.Status && Array.isArray(response.data.data)) {
          // Find artist by id
          const artist = response.data.data.find((a) => a._id === id);

          if (artist) {
            setEvents(artist.number_of_events || '');
setName(artist.heading || '');
            setRatings(artist.rating || '');
            setIsBookable(artist.availability_status === 1);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Not Found',
              text: 'Artist with given ID not found in all artists.',
              confirmButtonColor: '#d33',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch artists list.',
            confirmButtonColor: '#d33',
          });
        }
      } catch (error) {
        console.error('Failed to fetch artists:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Could not fetch artists data.',
          confirmButtonColor: '#d33',
        });
      }
    };

    fetchArtistFromAll();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();

      if (image) {
        formData.append('file', image);
      }

      formData.append('number_of_events', events);
        formData.append('heading', heading);
      formData.append('rating', ratings);
      formData.append('availability_status', isBookable ? 1 : 0);

      const response = await fetch(
        `https://karthikcreation.ap-1.evennode.com/api/admin/updateArtistCoordinationData/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

       if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Artist updated successfully!',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/ArtistsCoordinationTable');  // <-- redirect after success alert
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data.message || 'Unknown error occurred.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong!',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Edit Performer Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Upload New Image (optional)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Number of Events</label>
            <input
              type="number"
              name="eventsCount"
              value={events}
              onChange={(e) => setEvents(e.target.value)}
              placeholder="Number of Events"
              className="form-control"
              required
              min={0}
            />
          </div>
           <div className="form-group">
            <label>Events name</label>
           <input
  type="text"
  name="name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Events Name"
  className="form-control"
  required
/>

          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              name="rating"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              placeholder="Rating (0 to 5)"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="isBookable"
                checked={isBookable}
                onChange={(e) => setIsBookable(e.target.checked)}
              />
              Available / Bookable
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? 'Submitting...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArtistCoordination;
