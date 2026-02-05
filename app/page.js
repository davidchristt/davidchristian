import { getPortfolioData } from './actions'
import HeroSection from './components/HeroSection' // <--- Import Komponen Baru

export default async function Home() {
  const { profile, experiences, projects, skills, organizations, educations } = await getPortfolioData()

  if (!profile) return <div className="p-10 text-white text-center">Data kosong. Jalankan 'node prisma/seed.js' dulu.</div>

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* 1. HERO SECTION (Sekarang pakai komponen terpisah) */}
      <HeroSection profile={profile} />

      {/* 2. SKILLS */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition duration-300 group">
              <h3 className="text-blue-400 font-bold mb-3 group-hover:text-blue-300">{skill.category}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-mono">
                {skill.items.split(', ').join(' • ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION EDUCATION (DENGAN LOGO DI KANAN) --- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-white mb-10 pl-4 border-l-4 border-yellow-500">Education</h2>
        
        <div className="space-y-8">
          {educations.map((edu) => {
            // Logika untuk mengambil dan memisahkan nilai GPA
            const gpaMatch = edu.description.match(/(GPA: [\d\.\/]+|Average Score: [\d\.]+)[\.,]?/);
            const gpaFullText = gpaMatch ? gpaMatch[1] : null;
            const cleanDescription = edu.description.replace(/(GPA: [\d\.\/]+|Average Score: [\d\.]+)[\.,]?\s*/, '');

            return (
            <div key={edu.id} className="bg-slate-900/20 p-6 md:p-8 rounded-2xl border border-slate-800/50 hover:bg-slate-900/40 transition duration-300 flex flex-col md:flex-row gap-6">
              
              {/* BAGIAN KIRI: Info Utama, Deskripsi, dan GPA */}
              <div className="md:w-3/5 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{edu.school}</h3>
                        <p className="text-yellow-400 font-medium text-lg">{edu.degree}</p>
                    </div>
                    {/* Periode di Mobile */}
                    <span className="md:hidden text-xs font-mono text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800 whitespace-nowrap">
                        {edu.period}
                    </span>
                </div>

                {/* Deskripsi dipindah ke sini agar lebih rapi */}
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-4">
                  {cleanDescription}
                </p>

                {/* Area GPA yang Menonjol */}
                {gpaFullText && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl w-fit">
                    <p className="text-sm text-yellow-200/70 uppercase tracking-wider font-bold mb-1">
                      {gpaFullText.includes('GPA') ? 'Cumulative GPA' : 'Final Score'}
                    </p>
                    <p className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-tight leading-none">
                      {gpaFullText.split(': ')[1]}
                    </p>
                  </div>
                )}
              </div>

              {/* BAGIAN KANAN: Periode dan LOGO (Tampilan Baru) */}
              <div className="md:w-2/5 flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-slate-800/50 pt-4 md:pt-0 md:pl-6">
                 <span className="hidden md:inline-block text-sm font-mono text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800 whitespace-nowrap w-fit mb-4">
                    {edu.period}
                 </span>

                 {/* --- LOGO SEKOLAH DENGAN STYLE WORK EXPERIENCE --- */}
                 {edu.imageUrl && (
                   // Perubahan di sini: bg-white, shadow, border, dan padding
                   <div className="relative h-40 w-full rounded-xl overflow-hidden shadow-md border border-slate-700/50 bg-white p-3 mt-auto">
                     <img
                       src={edu.imageUrl}
                       alt={edu.school}
                       // object-contain memastikan logo utuh di dalam kotak putih
                       className="w-full h-full object-contain"
                     />
                   </div>
                 )}
              </div>

            </div>
          )})}
        </div>
      </section>

      {/* 3. WORK EXPERIENCE (LinkedIn Style Grouping) */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-white mb-10 pl-4 border-l-4 border-blue-500">Work Experience</h2>
        <div className="space-y-12">
          {Object.values(
            experiences.reduce((acc, exp) => {
              // Kelompokkan berdasarkan nama perusahaan
              if (!acc[exp.company]) {
                acc[exp.company] = {
                  company: exp.company,
                  imageUrl: exp.imageUrl,
                  roles: [],
                };
              }
              acc[exp.company].roles.push(exp);
              return acc;
            }, {})
          ).map((group, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 bg-slate-900/20 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-900/40 transition duration-300">
              
              {/* BAGIAN KIRI: Logo Perusahaan (Satu logo untuk semua role di perusahaan ini) */}
              <div className="w-full md:w-1/3 shrink-0">
                <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-lg border border-slate-700/50 bg-white p-2"> 
                  <img 
                    src={group.imageUrl} 
                    alt={group.company}
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>

              {/* BAGIAN KANAN: Daftar Role */}
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h3 className="text-emerald-400 font-bold text-xl mb-6">{group.company}</h3>
                
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-1 before:w-0.5 before:bg-slate-800">
                  {group.roles.map((role, i) => (
                    <div key={role.id} className="relative pl-8">
                      {/* Dot Indicator ala LinkedIn */}
                      <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950 z-10" />
                      
                      <div className="flex flex-col mb-2">
                        <h4 className="text-xl font-bold text-white">{role.role}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-sm mt-1">
                          <span className="text-slate-400 font-mono">{role.period}</span>
                          <span className="text-slate-600">|</span>
                          <span className="px-2 py-0.5 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-900">
                            {role.type}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-6 mb-24 scroll-mt-20">
        <h2 className="text-3xl font-bold text-white mb-10 pl-4 border-l-4 border-emerald-500">Featured Projects</h2>
        <div className="space-y-16">
          {projects.map((proj) => (
            <div key={proj.id} className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="w-full md:w-5/12 shrink-0">
                <div className="relative h-64 w-full rounded-xl overflow-hidden border border-slate-700 group-hover:border-emerald-500/50 transition duration-300 shadow-2xl bg-slate-950">
                  <img 
                    src={proj.imageUrl} 
                    alt={proj.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="w-full md:w-7/12">
                <div className="flex flex-col mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition duration-300">{proj.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-blue-400 text-sm font-semibold">{proj.role}</span>
                    <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-900">{proj.period}</span>
                  </div>
                </div>
                
                <p className="text-slate-400 mb-6 leading-relaxed text-sm md:text-base border-l-2 border-slate-800 pl-4">
                  {proj.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.split(',').map((stack, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-900 text-slate-300 text-xs rounded-full border border-slate-700 hover:border-emerald-500/50 transition cursor-default">
                      {stack.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ORGANIZATIONS */}
      <section className="max-w-4xl mx-auto px-6">
         <h2 className="text-3xl font-bold text-white mb-8 pl-4 border-l-4 border-purple-500">Organizations</h2>
         <div className="grid gap-4">
            {organizations.map(org => (
               <div key={org.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-white">{org.name}</h3>
                     <span className="text-sm text-purple-400 font-mono bg-purple-900/20 px-2 py-1 rounded">{org.period}</span>
                  </div>
                  <p className="text-slate-300 font-medium mb-2">{org.role}</p>
                  <p className="text-slate-500 text-sm">{org.description}</p>
               </div>
            ))}
         </div>
      </section>

      {/* --- FOOTER (SENTUHAN TERAKHIR) --- */}
      <footer className="py-8 text-center border-t border-slate-800 mt-20">
        <p className="text-slate-500 text-sm mb-2">
          Designed & Built by <span className="text-blue-400 font-bold">David Christian Nathaniel</span>
        </p>
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} All rights reserved. Powered by Next.js & Vercel.
        </p>
        
        {/* Social Links Kecil di Bawah */}
        <div className="flex justify-center gap-6 mt-4 opacity-50 hover:opacity-100 transition duration-300">
           <a href={`https://${profile.linkedin}`} target="_blank" className="text-slate-400 hover:text-blue-400 text-sm">LinkedIn</a>
           
          {profile.github && (
             <a href={`https://${profile.github}`} target="_blank" className="text-slate-400 hover:text-white text-sm">GitHub</a>
           )}

           <a href={`mailto:${profile.email}`} className="text-slate-400 hover:text-emerald-400 text-sm">Email</a>
        </div>
      </footer>
      
    </main>
  )
}