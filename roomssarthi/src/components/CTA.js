import React from 'react';

export default function CTA() {
  return (
    <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <div className="container py-4">
        <h2 className="display-5 fw-bold mb-3">Ready to Find Your Perfect Space?</h2>
        <p className="lead mb-4">Join thousands of happy users who found their ideal living arrangements</p>
        <button className="btn btn-light btn-lg px-5" style={{ color: '#6366f1', fontWeight: '600' }}>
          Get Started Now
        </button>
      </div>
    </section>
  );
}
