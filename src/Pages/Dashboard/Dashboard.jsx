import React from 'react'
import Cards from '../../components/Dashboard/Cards'
import BookingTrends from '../../components/Dashboard/BookingTrends'
import RecentBooking from '../../components/Dashboard/RecentBooking'
import ServiceDestribution from '../../components/Dashboard/ServiceDestribution'
import PendingBooking from '../../components/Dashboard/PendingBooking'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Top Cards Section */}
      <div className="dashboard-cards">
        <Cards />
      </div>

      {/* Middle Charts Section */}
      <div className="dashboard-charts">
        <div className="booking-trends">
          <BookingTrends />
        </div>
        <div className="service-distribution">
          <ServiceDestribution />
        </div>
      </div>

      {/* Bottom Tables Section */}
      <div className="dashboard-tables">
        <div className="recent-booking">
          <RecentBooking />
        </div>
        <div className="pending-booking">
          <PendingBooking />
        </div>
      </div>

    </div>
  )
}

export default Dashboard
