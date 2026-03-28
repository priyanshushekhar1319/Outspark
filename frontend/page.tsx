'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Outspark</span>
          <span className="text-blue-600 font-bold text-xl">.</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 font-medium px-4 py-2">Login</Link>
          <Link href="/signup" className="btn-primary text-sm py-2 px-5">Get Started Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Trusted by 10,000+ professionals
        </div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6" style={{fontFamily:"'Playfair Display',serif"}}>
          Your LinkedIn Profile<br />
          <span className="text-blue-600">Reviewed by Experts</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get a detailed, personalized review of your LinkedIn profile in 24 hours. 
          Land more interviews, grow your network, and attract top recruiters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-primary text-base py-4 px-8 inline-block">
            Get My Free Review →
          </Link>
          <a href="#how-it-works" className="btn-outline text-base py-4 px-8 inline-block">
            See How It Works
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required • Results in 24 hours</p>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-12 border-t border-gray-100">
          {[['10K+','Profiles Reviewed'],['94%','Client Satisfaction'],['3x','More Recruiter Views']].map(([n,l])=>(
            <div key={l}>
              <div className="text-3xl font-bold text-blue-600">{n}</div>
              <div className="text-sm text-gray-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-center text-gray-900 mb-4" style={{fontFamily:"'Playfair Display',serif"}}>How It Works</h2>
          <p className="text-gray-500 text-center mb-14">Three simple steps to a recruiter-ready profile</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {step:'01',title:'Submit Your Profile',desc:'Share your LinkedIn URL and tell us your career goals and target roles.',icon:'🔗'},
              {step:'02',title:'Expert Review',desc:'Our career experts analyze every section of your profile against recruiter standards.',icon:'🔍'},
              {step:'03',title:'Get Your Report',desc:'Receive a detailed written report with actionable improvements and a profile score.',icon:'📊'},
            ].map(({step,title,desc,icon})=>(
              <div key={step} className="card text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{step}</div>
                <div className="text-4xl mb-4 mt-4">{icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-center text-gray-900 mb-4" style={{fontFamily:"'Playfair Display',serif"}}>Simple Pricing</h2>
          <p className="text-gray-500 text-center mb-14">Choose the plan that fits your career goals</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name:'Basic',price:'₹999',features:['Profile Score','Written Feedback','3-5 Day Delivery','Email Support'],plan:'basic',amount:999,highlight:false},
              {name:'Pro',price:'₹1,999',features:['Everything in Basic','Priority 24hr Delivery','1:1 Video Call (30 min)','Rewrite Suggestions','30-Day Follow-up'],plan:'pro',amount:1999,highlight:true},
              {name:'Enterprise',price:'₹4,999',features:['Everything in Pro','Full Profile Rewrite','LinkedIn Photo Review','Cover Letter','Unlimited Revisions'],plan:'enterprise',amount:4999,highlight:false},
            ].map(({name,price,features,plan,amount,highlight})=>(
              <div key={plan} className={`rounded-2xl p-8 border-2 relative ${highlight?'border-blue-600 bg-blue-600 text-white shadow-2xl scale-105':'border-gray-100 bg-white'}`}>
                {highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                <div className={`text-sm font-medium mb-2 ${highlight?'text-blue-100':'text-blue-600'}`}>{name}</div>
                <div className={`text-4xl font-bold mb-6 ${highlight?'text-white':'text-gray-900'}`}>{price}</div>
                <ul className="space-y-3 mb-8">
                  {features.map(f=>(
                    <li key={f} className={`flex items-center gap-2 text-sm ${highlight?'text-blue-100':'text-gray-600'}`}>
                      <span className={highlight?'text-white':'text-green-500'}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${highlight?'bg-white text-blue-600 hover:bg-blue-50':'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-center text-gray-900 mb-14" style={{fontFamily:"'Playfair Display',serif"}}>What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name:'Rahul Sharma',role:'Software Engineer, Bangalore',text:'Got 3x more recruiter messages within a week of implementing the feedback. Worth every rupee!',stars:5},
              {name:'Priya Patel',role:'Marketing Manager, Mumbai',text:'The detailed breakdown was eye-opening. I never realized how much I was missing on my profile.',stars:5},
              {name:'Arjun Kumar',role:'Product Manager, Hyderabad',text:'The video call alone was worth it. The expert knew exactly what top tech companies look for.',stars:5},
            ].map(({name,role,text,stars})=>(
              <div key={name} className="card">
                <div className="text-amber-400 mb-3">{'★'.repeat(stars)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">{name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-white mb-4" style={{fontFamily:"'Playfair Display',serif"}}>Ready to Stand Out?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join 10,000+ professionals who transformed their LinkedIn presence with Outspark.</p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-blue-50 transition-all shadow-lg">
            Start My Free Review →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">O</span>
          </div>
          <span className="text-white font-bold">Outspark</span>
        </div>
        <p>© 2024 Outspark. Developed by <span className="text-blue-400 font-medium">Priyanshu</span>. All rights reserved.</p>
        <p className="mt-2 text-gray-500 text-xs">admin@outspark.com | admin@123</p>
      </footer>
    </div>
  );
}
