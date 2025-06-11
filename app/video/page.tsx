"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string
      }
    }
  }
}

export default function VideoPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)

  useEffect(() => {
    // Add error handler for uncaught errors
    const handleError = (event: ErrorEvent) => {
      console.log("Caught error:", event.error)
      // Prevent the error from bubbling up
      event.preventDefault()
      return true
    }

    window.addEventListener("error", handleError)

    // Load the video script with better error handling
    const loadScript = () => {
      try {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src =
          "https://scripts.converteai.net/afe361de-d52c-4970-970c-977eb531f274/players/68495a0427101d67f14bb5d5/v4/player.js"
        script.async = true

        script.onload = () => {
          console.log("Video player script loaded successfully")
          setScriptLoaded(true)
        }

        script.onerror = (error) => {
          console.error("Failed to load video player script:", error)
          setScriptError(true)
        }

        // Add the script to head
        document.head.appendChild(script)

        return script
      } catch (error) {
        console.error("Error creating script:", error)
        setScriptError(true)
        return null
      }
    }

    const script = loadScript()

    return () => {
      window.removeEventListener("error", handleError)
      if (script && document.head.contains(script)) {
        try {
          document.head.removeChild(script)
        } catch (error) {
          console.log("Error removing script:", error)
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-black/40 backdrop-blur-lg border-yellow-500/30">
          <CardContent className="p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <Image
                src="/app-guerison-logo.webp"
                alt="App Guérison Logo"
                width={140}
                height={140}
                className="w-28 h-28 sm:w-32 sm:h-32 mx-auto"
              />
            </motion.div>

            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-6">
              🔓 Le Secret Biblique de la Longévité Révélé
            </h1>

            <motion.h3
              className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6"
              style={{ color: "#ee1212" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Cette révélation peut être retirée à tout moment,{" "}
              <strong>regardez maintenant tant qu'elle est disponible !</strong>
            </motion.h3>

            <div className="mb-6 sm:mb-8">
              {/* Video Player Container */}
              <div className="relative">
                {scriptError && (
                  <div className="flex flex-col items-center justify-center min-h-[225px] bg-black/30 rounded-lg p-4">
                    <AlertTriangle className="w-10 h-10 text-yellow-500 mb-2" />
                    <p className="text-yellow-200 text-center">
                      Chargement de la vidéo... Si elle n'apparaît pas, rechargez la page.
                    </p>
                  </div>
                )}

                {!scriptLoaded && !scriptError && (
                  <div className="flex items-center justify-center min-h-[225px] bg-black/30 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                  </div>
                )}

                <vturb-smartplayer
                  id="vid-68495a0427101d67f14bb5d5"
                  style={{
                    display: "block",
                    margin: "0 auto",
                    width: "100%",
                    maxWidth: "400px",
                    minHeight: "225px",
                  }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 sm:p-6 mb-4 border border-yellow-500/30 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-300 mb-3">📜 Instructions Importantes :</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-200">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Regardez la vidéo complète pour recevoir toutes les instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Utilisez des écouteurs pour une expérience plus profonde</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Préparez-vous à appliquer cette connaissance immédiatement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Cette révélation est exclusive pour vous qui avez terminé le test</span>
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              © 2025 Secrets Bibliques de la Longévité. Tous droits réservés.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
