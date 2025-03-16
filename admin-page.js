'use client';

import Link from 'next/link';
import AdminPanel from '../../components/AdminPanel';

export default function Admin() {
  return (
    <div className="container">
      <div className="app-header">
        <h1>Email Signature Generator</h1>
        <p>Admin Panel - Configure your signature settings</p>
        
        <div className="nav-links">
          <Link href="/">Generator</Link>
          <Link href="/admin">Admin Panel</Link>
        </div>
      </div>
      
      <AdminPanel />
    </div>
  );
}
