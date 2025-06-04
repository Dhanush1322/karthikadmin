import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';

import AdminLayout from '../components/Layout/AdminLayout';
import SecurityService from '../Pages/SecurityService/SecurityService';
import EditSecurityService from '../Pages/EditSecurityService/EditSecurityService';
import TopSpeedSecurity from '../Pages/TopSeedSecutity/TopSpeedSecurity';
import SpeedSecurity from '../Pages/Speed/SpeedSecurity';
import EditArtistCoordination from '../Pages/EditArtistCoordination/EditArtistCoordination';
import ArtistsCoordinationTable from '../Pages/ArtistsCoordinationTable/ArtistsCoordinationTable';
import SecurityServiceTable from '../Pages/SecurityServiceTable/SecurityServiceTable';

import TopSpeedTable from '../Pages/TopSpeedTable/TopSpeedTable';
import EditTopSpeedSecurity from '../Pages/EditTopSpeedSecurity/EditTopSpeedSecurity';
import ViewEnquiey from '../Pages/ViewEnquiry/ViewEnquiey';
import Contact from '../Pages/ViewContact/ViewContact';
import ConfirmBooking from '../Pages/ConfirmBooking/ConfirmBooking';
import CancelBooking from '../Pages/CancelBooking/CancelBooking';
import Login from '../Login/Login';
import AddEventGAllery from '../Pages/AddEventGallery/AddEventGAllery';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Login route OUTSIDE AdminLayout */}
        <Route path="/" element={<Login />} />

        {/* All other routes INSIDE AdminLayout */}
        <Route
          path="*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/SecurityService" element={<SecurityService />} />
                <Route path="/EditSecurityService/:id" element={<EditSecurityService />} />
                <Route path="/SecurityServiceTable" element={<SecurityServiceTable />} />
                <Route path="/artist-coordination" element={<TopSpeedSecurity />} />
                <Route path="/EditArtistCoordination/:id" element={<EditArtistCoordination />} />
                <Route path="/ArtistsCoordinationTable" element={<ArtistsCoordinationTable />} />
                <Route path="/SpeedSecurity" element={<SpeedSecurity />} />
                <Route path="/EditTopSpeedSecurity/:id" element={<EditTopSpeedSecurity />} />
                <Route path="/TopSpeedTable/" element={<TopSpeedTable />} />
                <Route path="/ViewEnquiey" element={<ViewEnquiey />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
                <Route path="/CancelBooking" element={<CancelBooking />} />
                  <Route path="/AddEventGAllery" element={<AddEventGAllery />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
