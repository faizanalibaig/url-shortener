'use client';

import { useState } from 'react';

function page() {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [shortenedResult, setShortenedResult] = useState('');

  const handleShortenUrl = async () => {
    const response = await fetch(`${process.env.PORT}/api/shortener/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl: shortenedUrl }),
    });

    if (!response.ok) {
      console.error('Failed to shorten URL');
      return;
    }

    const data = await response.json();
    setShortenedResult(data);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 'normal',
            color: '#333',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          URL Shortener
        </h1>

        {/* Input and Button Row */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <input
            type='url'
            placeholder='Enter your URL here...'
            onChange={(e) => setShortenedUrl(e.target.value)}
            style={{
              flex: '1',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleShortenUrl}
            style={{
              padding: '10px 16px',
              background: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Shorten
          </button>
        </div>

        {/* Result Field */}
        <div>
          <div
            style={{
              width: '100%',
              padding: '10px 12px',
              background: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#666',
            }}
          >
            <span style={{ fontStyle: 'italic' }}>
              {shortenedResult
                ? shortenedResult
                : 'Shortened URL will appear here...'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
