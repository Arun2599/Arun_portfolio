import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { GRAIN } from './Hero'

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

/* readable title for small card headers — Anton is display-only, it strains at card sizes */
const CARD_TITLE: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  lineHeight: 1.25,
  color: '#111',
}
const ANTON: React.CSSProperties = {
  fontFamily: 'Anton, sans-serif',
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
  lineHeight: 1,
}

const ABOUT_TEXT =
  'I am a UI/UX designer and full-stack developer with 3+ years of experience building complete products. From quick commerce apps to enterprise ERP systems, I handle everything — design, development, and deployment. I work hard and promise to give you top-notch work on time, without ever compromising on quality.'

const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience', bg: '#F4845F', tilt: -3 },
  { value: 15, suffix: '+', label: 'Projects Completed', bg: '#6BBF7A', tilt: 2 },
  { value: 4, suffix: '+', label: 'Apps Published', bg: '#6EB5FF', tilt: -2 },
  { value: 10, suffix: '+', label: 'Technologies', bg: '#F5B841', tilt: 3 },
]

const SERVICES = [
  {
    title: 'UI/UX Design',
    desc: 'Creating intuitive, user-centered digital experiences that delight users and drive business goals.',
    tags: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
    bg: '#F4845F',
  },
  {
    title: 'Web Development',
    desc: 'Crafting responsive, performant web applications with modern frameworks.',
    tags: ['Angular', 'TypeScript', 'HTML/CSS'],
    bg: '#6EB5FF',
  },
  {
    title: 'Mobile Development',
    desc: 'Building cross-platform apps for iOS and Android with native performance.',
    tags: ['React Native', 'Ionic', 'Firebase'],
    bg: '#6BBF7A',
  },
  {
    title: 'Backend Development',
    desc: 'Building scalable APIs and server-side logic.',
    tags: ['Rust', 'Firebase Functions'],
    bg: '#E882B4',
  },
  {
    title: 'Full-Stack Products',
    desc: 'End-to-end product development from design to deployment.',
    tags: ['ERP Systems', 'E-commerce', 'POS'],
    bg: '#F5B841',
  },
]

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const TECH = [
  { name: 'HTML', cat: 'frontend', logo: `${DEVICON}/html5/html5-original.svg` },
  { name: 'CSS', cat: 'frontend', logo: `${DEVICON}/css3/css3-original.svg` },
  { name: 'TypeScript', cat: 'frontend', logo: `${DEVICON}/typescript/typescript-original.svg` },
  { name: 'Angular', cat: 'frontend', logo: `${DEVICON}/angular/angular-original.svg` },
  { name: 'GSAP', cat: 'frontend', logo: 'https://cdn.simpleicons.org/greensock/88CE02' },
  { name: 'Ionic', cat: 'mobile', logo: `${DEVICON}/ionic/ionic-original.svg` },
  { name: 'React Native', cat: 'mobile', logo: `${DEVICON}/react/react-original.svg` },
  { name: 'Firebase', cat: 'backend', logo: `${DEVICON}/firebase/firebase-plain.svg` },
  { name: 'Google Cloud', cat: 'backend', logo: `${DEVICON}/googlecloud/googlecloud-original.svg` },
  { name: 'Figma', cat: 'design', logo: `${DEVICON}/figma/figma-original.svg` },
  { name: 'Adobe Photoshop', cat: 'design', logo: `${DEVICON}/photoshop/photoshop-plain.svg` },
  { name: 'Framer', cat: 'design', logo: `${DEVICON}/framer/framer-original.svg` },
  { name: 'Git', cat: 'tools', logo: `${DEVICON}/git/git-original.svg` },
  { name: 'VS Code', cat: 'tools', logo: `${DEVICON}/vscode/vscode-original.svg` },
]

const TECH_CATS = ['all', 'frontend', 'mobile', 'backend', 'design', 'tools']

const JOBS = [
  {
    company: 'Surfboard Payments',
    period: 'Internship · 2022',
    role: 'UI/UX Designer & Frontend Developer',
    location: 'Chennai, India',
    present: false,
    tilt: -2,
  },
  {
    company: 'Maven Alpha',
    period: 'Jun 2022 – Dec 2022',
    role: 'UI/UX Designer & Frontend Developer',
    location: 'Chennai, India',
    present: false,
    tilt: 2,
  },
  {
    company: 'Techcora Corporation',
    period: '2023 – Present',
    role: 'UI/UX Designer & Full-Stack Developer',
    location: 'Chennai, India',
    present: true,
    tilt: -1.5,
  },
]

const WORK = [
  {
    id: 'surfboard',
    company: 'Surfboard Payments',
    period: '2022',
    duration: 'Internship',
    icon: '🚀',
    projects: [
      {
        name: 'Skill Development',
        desc: 'Designed and developed solutions while honing skills in problem solving, programming fundamentals, design principles, and front-end development.',
        skills: ['UI/UX Design', 'HTML', 'CSS', 'JavaScript', 'Problem Solving'],
        highlights: ['Foundation Building', 'Design Fundamentals', 'Frontend Basics'],
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      },
      {
        name: 'Card Memory Game',
        desc: 'Designed UI/UX and developed a Card Memory Game from scratch to better understand front-end technologies and user interaction patterns.',
        skills: ['UI/UX Design', 'JavaScript', 'CSS', 'Game Development', 'Firebase Hosting'],
        highlights: ['Interactive UI', 'Game Logic', 'User Engagement'],
        image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&q=80',
      },
    ],
  },
  {
    id: 'maven',
    company: 'Maven Alpha',
    period: 'Jun – Dec 2022',
    duration: '7 months',
    icon: '🎨',
    projects: [
      {
        name: 'Network App',
        desc: 'Designed web and mobile UI/UX and developed front-end for the Network app, an employee management dashboard with Firebase backend integration.',
        skills: ['UI/UX Design', 'Angular', 'Mobile Design', 'Firebase DB', 'Figma'],
        highlights: ['Dashboard Design', 'Mobile-First', 'Real-time Data'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      },
      {
        name: 'Design-Development Bridge',
        desc: 'Designed and developed components while collaborating with backend team to ensure seamless Firebase integration and deployment.',
        skills: ['UI/UX Design', 'Front-end Development', 'Firebase', 'Design Systems'],
        highlights: ['Team Collaboration', 'Component Library', 'Integration'],
        image: 'https://images.unsplash.com/photo-1522542550221-31fd8575f5a9?w=600&q=80',
      },
    ],
  },
  {
    id: 'techcora',
    company: 'Techcora Corporation',
    period: '2023 – Present',
    duration: '2+ years',
    icon: '💡',
    projects: [
      {
        name: 'Quick Commerce Platform',
        desc: 'Built complete quick commerce ecosystem for supermarkets including Chikpuk, Nilgiris, Monthly Mart, and BigSave. Developed consumer app, delivery partner app, and merchant dashboard with real-time tracking.',
        skills: ['UI/UX Design', 'Ionic', 'Angular', 'Firebase', 'Play Store', 'App Store'],
        highlights: ['3 Apps Built', '4 Clients', 'Published on Stores'],
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      },
      {
        name: 'CoraSuperPos',
        desc: 'Designed and developed Point of Sale system for supermarkets with billing, inventory sync, barcode scanning, and sales tracking. Available on mobile and web platforms.',
        skills: ['UI/UX Design', 'Ionic', 'Angular', 'Firebase', 'POS Systems', 'Barcode Integration'],
        highlights: ['POS System', 'Barcode Scanner', 'Real-time Sync'],
        image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80',
      },
      {
        name: 'Innerplay',
        desc: 'Mental health and performance app for young athletes. Features psychological assessments, personalized daily activities including box breathing, visualization, affirmations, and progress tracking.',
        skills: ['UI/UX Design', 'React Native', 'Firebase', 'Health & Wellness', 'Personalization'],
        highlights: ['Mental Health', 'Personalized Activities', 'Progress Tracking'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
      },
      {
        name: 'CoraERP',
        desc: 'Comprehensive School ERP system with multiple modules including Student, Teacher, Attendance, HR, Bus, Inventory, Employee, Estate Management, Excel import/export, and more. Built with Rust backend.',
        skills: ['UI/UX Design', 'Angular', 'Rust', 'PostgreSQL', 'ERP Systems', 'Data Management'],
        highlights: ['Multi-Module ERP', 'Rust Backend', 'Enterprise Scale'],
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
      },
      {
        name: 'Vignesh Homes Website',
        desc: 'Designed UI/UX and developed front-end for a construction website displaying ongoing, completed, and upcoming projects with locations. Backend powered by Firebase.',
        skills: ['UI/UX Design', 'Angular', 'Firebase DB', 'Firebase Hosting', 'Responsive Design'],
        highlights: ['Real Estate', 'Project Showcase', 'Location Maps'],
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      },
      {
        name: 'Grace Auto Service ERP',
        desc: 'Designed UI/UX and developed front-end for invoice ERP system with simple, intuitive interface. Firebase backend handles data and cloud functions.',
        skills: ['UI/UX Design', 'Angular', 'Firebase DB', 'Firebase Functions', 'ERP Systems'],
        highlights: ['Invoice System', 'Simple UX', 'Cloud Functions'],
        image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80',
      },
      {
        name: 'Techcora Company Website',
        desc: 'Designed and developed company website with colorful aesthetics and GSAP animations. Deployed on Firebase Hosting.',
        skills: ['UI/UX Design', 'Angular', 'GSAP', 'Firebase Hosting', 'Animation'],
        highlights: ['GSAP Animations', 'Brand Identity', 'Modern Design'],
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
      },
      {
        name: 'Junior Mastery School ERP',
        desc: 'Designed UI/UX and developed ERP showing students marks, attendance, and performance tracking. Firebase handles database and real-time updates.',
        skills: ['UI/UX Design', 'Angular', 'Firebase DB', 'Firebase Functions', 'Data Visualization'],
        highlights: ['Student Analytics', 'Performance Tracking', 'Real-time Updates'],
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      },
      {
        name: 'Church Management App',
        desc: 'Designed and developed mobile and web application to connect community through events, prayers, and sharing. Firebase backend for real-time features.',
        skills: ['UI/UX Design', 'Angular', 'Mobile Design', 'Firebase DB', 'Firebase Functions'],
        highlights: ['Community App', 'Events Management', 'Social Features'],
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80',
      },
    ],
  },
]

const PALETTE = ['#F4845F', '#6BBF7A', '#6EB5FF', '#E882B4']

const DESIGN_PROJECTS = [
  {
    title: 'Pet product design',
    subtitle: 'UI UX design',
    image: 'https://craftedbyarun.web.app/assets/pet-delish.svg',
    link: 'https://www.behance.net/gallery/177974217/Pet-food-online-selling-website',
  },
  {
    title: 'IT Solution design',
    subtitle: 'UI UX design',
    image: 'https://craftedbyarun.web.app/assets/ITcorp.svg',
    link: 'https://www.behance.net/gallery/178003931/IT-Solution-website',
  },
  {
    title: 'E-commerce web design',
    subtitle: 'Case study',
    image: 'https://craftedbyarun.web.app/assets/paulkaadu.svg',
    link: 'https://www.behance.net/gallery/165601725/UI-UX-Case-study-(Online-spices-selling-website)',
  },
  {
    title: 'Car service web design',
    subtitle: 'UI UX design',
    image: 'https://craftedbyarun.web.app/assets/carservice.svg',
    link: 'https://www.behance.net/gallery/168078399/Car-service-booking-website',
  },
  {
    title: 'Laundry app design',
    subtitle: 'UI UX design',
    image: 'https://craftedbyarun.web.app/assets/washly.svg',
    link: 'https://www.behance.net/gallery/168078801/Laundry-booking-mobile-application',
  },
  {
    title: 'Portfolio web design',
    subtitle: 'UI UX design',
    image: 'https://craftedbyarun.web.app/assets/portfolio.svg',
    link: 'https://www.behance.net/gallery/177978911/Portfolio-website',
  },
  {
    title: 'Interior design',
    subtitle: 'UI UX design',
    image: 'https://craftedbyarun.web.app/assets/interior-design.svg',
    link: 'https://www.behance.net/gallery/168080143/Interior-design-company-website',
  },
  {
    title: 'Connecting people',
    subtitle: 'Website development',
    image: 'https://craftedbyarun.web.app/assets/network.svg',
    link: 'https://www.behance.net/gallery/165601725/UI-UX-Case-study-(Online-spices-selling-website)',
  },
]

const TESTIMONIALS = [
  {
    name: 'Abinpaul',
    role: 'Team Lead',
    company: 'Techcora Corporation',
    avatar: 'AP',
    content:
      'Arun is easy to work with. He asks the right questions before starting and keeps things simple. The UI he builds always feels clean and the team finds it easy to use.',
  },
  {
    name: 'Gnana Mani',
    role: 'Founder',
    company: 'Innerplay',
    avatar: 'GM',
    content:
      'Arun understood our idea quickly and gave it a real look and feel. The app is smooth and users actually enjoy it. He also updates changes fast whenever we ask.',
  },
  {
    name: 'Chidambaram',
    role: 'Business Owner',
    company: 'Quick Commerce Platform & POS',
    avatar: 'CH',
    content:
      'He built our delivery app and POS from start to finish. My staff learned it in one day. Orders, billing and reports all in one place. Very happy with the work.',
  },
  {
    name: 'Vignesh',
    role: 'Founder',
    company: 'Vignesh Homes',
    avatar: 'VG',
    content:
      'Our website came out exactly how I wanted. Simple, neat and shows our projects well. Many customers tell us they found us through the site. Thanks Arun.',
  },
]

const SOCIALS = [
  { name: 'Behance', url: 'https://www.behance.net/ruvjp' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arun-kumar-937399254/' },
  { name: 'Instagram', url: 'https://instagram.com/_arunvjcopzz_' },
  { name: 'Dribbble', url: 'https://dribbble.com/Arunkumar_07' },
]

/* horizontal snap carousel with hero-style arrows — tabs/headings above always stay on screen */
function Carousel({ resetKey, hint, children }: { resetKey?: string; hint: string; children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <div
        key={resetKey}
        ref={trackRef}
        className="no-scrollbar -mx-6 mt-10 flex gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:gap-6 sm:px-10"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </div>
      <div className="mt-6 flex items-center gap-3">
        {([-1, 1] as const).map((dir) => {
          const Icon = dir === -1 ? ArrowLeft : ArrowRight
          return (
            <button
              key={dir}
              type="button"
              aria-label={dir === -1 ? 'scroll back' : 'scroll forward'}
              onClick={() => trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })}
              className="flex h-12 w-12 items-center justify-center rounded-full hover:scale-[1.08] sm:h-14 sm:w-14"
              style={{
                border: '2px solid white',
                color: 'white',
                transition: 'transform 150ms, background-color 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon size={24} strokeWidth={2.25} />
            </button>
          )
        })}
        <span
          className="ml-1 text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.14em', opacity: 0.85 }}
        >
          {hint}
        </span>
      </div>
    </>
  )
}

function Grain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 50, opacity: 0.4, backgroundImage: GRAIN, backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }}
    />
  )
}

/* word-by-word scroll-reveal, white on the color field */
function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const opacity = useTransform(progress, [start, Math.min(start + 0.12, 1)], [0.3, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.32em]">
      {word}
    </motion.span>
  )
}

function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')
  return (
    <p
      ref={ref}
      className="font-medium text-white"
      style={{ maxWidth: 620, fontSize: 'clamp(1.05rem, 2vw, 1.4rem)', lineHeight: 1.7 }}
    >
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.3,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['6%', '-14%'])

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden py-24"
      style={{ backgroundColor: '#E882B4' }}
    >
      {/* drifting blobs, same as hero */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '40vw',
          height: '40vw',
          left: '-8%',
          top: '10%',
          backgroundColor: '#ED9DC4',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '34vw',
          height: '34vw',
          right: '-6%',
          bottom: '5%',
          backgroundColor: '#F79B7F',
          opacity: 0.5,
          filter: 'blur(90px)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '1.5s',
        }}
      />

      {/* giant ghost word, parallaxed by scroll */}
      <motion.span
        aria-hidden
        className="absolute top-[4%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 30vw, 420px)', color: 'white', opacity: 0.16 }}
      >
        ABOUT ME
      </motion.span>

      <Grain />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-10" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ About Me ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white"
          style={{ ...ANTON, fontSize: 'clamp(2.4rem, 7vw, 96px)', maxWidth: '14em' }}
        >
          I craft digital experiences that{' '}
          <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>make an impact</span>
        </motion.h2>

        <RevealText text={ABOUT_TEXT} />

        {/* sticker stats */}
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, rotate: s.tilt }}
              whileInView={{ opacity: 1, y: 0, rotate: s.tilt }}
              whileHover={{ rotate: 0, scale: 1.06 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-1 rounded-3xl px-4 py-6"
              style={{ backgroundColor: s.bg, border: '3px solid white', boxShadow: '7px 7px 0 rgba(0,0,0,0.18)' }}
            >
              <span className="text-white" style={{ ...ANTON, fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </span>
              <span
                className="text-center text-[10px] font-semibold uppercase text-white sm:text-xs"
                style={{ letterSpacing: '0.12em', opacity: 0.95 }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="tel:+918667263143"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase text-white sm:px-10 sm:py-4 sm:text-base"
          style={{ border: '2px solid white', letterSpacing: '0.15em' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Contact Me
          <ArrowRight size={20} strokeWidth={2.5} />
        </motion.a>
      </div>
    </section>
  )
}

/* rotated white ribbon stitching the color fields together */
export function Marquee() {
  const row = ['UI/UX', 'Frontend', 'Fullstack', 'Logo Art', "Let's work together"]
    .map((t) => `${t} ✦ `)
    .join('')
    .repeat(3)
  return (
    <div
      className="relative overflow-hidden bg-white py-3 sm:py-4"
      style={{ zIndex: 20, width: '110%', marginLeft: '-5%', transform: 'rotate(-2deg)', marginTop: '-2rem', marginBottom: '-3.5rem' }}
    >
      <div className="marquee-track whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            style={{ ...ANTON, fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)', color: '#111' }}
          >
            {row}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="services"
      className="relative overflow-hidden pb-24 pt-28 sm:pt-32"
      style={{ backgroundColor: SERVICES[active].bg, transition: `background-color 650ms ${EASE}` }}
    >
      <Grain />

      <div className="relative" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block px-6 text-center text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ What I Do ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 mt-2 text-center text-white sm:mb-20"
          style={{ ...ANTON, fontSize: 'clamp(64px, 16vw, 220px)' }}
        >
          Services
        </motion.h2>

        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          {SERVICES.map((s, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={s.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="block w-full cursor-pointer text-left"
                style={{ borderTop: '2px solid rgba(255,255,255,0.5)' }}
              >
                <div className="flex items-center justify-between gap-4 py-6 sm:py-8">
                  <motion.span
                    animate={{ x: isActive ? 20 : 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      ...ANTON,
                      fontSize: 'clamp(2rem, 6.5vw, 88px)',
                      color: isActive ? 'white' : 'transparent',
                      WebkitTextStroke: isActive ? '0px' : '1.5px rgba(255,255,255,0.9)',
                      transition: 'color 300ms, -webkit-text-stroke 300ms',
                    }}
                  >
                    {s.title}
                  </motion.span>
                  <motion.span
                    animate={{ rotate: isActive ? 0 : -45, scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.35 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16"
                    style={{ border: '2px solid white', color: 'white' }}
                  >
                    <ArrowDownRight size={26} strokeWidth={2.25} />
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 sm:pb-10">
                        <p
                          className="max-w-2xl text-white"
                          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)', lineHeight: 1.65, opacity: 0.95 }}
                        >
                          {s.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase sm:text-sm"
                              style={{ color: s.bg, letterSpacing: '0.08em' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
          <div style={{ borderTop: '2px solid rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </section>
  )
}

export function TechStack() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-12%', '8%'])
  const [cat, setCat] = useState('all')
  const visible = TECH.filter((t) => cat === 'all' || t.cat === cat)

  return (
    <section
      id="stack"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: '#6EB5FF' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '36vw',
          height: '36vw',
          right: '-8%',
          top: '8%',
          backgroundColor: '#8DC4FF',
          filter: 'blur(80px)',
          animation: 'float 11s ease-in-out infinite',
        }}
      />

      <motion.span
        aria-hidden
        className="absolute top-[3%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 28vw, 400px)', color: 'white', opacity: 0.16 }}
      >
        TECH STACK
      </motion.span>

      <Grain />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ My Toolbox ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-white"
          style={{ ...ANTON, fontSize: 'clamp(2.6rem, 9vw, 130px)' }}
        >
          Tech Stack
        </motion.h2>

        {/* category filter pills */}
        <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
          {TECH_CATS.map((c) => {
            const isOn = c === cat
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className="rounded-full px-5 py-2 text-xs font-bold uppercase sm:px-6 sm:text-sm"
                style={{
                  letterSpacing: '0.1em',
                  border: '2px solid white',
                  backgroundColor: isOn ? 'white' : 'transparent',
                  color: isOn ? '#6EB5FF' : 'white',
                  transition: `background-color 250ms ${EASE}, color 250ms ${EASE}`,
                }}
              >
                {c}
              </button>
            )
          })}
        </div>

        {/* sticker wall */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={t.name}
                layout
                initial={{ opacity: 0, scale: 0.7, rotate: i % 2 ? 3 : -3 }}
                animate={{ opacity: 1, scale: 1, rotate: i % 2 ? 2 : -2 }}
                exit={{ opacity: 0, scale: 0.7 }}
                whileHover={{ rotate: 0, scale: 1.07, y: -6 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center gap-3 rounded-3xl bg-white px-4 py-7"
                style={{ boxShadow: '7px 7px 0 rgba(0,0,0,0.18)' }}
              >
                <img src={t.logo} alt="" loading="lazy" className="h-12 w-12 sm:h-14 sm:w-14" />
                <span
                  className="text-center text-xs font-bold uppercase sm:text-sm"
                  style={{ color: '#111', letterSpacing: '0.06em' }}
                >
                  {t.name}
                </span>
                <span
                  className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase text-white"
                  style={{ backgroundColor: '#6EB5FF', letterSpacing: '0.1em' }}
                >
                  {t.cat}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['6%', '-12%'])

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: '#6BBF7A' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '38vw',
          height: '38vw',
          left: '-10%',
          bottom: '0%',
          backgroundColor: '#85CC92',
          filter: 'blur(85px)',
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      <motion.span
        aria-hidden
        className="absolute top-[3%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 28vw, 400px)', color: 'white', opacity: 0.16 }}
      >
        JOURNEY
      </motion.span>

      <Grain />

      <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-10" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ Experience ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-white"
          style={{ ...ANTON, fontSize: 'clamp(2rem, 6vw, 84px)', maxWidth: '12em' }}
        >
          Building products that{' '}
          <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>users love</span>
        </motion.h2>

        <div className="mt-6">
          <RevealText text="I have strong knowledge in UI/UX design and full-stack development. Proficient in FIGMA, HTML, CSS, TypeScript, Angular, React Native, Ionic, and Rust. I've built quick commerce platforms, school ERP systems, mental health apps, and POS systems — handling everything from design to deployment solo." />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ My Professional Journey — a timeline of my career growth ✦
        </motion.p>

        {/* timeline */}
        <div className="relative mt-14 flex flex-col gap-10 pl-8 sm:gap-12 sm:pl-12">
          {/* the line */}
          <div
            className="absolute bottom-2 top-2 left-[9px] w-1 rounded-full sm:left-[13px]"
            style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
          />

          {JOBS.map((j, i) => (
            <motion.div
              key={j.company}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              {/* dot */}
              <span
                className="absolute top-8 -left-8 block h-5 w-5 rounded-full sm:-left-12 sm:h-6 sm:w-6"
                style={{
                  backgroundColor: 'white',
                  border: '4px solid #6BBF7A',
                  outline: '3px solid white',
                  animation: j.present ? 'pulse-ring 1.8s ease-out infinite' : undefined,
                }}
              />

              <motion.div
                whileHover={{ rotate: 0, scale: 1.02 }}
                initial={{ rotate: j.tilt }}
                className="rounded-3xl bg-white p-6 sm:p-8"
                style={{ boxShadow: '8px 8px 0 rgba(0,0,0,0.18)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 style={{ ...ANTON, fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', color: '#111' }}>
                    {j.company}
                  </h3>
                  <span
                    className="rounded-full px-4 py-1.5 text-xs font-bold uppercase text-white sm:text-sm"
                    style={{ backgroundColor: j.present ? '#F4845F' : '#6BBF7A', letterSpacing: '0.08em' }}
                  >
                    {j.period}
                  </span>
                </div>
                <p
                  className="mt-3 font-semibold uppercase"
                  style={{ color: '#111', letterSpacing: '0.06em', fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)' }}
                >
                  {j.role}
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base" style={{ color: '#111', opacity: 0.55 }}>
                  {j.location}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const [activeId, setActiveId] = useState('techcora')
  const activeWork = WORK.find((w) => w.id === activeId)!

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: '#F4845F' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '38vw',
          height: '38vw',
          right: '-10%',
          top: '4%',
          backgroundColor: '#F79B7F',
          filter: 'blur(85px)',
          animation: 'float 11s ease-in-out infinite',
        }}
      />

      <motion.span
        aria-hidden
        className="absolute top-[2%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 28vw, 400px)', color: 'white', opacity: 0.16 }}
      >
        PROJECTS
      </motion.span>

      <Grain />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ Experience ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-white"
          style={{ ...ANTON, fontSize: 'clamp(2.2rem, 7vw, 100px)' }}
        >
          Curious what I've{' '}
          <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>created?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 font-medium text-white"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', opacity: 0.95 }}
        >
          Explore projects from my professional journey
        </motion.p>

        {/* company tabs */}
        <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
          {WORK.map((w) => {
            const isOn = w.id === activeId
            return (
              <motion.button
                key={w.id}
                type="button"
                onClick={() => setActiveId(w.id)}
                whileHover={{ scale: 1.04, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 rounded-3xl px-5 py-3.5 text-left sm:px-6 sm:py-4"
                style={{
                  border: '2px solid white',
                  backgroundColor: isOn ? 'white' : 'transparent',
                  boxShadow: isOn ? '6px 6px 0 rgba(0,0,0,0.18)' : 'none',
                  transition: `background-color 300ms ${EASE}`,
                }}
              >
                <span className="text-2xl sm:text-3xl">{w.icon}</span>
                <span className="flex flex-col">
                  <span
                    style={{
                      ...CARD_TITLE,
                      fontSize: 'clamp(0.95rem, 1.7vw, 1.2rem)',
                      color: isOn ? '#F4845F' : 'white',
                    }}
                  >
                    {w.company}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase sm:text-xs"
                    style={{ letterSpacing: '0.1em', color: isOn ? '#111' : 'white', opacity: 0.7 }}
                  >
                    {w.period} · {w.duration} · {w.projects.length} projects
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* project carousel — tabs stay on screen, projects scroll sideways like the hero */}
        <Carousel resetKey={activeId} hint={`Swipe or use arrows — ${activeWork.projects.length} projects`}>
          {activeWork.projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, x: 60, rotate: i % 2 ? 2 : -2 }}
              animate={{ opacity: 1, x: 0, rotate: i % 2 ? 1.2 : -1.2 }}
              whileHover={{ rotate: 0, scale: 1.02, y: -6 }}
              transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.07, ease: [0.4, 0, 0.2, 1] }}
              className="flex w-[290px] shrink-0 flex-col overflow-hidden rounded-3xl bg-white sm:w-[340px]"
              style={{ boxShadow: '8px 8px 0 rgba(0,0,0,0.18)', scrollSnapAlign: 'start' }}
            >
              <div className="relative">
                <img src={p.image} alt={p.name} loading="lazy" className="h-40 w-full object-cover" />
                <span
                  className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-bold"
                  style={{ color: '#F4845F', ...ANTON, letterSpacing: '0.05em' }}
                >
                  {i + 1} / {activeWork.projects.length}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <h3 style={{ ...CARD_TITLE, fontSize: 'clamp(1.1rem, 1.9vw, 1.35rem)' }}>{p.name}</h3>
                <p className="text-sm font-medium" style={{ color: '#111', opacity: 0.65, lineHeight: 1.6 }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.highlights.map((h, hi) => (
                    <span
                      key={h}
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase text-white sm:text-xs"
                      style={{ backgroundColor: PALETTE[(i + hi) % PALETTE.length], letterSpacing: '0.06em' }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase sm:text-xs"
                      style={{ border: '1.5px solid rgba(0,0,0,0.25)', color: '#111', letterSpacing: '0.04em' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export function DesignProjects() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['8%', '-12%'])

  return (
    <section
      id="designs"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: '#6EB5FF' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '36vw',
          height: '36vw',
          left: '-8%',
          bottom: '4%',
          backgroundColor: '#8DC4FF',
          filter: 'blur(80px)',
          animation: 'float 12s ease-in-out infinite',
        }}
      />

      <motion.span
        aria-hidden
        className="absolute top-[2%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 28vw, 400px)', color: 'white', opacity: 0.16 }}
      >
        DESIGNS
      </motion.span>

      <Grain />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ On Behance ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-white"
          style={{ ...ANTON, fontSize: 'clamp(2rem, 6vw, 84px)', maxWidth: '12em' }}
        >
          Design & Development{' '}
          <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Projects</span>
        </motion.h2>

        <Carousel hint={`Swipe or use arrows — ${DESIGN_PROJECTS.length} designs`}>
          {DESIGN_PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 60, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 1.2 : -1.2 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
              transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.07, ease: [0.4, 0, 0.2, 1] }}
              className="group flex w-[290px] shrink-0 flex-col overflow-hidden rounded-3xl bg-white sm:w-[340px]"
              style={{ boxShadow: '8px 8px 0 rgba(0,0,0,0.18)', scrollSnapAlign: 'start' }}
            >
              <img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
              <div className="flex items-center justify-between gap-3 p-5 sm:p-6">
                <div className="flex flex-col gap-1">
                  <h3 style={{ ...CARD_TITLE, fontSize: 'clamp(1.05rem, 1.9vw, 1.3rem)' }}>{p.title}</h3>
                  <span
                    className="w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase text-white sm:text-xs"
                    style={{ backgroundColor: PALETTE[i % PALETTE.length], letterSpacing: '0.06em' }}
                  >
                    {p.subtitle}
                  </span>
                </div>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
                  style={{ border: '2px solid #111', color: '#111' }}
                >
                  <ArrowUpRight size={22} strokeWidth={2.25} />
                </span>
              </div>
            </motion.a>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-10%', '8%'])

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: '#E882B4' }}
    >
      <motion.span
        aria-hidden
        className="absolute top-[2%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 28vw, 400px)', color: 'white', opacity: 0.16 }}
      >
        REVIEWS
      </motion.span>

      <Grain />

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block text-xs font-semibold uppercase text-white sm:text-sm"
            style={{ letterSpacing: '0.18em', opacity: 0.9 }}
          >
            ✦ Testimonials ✦
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 text-white"
            style={{ ...ANTON, fontSize: 'clamp(2.2rem, 7vw, 100px)' }}
          >
            What clients{' '}
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>say</span>
          </motion.h2>
        </div>

        {/* auto-scrolling review marquee, pauses on hover */}
        <div className="testimonial-marquee mt-12 overflow-hidden">
          <div className="testimonial-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <article
                key={i}
                aria-hidden={i >= TESTIMONIALS.length}
                className="flex w-[320px] flex-col gap-4 rounded-3xl bg-white p-6 sm:w-[400px] sm:p-8"
                style={{
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.18)',
                  marginRight: '1.5rem',
                  rotate: i % 2 ? '1deg' : '-1deg',
                }}
              >
                <span style={{ color: '#F5B841', fontSize: '1.1rem', letterSpacing: '0.15em' }}>★★★★★</span>
                <p className="text-sm font-medium sm:text-base" style={{ color: '#111', lineHeight: 1.65 }}>
                  “{t.content}”
                </p>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
                  >
                    {t.avatar}
                  </span>
                  <span className="flex flex-col">
                    <span style={{ ...CARD_TITLE, fontSize: '1.05rem' }}>{t.name}</span>
                    <span className="text-xs font-semibold uppercase" style={{ color: '#111', opacity: 0.55, letterSpacing: '0.08em' }}>
                      {t.role} · {t.company}
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['6%', '-10%'])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden pt-24 sm:pt-28"
      style={{ backgroundColor: '#6BBF7A' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '40vw',
          height: '40vw',
          right: '-10%',
          top: '10%',
          backgroundColor: '#85CC92',
          filter: 'blur(85px)',
          animation: 'float 11s ease-in-out infinite',
        }}
      />

      <motion.span
        aria-hidden
        className="absolute top-[2%] left-0 whitespace-nowrap pointer-events-none select-none"
        style={{ ...ANTON, x: ghostX, fontSize: 'clamp(120px, 28vw, 400px)', color: 'white', opacity: 0.16 }}
      >
        CONTACT
      </motion.span>

      <Grain />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10" style={{ zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ Contact ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-white"
          style={{ ...ANTON, fontSize: 'clamp(2.6rem, 9vw, 130px)' }}
        >
          Let's create{' '}
          <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>together</span>
        </motion.h2>

        {/* the big invitation — email front and center, hero “HIRE ME” style */}
        <motion.a
          href="mailto:futuristicdesigner07@gmail.com"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ x: 10 }}
          className="mt-10 inline-flex flex-wrap items-center gap-3 text-white"
          style={{ ...ANTON, fontSize: 'clamp(1.1rem, 3.4vw, 3rem)', textDecoration: 'none' }}
        >
          <Mail className="h-6 w-6 sm:h-10 sm:w-10" strokeWidth={2.25} />
          futuristicdesigner07@gmail.com
          <ArrowRight className="h-6 w-6 sm:h-10 sm:w-10" strokeWidth={2.25} />
        </motion.a>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <motion.a
            href="tel:+918667263143"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase text-white sm:text-base"
            style={{ border: '2px solid white', letterSpacing: '0.12em' }}
          >
            <Phone size={18} strokeWidth={2.5} />
            +91 86672 63143
          </motion.a>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-white sm:text-base"
            style={{ letterSpacing: '0.1em', opacity: 0.9 }}
          >
            <MapPin size={18} strokeWidth={2.5} />
            Neyveli, Cuddalore, India
          </motion.span>
        </div>

        {/* find me on */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-xs font-semibold uppercase text-white sm:text-sm"
          style={{ letterSpacing: '0.18em', opacity: 0.9 }}
        >
          ✦ Find me on ✦
        </motion.p>

        <div className="mt-4 flex flex-wrap gap-3">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, scale: 1.06, y: -4 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3"
              style={{ boxShadow: '5px 5px 0 rgba(0,0,0,0.18)' }}
            >
              <span style={{ ...CARD_TITLE, fontSize: '1rem', color: PALETTE[i % PALETTE.length] }}>{s.name}</span>
              <ArrowUpRight size={18} strokeWidth={2.5} style={{ color: '#111' }} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="relative bg-white py-5 text-center" style={{ zIndex: 10 }}>
        <span className="text-xs font-semibold uppercase sm:text-sm" style={{ color: '#111', letterSpacing: '0.14em' }}>
          © 2026 Arunkumar · Designed & built with ❤
        </span>
      </div>
    </section>
  )
}
