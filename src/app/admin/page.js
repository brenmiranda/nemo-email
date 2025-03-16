'use client';

import Link from 'next/link';
import AdminPanel from '../../components/AdminPanel';

export default function Admin() {
  return (
    <div className="container">
      <div className="app-header">
        <h1>Email Signature Generator</h1>
        <p>Style Settings - Configure your signature appearance</p>
        
        <div className="nav-links">
          <Link href="/">Generator</Link>
          <Link href="/admin">Style Settings</Link>
        </div>
      </div>
      
      <AdminPanel />
    </div>
  );
}
