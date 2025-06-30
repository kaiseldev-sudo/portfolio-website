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
  const [openDropdown, setOpenDropdown] = useState<number | null>(0); // 0 = first open by default, 1 = second, null = none
  const testimonials = [
    '"Dousan is very kind and incredibly generous in sharing his past experience and all his knowledge to help others grow. He gave me such great feedback on how to tailor my portfolio and cv for the roles I\'m applying for"',
    '"Working with Dousan was a game changer for my career. His advice was practical and actionable, and he always made time to answer my questions."',
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  // Track the text color being hovered
  const sectionRefs = {
    hero: useRef(null),
    work: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    coaching: useRef(null),
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
      className={`min-h-screen transition-colors duration-300 cursor-none ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
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
                className={`text-sm font-medium transition-all duration-300 ${isDarkMode ? "text-white" : "text-black"}`}
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
            className={`w-1 h-15 transition-all duration-300 ${isDarkMode ? "bg-green-400" : "bg-white"}`}
          />
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center transition-all duration-500 ease-out ${
          headerBackground
            ? isDarkMode
              ? "bg-black/60 backdrop-blur-sm"
              : "bg-white/60 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className={`w-8 h-8 transition-colors duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
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
            <div className="p-6 flex justify-between items-center animate-in slide-in-from-top-4 duration-700 delay-100">
              <div className={`w-8 h-8 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
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
            <div className="flex-1 flex flex-col justify-center items-center">
              <nav className="text-center space-y-8">
                <a
                  href="#hero"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-colors duration-300 animate-in slide-in-from-right-8 duration-700 delay-200 cursor-none"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Home
                </a>
                <a
                  href="#work"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-colors duration-300 animate-in slide-in-from-right-8 duration-700 delay-300 cursor-none"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Work
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-colors duration-300 animate-in slide-in-from-right-8 duration-700 delay-400 cursor-none"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  About
                </a>
                <a
                  href="#coaching"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-colors duration-300 animate-in slide-in-from-right-8 duration-700 delay-500 cursor-none"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Coaching
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-5xl md:text-6xl font-light hover:text-green-400 transition-colors duration-300 animate-in slide-in-from-right-8 duration-700 delay-600 cursor-none"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Contact
                </a>
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
                className={`transition-colors flex items-center gap-2 cursor-none ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
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
        className="min-h-screen flex flex-col justify-between py-24 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-6xl">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8 transition-all duration-1000 ${
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

         <div className="flex flex-col gap-4">
         <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-200 ${
              visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-black"}`}
            >
              💻 Frontend Development
            </Badge>
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-black"}`}
            >
              💾 Backend Development
            </Badge>
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-black"}`}
            >
              📱 Responsive Design
            </Badge>
            <Badge
              variant="outline"
              className={`transition-colors ${isDarkMode ? "border-gray-600 text-white" : "border-gray-400 text-black"}`}
            >
              🚀 Building Personal Projects
            </Badge>
          </div>
          <div
              className={`flex justify-between items-center w-full transition-all duration-1000 delay-400 border-t border-gray-200/60   ${
                visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
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
      <section id="work" ref={sectionRefs.work} className="px-6 md:px-12 lg:px-60 py-24">
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
            {"21'-25'"}
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
              <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-black">SHIPPED</Badge>
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Pixel Satellite SOS project"
                width={1200}
                height={600}
                className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-500 hover:scale-105"
              />
              <Button
                size="icon"
                className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-black transition-all duration-300 cursor-none"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <h3
                className="text-xl font-medium mb-2"
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                Pixel Satellite SOS
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                Emergency Satellite Messaging
              </p>
              <p
                className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} text-sm`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                https://www.dousanmao.com/satellite-sos
              </p>
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
                <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-black">SHIPPED</Badge>
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Android Private space"
                  width={600}
                  height={300}
                  className="w-full h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-lg font-medium mb-2"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Android Private space
                </h3>
                <p
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Protect your apps from prying eyes
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
                <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-black">SHIPPED</Badge>
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Platform McKinsey"
                  width={600}
                  height={300}
                  className="w-full h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-lg font-medium mb-2"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Platform McKinsey
                </h3>
                <p
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Streamlining Final Docs submission
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="px-6 md:px-12 lg:px-60 py-24">
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
                    Web Developer/Programmer
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 cursor-none"
                  onClick={() => setOpenDropdown(openDropdown === 0 ? 0 : null)}
                >
                  <Plus className={`h-4 w-4 transition-transform ${openDropdown === 0 ? "rotate-45" : ""}`} />
                </Button>
              </div>
              {openDropdown === 0 && (
                <div className="mt-4 text-sm text-gray-400">
                  Led privacy and safety features on Android, collaborating with cross-functional teams to deliver impactful solutions.
                </div>
              )}
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
                    Pixel8 Academy
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    onMouseEnter={() => setIsHoveringText(true)}
                    onMouseLeave={() => setIsHoveringText(false)}
                  >
                    UI/UX Designer Intern
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
              {openDropdown === 1 && (
                <div className="mt-4 text-sm text-gray-400">
                  Helped clients across industries bring digital products to market and grow their design teams.
                </div>
              )}
            </div>

            <Button
              className={`bg-green-500 hover:bg-green-600 text-black transition-all duration-1000 delay-600 hover:scale-105 cursor-none ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>

            <div
              className={`mt-12 transition-all duration-1000 delay-700 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
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
      <section id="skills" ref={sectionRefs.skills} className="px-6 md:px-12 lg:px-60 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2
              className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-2xl mb-8 font-semibold transition-all duration-1000 ${
                visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              What I'm known for
            </h2>
          </div>
          <div className="space-y-4">
            {[
              "User Research",
              "Product Design",
              "User Experience Design",
              "Design Strategy",
              "Motion Design",
              "High Fidelity Prototyping",
              "Workshop Facilitation",
              "Certified SCRUM",
            ].map((skill, index) => (
              <h3
                key={skill}
                className={`text-4xl md:text-5xl font-light transition-all duration-1000 hover:text-green-400 cursor-none ${
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

      {/* Coaching Section */}
      <section id="coaching" ref={sectionRefs.coaching} className="px-6 md:px-12 lg:px-60 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2
              className={`text-3xl md:text-6xl font-light mb-8 transition-all duration-1000 ${
                visibleSections.has("coaching") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              Coaching
            </h2>
          </div>
          <div>
            <h3
              className={`text-xl mb-6 transition-all duration-1000 delay-200 ${
                visibleSections.has("coaching") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              Looking for 1:1 mentoring with your design career?
            </h3>
            <p
              className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8 leading-relaxed transition-all duration-1000 delay-300 ${
                visibleSections.has("coaching") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              {
                "I'm here to help! I've helped many people land their first job in UX over the years. Maybe you're feeling a bit lost at building your portfolio, contemplating a career switch into UX design, or just need help with some challenges you're facing at work."
              }
            </p>

            <div
              className={`flex items-center justify-between mb-8 transition-all duration-1000 delay-400 ${
                visibleSections.has("coaching") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span
                  className="text-3xl font-light"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  80 GBP
                </span>
                <span
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} ml-2`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  /1 hr session
                </span>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-black transition-all duration-300 hover:scale-105 cursor-none">
                <Calendar className="mr-2 h-4 w-4" />
                Book now
              </Button>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                visibleSections.has("coaching") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                    className="transition-all duration-300 hover:scale-110 cursor-none bg-white p-4 rounded-full"
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
                    className="transition-all duration-300 hover:scale-110 cursor-none bg-white p-4 rounded-full"
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
        className={`px-6 md:px-12 lg:px-24 py-24 transition-colors ${isDarkMode ? "border-t border-gray-800" : "border-t border-gray-200"}`}
      >
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <div className={`w-8 h-8 transition-colors ${isDarkMode ? "bg-white" : "bg-black"} mb-8`}></div>
          </div>
          <div>
            <h2
              className="text-4xl md:text-5xl font-light mb-2"
              onMouseEnter={() => setIsHoveringText(true)}
              onMouseLeave={() => setIsHoveringText(false)}
            >
              {"Let's talk"}
            </h2>
            <div className="flex items-center gap-2 mb-12">
              <span
                className="text-4xl md:text-5xl font-light"
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
              >
                Drop me a line
              </span>
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-none">
                <ArrowRight className="h-4 w-4 text-black rotate-[-45deg]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <a
                  href="#about"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  About
                </a>
                <a
                  href="#work"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Works
                </a>
                <a
                  href="#coaching"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  Coaching
                </a>
              </div>
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/jayson-reales/"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors duration-300 block cursor-none`}
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
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
            © 2025 Dousan Miao
          </p>
          <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
            Made with care and plenty of coffee
          </p>
        </div>
      </footer>
    </div>
  )
}
