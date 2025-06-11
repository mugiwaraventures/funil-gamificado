"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Star, Crown, Zap, Trophy, Sparkles, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const questions = {
  fr: {
    welcome: {
      title: "Vous Avez Été Choisi Pour Débloquer un Secret Biblique de Guérison et de Longévité",
      subtitle: "Répondez à 5 questions rapides et débloquez un message puissant de transformation.",
      description:
        "Un ancien secret caché dans les écritures sacrées peut apporter la guérison physique, soulager les douleurs émotionnelles profondes et restaurer votre paix intérieure.\n\n💫 Chaque réponse vaut des points. Plus vous serez sincère, plus vous serez proche d'un nouveau départ complet — à l'intérieur comme à l'extérieur.",
      button: "🎮 Commencer le Défi",
    },
    steps: [
      {
        title: "Ces derniers temps, avez-vous déjà eu l'impression que les médicaments ne vous aidaient pas vraiment ?",
        subtitle: "💎 Soyez honnête pour gagner plus de points !",
        options: [
          {
            value: "joint_pain",
            label: "Oui, j'ai l'impression qu'ils ne soulagent que temporairement, mais le problème revient.",
            icon: "💊",
            points: 18,
          },
          {
            value: "anxiety",
            label: "J'ai déjà dépensé beaucoup en traitements sans voir d'amélioration réelle.",
            icon: "💸",
            points: 15,
          },
          {
            value: "sadness",
            label: "Parfois, j'ai l'impression que mon corps est fatigué de tant de médicaments.",
            icon: "🧍‍♂️",
            points: 25,
          },
          {
            value: "insomnia",
            label: "Je n'utilise pas beaucoup de médicaments, mais je m'inquiète pour ma santé.",
            icon: "🧠",
            points: 20,
          },
        ],
      },
      {
        title: "Croyez-vous que votre corps a un pouvoir naturel de guérison qui n'a pas encore été activé ?",
        subtitle: "⚡ Plus c'est intense, plus vous gagnez de points !",
        options: [
          { value: "sleepless", label: "Oui, je crois que le corps peut se régénérer.", icon: "✨", points: 30 },
          {
            value: "chest_weight",
            label: "J'en ai entendu parler, mais je n'ai jamais testé.",
            icon: "📚",
            points: 25,
          },
          {
            value: "hiding_pain",
            label: "J'y crois, mais je n'ai pas encore trouvé comment l'activer.",
            icon: "🔍",
            points: 28,
          },
          {
            value: "at_limit",
            label: "Je ne suis pas sûr(e), mais j'adorerais en savoir plus.",
            icon: "🌱",
            points: 35,
          },
        ],
      },
      {
        title:
          "S'il existait une prière courte avec un pouvoir de guérison confirmé par les scientifiques et utilisée par les peuples bibliques pour vivre plus de 100 ans... seriez-vous disposé(e) à l'écouter ?",
        subtitle: "🌟 Vos désirs les plus profonds valent des points supplémentaires !",
        options: [
          {
            value: "peace_sleep",
            label: "Oui, je suis ouvert(e) à tout ce qui peut apporter un soulagement.",
            icon: "🙏",
            points: 22,
          },
          {
            value: "understood",
            label: "Oui, surtout si c'est quelque chose de naturel et divin.",
            icon: "🕊️",
            points: 18,
          },
          {
            value: "free_pain",
            label: "Certainement. J'ai l'impression que quelque chose comme ça pourrait être ma réponse.",
            icon: "💡",
            points: 30,
          },
          {
            value: "emotional_strength",
            label: "Je donnerais tout pour trouver une solution qui fonctionne vraiment.",
            icon: "❤️",
            points: 25,
          },
        ],
      },
      {
        title: "Comment vous connectez-vous au spirituel ?",
        subtitle: "🔮 Votre foi est ce qui vaut le plus de points dans ce défi !",
        options: [
          {
            value: "god_no_religion",
            label: "Je crois en Dieu, mais je ne suis aucune religion",
            icon: "🙏",
            points: 25,
          },
          {
            value: "universe_energy",
            label: "Je me connecte à l'univers, à l'énergie, à la lumière",
            icon: "🌌",
            points: 20,
          },
          { value: "faith_mystery", label: "J'ai la foi, même sans tout comprendre", icon: "✨", points: 30 },
          { value: "distant_spiritual", label: "Parfois je me sens distant(e) de tout cela", icon: "🌫️", points: 15 },
          {
            value: "seeking_balance",
            label: "Je cherche à retrouver ma foi ou mon équilibre",
            icon: "⚖️",
            points: 35,
          },
        ],
      },
      {
        title:
          "Et si vous pouviez régénérer des cellules malades pendant votre sommeil, en écoutant simplement une fréquence pendant 10 minutes... que feriez-vous maintenant ?",
        subtitle: "🎵 Votre voyage spirituel vaut des points précieux !",
        options: [
          { value: "helps_sometimes", label: "J'aimerais essayer cela dès aujourd'hui.", icon: "🎧", points: 20 },
          {
            value: "tried_no_success",
            label: "Cela ressemble à un miracle — je suis curieux/curieuse.",
            icon: "😲",
            points: 25,
          },
          {
            value: "heard_never_tried",
            label: "J'ai tout essayé. Ça ne coûte rien d'essayer le naturel.",
            icon: "🌀",
            points: 15,
          },
          {
            value: "open_to_try",
            label: "Cela semble trop beau, mais je suis disposé(e) à voir de mes propres yeux.",
            icon: "🔮",
            points: 30,
          },
        ],
      },
    ],
    vsl: {
      title: "🏆 FÉLICITATIONS ! Vous Avez Débloqué le Secret !",
      subtitle: "Votre score vous qualifie pour découvrir le secret biblique de la longévité",
      description:
        "Basé sur vos réponses honnêtes, vous êtes prêt(e) à connaître la méthode millénaire qui a transformé la santé de milliers de personnes...",
    },
  },
}

interface QuizData {
  emotionalPain: string
  emotionalIntensity: string
  deepDesire: string
  spiritualExperience: string
  spiritualConnection: string
  totalPoints: number
}

export default function SpiritualQuizFunnel() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(-1)
  const [quizData, setQuizData] = useState<QuizData>({
    emotionalPain: "",
    emotionalIntensity: "",
    deepDesire: "",
    spiritualExperience: "",
    spiritualConnection: "",
    totalPoints: 0,
  })
  const [isComplete, setIsComplete] = useState(false)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)
  const [lastPointsGained, setLastPointsGained] = useState(0)
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  const totalSteps = questions.fr.steps.length
  const progress = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 0

  // Animate points counter
  useEffect(() => {
    if (mounted && animatedPoints < quizData.totalPoints) {
      const timer = setTimeout(() => {
        setAnimatedPoints((prev) => Math.min(prev + 1, quizData.totalPoints))
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [animatedPoints, quizData.totalPoints, mounted])

  // Play sound effect when points are gained
  const playPointSound = () => {
    if (!mounted) return

    try {
      const audio = new Audio("/collect-points-190037.mp3")
      audio.volume = 0.5

      audio.addEventListener("error", (e) => {
        console.log("Audio file not available, continuing without sound")
      })

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio playback failed, continuing silently:", error)
        })
      }
    } catch (error) {
      console.log("Audio not supported, continuing without sound:", error)
    }
  }

  // Play success sound
  useEffect(() => {
    if (mounted && isComplete) {
      setShowConfetti(true)

      try {
        const audio = new Audio("/success_bell-6776.mp3")
        audio.volume = 0.7

        audio.addEventListener("error", (e) => {
          console.log("Success audio file not available, continuing without sound")
        })

        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Success audio playback failed, continuing silently:", error)
          })
        }
      } catch (error) {
        console.log("Success audio not supported, continuing without sound:", error)
      }
    }
  }, [isComplete, mounted])

  // Hide confetti after 5 seconds
  useEffect(() => {
    if (mounted && isComplete) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isComplete, mounted])

  const handleAnswer = (value: string, points: number) => {
    if (!mounted) return

    playPointSound()
    setLastPointsGained(points)
    setShowPointsAnimation(true)

    const newTotalPoints = quizData.totalPoints + points

    if (currentStep === 0) {
      setQuizData((prev) => ({ ...prev, emotionalPain: value, totalPoints: newTotalPoints }))
    } else if (currentStep === 1) {
      setQuizData((prev) => ({ ...prev, emotionalIntensity: value, totalPoints: newTotalPoints }))
    } else if (currentStep === 2) {
      setQuizData((prev) => ({ ...prev, deepDesire: value, totalPoints: newTotalPoints }))
    } else if (currentStep === 3) {
      setQuizData((prev) => ({ ...prev, spiritualExperience: value, totalPoints: newTotalPoints }))
    } else if (currentStep === 4) {
      setQuizData((prev) => ({ ...prev, spiritualConnection: value, totalPoints: newTotalPoints }))
    }

    setTimeout(() => {
      setShowPointsAnimation(false)
    }, 2000)

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        setIsComplete(true)
      }
    }, 1200)
  }

  const getQualificationLevel = (points: number) => {
    if (points >= 140) return { level: "MAÎTRE SPIRITUEL", color: "text-yellow-400", icon: "👑" }
    if (points >= 120) return { level: "GUERRIER DE LA FOI", color: "text-purple-400", icon: "⚔️" }
    if (points >= 100) return { level: "CHERCHEUR DÉVOUÉ", color: "text-blue-400", icon: "🔍" }
    if (points >= 80) return { level: "ÂME ÉVEILLÉE", color: "text-green-400", icon: "🌟" }
    return { level: "DÉBUTANT COURAGEUX", color: "text-orange-400", icon: "🌱" }
  }

  const handleRevealSecret = () => {
    if (!mounted) return

    if (typeof window !== "undefined") {
      localStorage.setItem("quizPoints", quizData.totalPoints.toString())
    }
    router.push("/video")
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (isComplete) {
    const qualification = getQualificationLevel(quizData.totalPoints)

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ["#fbbf24", "#f59e0b", "#d97706", "#92400e", "#451a03"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
                initial={{ y: -10, rotate: 0 }}
                animate={{
                  y: typeof window !== "undefined" ? window.innerHeight + 10 : 800,
                  rotate: 360,
                  x: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                }}
                initial={{ y: -10, rotate: 0, opacity: 1 }}
                animate={{
                  y: typeof window !== "undefined" ? window.innerHeight + 10 : 800,
                  rotate: 720,
                  opacity: 0,
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  delay: Math.random() * 1.5,
                  ease: "easeOut",
                }}
              >
                ⭐
              </motion.div>
            ))}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full"
        >
          <Card className="bg-black/40 backdrop-blur-lg border-yellow-500/30">
            <CardContent className="p-4 sm:p-8 text-center">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                  className="mb-6"
                >
                  <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 mx-auto" />
                </motion.div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{questions.fr.vsl.title}</h1>

                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-lg p-4 sm:p-6 mb-6">
                  <div className="text-4xl sm:text-6xl font-bold text-yellow-400 mb-2">{animatedPoints}</div>
                  <div className="text-lg sm:text-xl text-yellow-200">POINTS OBTENUS</div>
                  <div className={`text-base sm:text-lg font-semibold mt-2 ${qualification.color}`}>
                    {qualification.icon} {qualification.level}
                  </div>
                </div>

                <p className="text-lg sm:text-xl text-purple-200 mb-4 sm:mb-6">{questions.fr.vsl.subtitle}</p>
                <p className="text-gray-300 mb-6 sm:mb-8">{questions.fr.vsl.description}</p>

                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                  <Image
                    src="/app-guerison-logo.webp"
                    alt="App Guérison Logo"
                    width={120}
                    height={120}
                    className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4"
                  />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                    📜 Le Secret Est En Train d'Être Débloqué...
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base">Immunité Cellulaire Renforcée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base">
                        Guérison Physique et Émotionnelle Débloquée
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base">
                        Régénération Naturelle Initiée dans Vos Organes
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                      <span className="text-white text-sm:text-base">Longévité Biblique Éveillée dans Votre Corps</span>
                    </div>
                  </div>
                </div>

                <div className="aspect-video bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg mb-6 flex items-center justify-center border-2 border-yellow-500/30">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Star className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-yellow-200 text-lg sm:text-xl font-semibold">Vidéo Secrète Personnalisée</p>
                    <p className="text-yellow-300/70 text-sm sm:text-base">
                      Basée sur vos {animatedPoints} points obtenus
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2">🔒 Débloquée uniquement pour vous</p>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={handleRevealSecret}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-4 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl shadow-2xl w-full sm:w-auto border-2 border-yellow-400 shadow-inner shadow-yellow-500/50 animate-golden-pulse hover:animate-none"
                  >
                    <span className="text-center leading-tight">
                      📜 RÉVÉLER LA PRIÈRE ET LE
                      <br className="sm:hidden" /> SECRET BIBLIQUE MAINTENANT
                    </span>
                  </Button>
                </motion.div>

                <p className="text-xs text-gray-500 mt-4">
                  ⏰ Ce secret a été caché pendant des siècles - ne manquez pas cette opportunité unique
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Points Counter - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50"
        >
          <Card className="bg-black/60 backdrop-blur-lg border-yellow-500/30">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">{animatedPoints}</div>
                  <div className="text-xs text-yellow-200">POINTS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Points Animation */}
        <AnimatePresence>
          {showPointsAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -100 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-xl shadow-2xl">
                +{lastPointsGained} POINTS ! 🎉
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        {currentStep >= 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-purple-300">Progrès du Défi</span>
              <span className="text-xs sm:text-sm text-purple-300">
                {currentStep + 1} sur {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2 sm:h-3 bg-purple-900/50" />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === -1 ? (
            // Welcome Screen
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-500/30">
                <CardContent className="p-6 sm:p-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                    <Image
                      src="/app-guerison-logo.webp"
                      alt="App Guérison Logo"
                      width={160}
                      height={160}
                      className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6"
                    />
                  </motion.div>

                  <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
                    {questions.fr.welcome.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-yellow-200 mb-4 sm:mb-6">{questions.fr.welcome.subtitle}</p>
                  <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    {questions.fr.welcome.description}
                  </p>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-3 sm:p-4 mb-5 sm:mb-6 border border-yellow-500/30">
                    <p className="text-yellow-200 font-semibold text-sm sm:text-base">
                      🔓 OBJECTIF : Obtenir au moins 100 points de lumière
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-300/70">
                      Plus vous serez honnête, plus forte sera l'énergie de guérison qui vous attend.
                    </p>
                  </div>

                  <Button
                    onClick={() => setCurrentStep(0)}
                    size="lg"
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-black font-bold w-full sm:w-auto border-2 border-yellow-400 shadow-inner shadow-yellow-500/50 animate-golden-pulse hover:animate-none"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {questions.fr.welcome.button}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            // Quiz Steps
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      {questions.fr.steps[currentStep].title}
                    </h2>
                    <p className="text-sm sm:text-base text-purple-200">{questions.fr.steps[currentStep].subtitle}</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {questions.fr.steps[currentStep].options?.map((option, index) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full p-4 sm:p-6 h-auto text-left justify-start hover:bg-purple-600/20 border-2 border-yellow-400 group hover:text-white shadow-inner shadow-yellow-500/30 animate-golden-pulse hover:animate-none"
                          onClick={() => handleAnswer(option.value, option.points)}
                        >
                          <div className="flex items-start w-full">
                            <span className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">{option.icon}</span>
                            <span className="text-black group-hover:text-white text-sm sm:text-base break-words leading-tight flex-1 whitespace-normal word-wrap">
                              {option.label}
                            </span>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Biblical Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 text-yellow-400/30"
        >
          <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-20 text-purple-400/30"
        >
          <Image
            src="/app-guerison-logo.webp"
            alt="App Guérison Logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-32 left-20 text-yellow-400/30"
        >
          <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.div>
      </div>
    </div>
  )
}
