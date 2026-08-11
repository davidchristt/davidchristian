// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // 1. Bersihkan data lama (biar tidak duplikat saat dijalankan ulang)
  await prisma.profile.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.project.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.education.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.language.deleteMany()

  console.log('Mulai mengisi data...')

  // 2. Profile
  await prisma.profile.create({
    data: {
      fullName: "David Christian Nathaniel",
      headline: "Software Engineer | Full-Stack Developer | AI & Blockchain Developer",
      summary: "Final-year Informatics Engineering student focused on software development and artificial intelligence. Experienced in building full-stack web applications end to end, from database design and API integration to production-ready interfaces. Brings leadership and communication experience as a Project Officer and a Teaching Assistant.",
      email: "davidc.nathaniel@gmail.com",
      linkedin: "linkedin.com/in/davidchrist07",
      github: "github.com/davidchristt",
      location: "Jakarta, Indonesia",
      avatarUrl: "/images/FOTODAVID.jpg",         
      resumeUrl: "/documents/CV - David Christian Nathaniel.pdf"
    }
  })

  await prisma.education.createMany({
    data: [
      {
        school: "Universitas Padjadjaran",
        degree: "Bachelor of Informatics Engineering",
        period: "August 2023 - Present",
        description: "Sumedang, Jawa Barat. GPA: 3.90/4.00 Active team member with strong time management and problem-solving abilities.",
        imageUrl: "/images/unpad.png",
        order: 1
      }
    ]
  })

  // 3. Work Experience
  await prisma.experience.createMany({
    data: [
      {
        role: "Product Management Specialist",
        company: "PT Makmur Teknik",
        period: "Apr 2025 - Aug 2025",
        type: "Part-Time",
        description: "Managed and optimized over 500 product listings. Designed pricing strategies and built monthly data dashboards for sales performance analysis.",
        imageUrl: "/images/makmurteknik.jpg",
        order: 3
      },
      {
        role: "Teaching Assistant",
        company: "Universitas Padjadjaran",
        period: "Feb 2025 - Jan 2026",
        type: "Part-Time",
        description: "Led lab sessions for Data Structures, Numerical Methods, and Database Systems. Built lab modules, evaluation materials, and an auto-grading system to speed up assessment. Mentored 50+ students in C++, Python, and SQL.",
        imageUrl: "/images/unpad.png",
        order: 2
      },
      {
        role: "Intern – Software / IT Engineering",
        company: "Estima Industry",
        period: "Jan 2026 - Feb 2026",
        type: "Internship",
        description: "Helped build \"Estima ERP\", an internal web-based system designed to eliminate data silos between divisions. Contributed to the PostgreSQL database architecture. Carried out feature testing and data validation.",
        imageUrl: "/images/estima.jpeg", // Pastikan file gambar ini ada
        order: 1
      },
      {
        role: "Product Designer",
        company: "PT Makmur Teknik",
        period: "Jan 2026 - Feb 2026",
        type: "Part-Time",
        description: "Designed logos, packaging, and UI/UX interfaces for a new brand launch. Developed the design system and visual guidelines to keep branding consistent across digital and physical products. Collaborated with the product and marketing teams to align design output with business objectives.",
        imageUrl: "/images/makmurteknik.jpg",
        order: 4
      }
    ]
  })

  // 4. Projects
  await prisma.project.createMany({
    data: [
      {
        name: "TanyaHukum",
        role: "Back-End Developer",
        period: "Feb 2026 - June 2026",
        techStack: "Next.js, Node.js, MySQL, Prisma, Supabase, Pinecone, Gemini API, Voyage AI",
        description: "RAG-based legal chatbot platform powered by Gemini API, Pinecone, and voyage-law-2 embeddings for retrieval across Indonesian legal domains. Built an automated Node.js data pipeline that scrapes 23,000+ legal documents and processes 5,000+ PDFs into Supabase Storage.",
        imageUrl: "/images/hukumpedia.png",
        repoUrl: null,
        demoUrl: null,
        order: 1
      },
      {
        name: "Decentralized Crowdfunding (Campaign DApp)",
        role: "Blockchain Developer",
        period: "Dec 2025 - Feb 2026",
        techStack: "Solidity, Ethereum, EVM, Remix, Smart Contracts, MetaMask, Web3",
        description: "A decentralized crowdfunding platform built on Ethereum using smart contracts. The system implements a factory pattern to create multiple campaign contracts, where contributors fund campaigns, vote on spending requests, and funds are released only after majority approval. All transactions, approvals, and fund transfers are executed trustlessly on-chain, ensuring transparency, immutability, and secure governance without relying on a centralized backend.",
        imageUrl: "/images/DAPPS.jpg",
        repoUrl: null,
        demoUrl: null,
        order: 2
      },
      {
        name: "DeQRypt",
        role: "Blockchain Developer (Hackathon)",
        period: "Dec 2025 - Jan 2026",
        techStack: "Solidity, Ethereum, EVM, Web3, MetaMask",
        description: "Designed and implemented a blockchain-based transaction flow involving user wallets, treasury management, and merchant settlement using smart contracts. Collaborated in a fast-paced team to deliver a secure Web3 solution.",
        imageUrl: "/images/deqrypt.png", // Bisa gunakan gambar project blockchain kamu
        repoUrl: null,
        demoUrl: null,
        order: 3
      },
      {
        name: "Student Well-Being Clustering",
        role: "Full-Stack Developer",
        period: "Sept 2025 - Oct 2025",
        techStack: "Python, Flask, Pandas, Scikit-Learn, MySQL",
        description: "Analytical dashboard to analyze student well-being using K-Means and DBSCAN clustering algorithms.",
        imageUrl: "/images/DATMIN.jpg",
        repoUrl: null,
        demoUrl: null,
        order: 4
      },
      {
        name: "SenggolBacok Gym",
        role: "Front-End Developer",
        period: "Aug 2024 - Nov 2024",
        techStack: "CodeIgniter 4, PHP, MySQL, JavaScript",
        description: "Digital platform for gym membership registration, class scheduling, and online payment integration.",
        imageUrl: "/images/SENGGOLBACOK.jpg",
        repoUrl: null,
        demoUrl: null,
        order: 5
      },
      {
        name: "Laundry Hub",
        role: "Desktop App Developer",
        period: "Aug 2024 - Nov 2024",
        techStack: "Java (Swing), MySQL",
        description: "Desktop application to manage laundry orders, transaction records, and financial reporting.",
        imageUrl: "/images/LAUNDRYHUB.jpg",
        repoUrl: null,
        demoUrl: null,
        order: 6
      }
    ]
  })

  // 5. Organization
  await prisma.organization.createMany({
    data: [
      {
        name: "Informatics Sport and Art Tournament 2025",
        role: "Project Officer",
        period: "Feb 2025 - May 2025",
        description: "Led the planning and execution of a university-wide sports and arts event with 120+ participants.",
        order: 1
      },
      {
        name: "Himatif FMIPA UNPAD",
        role: "Staff of Entrepreneurship Division",
        period: "Feb 2025 - Dec 2025",
        description: "Staff of the Entrepreneurship Division at Himatif FMIPA UNPAD.",
        order: 2
      },
      {
        name: "Himatif FMIPA UNPAD",
        role: "Staff of Student Development Division",
        period: "Feb 2024 - Dec 2024",
        description: "Staff of the Student Development Division at Himatif FMIPA UNPAD.",
        order: 3
      }
    ]
  })

  // 6. Skills
  await prisma.skill.createMany({
    data: [
      { category: "Programming", items: "Python, JavaScript, TypeScript, PHP, SQL, C++", order: 1 },
      { category: "Frameworks", items: "FastAPI, Next.js, React.js, Node.js, Express.js, Flask, CodeIgniter, Prisma ORM", order: 2 },
      { category: "Blockchain", items: "Solidity, Web3.js, Ethers.js, Truffle, Hardhat, Smart Contract Design (ERC-20 / ERC-721), Ethereum Network Deployment", order: 3 },
      { category: "Cybersecurity", items: "Network Defense Fundamentals, Threat Detection, Log Analysis, SIEM Tools (Splunk & Wireshark), Incident Response Basics", order: 4 },
      { category: "Tools", items: "Git, MySQL Workbench, Figma, Canva, VS Code, MetaMask, Remix IDE", order: 5 },
      { category: "Soft Skills", items: "Leadership, Collaboration, Problem Solving, Time Management, Adaptability, Creativity", order: 6 }
    ]
  })

  // 7. Certifications
  await prisma.certification.createMany({
    data: [
      {
        name: "CCNA: Switching, Routing, and Wireless Essentials",
        issuer: "Cisco Networking Academy",
        year: "2026",
        order: 1
      },
      {
        name: "CCNA: Introduction to Networks",
        issuer: "Cisco Networking Academy",
        year: "2026",
        order: 2
      },
      {
        name: "Ethereum and Solidity: The Complete Developer's Guide",
        issuer: "Udemy",
        year: "2026",
        order: 3
      },
      {
        name: "English Language Test (Score: 593)",
        issuer: "Universitas Padjadjaran",
        year: "2026",
        order: 4
      },
      {
        name: "iOS Foundation Program",
        issuer: "BINUS University x Apple",
        year: "2023",
        order: 5
      },
      {
        name: "Business Case Competition Semifinalist",
        issuer: "180 Degrees Consulting",
        year: "2024",
        order: 6
      }
    ]
  })

  // 8. Languages
  await prisma.language.createMany({
    data: [
      { name: "English", level: "Advanced", order: 1 },
      { name: "Indonesian", level: "Native", order: 2 }
    ]
  })

  console.log('✅ Selesai! Data CV David sudah masuk ke database.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })