import { useDarkMode } from './hooks/useDarkMode';
import { DarkModeToggle } from './components/sections/DarkModeToggle';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Navbar } from './components/sections/Navbar';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen">
      {/* Menu de secciones */}
      <Navbar />

      {/* Botón de modo oscuro flotante */}
      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      
      {/* Secciones principales */}
      <Hero/>
      <About/>
      <Projects/>
      <Services/>
      <Skills/>
      <Experience/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;

