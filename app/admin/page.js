import { getPortfolioData, updateProfile } from '../actions'

export default async function AdminPage() {
  const { profile } = await getPortfolioData()

  return (
    <div className="min-h-screen bg-slate-100 p-10 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4 text-slate-800">Admin Dashboard</h1>
        
        {/* Form Edit Profile */}
        <div className="mb-8">
          <label className="block font-bold text-slate-700 mb-2">Edit Summary Diri:</label>
          <form action={updateProfile} className="flex flex-col gap-4">
            {/* ID disembunyikan */}
            <input type="hidden" name="id" value={profile?.id} />
            
            <textarea 
              name="summary" 
              defaultValue={profile?.summary}
              className="w-full p-4 border border-slate-300 rounded-lg h-48 focus:ring-2 focus:ring-blue-500 outline-none shadow-inner text-lg leading-relaxed"
            />
            
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Simpan Perubahan
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8">
            <a href="/" className="text-blue-500 hover:underline">← Kembali ke Website Utama</a>
        </div>
      </div>
    </div>
  )
}