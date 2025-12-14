'use client' // Wajib ada ini biar tombolnya bisa diklik
import { useState } from 'react'

export default function HeroSection({ profile }) {
  const [isOpen, setIsOpen] = useState(false) // Status: apakah PDF lagi dibuka atau tidak

  // --- FUNGSI SCROLL HALUS ---
  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' }) // <--- Ini rahasia animasinya
    }
  }

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-center mx-auto px-6 text-center">
        {/* Foto Profil */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl shadow-blue-500/20">
             <img 
               src={profile.avatarUrl || "https://placehold.co/400x400"} 
               alt={profile.fullName}
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-3 tracking-tight">
          {profile.fullName}
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 font-medium mb-5">{profile.headline}</p>
        <p className="max-w-3xl mx-auto text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
          {profile.summary}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-blue-400 mb-8">
          <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800">📍 {profile.location}</span>
          <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800">📧 {profile.email}</span>
        </div>

        {/* BUTTON GROUP */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
           {/* Tombol LinkedIn */}
           <a 
             href={`https://${profile.linkedin}`} 
             target="_blank" 
             className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg shadow-blue-900/20 transform hover:-translate-y-1"
           >
             Connect on LinkedIn ↗
           </a>

           {/* Tombol View CV (INTERAKTIF) */}
           {profile.resumeUrl && (
             <button 
               onClick={() => setIsOpen(true)} // Saat diklik, status jadi TRUE (Buka Modal)
               className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold transition border border-slate-700 transform hover:-translate-y-1 cursor-pointer"
             >
               📄 View CV
             </button>
           )}

           {/* VIEW PROJECTS */}
           <button 
             onClick={handleScrollToProjects}
             className="inline-flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/50 px-6 py-3 rounded-full font-bold transition transform hover:-translate-y-1 cursor-pointer"
           >
             ⬇ See Projects
           </button>
        </div>
      </section>

      {/* --- MODAL PDF PREVIEW (Pop-up) --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {/* Kotak Putih Modal */}
            <div className="bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden relative">
                
                {/* Header Modal */}
                <div className="flex justify-between items-center p-4 bg-slate-800 border-b border-slate-700">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        📄 CV Preview
                    </h3>
                    <div className="flex gap-3">
                        {/* Tombol Download Asli */}
                        <a 
                            href={profile.resumeUrl} 
                            download
                            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition"
                        >
                            Download PDF
                        </a>
                        {/* Tombol Close */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition"
                        >
                            ✕ Close
                        </button>
                    </div>
                </div>

                {/* Area PDF (Iframe) */}
                <div className="flex-1 bg-slate-800 relative">
                    <iframe 
                        src={profile.resumeUrl} 
                        className="w-full h-full"
                        title="CV Preview"
                    />
                </div>
            </div>
        </div>
      )}
    </>
  )
}