import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Front-end',
    skills: [
      { name: 'React+Vite', icon: '/icons/react.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg', learning: true },
      { name: 'HTML', icon: '/icons/html5.svg' },
      { name: 'CSS', icon: '/icons/css.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', learning: true },
      { name: 'Bootstrap', icon: '/icons/bootstrap.svg' }
    ]
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'PHP', icon: '/icons/php.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb.svg' },
      { name: 'MySQL', icon: '/icons/mysql.svg' },
      { name: 'RESTful APIs', icon: '/icons/restfulapi.svg' },
      { name: 'Node.js', icon: '/icons/nodejs.svg', learning: true },
      { name: 'Next.js', icon: '/icons/nextjs.svg', learning: true }
    ]
  },
  {
    title: 'Herramientas',
    skills: [
      { name: 'Office', icon: '/icons/office365.svg' },
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'npm', icon: '/icons/npm.svg' },
      { name: 'Figma', icon: '/icons/figma.svg' },
      { name: 'Copilot', icon: '/icons/copilotgithub.svg' },
      { name: 'Excel intermedio', icon: '/icons/excel.svg' }
    ]
  },
  {
    title: 'Metodologías',
    skills: [
      { name: 'Agile/Scrum', icon: '/icons/agile.svg', learning: true },
      { name: 'Kanban', icon: '/icons/kanban.svg', learning: true }
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="absolute inset-0 -z-20"
        
      />
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsla(var(--border), 0.08) 1px, transparent 1px), linear-gradient(to bottom, hsla(var(--border), 0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Habilidades</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Tecnologías y herramientas con las que trabajo día a día
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 backdrop-blur-md"
              >
                <div className="mb-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2.5">
                      {category.title}
                    </h3>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.75 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 16,
                        delay: index * 0.1 + 0.15,
                      }}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {category.skills.length} skills
                    </motion.span>
                  </div>

                  <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.article
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08 + skillIndex * 0.03,
                        duration: 0.35,
                        ease: 'easeOut',
                      }}
                      className="group relative min-h-[128px] rounded-xl border p-3.5 backdrop-blur-lg transition-all duration-300 hover:shadow-[0_0_24px_hsla(var(--primary),0.16)]"
                    >
                      <div className="relative mb-2.5 inline-flex">
                        <div className="grid h-11 w-11 place-items-center">
                          <img
                            src={skill.icon}
                            alt={`${skill.name} logo`}
                            className="h-12 w-12 object-contain"
                            loading="lazy"
                          />
                        </div>

                        {skill.learning && (
                          <motion.img
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              type: 'spring',
                              stiffness: 260,
                              damping: 14,
                              delay: index * 0.08 + skillIndex * 0.03 + 0.12,
                            }}
                            src="/icons/learning.svg"
                            alt="Aprendiendo"
                            className="absolute -right-2 -top-2 h-5 w-5 rounded-full border border-amber-600/60 bg-amber-600/20 "
                            loading="lazy"
                          />
                        )}
                      </div>

                      <p className="text-sm font-semibold leading-tight text-foreground/95">{skill.name}</p>

                      {skill.learning && (
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-amber-600">
                          Aprendiendo
                        </p>
                      )}
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
