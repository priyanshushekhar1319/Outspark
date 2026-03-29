'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await axios.post(`${API}/api/register`, { name, email, password });
      const form = new URLSearchParams();
      form.append('username', email);
      form.append('password', password);
      const res = await axios.post(`${API}/api/login`, form);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Registration failed. Try again.');
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
          <h1 style={{fontSize:'26px',fontWeight:800,color:'#111827',margin:'0 0 8px'}}>Create your account</h1>
          <p style={{fontSize:'14px',color:'#9ca3af',margin:0}}>Start your LinkedIn transformation today</p>
        </div>

        <div style={{background:'#fff',borderRadius:'20px',padding:'32px',boxShadow:'0 4px 24px rgba(0,0,0,0.07)',border:'1px solid #e5e7eb'}}>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Full Name</label>
              <input type="text" required placeholder="Your Full Name"
                value={name} onChange={e => setName(e.target.value)}
                style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'11px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Email</label>
              <input type="email" required placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'11px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>Password</label>
              <input type="password" required placeholder="Min 8 characters"
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
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <div style={{margin:'20px 0',borderTop:'1px solid #f3f4f6',paddingTop:'20px'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {['✓ Get your profile reviewed in 24 hours','✓ Personalized expert feedback','✓ No credit card required'].map(t => (
                <div key={t} style={{fontSize:'12px',color:'#16a34a',fontWeight:500}}>{t}</div>
              ))}
            </div>
          </div>

          <p style={{textAlign:'center',fontSize:'13px',color:'#9ca3af',margin:0}}>
            Already have an account?{' '}
            <Link href="/login" style={{color:'#2563eb',fontWeight:600,textDecoration:'none'}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


