import { useState, useEffect } from 'react';

// Mock de memito.entities - Sistema simple de gestión de entidades para poder mostrar datos en las secciones de proyectos, servicios y experiencia sin necesidad de una base de datos real o API externa. Esto facilita el desarrollo y la demostración de la funcionalidad de carga y visualización de datos en el portafolio.

// Entidad: Projects
export const projects = [
  {
    id: 1,
    title: "Plataforma web de escuela (Proyecto practica profesional)",
    description: "Desarrollo de una plataforma web para un colegio, con funcionalidades de gestión académica, comunicación y recursos para estudiantes y profesores.",
    technologies: ["PHP puro", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS"],
    demoUrl: "",
    githubUrl: "",
    image: "proyecto-1.png"
  },
  {
    id: 2,
    title: "Gestion de un gimnasio (Proyecto grupal)",
    description: "Aplicación de gestión de un gimnasio con funcionalidades de arrastrar y soltar, categorización y colaboración en tiempo real.",
    technologies: ["React", "JavaScript", "Node.js", "MySQL"],
    demoUrl: "",
    githubUrl: "",
    image: "proyecto-2.png"
  },
  {
    id: 3,
    title: "Plataforma inmobiliaria (Proyecto prueba final de carrera)",
    description: "Desarrollo de una plataforma inmobiliaria con funcionalidades de búsqueda avanzada, filtros dinámicos y gestión de propiedades.",
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS"],
    githubUrl: "",
    image: "proyecto-3.png"
  },
];

//Entidad: Services
export const services = [
  {
    id: 1,
    title: "Servicio técnico a domicilio",
    subtitle: "Atención personalizada en tu hogar o tu lugar de trabajo",
    description: "Atención en domicilio para soporte técnico, reparaciones básicas y mantenciones según complejidad. Incluye desplazamiento y asesoría técnica personalizada.",
    tags: ["A domicilio", "Soporte técnico", "Comodidad", "Descuento por volumen"],
    price: 35000,
    priceRange: "$15.000 – $50.000 CLP por equipo",
    duration: "Variable según servicio",
    note: "Precio por computador. Descuento disponible para 5+ equipos. Desplazamiento puede aplicar según zona.",
    images: ["servicio-5.webp", "servicio-7.jpg", "servicio-10.jpg"]
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
    images: ["servicio-3.webp", "servicio-12.jpg", "servicio-16.jpg"]
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
    title: "Reparación de hardware (Proximamente)",
    subtitle: "Reparación y reemplazo de componentes",
    description: "Reparación de hardware con diagnóstico, presupuesto y reparación de componentes según disponibilidad.",
    tags: ["Proximamente","Finales de 2026"],
    price: "~",
    priceRange: "Próximamente",
    duration: "Variable según reparación",
    note: "Servicio en desarrollo, disponible a finales de 2026.",
    images: ["servicio-17.jpg"]
  }

];


// Entidad: Experience
export const experiences = [
  {
    id: 1,
    company: "Colegio Familiar Agricola Valle del Elqui",
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
    position: "Desarrollador Web/Soporte IT (Práctica Profesional)",
    startDate: "2025-03",
    endDate: "2025-06",
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
    position: "Analista Programador",
    startDate: "2023-03",
    endDate: "2024-12",
    description: "Desarrollo de aplicaciones web para la gestión académica y administrativa de la universidad, colaborando con equipos multidisciplinarios para mejorar los procesos internos.",
    achievements: [
      "Desarrollé una plataforma de gestión académica que redujo el tiempo de procesamiento de solicitudes en un 25%",
      "Colaboré en la migración de sistemas legados a tecnologías modernas, mejorando la eficiencia y seguridad",
      "Colaboré con equipos de diseño y administración para implementar soluciones personalizadas según las necesidades de la prueba final de la carrera"
    ]
  }
];

// Hook simulado para cargar entidades
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
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [entityName]);

  return { data, loading };
}
