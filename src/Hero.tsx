import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const DURATION = 650

const SKILLS = [
  {
    ghost: 'UI / UX',
    title: 'UI/UX DESIGNER',
    desc: 'Creating intuitive, user-centered digital experiences that delight users and drive business goals.',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  {
    ghost: 'FRONTEND',
    title: 'FRONTEND DEVELOPER',
    desc: 'Pixel-perfect, responsive interfaces built with React, Angular and Tailwind — smooth on every screen.',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    ghost: 'FULLSTACK',
    title: 'FULL STACK DEVELOPER',
    desc: 'I design and build complete products — from Figma to Play Store. End-to-end apps users love.',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    ghost: 'LOGO ART',
    title: 'LOGO DESIGNER',
    desc: 'Memorable brand marks and identities that give your business a real look and feel.',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
]

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

type Role = 'center' | 'left' | 'right' | 'back'

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    SKILLS.forEach(({ src }) => {
      new Image().src = src
    })
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4))
      setTimeout(() => setIsAnimating(false), DURATION)
    },
    [isAnimating],
  )

  // auto-play the skill carousel
  useEffect(() => {
    const id = setInterval(() => navigate('next'), 4500)
    return () => clearInterval(id)
  }, [navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const roleOf = (i: number): Role => {
    if (i === activeIndex) return 'center'
    if (i === (activeIndex + 3) % 4) return 'left'
    if (i === (activeIndex + 1) % 4) return 'right'
    return 'back'
  }

  const roleStyle = (role: Role): React.CSSProperties => {
    switch (role) {
      case 'center':
        return {
          left: '50%',
          bottom: isMobile ? '22%' : 0,
          height: isMobile ? '60%' : '92%',
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'none',
          opacity: 1,
          zIndex: 20,
          animation: 'bob 5s ease-in-out infinite',
        }
      case 'left':
      case 'right':
        return {
          left: role === 'left' ? (isMobile ? '20%' : '30%') : isMobile ? '80%' : '70%',
          bottom: isMobile ? '32%' : '12%',
          height: isMobile ? '16%' : '28%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
        }
      case 'back':
        return {
          left: '50%',
          bottom: isMobile ? '32%' : '12%',
          height: isMobile ? '13%' : '22%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
        }
    }
  }

  const active = SKILLS[activeIndex]
  const transition = ['transform', 'filter', 'opacity', 'left']
    .map((p) => `${p} ${DURATION}ms ${EASE}`)
    .join(', ')

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: active.bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* drifting color blobs from the other slides */}
        {SKILLS.map((s, i) =>
          i === activeIndex ? null : (
            <div
              key={s.title}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '38vw',
                height: '38vw',
                left: `${i * 28}%`,
                top: `${(i * 23) % 60}%`,
                backgroundColor: s.panel,
                opacity: 0.25,
                filter: 'blur(80px)',
                animation: `float ${9 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 1.3}s`,
              }}
            />
          ),
        )}

        {/* glow behind the center figure */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            bottom: '10%',
            width: '70vmin',
            height: '70vmin',
            transform: 'translateX(-50%)',
            background: `radial-gradient(circle, ${active.panel} 0%, transparent 65%)`,
            opacity: 0.9,
            zIndex: 1,
            transition: `background ${DURATION}ms ${EASE}`,
          }}
        />

        {/* grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: GRAIN,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* giant ghost skill text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '18%' }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.95 }}
              transition={{ duration: DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(90px, 28vw, 380px)',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              {active.ghost}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {SKILLS.map((s, i) => (
            <div
              key={s.src}
              style={{
                position: 'absolute',
                aspectRatio: '0.6 / 1',
                transition,
                willChange: 'transform, filter, opacity',
                ...roleStyle(roleOf(i)),
              }}
            >
              <img
                src={s.src}
                alt={s.title}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }}
              />
            </div>
          ))}
        </div>

        {/* bottom-left: skill title + description + nav */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]"
              style={{ color: 'white', opacity: 0.95, letterSpacing: '0.02em' }}
            >
              {active.title}
            </motion.p>
          </AnimatePresence>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: 'white', opacity: 0.85, lineHeight: 1.6 }}
          >
            {active.desc}
          </p>
          <div className="flex gap-3">
            {(['prev', 'next'] as const).map((dir) => {
              const Icon = dir === 'prev' ? ArrowLeft : ArrowRight
              return (
                <button
                  key={dir}
                  aria-label={dir}
                  onClick={() => navigate(dir)}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center hover:scale-[1.08]"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: 'white',
                    transition: 'transform 150ms, background-color 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Icon size={26} strokeWidth={2.25} />
                </button>
              )
            })}
          </div>
        </div>

        {/* progress dots */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex gap-2"
          style={{ zIndex: 60 }}
        >
          {SKILLS.map((s, i) => (
            <button
              key={s.title}
              aria-label={s.title}
              onClick={() => !isAnimating && setActiveIndex(i)}
              className="rounded-full"
              style={{
                width: i === activeIndex ? 28 : 8,
                height: 8,
                backgroundColor: 'white',
                opacity: i === activeIndex ? 0.95 : 0.45,
                transition: `width 300ms ${EASE}, opacity 300ms ${EASE}`,
              }}
            />
          ))}
        </div>

        {/* bottom-right link */}
        <a
          href="tel:+918667263143"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-1 hover:opacity-100"
          style={{
            zIndex: 60,
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            color: 'white',
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 200ms',
          }}
        >
          HIRE ME
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  )
}
