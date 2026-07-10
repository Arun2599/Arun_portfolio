import Hero from './Hero'
import { About, Contact, DesignProjects, Experience, Marquee, Projects, Services, TechStack, Testimonials } from './Sections'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <Hero />
      <About />
      <Marquee />
      <Services />
      <TechStack />
      <Experience />
      <Projects />
      <DesignProjects />
      <Testimonials />
      <Contact />
    </div>
  )
}
