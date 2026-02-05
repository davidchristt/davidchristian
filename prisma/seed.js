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

  console.log('Mulai mengisi data...')

  // 2. Profile
  await prisma.profile.create({
    data: {
      fullName: "David Christian Nathaniel",
      headline: "Full Stack Developer | Blockchain Enthusiast | Blue Team Cybersecurity Learner",
      summary: "Third-year Informatics Engineering student specializing in Computer Networks, with a strong focus on blockchain development, full-stack web applications, and Blue Team cybersecurity principles.",
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
        description: "Sumedang, Jawa Barat. GPA: 3.85/4.00. Active team member with strong time management and problem-solving abilities.",
        imageUrl: "/images/unpad.png"
      }
    ]
  })

  // 3. Work Experience
  await prisma.experience.createMany({
    data: [
      { 
        role: "Intern – Software / IT Engineering",
        company: "Estima Industry",
        period: "Jan 2026 - Feb 2026",
        type: "Internship",
        description: "Assisted in developing an internal web-based sales management system. Supported system analysis, database design, and documentation. Contributed to feature testing and data validation.",
        imageUrl: "/images/estima.jpeg" // Pastikan file gambar ini ada
      },
      {
        role: "Product Designer",
        company: "PT Makmur Teknik",
        period: "Jan 2026 - Present",
        type: "Part-Time",
        description: "Designed brand assets including logos, packaging, and UI/UX interfaces to ensure visual consistency across digital and physical products. Developed design systems and visual guidelines to support branding and product presentation. Collaborated with product and marketing teams to align design outputs with business and branding objectives.",
        imageUrl: "/images/makmurteknik.jpg"
      },
      {
        role: "Product Management Specialist",
        company: "PT Makmur Teknik",
        period: "Apr 2025 - Aug 2025",
        type: "Part-Time",
        description: "Managed and optimized over 500 product listings. Designed pricing strategies and built monthly data dashboards for sales performance analysis.",
        imageUrl: "/images/makmurteknik.jpg"
      },
      {
        role: "Teaching Assistant",
        company: "Universitas Padjadjaran",
        period: "Feb 2025 - Present",
        type: "Part-Time",
        description: "Conducted lab sessions for Data Structures, Numerical Methods, and Database Systems 2. Mentored over 90 students weekly.",
        imageUrl: "/images/unpad.png"
      }
    ]
  })

  // 4. Projects
  await prisma.project.createMany({
    data: [
      {
        name: "DeQRypt",
        role: "Blockchain Developer (Hackathon)",
        period: "Dec 2025 - Jan 2026",
        techStack: "Solidity, Ethereum, EVM, Web3, MetaMask",
        description: "Designed and implemented a blockchain-based transaction flow involving user wallets, treasury management, and merchant settlement using smart contracts. Collaborated in a fast-paced team to deliver a secure Web3 solution.",
        imageUrl: "/images/decrypt.png" // Bisa gunakan gambar project blockchain kamu
      },
      {
        name: "Decentralized Crowdfunding (Campaign DApp)",
        role: "Blockchain Developer",
        period: "November 2025 - Present",
        techStack: "Solidity, Ethereum, Remix, EVM, Smart Contracts",
        description: "A decentralized crowdfunding platform built on Ethereum using smart contracts. The system implements a factory pattern to create multiple campaign contracts, where contributors fund campaigns, vote on spending requests, and funds are released only after majority approval. All transactions, approvals, and fund transfers are executed trustlessly on-chain, ensuring transparency, immutability, and secure governance without relying on a centralized backend.",
        imageUrl: "/images/DAPPS.jpg"
      },
      {
        name: "Hukumpedia",
        role: "Full-Stack Developer",
        period: "September 2025 - Present",
        techStack: "Next.js, Node.js, MySQL, Gemini API, Pinecone",
        description: "RAG-Powered Legal Chatbot platform providing legal insights from Indonesian law databases.",
        imageUrl: "/images/hukumpedia.png"
      },
      {
        name: "Student Well-Being Clustering",
        role: "Full-Stack Developer",
        period: "September 2025 - October 2025",
        techStack: "Python (Flask, Pandas, Scikit-Learn), MySQL",
        description: "Analytical dashboard to analyze student well-being using K-Means and DBSCAN clustering algorithms.",
        imageUrl: "/images/DATMIN.jpg"
    },
    {
      name: "Ngurah Rai Airport Network Redesign", 
      role: "Network Engineer (Simulation)",       
      period: "Apr 2025 - May 2025",               
      techStack: "Cisco Packet Tracer",            
      description: "Redesigned the network topology to increase efficiency and reliability through VLAN segmentation and redundancy. Optimized routing configuration to ensure stable and secure data communication.", //
      imageUrl: "/images/NGURAHRAI.jpg"
    },
    {
        name: "SenggolBacok Gym",
        role: "Front-End Developer",
        period: "August 2024 - November 2024",
        techStack: "CodeIgniter 4, PHP, MySQL, JavaScript",
        description: "Digital platform for gym membership registration, class scheduling, and online payment integration.",
        imageUrl: "/images/SENGGOLBACOK.jpg"
      },
      {
        name: "Laundry Hub",
        role: "Desktop App Developer",
        period: "August 2024 - November 2024",
        techStack: "Java (Swing), MySQL",
        description: "Desktop application to manage laundry orders, transaction records, and financial reporting.",
        imageUrl: "/images/LAUNDRYHUB.jpg"
      }
    ]
  })

  // 5. Organization
  await prisma.organization.create({
    data: {
      name: "Informatics Sport and Art Tournament 2025",
      role: "Project Officer",
      period: "Feb 2025 - May 2025",
      description: "Led the planning and execution of a university-wide sports and arts event with 120+ participants."
    }
  })

  // 6. Skills
  await prisma.skill.createMany({
    data: [
      { category: "Programming", items: "Python, C++, PHP, JavaScript, SQL" },
      { category: "Frameworks", items: "Flask, Next.js, Node.js, CodeIgniter, React.js" },
      { category: "Blockchain", items: "Solidity, Web3.js, Ethers.js, Smart Contract" },
      { category: "Cybersecurity", items: "Network Defense, Threat Detection, Splunk, Wireshark" }
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