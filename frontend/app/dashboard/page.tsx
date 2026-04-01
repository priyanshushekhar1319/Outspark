'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DashboardPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [form, setForm] = useState({ linkedin_url:'', full_name:'', current_role:'', target_role:'', phone:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/api/my-reviews`).then(r => setReviews(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/api/submit-review`, form);
      setSubmitted(true);
      const r = await axios.get(`${API}/api/my-reviews`);
      setReviews(r.data);
    } catch { alert('Error submitting review'); }
    finally { setLoading(false); }
  };

  const handleUpgrade = async (plan: string, amount: number) => {
    try {
      await axios.post(`${API}/api/payment/checkout`, { plan, amount });
      alert(`Upgraded to ${plan} plan!`);
    } catch { alert('Error upgrading'); }
  };

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb'}}>
      <nav style={{background:'#fff',borderBottom:'1px solid #e5e7eb',padding:'14px 32px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <a href="/" style={{fontWeight:800,fontSize:'18px',color:'#2563eb',textDecoration:'none'}}>Outspark</a>
        <a href="/admin" style={{fontSize:'13px',color:'#6b7280',textDecoration:'none',fontWeight:600}}>Admin Panel →</a>
      </nav>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 24px',display:'flex',flexDirection:'column',gap:'24px'}}>

        <div style={{background:'#fff',borderRadius:'16px',padding:'28px',border:'1px solid #e5e7eb'}}>
          <h2 style={{fontSize:'18px',fontWeight:800,color:'#111827',marginBottom:'20px'}}>Submit Your LinkedIn Profile</h2>
          {submitted && <div style={{background:'#f0fdf4',color:'#16a34a',padding:'12px 16px',borderRadius:'10px',marginBottom:'16px',fontSize:'13px'}}>✅ Review submitted! We will get back to you within 24 hours.</div>}
          <form onSubmit={handleSubmit} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
            {[
              {label:'LinkedIn URL',key:'linkedin_url',placeholder:'https://linkedin.com/in/yourname',full:true},
              {label:'Full Name',key:'full_name',placeholder:'Your Full Name',full:false},
              {label:'Current Role',key:'current_role',placeholder:'e.g. Software Engineer',full:false},
              {label:'Target Role',key:'target_role',placeholder:'e.g. Senior Product Manager',full:false},
              {label:'Phone Number',key:'phone',placeholder:'+91 9876543210',full:false},
            ].map(({label,key,placeholder,full}) => (
              <div key={key} style={{gridColumn:full?'1/-1':'auto'}}>
                <label style={{display:'block',fontSize:'12px',fontWeight:600,color:'#374151',marginBottom:'5px'}}>{label}</label>
                <input value={(form as any)[key]} onChange={e => setForm({...form,[key]:e.target.value})} required placeholder={placeholder}
                  style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',outline:'none'}} />
              </div>
            ))}
            <div style={{gridColumn:'1/-1'}}>
              <button type="submit" disabled={loading}
                style={{background:'#2563eb',color:'#fff',fontWeight:700,padding:'11px 28px',borderRadius:'10px',border:'none',cursor:'pointer',fontSize:'14px',opacity:loading?0.6:1}}>
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>
            </div>
          </form>
        </div>

        <div style={{background:'#fff',borderRadius:'16px',padding:'28px',border:'1px solid #e5e7eb'}}>
          <h2 style={{fontSize:'18px',fontWeight:800,color:'#111827',marginBottom:'20px'}}>All Reviews</h2>
          {reviews.length === 0 ? (
            <p style={{color:'#9ca3af',fontSize:'13px'}}>No reviews yet. Submit your first review above!</p>
          ) : reviews.map((r:any) => (
            <div key={r.id} style={{border:'1px solid #e5e7eb',borderRadius:'12px',padding:'16px',marginBottom:'12px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:'8px'}}>
                <div style={{fontWeight:700,color:'#111827',fontSize:'14px'}}>{r.full_name}</div>
                <span style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'99px',
                  background:r.status==='completed'?'#f0fdf4':r.status==='in_progress'?'#eff6ff':'#fefce8',
                  color:r.status==='completed'?'#16a34a':r.status==='in_progress'?'#2563eb':'#ca8a04'}}>
                  {r.status.toUpperCase()}
                </span>
              </div>
              <div style={{fontSize:'12px',color:'#9ca3af'}}>{r.current_role} → {r.target_role}</div>
              {r.score && <div style={{fontSize:'13px',fontWeight:700,color:'#2563eb',marginTop:'8px'}}>Score: {r.score}/100</div>}
              {r.feedback && <div style={{marginTop:'10px',padding:'12px',background:'#eff6ff',borderRadius:'8px',fontSize:'12px',color:'#374151'}}>{r.feedback}</div>}
            </div>
          ))}
        </div>

        <div style={{background:'#fff',borderRadius:'16px',padding:'28px',border:'1px solid #e5e7eb'}}>
          <h2 style={{fontSize:'18px',fontWeight:800,color:'#111827',marginBottom:'20px'}}>Upgrade Your Plan</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
            {[
              {name:'Basic',price:'₹999',plan:'basic',amount:999},
              {name:'Pro',price:'₹1,999',plan:'pro',amount:1999},
              {name:'Enterprise',price:'₹4,999',plan:'enterprise',amount:4999},
            ].map(({name,price,plan,amount}) => (
              <div key={plan} style={{border:'1px solid #e5e7eb',borderRadius:'12px',padding:'16px',textAlign:'center'}}>
                <div style={{fontWeight:700,color:'#111827',marginBottom:'4px',fontSize:'14px'}}>{name}</div>
                <div style={{fontSize:'22px',fontWeight:800,color:'#2563eb',marginBottom:'14px'}}>{price}</div>
                <button onClick={() => handleUpgrade(plan,amount)}
                  style={{width:'100%',background:'#2563eb',color:'#fff',fontWeight:700,padding:'9px',borderRadius:'9px',border:'none',cursor:'pointer',fontSize:'13px'}}>
                  Upgrade
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
