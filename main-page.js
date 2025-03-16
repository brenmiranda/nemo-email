'use client';

import Link from 'next/link';
import SignatureForm from '../components/SignatureForm';
import SignaturePreview from '../components/SignaturePreview';

export default function Home() {
  return (
    <div className="container">
      <div className="app-header">
        <h1>Email Signature Generator</h1>
        <p>Create on-brand email signatures with your company logo and brand font</p>
        
        <div className="nav-links">
          <Link href="/">Generator</Link>
          <Link href="/admin">Admin Panel</Link>
        </div>
      </div>
      
      <div className="main-layout">
        <SignatureForm />
        <SignaturePreview />
      </div>
    </div>
  );
}
