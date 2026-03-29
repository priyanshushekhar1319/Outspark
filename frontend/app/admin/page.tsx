'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [tab, setTab] = useState<'reviews'|'users'>('reviews');
  const [feedback, setFeedback] = useState<{[key:number]:string}>({});
  const [score, setScore] = useState<{[key:number]:string}>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') { router.push('/login'); return; }
    const headers = { Authorization: `Bearer ${token}` };
    axios.get(`${API}/api/admin/stats`, { headers }).then(r => setStats(r.data));
    axios.get(`${API}/api/admin/reviews`, { headers }).then(r => setReviews(r.data));
    axios.get(`${API}/api/admin/users`, { headers }).then(r => setUsers(r.data));
  }, []);

  const updateReview = async (id: number, status: string) => {
    const token = localStorage.getItem('token');
    await axios.patch(`${API}/api/admin/reviews/${id}`, {
      status, feedback: feedback[id] || '', score: parseFloat(score[id]) || null
    }, { headers: { Authorization: `Bearer ${token}` } });
    alert('Review updated!');
    const r = await axios.get(`${API}/api/admin/reviews`, { headers: { Authorization: `Bearer ${token}` } });
    setReviews(r.data);
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`${API}/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.filter(u => u.id !== id));
  };

  if (!stats) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#6b7280'}}>
      Loading...
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb'}}>
      <nav style={{background:'#fff',borderBottom:'1px solid #e5e7eb',padding:'14px 32px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontWeight:800,fontSize:'18px',color:'#2563eb'}}>Outspark Admin</span>
        <button onClick={() => { localStorage.clear(); router.push('/'); }}
          style={{fontSize:'13px',color:'#ef4444',background:'none',border:'none',cursor:'pointer'}}>
          Logout
        </button>
      </nav>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 24px',display:'flex',flexDirection:'column',gap:'24px'}}>

        {/* STATS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}}>
          {[
            {label:'Total Users', value: stats.total_users},
            {label:'Total Reviews', value: stats.total_reviews},
            {label:'Pending Reviews', value: stats.pending_reviews},
            {label:'Revenue', value: `₹${stats.total_revenue}`},
          ].map(({label, value}) => (
            <div key={label} style={{background:'#fff',borderRadius:'16px',padding:'24px',border:'1px solid #e5e7eb',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:800,color:'#2563eb'}}>{value}</div>
              <div style={{fontSize:'12px',color:'#9ca3af',marginTop:'6px'}}>{label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{display:'flex',gap:'8px'}}>
          {(['reviews','users'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{padding:'9px 24px',borderRadius:'10px',fontSize:'13px',fontWeight:700,cursor:'pointer',border:'1px solid #e5e7eb',
                background: tab===t ? '#2563eb' : '#fff',
                color: tab===t ? '#fff' : '#6b7280'}}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {/* REVIEWS TAB */}
        {tab === 'reviews' && (
          <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',overflow:'hidden'}}>
            <div style={{padding:'20px 28px',borderBottom:'1px solid #e5e7eb'}}>
              <h2 style={{fontWeight:800,color:'#111827',fontSize:'16px'}}>All Reviews</h2>
            </div>
            {reviews.length === 0 ? (
              <div style={{padding:'28px',color:'#9ca3af',fontSize:'13px'}}>No reviews yet.</div>
            ) : reviews.map((r: any) => (
              <div key={r.id} style={{padding:'24px 28px',borderBottom:'1px solid #f3f4f6'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:'12px'}}>
                  <div>
                    <div style={{fontWeight:700,color:'#111827',fontSize:'14px'}}>{r.full_name}</div>
                    <div style={{fontSize:'12px',color:'#9ca3af',marginTop:'2px'}}>{r.current_role} → {r.target_role}</div>
                    <div style={{fontSize:'11px',color:'#3b82f6',marginTop:'2px'}}>{r.linkedin_url}</div>
                  </div>
                  <span style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'99px',
                    background:r.status==='completed'?'#f0fdf4':r.status==='in_progress'?'#eff6ff':'#fefce8',
                    color:r.status==='completed'?'#16a34a':r.status==='in_progress'?'#2563eb':'#ca8a04'}}>
                    {r.status.toUpperCase()}
                  </span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'12px',alignItems:'start'}}>
                  <textarea
                    placeholder="Write feedback..."
                    value={feedback[r.id] ?? r.feedback ?? ''}
                    onChange={e => setFeedback({...feedback, [r.id]: e.target.value})}
                    style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',outline:'none',height:'80px',resize:'none'}} />
                  <div style={{display:'flex',flexDirection:'column',gap:'8px',minWidth:'180px'}}>
                    <input type="number" placeholder="Score (0-100)"
                      value={score[r.id] ?? r.score ?? ''}
                      onChange={e => setScore({...score, [r.id]: e.target.value})}
                      style={{border:'1px solid #e5e7eb',borderRadius:'10px',padding:'9px 14px',fontSize:'13px',outline:'none'}} />
                    <button onClick={() => updateReview(r.id, 'in_progress')}
                      style={{background:'#eff6ff',color:'#2563eb',fontWeight:700,padding:'9px',borderRadius:'9px',border:'none',cursor:'pointer',fontSize:'12px'}}>
                      Mark In Progress
                    </button>
                    <button onClick={() => updateReview(r.id, 'completed')}
                      style={{background:'#16a34a',color:'#fff',fontWeight:700,padding:'9px',borderRadius:'9px',border:'none',cursor:'pointer',fontSize:'12px'}}>
                      Mark Complete ✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e5e7eb',overflow:'hidden'}}>
            <div style={{padding:'20px 28px',borderBottom:'1px solid #e5e7eb'}}>
              <h2 style={{fontWeight:800,color:'#111827',fontSize:'16px'}}>All Users</h2>
            </div>
            {users.map((u: any) => (
              <div key={u.id} style={{padding:'16px 28px',borderBottom:'1px solid #f3f4f6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700,color:'#111827',fontSize:'14px'}}>{u.name}</div>
                  <div style={{fontSize:'12px',color:'#9ca3af'}}>{u.email}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <span style={{background:'#dbeafe',color:'#1d4ed8',fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'99px',textTransform:'uppercase'}}>{u.plan}</span>
                  <span style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'99px',
                    background:u.role==='admin'?'#f3e8ff':'#f3f4f6',
                    color:u.role==='admin'?'#7c3aed':'#6b7280'}}>{u.role}</span>
                  {u.role !== 'admin' && (
                    <button onClick={() => deleteUser(u.id)}
                      style={{fontSize:'12px',color:'#ef4444',background:'none',border:'none',cursor:'pointer',fontWeight:600}}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
