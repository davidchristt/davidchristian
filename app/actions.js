'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// 1. Fungsi Ambil Semua Data untuk Halaman Depan
export async function getPortfolioData() {
  // Kita ambil semua data dari tabel masing-masing
  const profile = await prisma.profile.findFirst()
  const experiences = await prisma.experience.findMany()
  const projects = await prisma.project.findMany()
  const skills = await prisma.skill.findMany()
  const organizations = await prisma.organization.findMany()
  const educations = await prisma.education.findMany()

  return { profile, experiences, projects, skills, organizations, educations }
}

// 2. Fungsi Update Profile (Khusus Admin)
export async function updateProfile(formData) {
  const id = formData.get('id')
  const summary = formData.get('summary')

  // Update data ke database
  await prisma.profile.update({
    where: { id: Number(id) },
    data: { summary: summary }
  })

  // Refresh halaman otomatis biar data baru langsung muncul
  revalidatePath('/')
}