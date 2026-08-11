// scripts/backup-db.js
// Dump SELURUH isi database ke satu file JSON di folder backups/.
// Script ini READ-ONLY: hanya memakai findMany(), tidak ada create/update/delete.
// Jalankan dengan: node scripts/backup-db.js

const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Nama file: backup-YYYY-MM-DD-HHmm.json (waktu lokal)
function buatNamaFile(now) {
  const pad = (n) => String(n).padStart(2, '0')

  const tanggal = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate())
  ].join('-')

  const jam = `${pad(now.getHours())}${pad(now.getMinutes())}`

  return `backup-${tanggal}-${jam}.json`
}

async function main() {
  console.log('Mulai membaca data dari database...')

  // Ambil semua baris dari keenam tabel.
  // orderBy id biar urutan hasil backup konsisten setiap kali dijalankan.
  const [profile, education, experience, project, organization, skill] =
    await Promise.all([
      prisma.profile.findMany({ orderBy: { id: 'asc' } }),
      prisma.education.findMany({ orderBy: { id: 'asc' } }),
      prisma.experience.findMany({ orderBy: { id: 'asc' } }),
      prisma.project.findMany({ orderBy: { id: 'asc' } }),
      prisma.organization.findMany({ orderBy: { id: 'asc' } }),
      prisma.skill.findMany({ orderBy: { id: 'asc' } })
    ])

  const data = { profile, education, experience, project, organization, skill }

  // Ringkasan jumlah baris per tabel
  const jumlah = Object.fromEntries(
    Object.entries(data).map(([tabel, baris]) => [tabel, baris.length])
  )

  const isiBackup = {
    createdAt: new Date().toISOString(),
    counts: jumlah,
    data
  }

  // Pastikan folder backups/ ada
  const folderBackup = path.join(__dirname, '..', 'backups')
  fs.mkdirSync(folderBackup, { recursive: true })

  const tujuan = path.join(folderBackup, buatNamaFile(new Date()))

  // Flag 'wx' = gagal kalau file sudah ada, biar backup lama tidak tertimpa
  // saat script dijalankan dua kali dalam menit yang sama.
  try {
    fs.writeFileSync(tujuan, JSON.stringify(isiBackup, null, 2), { flag: 'wx' })
  } catch (e) {
    if (e.code === 'EEXIST') {
      throw new Error(
        `File ${path.basename(tujuan)} sudah ada. ` +
          'Tunggu semenit atau pindahkan file lama dulu (backup lama tidak ditimpa).'
      )
    }
    throw e
  }

  Object.entries(jumlah).forEach(([tabel, n]) => {
    console.log(`  ${tabel}: ${n} baris`)
  })
  console.log(`✅ Backup tersimpan di backups/${path.basename(tujuan)}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
