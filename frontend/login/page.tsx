'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const form = new URLSearchParams();
      form.append('username', email);
      form.append('password', password);
      const res = await axios.post(`${API}/api/login`, form);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      if (res.data.role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <Link href="/" style={{textDecoration:'none'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',marginBottom:'24px'}}>
              <div style={{width:'36px',height:'36px',background:'#2563eb',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{color:'#fff',fontWeight:800,fontSize:'16px'}}>O</span>
              </div>
              <span style={{fontWeight:800,fontSize:'22px',color:'#111827'}}>Outspark</span>
            </div>
          </Link>
          <h1 style={{fontSize:'26px',fontWeight:800,color:'#111827',margin:'0 0 8px'}}>Welcome back</h1>
          <p style={{fontSize:'14px',color:'#9ca3af',margin:0}}>Sign in to your account</p>
        </div>

        <div style={{background:'#fff',borderRadius:'20px',padding:'32px',boxShadow:'0 4px 24px rgba(0,0,0,0.07)',border:'1px solid #e5e7eb'}}>
          <div style={{background:'#eff6ff',borderRadius:'12px',padding:'14px 16px',marginBottom:'24px'}}>
            <div style={{fontSize:'12px',fontWeight:700,color:'#1d4ed8',marginBottom:'4px'}}>Demo Credentials</div>
            <div style={{fontSize:'12px',color:'#3b82f6'}}>Admin: admin@outspark.com / admin@123</div>
          </div>

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Email</label>
              <input type="email" required placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'11px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Password</label>
              <input type="password" required placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'11px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            {error && (
              <div style={{background:'#fef2f2',color:'#dc2626',fontSize:'13px',padding:'11px 14px',borderRadius:'10px'}}>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{background:'#2563eb',color:'#fff',fontWeight:700,padding:'13px',borderRadius:'12px',border:'none',cursor:'pointer',fontSize:'15px',opacity:loading?0.6:1,marginTop:'4px'}}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{textAlign:'center',fontSize:'13px',color:'#9ca3af',marginTop:'20px',marginBottom:0}}>
            Don't have an account?{' '}
            <Link href="/signup" style={{color:'#2563eb',fontWeight:600,textDecoration:'none'}}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
