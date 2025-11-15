import React from 'react';

export default function HowItWorks() {
  const steps = [
    { number: 1, title: 'Search Location', description: 'Enter your preferred location and browse through verified listings.' },
    { number: 2, title: 'Connect Securely', description: 'Check compatibility scores and connect with potential flatmates.' },
    { number: 3, title: 'Move In', description: 'Finalize your choice and move into your perfect home without brokerage fees.' }
  ];

  return (
    <section id="how-it-works" className="py-5" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">How It Works</h2>
          <p className="lead text-muted">Simple steps to find your perfect living space</p>
        </div>
        <div className="row g-4">
          {steps.map(step => (
            <div key={step.number} className="col-md-4 text-center">
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1rem auto',
                backgroundColor: '#6366f1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>{step.number}</div>
              <h4 className="fw-bold mb-3">{step.title}</h4>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
