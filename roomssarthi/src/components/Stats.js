import React from 'react';

export default function Stats() {
  const stats = [
    { number: '1000+', label: 'Active Listings' },
    { number: '5000+', label: 'Happy Users' },
    { number: '100%', label: 'Brokerage Free' },
    { number: '50+', label: 'Cities' }
  ];

  return (
    <section className="py-4 stats" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container">
        <div className="row text-center">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-md-3 mb-3 mb-md-0">
              <h2 className="fw-bold text-primary">{stat.number}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
