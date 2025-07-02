"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Moon, Sun, ArrowLeft, Clock, Construction } from "lucide-react"
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

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

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

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
        <Link href="/" className={`text-3xl font-semibold transition-colors duration-300 logo-font ${isDarkMode ? "text-white" : "text-neutral-950"}`}>
          jayson.
        </Link>
        <div className="flex gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${isLargeScreen ? "cursor-none" : "cursor-auto"} ${
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
            } ${headerBackground ? "backdrop-blur-sm" : ""}`}
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

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
            I'm working hard to bring you something incredible. This project page is currently under development and will be ready soon.
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