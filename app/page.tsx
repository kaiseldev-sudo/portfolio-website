"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Download, Calendar, Plus, ChevronRight, Moon, Sun, ArrowDown } from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringProject, setIsHoveringProject] = useState(false)
  const [isHoveringText, setIsHoveringText] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(0)
  const testimonials = [
    'Sir Jayson is an amazing instructor — he explains complex programming concepts in a simple, clear way that helped me build real projects with confidence.',
    'Learning from Sir Jayson transformed my skills. His hands-on lessons and constant support made me feel ready to tackle real-world web development challenges.',
  ];
  
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  // Track the text color being hovered
  const sectionRefs = {
    hero: useRef(null),
    work: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    mentoring: useRef(null),
  }

  useEffect(() => {
    const updateScrollY = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", updateScrollY)
    return () => window.removeEventListener("scroll", updateScrollY)
  }, [])

  useEffect(() => {
    const updateMousePosition = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      setMousePosition({ x: mouseEvent.clientX, y: mouseEvent.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("scroll", updateMousePosition)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-10% 0px -10% 0px",
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  const headerBackground = scrollY > 50

  return (
    <div
    className={`min-h-screen transition-colors duration-300 cursor-none ${isDarkMode ? "bg-neutral-950 text-white" : "bg-gray-50 text-neutral-950"}`}
    >
      {/* Custom Cursor */}
      {!isHoveringText && (
        <div
          className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
            isHoveringProject ? "scale-150" : "scale-100"
          }`}
          style={{
            left: mousePosition.x - (isHoveringProject ? 50 : 25),
            top: mousePosition.y - (isHoveringProject ? 50 : 25),
          }}
        >
          <div
            className={`rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              isHoveringProject ? "w-24 h-24" : "w-12 h-12"
            } ${
              isDarkMode ? "bg-white/5 backdrop-blur-sm" : "bg-black/5 backdrop-blur-sm"
            }`}
          >
            {isHoveringProject && (
              <span
                className={`text-sm font-medium transition-all duration-300 ${isDarkMode ? "text-white" : "text-neutral-950"}`}
              >
                View
              </span>
            )}
          </div>
        </div>
      )}

      {/* Custom Text Cursor */}
      {isHoveringText && (
        <div
          className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 2,
            top: mousePosition.y - 20,
          }}
        >
          <div
            className={`w-1 h-10 transition-all duration-300 ${isDarkMode ? "bg-green-400" : "bg-white"}`}
          />
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-20 p-6 flex justify-between items-center transition-all duration-500 ease-out ${
          headerBackground
            ? isDarkMode
              ? "bg-black/60 backdrop-blur-sm"
              : "bg-white/60 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className={`text-3xl font-semibold transition-colors duration-300 logo-font ${isDarkMode ? "text-white" : "text-neutral-950"}`}>
          jayson.
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 cursor-none ${
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
            } ${headerBackground ? "backdrop-blur-sm" : ""}`}
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-all duration-300 cursor-none ${
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
            } ${headerBackground ? "backdrop-blur-sm" : ""}`}
          >
            {isMenuOpen ? (
              <div className="w-5 h-5 relative">
                <div
                  className={`absolute top-2 w-5 h-0.5 rotate-45 transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}
                ></div>
                <div
                  className={`absolute top-2 w-5 h-0.5 -rotate-45 transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}
                ></div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
                <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
                <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 cursor-none ${isDarkMode ? "bg-black" : "bg-white"}`}
        >
          <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Menu Header */}
            <div className="px-6 lg:px-20 p-6 flex justify-between items-center duration-700 delay-100">
            <div className={`text-3xl font-semibold transition-colors duration-300 logo-font ${isDarkMode ? "text-white" : "text-neutral-950"}`}>
              jayson.
            </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full transition-colors cursor-none ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                >
                  
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-2 rounded-full transition-colors cursor-none ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                >
                  <div className="w-5 h-5 relative">
                    <div className={`absolute top-2 w-5 h-0.5 rotate-45 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
                    <div
                      className={`absolute top-2 w-5 h-0.5 -rotate-45 ${isDarkMode ? "bg-white" : "bg-black"}`}
                    ></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex flex-col justify-center items-center lg:ms-60">
              <nav>
                <ul className="space-y-6 list-none">
                  <li className="relative group">
                    <a
                      href="#hero"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-400 cursor-none hover:translate-x-2.5"
                      onMouseEnter={() => setIsHoveringText(true)}
                      onMouseLeave={() => setIsHoveringText(false)}
                    >
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      Home
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#work"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-500 cursor-none hover:translate-x-2.5"
                      onMouseEnter={() => setIsHoveringText(true)}
                      onMouseLeave={() => setIsHoveringText(false)}
                    >
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      Work
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#about"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-600 cursor-none hover:translate-x-2.5"
                      onMouseEnter={() => setIsHoveringText(true)}
                      onMouseLeave={() => setIsHoveringText(false)}
                    >
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      About
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#mentoring"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-700 cursor-none hover:translate-x-2.5"
                      onMouseEnter={() => setIsHoveringText(true)}
                      onMouseLeave={() => setIsHoveringText(false)}
                    >
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      Mentoring
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-800 cursor-none hover:translate-x-2.5"
                      onMouseEnter={() => setIsHoveringText(true)}
                      onMouseLeave={() => setIsHoveringText(false)}
                    >
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="p-6 flex justify-between items-end animate-in slide-in-from-bottom-4 duration-700 delay-700">
              <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
                  Albay,
                </p>
                <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
                  Philippines
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/jayson-reales/"
                className={`transition-colors flex items-center gap-2 cursor-none ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-neutral-950"}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                LinkedIn
                <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className="min-h-screen flex flex-col justify-between -pb-10 pt-24 lg:pb-6 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-6xl">
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-light leading-tight transition-all duration-1000 ${
              visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          >
            {
              "I'm Jayson, a full-stack web developer with 3 years of experience, driven by curiosity. I'm currently seeking "
            }
            <span className="text-green-400">new opportunities</span>
            {",  to showcase my expertise while actively "}
            <span className="text-green-400">building personal projects</span>
            {"."}
          </h1>
        </div>

         <div className="flex flex-col gap-4 mb-10 lg:mb-1">
         <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-200 ${
              visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-neutral-950"}`}
            >
              💻 Frontend Development
            </Badge>
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-neutral-950"}`}
            >
              💾 Backend Development
            </Badge>
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-neutral-950"}`}
            >
              📱 Responsive Design
            </Badge>
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-neutral-950"}`}
            >
              🚀 Building personal projects
            </Badge>
          </div>
          <div
              className={`flex justify-between items-center w-full transition-all duration-1000 delay-400 border-t border-gray-200/60   ${
                visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p
                className={`text-sm   lg:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                Based in Albay, Philippines
              </p>
              <Button
                variant="ghost"
                className="text-green-400 hover:text-green-300 transition-all duration-300 cursor-none"
              >
                See Selected Works <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
         </div>
      </section>

      {/* Selected Works */}
      <section id="work" ref={sectionRefs.work} className="px-6 md:px-12 lg:px-30 py-24">
        <div
          className={`flex justify-between items-center mb-12 transition-all duration-1000 ${
            visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="text-3xl md:text-6xl font-light"
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          >
            Selected works
          </h2>
          <span
            className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          >
            {/* {"21'-25'"} */}
          </span>
        </div>

        {/* Featured Project */}
        <Card
          className={`transition-all duration-1000 delay-200 hover:scale-[1.02] overflow-hidden cursor-none ${
            visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-gray-50 border-gray-200 hover:border-gray-300"} mb-8`}
          onMouseEnter={() => setIsHoveringProject(true)}
          onMouseLeave={() => setIsHoveringProject(false)}
        >
          <CardContent className="p-0">
            <div className="relative">
              <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-neutral-950">SHIPPED</Badge>
              <Image
                src="/images/apcia.jpg?height=600&width=1200"
                alt="APCIA E-Commerce"
                width={1200}
                height={600}
                className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-500 hover:scale-105"
              />
              <Button
                size="icon"
                className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-neutral-950 transition-all duration-300 cursor-none"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <h3
                className={`text-xl font-medium mb-2 ${isDarkMode ? "text-white" : "text-neutral-950"}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                APCIA E-Commerce
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                E-commerce for farmers
              </p>
              {/* <p
                className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} text-sm`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                https://www.dousanmao.com/satellite-sos
              </p> */}
            </div>
          </CardContent>
        </Card>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card
            className={`transition-all duration-1000 delay-400 hover:scale-[1.02] overflow-hidden cursor-none ${
              visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
            onMouseEnter={() => setIsHoveringProject(true)}
            onMouseLeave={() => setIsHoveringProject(false)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-neutral-950">SHIPPED</Badge>
                <Image
                  src="/images/kapuntukan.png?height=300&width=600"
                  alt="Kapuntukan Resto Bar Reservation and Scheduling"
                  width={600}
                  height={300}
                  className="w-full h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-medium mb-2 ${isDarkMode ? "text-white" : "text-neutral-950"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Kapuntukan Resto Bar Reservation and Scheduling
                </h3>
                <p
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  A simple system for reserving tables and scheduling events at Kapuntukan Resto Bar.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`transition-all duration-1000 delay-600 hover:scale-[1.02] overflow-hidden cursor-none ${
              visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
            onMouseEnter={() => setIsHoveringProject(true)}
            onMouseLeave={() => setIsHoveringProject(false)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-neutral-950">SHIPPED</Badge>
                <Image
                  src="/images/solana.png?height=300&width=600"
                  alt="Solana Staking DApp"
                  width={600}
                  height={300}
                  className="w-full h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-medium mb-2 ${isDarkMode ? "text-white" : "text-neutral-950"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Solana Staking DApp
                </h3>
                <p
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  A decentralized application for staking Solana tokens and earning rewards.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`transition-all duration-1000 delay-600 hover:scale-[1.02] overflow-hidden cursor-none ${
              visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
            onMouseEnter={() => setIsHoveringProject(true)}
            onMouseLeave={() => setIsHoveringProject(false)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <Badge className="absolute top-4 left-4 z-10 bg-orange-500 text-neutral-950">IN PROGRESS</Badge>
                <Image
                  src="/images/mindleap.png?height=300&width=600"
                  alt="MindLeap"
                  width={600}
                  height={300}
                  className="w-full h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-medium mb-2 ${isDarkMode ? "text-white" : "text-neutral-950"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  MindLeap
                </h3>
                <p
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Visualize knowledge. Recall with power.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="px-6 md:px-12 lg:px-30 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2
              className={`text-3xl md:text-6xl font-light mb-8 transition-all duration-1000 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              About
            </h2>
          </div>
          <div
            className={`space-y-6 text-lg leading-relaxed transition-all duration-1000 delay-200 ${
              visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
              {
                "I'm Jayson, a versatile web developer with "
              }
              <span className="text-green-400">3 years of experience </span>
              {
                "and a Bachelor's degree in Information Technology from "
              }
              <span className="text-green-400">Computer Arts and Technological College, Inc.</span>
              {
                " I specialize in transforming ideas into seamless, impactful web solutions that help businesses grow and connect with their audiences."
              }
            </p>
            <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
              {
                "Driven by curiosity and a passion for clean, efficient code, I build user-friendly experiences that balance technical precision with creative problem-solving. I thrive on turning complex requirements into intuitive, reliable products that exceed expectations."
              }
            </p>
            <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
              {"Beyond web development, I'm diving into Web3, exploring the world of cryptocurrency trading and airdrops, and enjoying downtime playing guitar or spending time with my dog, Bela"}
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-16 grid lg:grid-cols-2 gap-16">
          <div></div>
          <div className="space-y-6">
            {/* First Experience */}
            <div
              className={`border-b pb-6 transition-all duration-1000 delay-400 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className="text-xl font-medium"
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Computer Arts and Technological College, Inc.
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    IT Instructor
                  </p>
                  <p
                    className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Jan 2023 - Present
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 cursor-none"
                  onClick={() => setOpenDropdown(openDropdown === 0 ? null : 0)}
                >
                  <Plus className={`h-4 w-4 transition-transform ${openDropdown === 0 ? "rotate-45" : ""}`} />
                </Button>
              </div>
              <div
                className={`mt-4 text-sm text-gray-400 transition-all duration-500 ${
                  openDropdown === 0
                    ? "opacity-100 translate-y-0 max-h-40"
                    : "opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none"
                }`}
              >
                Taught students programming languages like Python, JavaScript + ReactJS, and PHP/MySQL, and guided them in building real-world apps and capstone projects.
              </div>
            </div>

            {/* Second Experience */}
            <div
              className={`border-b pb-6 transition-all duration-1000 delay-500 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className="text-xl font-medium"
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Computer Arts and Technological College, Inc.
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Web Developer/Programmer
                  </p>
                  <p
                    className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Oct 2022 - Sept 2024
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 cursor-none"
                  onClick={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
                >
                  <Plus className={`h-4 w-4 transition-transform ${openDropdown === 1 ? "rotate-45" : ""}`} />
                </Button>
              </div>
              <div
                className={`mt-4 text-sm text-gray-400 transition-all duration-500 ${
                  openDropdown === 1
                    ? "opacity-100 translate-y-0 max-h-40"
                    : "opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none"
                }`}
              >
                ${`Developed and maintained the school's website and web applications, building secure, database-driven solutions to improve the digital experience.` }
              </div>
            </div>

            {/* Third Experience */}
            <div
              className={`border-b pb-6 transition-all duration-1000 delay-500 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className="text-xl font-medium"
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Pixel8 Academy
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    UI/UX Designer Intern
                  </p>
                  <p
                    className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    Sept 2021 - Jan 2022
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 cursor-none"
                  onClick={() => setOpenDropdown(openDropdown === 2 ? null : 2)}
                >
                  <Plus className={`h-4 w-4 transition-transform ${openDropdown === 2 ? "rotate-45" : ""}`} />
                </Button>
              </div>
              <div
                className={`mt-4 text-sm text-gray-400 transition-all duration-500 ${
                  openDropdown === 2
                    ? "opacity-100 translate-y-0 max-h-40"
                    : "opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none"
                }`}
              >
                Converted mockups into high-fidelity prototypes, ensuring responsive, user-friendly designs while collaborating closely with developers.
              </div>
            </div>

            <Button
              className={`bg-green-500 hover:bg-green-600 text-neutral-950 transition-all duration-1000 delay-600 hover:scale-105 cursor-none ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <a className="flex flex-row" target="_blank" href="https://drive.google.com/file/d/1NXpj89alSl-VGSrKevt2lnMX2gZd9ha6/view?usp=sharing">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>

            <div
              className={`mt-12 transition-all duration-1000 delay-700 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Image
                src="/images/profile1.jpg?height=400&width=400"
                alt="Profile photo"
                width={400}
                height={400}
                className="rounded-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="px-6 md:px-12 lg:px-30 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2
              className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-2xl mb-8 font-light transition-all duration-1000 ${
                visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              ${`What I'm known for`}
            </h2>
          </div>
          <div className="space-y-4">
            {[
              "Front-End Development  ",
              "Back-End Development",
              "Responsive Web Design",
              "Web Application Architecture",
              "UI/UX Implementation",
              "API Integration",
              "Performance Optimization",
            ].map((skill, index) => (
              <h3
                key={skill}
                className={`text-4xl md:text-5xl font-light transition-all duration-200 hover:text-green-400 cursor-none ${
                  visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                {skill}
              </h3>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoring Section */}
      <section id="mentoring" ref={sectionRefs.mentoring} className="px-6 md:px-12 lg:px-30 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2
              className={`text-3xl md:text-6xl font-light mb-8 transition-all duration-1000 ${
                visibleSections.has("mentoring") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              Mentoring
            </h2>
          </div>
          <div>
            <h3
              className={`text-xl mb-6 transition-all duration-1000 delay-200 ${
                visibleSections.has("mentoring") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              Looking for 1:1 mentoring to grow your web development career?
            </h3>
            <p
              className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8 leading-relaxed transition-all duration-1000 delay-300 ${
                visibleSections.has("mentoring") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              {
                "I'm here to help! I've guided many aspiring developers to land their first roles in tech. Whether you're feeling stuck building your portfolio, considering a career switch into web development, or need advice on tackling real-world coding challenges — I've got you covered."
              }
            </p>

            <div
              className={`flex items-center justify-between mb-8 transition-all duration-1000 delay-400 ${
                visibleSections.has("mentoring") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span
                  className="text-3xl font-light"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  ₱1,500
                </span>
                <span
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} ml-2`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  /1hr session
                </span>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-neutral-950 transition-all duration-300 hover:scale-105 cursor-none">
                <a target="_blank" className="flex flex-row" href="https://calendar.app.google/EBGM6HYNXev2TZC67">
                <Calendar className="mr-2 h-4 w-4" />
                Book now
                </a>
              </Button>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                visibleSections.has("mentoring") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h4
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-4`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                Testimonials from my mentees
              </h4>
              <Card
                className={`transition-all duration-300 hover:scale-[1.02] cursor-none ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
              >
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="transition-all duration-300 hover:scale-110 cursor-none bg-white text-neutral-950 p-4 rounded-full"
                    onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}
                    aria-label="Previous testimonial"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <p
                    className="text-gray-300 mb-0 flex-1"
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    {testimonials[testimonialIndex]}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="transition-all duration-300 hover:scale-110 cursor-none bg-white text-neutral-950 p-4 rounded-full"
                    onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`px-6 md:px-12 lg:px-24 pt-24 pb-8 transition-colors ${isDarkMode ? "bg-neutral-900 border-t border-gray-800" : "border-t border-gray-200"}`}
      >
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <div className={`text-3xl font-semibold transition-colors logo-font ${isDarkMode ? "text-white" : "text-neutral-950"} mb-8`}>
              jayson.
            </div>
          </div>
          <div>
            <h2
              className="text-4xl md:text-5xl font-light mb-2"
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              {"Let's talk"}
            </h2>
            <a href="mailto:jaysonreales0@gmail.com" target="_blank" className="hover:text-gray-300 transition">
              <div className="flex items-center gap-2 mb-12">
                <span
                  className="text-4xl md:text-5xl font-light"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Drop me a line
                </span>
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-none">
                  <ArrowRight className="h-4 w-4 text-neutral-950 rotate-[-45deg]" />
                </div>
              </div>
            </a>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <a
                  href="#about"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  About
                </a>
                <a
                  href="#work"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Works
                </a>
                <a
                  href="#mentoring"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Mentoring
                </a>
              </div>
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/jayson-reales/"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  LinkedIn
                </a>
                <a
                  href="https://drive.google.com/file/d/1NXpj89alSl-VGSrKevt2lnMX2gZd9ha6/view?usp=sharing"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                  target="_blank"
                >
                  See full CV
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} flex justify-between items-center text-sm pt-8 border-t transition-colors ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
            © 2025 Jayson Reales
          </p>
          <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
            Made with care and plenty of coffee
          </p>
        </div>
      </footer>
    </div>
  )
}
