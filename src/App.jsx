import { useCallback, useEffect, useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Hero } from './pages/Hero';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Services } from './pages/Services';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Contact } from './pages/Contact';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NAV_ITEMS } from './components/sections/Navbars/navItems';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [activeSection, setActiveSection] = useState('home');

  const navigateToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    setActiveSection(id);
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const scrollToHashSection = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        return;
      }

      const section = document.getElementById(hash);
      if (!section) {
        return;
      }

      setActiveSection(hash);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const animationFrameId = window.requestAnimationFrame(scrollToHashSection);
    window.addEventListener('hashchange', scrollToHashSection);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('hashchange', scrollToHashSection);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) {
      return undefined;
    }

    let activeId = null;
    let ticking = false;

    const updateActiveSectionByScroll = () => {
      const probeLine = window.innerHeight * 0.32;

      let current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeLine && rect.bottom > probeLine;
      });

      if (!current) {
        current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= probeLine);
      }

      if (!current) {
        current = sections[0];
      }

      const nextId = current?.id;
      if (!nextId || nextId === activeId) {
        return;
      }

      activeId = nextId;
      setActiveSection(nextId);

      const nextHash = `#${nextId}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, '', nextHash);
      }
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSectionByScroll();
        ticking = false;
      });
    };

    updateActiveSectionByScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll('section[id]')];
    if (!sections.length) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      sections.forEach((section) => {
        section.classList.add('scroll-reveal-section', 'section-is-visible');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('section-is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    sections.forEach((section, index) => {
      section.classList.add('scroll-reveal-section');

      if (index === 0) {
        section.classList.add('section-is-visible');
        return;
      }

      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('scroll-reveal-section', 'section-is-visible');
      });
    };
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll('section[id]')];
    if (!sections.length) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return undefined;
    }

    const targetMap = new Map();
    sections.forEach((section) => {
      section.classList.add('scroll-motion-section');

      const directChildren = [...section.children];
      const target =
        directChildren.find((child) => child.classList.contains('container')) ||
        directChildren.find((child) => window.getComputedStyle(child).position !== 'absolute') ||
        section;

      target.classList.add('scroll-motion-target');
      targetMap.set(section, target);
    });

    let ticking = false;
    const updateMotion = () => {
      const viewportCenter = window.innerHeight / 2;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = (sectionCenter - viewportCenter) / window.innerHeight;
        const clamped = Math.max(-1, Math.min(1, distance));
        const offsetPx = -(clamped * 18);

        section.style.setProperty('--scroll-offset-y', `${offsetPx.toFixed(2)}px`);
      });

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);

      sections.forEach((section) => {
        section.classList.remove('scroll-motion-section');
        section.style.removeProperty('--scroll-offset-y');
      });

      targetMap.forEach((target) => {
        target.classList.remove('scroll-motion-target');
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Botón de modo oscuro flotante */}
      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
       {/* Menu de secciones */}
      <Navbar activeSection={activeSection} onNavigate={navigateToSection} />
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

