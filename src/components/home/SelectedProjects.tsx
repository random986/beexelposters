'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: 'Neon Jazz Fest',
        location: 'Nairobi, KE',
        description: 'A vibrant, energetic poster series capturing the rhythmic soul of the annual Nairobi Jazz Festival.',
        elements: 'Bold Typography, Neon Accents',
        colors: ['#FF00FF', '#00FFFF', '#121212'],
        year: '2024',
        client: 'Jazz Connect',
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e2729?q=80&w=2600&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Future Tech Summit',
        location: 'Kigali, RW',
        description: 'Minimalist and futuristic visual identity for the East Africa Tech Summit.',
        elements: 'Data Viz, Grid Systems',
        colors: ['#00B4D8', '#CAF0F8', '#03045E'],
        year: '2023',
        client: 'TechAfrica',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Eco-Living Expo',
        location: 'Cape Town, SA',
        description: 'Organic textures and earthy tones combined to promote sustainable living solutions.',
        elements: 'Paper Textures, Serif Fonts',
        colors: ['#2D6A4F', '#D8F3DC', '#B7B7A4'],
        year: '2024',
        client: 'GreenLife',
        image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Urban Beats',
        location: 'Lagos, NG',
        description: 'Gritty, street-style poster art for an underground hip-hop showcase.',
        elements: 'Distressed Textures, Stencils',
        colors: ['#E63946', '#F1FAEE', '#1D3557'],
        year: '2023',
        client: 'Underground',
        image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2600&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Culinary Arts',
        location: 'Paris, FR',
        description: 'Elegant and sophisticated menu and poster design for a Michelin-star pop-up event.',
        elements: 'Fine Lines, Negative Space',
        colors: ['#BC6C25', '#FEFAE0', '#283618'],
        year: '2022',
        client: 'Le Gout',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2600&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Ocean Aware',
        location: 'Global',
        description: 'A powerful awareness campaign featuring surreal photo-manipulation followed by digital painting.',
        elements: 'Double Exposure, Masks',
        colors: ['#0077B6', '#90E0EF', '#0096C7'],
        year: '2024',
        client: 'Blue Planet',
        image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=2600&auto=format&fit=crop'
    },
    {
        id: 7,
        title: 'Zenith Fitness',
        location: 'London, UK',
        description: 'High-energy, dynamic promotional materials for a luxury fitness brand launch.',
        elements: 'Motion Blur, Geometric Shapes',
        colors: ['#D00000', '#FFBA08', '#000000'],
        year: '2023',
        client: 'Zenith',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2600&auto=format&fit=crop'
    }
]

export function SelectedProjects() {
    const [activeId, setActiveId] = useState(projects[0].id)

    // Create refs for each project item to track visibility
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = Number(entry.target.getAttribute('data-id'))
                        if (id) setActiveId(id)
                    }
                })
            },
            {
                rootMargin: '-40% 0px -40% 0px', // Trigger when item is near center
                threshold: 0.1
            }
        )

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    const activeProject = projects.find(p => p.id === activeId) || projects[0]

    return (
        <section className="py-24 px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-6xl md:text-8xl font-clash-display font-medium text-[#1A1A1A] text-center mb-24 tracking-tight">
                    Selected Projects
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">

                    {/* Left List - Scrollable */}
                    <div className="lg:col-span-4 flex flex-col pt-8 pb-48">
                        {projects.map((project, idx) => (
                            <div
                                key={project.id}
                                ref={el => { itemRefs.current[idx] = el }}
                                data-id={project.id}
                                className={`py-12 pl-6 border-l-2 transition-all duration-500 cursor-pointer ${activeId === project.id
                                    ? 'border-[#1A1A1A] opacity-100'
                                    : 'border-transparent opacity-40 hover:opacity-70'
                                    }`}
                                onClick={() => {
                                    document.getElementById(`project-${project.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    setActiveId(project.id)
                                }}
                                id={`project-${project.id}`}
                            >
                                <h3 className="text-3xl font-medium text-[#1A1A1A] mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                                    {project.location}
                                </p>
                                <p className={`mt-4 text-gray-600 leading-relaxed transition-all duration-500 ${activeId === project.id ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                                    }`}>
                                    {project.description}
                                </p>

                                {/* Mobile Image Preview */}
                                <div className={`lg:hidden mt-6 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${activeId === project.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Preview Card - Sticky */}
                    <div className="hidden lg:block lg:col-span-8 sticky top-24 h-[650px]">
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-gray-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeProject.id}
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>

                            {/* White Info Card (Floating) - Glassy */}
                            <motion.div
                                key={`card-${activeProject.id}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute top-12 left-12 bg-white/40 backdrop-blur-xl rounded-3xl p-8 max-w-sm shadow-lg border border-white/30 z-20"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                                        {activeProject.year}
                                    </span>
                                    <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                                        {activeProject.client}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-clash-display font-medium text-[#1A1A1A] mb-3 leading-tight">
                                    {activeProject.title}
                                </h3>
                                <p className="text-[#1A1A1A]/80 font-medium text-sm leading-relaxed mb-6">
                                    {activeProject.description}
                                </p>
                                <button className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1A1A1A] hover:opacity-70 transition-opacity">
                                    View Case Study
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </button>
                            </motion.div>

                            {/* Bottom Specs Bar - Graphic Elements & Colors */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="w-full bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex items-center justify-between text-white shadow-lg">
                                    <div className="grid grid-cols-2 gap-16">
                                        <div>
                                            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Graphic Elements</span>
                                            <span className="text-lg font-medium tracking-tight">{activeProject.elements}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2">Color Palette</span>
                                            <div className="flex -space-x-2">
                                                {activeProject.colors.map((color, cIdx) => (
                                                    <div key={cIdx} className="w-8 h-8 rounded-full border-2 border-white/20 shadow-sm" style={{ backgroundColor: color }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
