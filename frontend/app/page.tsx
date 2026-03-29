export default function Home() {
  return (
    <div style={{padding:'40px', fontFamily:'sans-serif', textAlign:'center'}}>
      <h1 style={{color:'#2563eb', fontSize:'48px'}}>Outspark ✅</h1>
      <p style={{color:'#666', marginTop:'16px'}}>Site is working!</p>
      <div style={{marginTop:'32px', display:'flex', gap:'16px', justifyContent:'center'}}>
        <a href="/login" style={{background:'#2563eb', color:'white', padding:'12px 32px', borderRadius:'12px', textDecoration:'none', fontWeight:'bold'}}>Login</a>
        <a href="/signup" style={{border:'2px solid #2563eb', color:'#2563eb', padding:'12px 32px', borderRadius:'12px', textDecoration:'none', fontWeight:'bold'}}>Sign Up</a>
      </div>
    </div>
  )
}
