"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Moon, Sun, ArrowLeft} from "lucide-react"
import Link from "next/link"
import Footer from "../footer/page"
import Lottie from "lottie-react"

// Lottie component using the coming-soon.json file
const ComingSoonLottie = () => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    // Load the Lottie animation data from the public folder
    fetch('/lottie/under-development.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading Lottie animation:', error))
  }, [])

  if (!animationData) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8 flex justify-center items-center">
        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg w-96 h-64"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "500px",
          maxHeight: "400px"
        }}
        className="mx-auto"
      />
    </div>
  )
}

export default function ComingSoon() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringText, setIsHoveringText] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Set a target date (30 days from now)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 30)

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
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const headerBackground = scrollY > 50

  

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${isDarkMode ? "bg-neutral-950 text-white" : "bg-gray-50 text-neutral-950"}`}
    >
      {/* Custom Cursor */}
      {isLargeScreen && !isHoveringText && (
        <div
          className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out scale-100"
          style={{
            left: mousePosition.x - 25,
            top: mousePosition.y - 25,
          }}
        >
          <div
            className={`rounded-full border-2 transition-all duration-300 w-12 h-12 ${
              isDarkMode ? "bg-white/5 backdrop-blur-sm" : "bg-black/5 backdrop-blur-sm"
            }`}
          />
        </div>
      )}

      {/* Custom Text Cursor */}
      {isLargeScreen && isHoveringText && (
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
            className={`p-2 rounded-full transition-all duration-300 ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${headerBackground ? "backdrop-blur-sm" : ""}`}
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-all duration-300 ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${
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
      
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${isDarkMode ? "bg-black" : "bg-white"}`}
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
                  className={`p-2 rounded-full transition-colors ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                >
                  
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-2 rounded-full transition-colors ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
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
                      className={`block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-400 ${isLargeScreen ? "cursor-none" : "cursor-auto"} hover:translate-x-2.5`}
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
                      className={`block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-500 ${isLargeScreen ? "cursor-none" : "cursor-auto"} hover:translate-x-2.5`}
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
                      className={`block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-600 ${isLargeScreen ? "cursor-none" : "cursor-auto"} hover:translate-x-2.5`}
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
                      className={`block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-700 ${isLargeScreen ? "cursor-none" : "cursor-auto"} hover:translate-x-2.5`}
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
                      className={`block text-5xl md:text-6xl font-light hover:text-green-400 transition-all duration-500 animate-in slide-in-from-right-10 delay-800 ${isLargeScreen ? "cursor-none" : "cursor-auto"} hover:translate-x-2.5`}
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
                className={`transition-colors flex items-center gap-2 ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-neutral-950"}`}
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

      {/* Main Content */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-10 md:px-12 lg:px-24 pt-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Lottie Animation */}
          <ComingSoonLottie />

          {/* Description */}
          <p
            className={`text-lg md:text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-12 max-w-2xl mx-auto leading-relaxed`}
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          >
            {`I'm working hard to bring you something incredible. This project page is currently under development and will be ready soon.`}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className={`bg-green-500 hover:bg-green-600 text-neutral-950 transition-all duration-300 hover:scale-105 ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}`}
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Button
              variant="outline"
              className={`transition-all duration-300 hover:scale-105 ${isLargeScreen ? 'cursor-none' : 'cursor-auto'} ${
                isDarkMode ? "border-gray-600 text-black hover:bg-white/10 hover:text-white" : "border-gray-400 text-neutral-950 hover:bg-black/10"
              }`}
            >
              <a href="mailto:jaysonreales0@gmail.com" target="_blank" className="flex items-center gap-2">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
} 