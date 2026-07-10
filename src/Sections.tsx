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
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { GRAIN } from './Hero'

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
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
          href="mailto:futuristicdesigner07@gmail.com"
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
          ✦ My Professional Journey ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-white"
          style={{ ...ANTON, fontSize: 'clamp(2.6rem, 9vw, 130px)' }}
        >
          Experience
        </motion.h2>

        <p
          className="mt-4 font-medium text-white"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', opacity: 0.95 }}
        >
          A timeline of my career growth and experiences
        </p>

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
