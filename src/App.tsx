import Hero from './Hero'
import { About, Experience, Marquee, Services, TechStack } from './Sections'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <Hero />
      <About />
      <Marquee />
      <Services />
      <TechStack />
      <Experience />
    </div>
  )
}
