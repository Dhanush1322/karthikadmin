import React from 'react';
import './Cards.css';

function Cards() {
  const data = [
    { title: "Total Bokkings", value: "1,284", change: "+12.5%", note: "from last month" },
    { title: "Confirmed Bookings",value: "300", change: "+12.5%", note: "from last month" },
    { title: "Canceled Bookings", value: "454", change: "+12.5%", note: "from last month"},
    { title: "Total Enquiry", value: "33", change: "+12.5%", note: "from last month"}
  ];

  return (
    <div className="cards-container">
      {data.map((card, index) => (
        <div className="card" key={index}>
          <h4>{card.title}</h4>
          <p>{card.value}</p>
          <small className={card.change.startsWith('+') ? 'positive' : 'negative'}>
            {card.change} {card.note}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Cards;
