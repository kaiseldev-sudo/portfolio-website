"use client"
import { useState, useEffect} from "react"
import { ArrowRight } from "lucide-react"

export default function Footer() {
    const [isDarkMode] = useState(true)
    const [setIsHoveringText] = useState(false)
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
          setIsLargeScreen(window.innerWidth >= 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
      }, []);
  return (
    <footer
        className={`px-6 md:px-12 lg:px-24 pt-12 lg:pt-24 pb-8 transition-colors ${isDarkMode ? "bg-neutral-900 border-t border-gray-800" : "border-t border-gray-200"}`}
    >
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
        <div>
            <div className={`text-3xl font-semibold transition-colors logo-font ${isDarkMode ? "text-white" : "text-neutral-950"} lg:mb-8`}>
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
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}">
                <ArrowRight className="h-4 w-4 text-neutral-950 rotate-[-45deg]" />
                </div>
            </div>
            </a>

            <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
            <div className="space-y-4">
                <a
                href="#about"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
                >
                About
                </a>
                <a
                href="#work"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
                >
                Works
                </a>
                <a
                href="#mentoring"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
                >
                Mentoring
                </a>
            </div>
            <div className="space-y-4">
                <a
                href="https://www.linkedin.com/in/jayson-reales/"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}`}
                onMouseEnter={() => setIsHoveringText(true)}
                onMouseLeave={() => setIsHoveringText(false)}
                >
                LinkedIn
                </a>
                <a
                href="https://drive.google.com/file/d/1NXpj89alSl-VGSrKevt2lnMX2gZd9ha6/view?usp=sharing"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-neutral-950"} transition-colors duration-300 block ${isLargeScreen ? 'cursor-none' : 'cursor-auto'}`}
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
            className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} flex flex-col lg:flex-row gap-1 justify-between items-center text-sm pt-8 border-t transition-colors ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
            <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
                Made with care and plenty of coffee
            </p>
            <p onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>
                © 2025 Jayson Reales
            </p>
        </div>
  </footer>
  )
}