import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';

import AdminLayout from '../components/Layout/AdminLayout';
import SecurityService from '../Pages/SecurityService/SecurityService';
import TopSpeedSecurity from '../Pages/TopSeedSecutity/TopSpeedSecurity';
import SpeedSecurity from '../Pages/Speed/SpeedSecurity';
import ArtistsCoordinationTable from '../Pages/ArtistsCoordinationTable/ArtistsCoordinationTable';
import SecurityServiceTable from '../Pages/SecurityServiceTable/SecurityServiceTable';
import TopSpeedTable from '../Pages/TopSpeedTable/TopSpeedTable';
import ViewEnquiey from '../Pages/ViewEnquiry/ViewEnquiey';
import Contact from '../Pages/ViewContact/ViewContact';
import ConfirmBooking from '../Pages/ConfirmBooking/ConfirmBooking';
import CancelBooking from '../Pages/CancelBooking/CancelBooking';
const AppRoutes = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/SecurityService" element={<SecurityService />} />
          <Route path="/SecurityServiceTable" element={<SecurityServiceTable />} />
          <Route path="/artist-coordination" element={<TopSpeedSecurity />} />
          <Route path="/ArtistsCoordinationTable" element={<ArtistsCoordinationTable />} />
          <Route path="/SpeedSecurity" element={<SpeedSecurity />} />
          <Route path="/TopSpeedTable" element={<TopSpeedTable />} />
          <Route path="/ViewEnquiey" element={<ViewEnquiey />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
          <Route path="/CancelBooking" element={<CancelBooking />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default AppRoutes;
