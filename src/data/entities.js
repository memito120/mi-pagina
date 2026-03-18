import { useState, useEffect } from 'react';
import { Code2, Lightbulb, Target, Zap, Pencil, Accessibility } from 'lucide-react';

// Mock de memito.entities - Sistema simple de gestión de entidades para poder mostrar datos en las secciones de proyectos, servicios y experiencia sin necesidad de una base de datos real o API externa. Esto facilita el desarrollo y la demostración de la funcionalidad de carga y visualización de datos en el portafolio.

// Se cargan entidades de cada sección, con un retraso para simular la carga asíncrona de datos.
export function useEntity(entityName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular una carga asíncrona
    const timer = setTimeout(() => {
      if (entityName === 'projects') {
        setData(projects);
      } else if (entityName === 'experiences') {
        setData(experiences);
      } else if (entityName === 'services') {
        setData(services);
      } else if (entityName === 'values' || entityName === 'aboutValues') {
        setData(aboutValues);
      } else {
        setData([]);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [entityName]);

  return { data, loading };
}


//Entidad: Habilidades
export const skillCategories = [
  {
    title: 'Front-end',
    skills: [
      { name: 'React+Vite', icon: 'react.svg' },
      { name: 'JavaScript', icon: 'javascript.svg' },
      { name: 'TypeScript', icon: 'typescript.svg', learning: true },
      { name: 'HTML', icon: 'html5.svg' },
      { name: 'CSS', icon: 'css.svg' },
      { name: 'Tailwind CSS', icon: 'tailwindcss.svg', learning: true },
      { name: 'Bootstrap', icon: 'bootstrap.svg' }
    ]
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'PHP', icon: 'php.svg', learning: true },
      { name: 'MongoDB', icon: 'mongodb.svg' },
      { name: 'MySQL', icon: 'mysql.svg' },
      { name: 'RESTful APIs', icon: 'restfulapi.svg' },
      { name: 'Node.js', icon: 'nodejs.svg', learning: true },
      { name: 'Next.js', icon: 'nextjs.svg', learning: true }
    ]
  },
  {
    title: 'Herramientas',
    skills: [
      { name: 'Office', icon: 'office365.svg' },
      { name: 'Git', icon: 'git.svg' },
      { name: 'npm', icon: 'npm.svg' },
      { name: 'Figma', icon: 'figma.svg' },
      { name: 'Copilot IA', icon: 'copilotgithub.svg' },
      { name: 'Excel intermedio', icon: 'excel.svg' }
    ]
  },
  {
    title: 'Metodologías',
    skills: [
      { name: 'Agile/Scrum', icon: 'agile.svg', learning: true },
      { name: 'Kanban', icon: 'kanban.svg', learning: true }
    ]
  }
];

// Entidad: About
export const aboutValues = [
  {
    id: 1,
    icon: Accessibility,
    title: "Accesibilidad e Inclusión",
    description: "Como persona sorda con implante coclear y usuario de LSCH nativa, me comprometo a crear experiencias digitales accesibles para todos, sin barreras.",
    highlighted: true
  },
  {
    id: 2,
    icon: Code2,
    title: "Código rápido y legible",
    description: "Me esfuerzo por escribir código limpio, eficiente y fácil de mantener, siguiendo las mejores prácticas de la industria."
  },
  {
    id: 3,
    icon: Zap,
    title: "Rendimiento",
    description: "Optimizo cada aspecto para garantizar experiencias web rápidas y fluidas."
  },
  {
    id: 4,
    icon: Lightbulb,
    title: "Innovación",
    description: "Siempre busco nuevas tecnologías y enfoques para resolver problemas de manera creativa."
  },
  {
    id: 5,
    icon: Target,
    title: "Enfoque en Objetivos",
    description: "Me concentro en entregar soluciones que cumplan los objetivos del negocio y del usuario."
  },
  {
    id: 6,
    icon: Pencil,
    title: "Aprendizaje Continuo",
    description: "Sigo aprendiendo y mejorando mis habilidades para ofrecer lo mejor en cada proyecto."
  },

];

// Entidad: Projects
export const projects = [
  {
    id: 1,
    title: "Plataforma web de escuela (Proyecto practica profesional)",
    description: "Desarrollo de una plataforma web para un colegio, con funcionalidades de gestión académica, comunicación y recursos para estudiantes y profesores, por temas de confidencialidad no puedo mostrar el proyecto completo, pero se pueden ver algunas imágenes de prueba y tecnologías utilizadas.",
    technologies: [{ name: 'HTML', icon: 'html5.svg' }, { name: 'CSS', icon: 'css.svg' }, { name: 'JavaScript', icon: 'javascript.svg' }, { name: 'PHP', icon: 'php.svg' }, { name: 'MySQL', icon: 'mysql.svg' }, { name: 'Bootstrap', icon: 'bootstrap.svg' }],
    demoUrl: "",
    githubUrl: "",
    images: ["proyecto-1.jpg", "proyecto-4.png", "proyecto-5.png"]
  },
  {
    id: 2,
    title: "Gestion de un gimnasio (Proyecto grupal)",
    description: "Aplicación de gestión de un gimnasio con funcionalidades de arrastrar y soltar, categorización y colaboración en tiempo real.",
    technologies: [{ name: 'React', icon: 'react.svg' }, { name: 'JavaScript', icon: 'javascript.svg' }, { name: 'Node.js', icon: 'nodejs.svg' }, {name: 'Next.js', icon: 'nextjs.svg'},{ name: 'MySQL', icon: 'mysql.svg' }],
    demoUrl: "",
    githubUrl: "",
    images: ["proyecto-2.png"]
  },
  {
    id: 3,
    title: "Plataforma inmobiliaria (Proyecto prueba final de carrera)",
    description: "Desarrollo de una plataforma inmobiliaria con funcionalidades de búsqueda avanzada, filtros dinámicos y gestión de propiedades.",
    technologies: [{ name: 'PHP', icon: 'php.svg' }, { name: 'MySQL', icon: 'mysql.svg' }, { name: 'Bootstrap', icon: 'bootstrap.svg' }, { name: 'JavaScript', icon: 'javascript.svg' }, { name: 'HTML', icon: 'html5.svg' }, { name: 'CSS', icon: 'css.svg' }],
    githubUrl: "",
    images: ["proyecto-3.jpg"]
  },
  {
    id: 4,
    title: "Llegarán nuevos proyectos...",
    description: "Estoy trabajando en nuevos proyectos emocionantes que pronto estarán disponibles para mostrar. ¡Mantente atento!",
    comingSoon: true,
    technologies: [],
    githubUrl: "",
    images: ["coming-lightmode.png", "coming-darkmode.png"]

  }

];

//Entidad: Services
export const services = [
  {
    id: 1,
    title: "Servicio técnico a domicilio",
    subtitle: "Atención personalizada",
    description: "Atención en domicilio para soporte técnico, reparaciones básicas y mantenciones según complejidad. Incluye desplazamiento y asesoría técnica personalizada.",
    tags: ["A domicilio", "Soporte técnico", "Descuento por volumen"],
    price: 35000,
    priceRange: "$15.000 – $50.000 CLP por equipo",
    duration: "Variable según servicio",
    note: "Precio por computador. Descuento disponible para 5+ equipos. Desplazamiento puede aplicar según zona.",
    images: ["servicio-5.webp", "servicio-7.jpg", "servicio-10.jpg" , "servicio-18.jpg", ]
  },
  {
    id: 3,
    title: "Mantenimiento básico / limpieza interna",
    subtitle: "Limpieza profesional de componentes",
    description: "Limpieza interna del equipo para mejorar temperatura, rendimiento y vida útil de los componentes.",
    tags: ["Limpieza", "Prevención", "PC/Notebook", "PS4-5/XBOX"],
    price: 30000,
    priceRange: "$15.000 – $45.000 CLP",
    duration: "1-2 horas",
    note: "Según si incluye solo limpieza o cambio de pasta térmica + diagnóstico completo.",
    images: ["servicio-1.webp", "servicio-14.jpg", "servicio-15.jpg"]
  },
  {
    id: 4,
    title: "Mantenimiento preventivo + pasta térmica",
    subtitle: "Optimización térmica completa",
    description: "Servicio preventivo completo con limpieza, revisión general y aplicación de pasta térmica.",
    tags: ["Pasta térmica", "Temperaturas", "Rendimiento", "PC/Notebook", "PS4-5/XBOX"],
    price: 45000,
    priceRange: "$30.000 – $60.000 CLP",
    duration: "2-3 horas",
    note: "Ideal para equipos con altas temperaturas o uso intensivo.",
    images: ["servicio-2.jpg", "servicio-5.jpg", "servicio-11.jpg"]
  },
  {
    id: 5,
    title: "Formateo / instalación de sistema operativo",
    subtitle: "Instalación y configuración de Windows",
    description: "Instalación de sistema operativo, configuración de software base y drivers esenciales.",
    tags: ["Windows", "Drivers", "Optimización"],
    price: 30000,
    priceRange: "$20.000 – $40.000 CLP",
    duration: "2-4 horas",
    note: "Incluye instalación de software base según necesidad del cliente.",
    images: ["servicio-3.webp", "servicio-12.jpg", "servicio-16.jpg","servicio-19.jpg"]
  },
  {
    id: 2,
    title: "Diagnóstico básico",
    subtitle: "Evaluación técnica completa",
    description: "Evaluación inicial para detectar fallas de hardware o software y proponer solución.",
    tags: ["Revisión", "Fallas", "Presupuesto"],
    price: 10000,
    priceRange: "Desde $10.000 CLP",
    duration: "15-60 min",
    note: "Costo inicial de diagnóstico, sujeto a reparación posterior.",
    images: ["servicio-4.webp", "servicio-13.jpg"]
  },
  {
    id: 6,
    title: "Reparación de hardware",
    subtitle: "Reparación y reemplazo de componentes",
    description: "Reparación de hardware con diagnóstico, presupuesto y reparación de componentes según disponibilidad, incluyendo reemplazo de piezas defectuosas.",
    tags: ["Finales de 2026"],
    price: "Próximamente",
    priceRange: null,
    duration: null,
    note: "Servicio en desarrollo, disponible a finales de 2026.",
    images: ["servicio-17.jpg"]
  }

];


// Entidad: Experience
export const experiences = [
  {
    id: 1,
    company: "Colegio Familiar Agricola Valle del Elqui",
    location: "La Serena, CL",
    position: "Tecnico en Computacion/Soporte IT en terreno",
    startDate: "2025-06",
    endDate: "2025-12",
    description: "Soporte técnico en terreno para el colegio, incluyendo mantenimiento de equipos, resolución de problemas técnicos y asistencia a usuarios, con un enfoque en la mejora continua de la infraestructura tecnológica del establecimiento.",
    achievements: [
      "Realicé mantenimiento preventivo y correctivo en los equipos del colegio, mejorando su rendimiento y prolongando su vida útil.",
      "Brindé soporte técnico a profesores y personal administrativo, resolviendo problemas de hardware y software de manera eficiente.",
      "Colaboré en la implementación de medidas de seguridad informática para proteger los datos del colegio y garantizar un entorno digital seguro."
    ]
  },
  {
    id: 2,
    company: "Colegio Familiar Agricola Valle del Elqui",
    location: "La Serena, CL",
    position: "Desarrollador Web/Soporte IT (Práctica Profesional)",
    startDate: "2025-03",
    endDate: "2025-05",
    description: "Desarrollo de una plataforma web para la gestión académica y administrativa del colegio, incluyendo funcionalidades de comunicación, recursos educativos y soporte técnico para el personal.",
    achievements: [ 
      "Apoyé en la implementación de un sitio web escolar desarrollado en PHP, coordinando con el equipo docente y informática la publicación de información y el acceso desde los equipos del colegio.",
      "Colaboré en la resolución de problemas técnicos y en la capacitación del personal para el uso de la nueva plataforma, mejorando la eficiencia en la gestión académica y administrativa del colegio.",
      "Verifiqué el correcto funcionamiento del sitio en los navegadores utilizados en el establecimiento y realicé pruebas básicas de acceso desde la red interna."
    ]
  },
  {
    id: 3,
    company: "Universidad Inacap La Serena",
    location: "La Serena, CL",
    position: "Analista Programador",
    startDate: "2023",
    endDate: "2024",
    description: "Desarrollo de aplicaciones web para la gestión académica y administrativa de la universidad, colaborando con equipos multidisciplinarios para mejorar los procesos internos.",
    achievements: [
      "Desarrollé un sistema de bazar que permitió a los trabajadores comprar y vender artículos usados, utilizando PHP y MySQL para el backend y Bootstrap para el frontend, mejorando la experiencia de compra-venta dentro de la comunidad.",
      "Desarrollé un e-commerce de inmobiliaria utilizando PHP, MySQL y Bootstrap, con funcionalidades de búsqueda avanzada, filtros dinámicos y gestión de propiedades, mejorando la experiencia de los usuarios en la búsqueda de propiedades.",
      "Colaboré en la implementación de un sistema de gestión de gimnasio con React, Node.js y MySQL, que incluía funcionalidades de arrastrar y soltar, categorización y colaboración en tiempo real, mejorando la eficiencia en la gestión de las actividades del gimnasio."
    ]
  }
];


