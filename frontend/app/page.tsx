export default function Home() {
  return (
    <div style={{minHeight:'100vh', background:'#f9fafb', fontFamily:'sans-serif'}}>
      {/* Nav */}
      <nav style={{background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'14px 32px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{width:'36px', height:'36px', background:'#2563eb', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span style={{color:'#fff', fontWeight:800, fontSize:'16px'}}>O</span>
          </div>
          <span style={{fontWeight:800, fontSize:'20px', color:'#111827'}}>Outspark</span>
        </div>
        <div style={{display:'flex', gap:'12px'}}>
          <a href="/dashboard" style={{background:'#2563eb', color:'white', padding:'9px 24px', borderRadius:'10px', textDecoration:'none', fontWeight:700, fontSize:'14px'}}>Dashboard</a>
          <a href="/admin" style={{border:'2px solid #2563eb', color:'#2563eb', padding:'9px 24px', borderRadius:'10px', textDecoration:'none', fontWeight:700, fontSize:'14px'}}>Admin</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{maxWidth:'800px', margin:'0 auto', padding:'80px 24px', textAlign:'center'}}>
        <div style={{display:'inline-block', background:'#eff6ff', color:'#2563eb', fontSize:'13px', fontWeight:700, padding:'6px 16px', borderRadius:'99px', marginBottom:'24px'}}>
          LinkedIn Profile Reviews
        </div>
        <h1 style={{fontSize:'52px', fontWeight:900, color:'#111827', lineHeight:1.15, margin:'0 0 20px'}}>
          Get Your LinkedIn Profile<br />
          <span style={{color:'#2563eb'}}>Reviewed by Experts</span>
        </h1>
        <p style={{fontSize:'18px', color:'#6b7280', maxWidth:'560px', margin:'0 auto 40px', lineHeight:1.6}}>
          Submit your LinkedIn profile and receive personalised, actionable feedback from industry professionals within 24 hours.
        </p>
        <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="/dashboard" style={{background:'#2563eb', color:'white', padding:'14px 36px', borderRadius:'12px', textDecoration:'none', fontWeight:800, fontSize:'16px'}}>
            Submit Your Profile →
          </a>
          <a href="/admin" style={{border:'2px solid #e5e7eb', color:'#374151', padding:'14px 36px', borderRadius:'12px', textDecoration:'none', fontWeight:700, fontSize:'16px', background:'#fff'}}>
            Admin Panel
          </a>
        </div>
      </div>

      {/* Features */}
      <div style={{maxWidth:'900px', margin:'0 auto', padding:'0 24px 80px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px'}}>
        {[
          {icon:'⚡', title:'Fast Turnaround', desc:'Get detailed feedback on your LinkedIn profile within 24 hours of submission.'},
          {icon:'🎯', title:'Expert Feedback', desc:'Personalised, actionable insights tailored to your target role and industry.'},
          {icon:'📈', title:'Career Growth', desc:'Improve your profile visibility and land more interviews with a standout profile.'},
        ].map(({icon, title, desc}) => (
          <div key={title} style={{background:'#fff', borderRadius:'16px', padding:'28px', border:'1px solid #e5e7eb', textAlign:'center'}}>
            <div style={{fontSize:'32px', marginBottom:'12px'}}>{icon}</div>
            <div style={{fontWeight:800, color:'#111827', fontSize:'15px', marginBottom:'8px'}}>{title}</div>
            <div style={{fontSize:'13px', color:'#6b7280', lineHeight:1.6}}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div style={{background:'#fff', borderTop:'1px solid #e5e7eb', padding:'60px 24px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', textAlign:'center'}}>
          <h2 style={{fontSize:'30px', fontWeight:900, color:'#111827', marginBottom:'8px'}}>Simple, Transparent Pricing</h2>
          <p style={{color:'#6b7280', fontSize:'15px', marginBottom:'40px'}}>Choose the plan that fits your needs</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px'}}>
            {[
              {name:'Basic', price:'₹999', features:['1 Profile Review','Written Feedback','48hr Turnaround']},
              {name:'Pro', price:'₹1,999', features:['3 Profile Reviews','Video Feedback','24hr Turnaround'], highlight:true},
              {name:'Enterprise', price:'₹4,999', features:['Unlimited Reviews','1-on-1 Coaching','Priority Support']},
            ].map(({name, price, features, highlight}) => (
              <div key={name} style={{borderRadius:'16px', padding:'28px', border: highlight ? '2px solid #2563eb' : '1px solid #e5e7eb', background: highlight ? '#eff6ff' : '#fff', textAlign:'center'}}>
                {highlight && <div style={{background:'#2563eb', color:'#fff', fontSize:'11px', fontWeight:700, padding:'3px 12px', borderRadius:'99px', display:'inline-block', marginBottom:'12px'}}>MOST POPULAR</div>}
                <div style={{fontWeight:800, fontSize:'18px', color:'#111827', marginBottom:'4px'}}>{name}</div>
                <div style={{fontSize:'32px', fontWeight:900, color:'#2563eb', margin:'8px 0 20px'}}>{price}</div>
                {features.map(f => (
                  <div key={f} style={{fontSize:'13px', color:'#374151', marginBottom:'8px'}}>✓ {f}</div>
                ))}
                <a href="/dashboard" style={{display:'block', marginTop:'20px', background: highlight ? '#2563eb' : '#f3f4f6', color: highlight ? '#fff' : '#374151', padding:'11px', borderRadius:'10px', textDecoration:'none', fontWeight:700, fontSize:'14px'}}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{borderTop:'1px solid #e5e7eb', padding:'24px', textAlign:'center', color:'#9ca3af', fontSize:'13px'}}>
        © {new Date().getFullYear()} Outspark. All rights reserved.
      </div>
    </div>
  );
}
