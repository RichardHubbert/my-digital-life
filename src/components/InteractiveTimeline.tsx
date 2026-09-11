"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Newspaper, Car, Cloud, Wifi, Activity, MessageSquare, MapPin, Dumbbell, Train, Navigation, RefreshCw, Sparkles } from 'lucide-react'

interface Category {
  name: string
  scored: boolean
  icon: JSX.Element
}

interface TimelinePosition {
  label: string
  year: string
  description: string
  categories: Category[]
}

const TimelineCard = ({ 
  position, 
  onClose, 
  onCategoryClick,
  onResetCard
}: { 
  position: TimelinePosition; 
  onClose: () => void; 
  onCategoryClick: (categoryIndex: number) => void;
  onResetCard: () => void;
}) => {
  const totalScore = position.categories.filter(cat => cat.scored).length
  const isComplete = totalScore === position.categories.length
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstCategoryRef = useRef<HTMLButtonElement>(null)

  // Focus management: focus close button when modal opens
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Trap focus within modal
  useEffect(() => {
    const modal = document.querySelector('[role="dialog"]')
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8 w-full max-w-xl md:max-w-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl -z-10" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {position.label}
            </h2>
            <p className="text-base sm:text-lg text-gray-400 flex items-center gap-2">
              <span className="text-blue-400">⏰</span>
              {position.year}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">{position.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold">Categories</h3>
          {isComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-green-400 font-semibold"
            >
              <Sparkles size={20} className="animate-pulse" />
              <span className="text-sm sm:text-base">Complete!</span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {position.categories.map((category, index) => (
            <motion.button
              key={index}
              ref={index === 0 ? firstCategoryRef : null}
              whileHover={{ scale: category.scored ? 1 : 1.02 }}
              whileTap={{ scale: category.scored ? 1 : 0.98 }}
              className={`flex justify-between items-center p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                category.scored 
                  ? 'bg-gradient-to-r from-green-900 to-green-800 text-green-100 shadow-lg shadow-green-900/50' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 hover:shadow-md border border-gray-700 hover:border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              onClick={() => onCategoryClick(index)}
              disabled={category.scored}
              aria-label={`${category.name}, ${category.scored ? 'completed' : 'not completed'}`}
              aria-pressed={category.scored}
            >
              <span className="flex items-center gap-3">
                <span className="text-gray-400">{category.icon}</span>
                <span className="text-sm sm:text-base font-medium">{category.name}</span>
              </span>
              {category.scored && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <Check size={20} className="text-green-300" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(totalScore / position.categories.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-lg sm:text-xl font-bold flex items-center gap-2">
            Score: 
            <motion.span 
              key={totalScore}
              initial={{ scale: 1.2, color: '#60A5FA' }}
              animate={{ scale: 1, color: '#60A5FA' }}
              className="text-blue-400"
            >
              {totalScore} / {position.categories.length}
            </motion.span>
          </p>
          <button
            onClick={onResetCard}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Reset all categories in this card"
          >
            <RefreshCw size={16} />
            <span className="text-sm sm:text-base font-medium">Reset Card</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ResultsSummary = ({ positions, onResetAllScores }: { positions: TimelinePosition[], onResetAllScores: () => void }) => {
  const totalScore = positions.reduce((sum, position) => 
    sum + position.categories.filter(cat => cat.scored).length, 0
  )
  const maxScore = positions.length * 10
  const percentage = (totalScore / maxScore) * 100
  const isFullyComplete = totalScore === maxScore

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 shadow-2xl rounded-2xl p-4 sm:p-6 mb-6 border border-gray-700 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-1">
            Digital Life Progress
          </h2>
          {isFullyComplete && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm text-green-400 flex items-center gap-2"
            >
              <Sparkles size={16} />
              Amazing! You&apos;ve completed everything!
            </motion.p>
          )}
        </div>
        <button
          onClick={onResetAllScores}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm sm:text-base"
          aria-label="Reset all scores"
        >
          <RefreshCw size={16} />
          <span className="font-medium">Reset All</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-sm sm:text-base font-semibold text-gray-300">Total Score:</span>
        <motion.span
          key={totalScore}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {totalScore} / {maxScore}
        </motion.span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
        </motion.div>
      </div>
      
      <div className="text-right">
        <span className="text-xs sm:text-sm text-gray-400 font-medium">
          {percentage.toFixed(1)}% Complete
        </span>
      </div>
    </motion.div>
  )
}

export default function Component() {
  const initialPositions: TimelinePosition[] = [
    {
      label: 'Early Morning',
      year: '6:00 AM',
      description: 'Start your day with essential digital activities.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
      label: 'Morning',
      year: '7:00 AM',
      description: 'Continue your morning digital routine.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
      label: 'Mid Morning',
      year: '10:00 AM',
      description: 'Navigate your digital world in the mid-morning.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
      label: 'Midday',
      year: '12:00 PM',
      description: 'Stay connected and productive throughout your day.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
      label: 'Early Afternoon',
      year: '2:00 PM',
      description: 'Manage your digital activities in the early afternoon.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
      label: 'Mid Afternoon',
      year: '3:00 PM',
      description: 'Continue your digital journey through the afternoon.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
        label: 'Late Afternoon',
        year: '4:00 PM',
        description: 'Transition into your evening digital routine.',
        categories: [
          { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
          { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
          { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
          { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
          { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
          { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
          { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
          { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
          { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
          { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
        ],
      },
    {
      label: 'Early Evening',
      year: '6:00 PM',
      description: 'Transition into your evening digital routine.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
      label: 'Late Evening',
      year: '9:00 PM',
      description: 'Wind down your day with evening digital activities.',
      categories: [
        { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
        { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
        { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
        { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
        { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
        { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
        { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
        { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
        { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
        { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
      ],
    },
    {
        label: 'Bedtime',
        year: '11:00 PM',
        description: 'Complete your digital day before rest.',
        categories: [
          { name: 'News Apps', scored: false, icon: <Newspaper size={16} /> },
          { name: 'Journey to Work', scored: false, icon: <Car size={16} /> },
          { name: 'Check the Weather', scored: false, icon: <Cloud size={16} /> },
          { name: 'Connect to WiFi', scored: false, icon: <Wifi size={16} /> },
          { name: 'Fitness Apps', scored: false, icon: <Activity size={16} /> },
          { name: 'Messaging Apps', scored: false, icon: <MessageSquare size={16} /> },
          { name: 'Location Tracking', scored: false, icon: <MapPin size={16} /> },
          { name: 'At the Gym', scored: false, icon: <Dumbbell size={16} /> },
          { name: 'Public Transport', scored: false, icon: <Train size={16} /> },
          { name: 'Satnav', scored: false, icon: <Navigation size={16} /> },
        ],
      },
  ]

  // Load from localStorage on mount
  const [positions, setPositions] = useState<TimelinePosition[]>(() => {
    if (typeof window === 'undefined') return initialPositions
    
    try {
      const saved = localStorage.getItem('digitalLifeProgress')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Restore icons (they don't serialize well)
        return parsed.map((pos: TimelinePosition, posIndex: number) => ({
          ...pos,
          categories: pos.categories.map((cat: Category, catIndex: number) => ({
            ...cat,
            icon: initialPositions[posIndex]?.categories[catIndex]?.icon || <Activity size={16} />
          }))
        }))
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error)
    }
    
    return initialPositions
  })

  const [activePosition, setActivePosition] = useState<number | null>(null)
  const previousActivePosition = useRef<HTMLElement | null>(null)

  // Save to localStorage whenever positions change
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      // Don't serialize icons, just the scored state
      const toSave = positions.map(pos => ({
        ...pos,
        categories: pos.categories.map(cat => ({
          name: cat.name,
          scored: cat.scored
        }))
      }))
      localStorage.setItem('digitalLifeProgress', JSON.stringify(toSave))
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error)
    }
  }, [positions])

  const handlePositionClick = (index: number) => {
    previousActivePosition.current = document.activeElement as HTMLElement
    setActivePosition(index)
  }

  const handleCloseCard = () => {
    setActivePosition(null)
    // Restore focus to the timeline marker that opened the modal
    setTimeout(() => {
      previousActivePosition.current?.focus()
    }, 100)
  }

  const handleCategoryClick = (categoryIndex: number) => {
    if (activePosition === null) return

    setPositions(prevPositions => {
      const newPositions = [...prevPositions]
      newPositions[activePosition].categories[categoryIndex].scored = true
      return newPositions
    })
  }

  const handleResetAllScores = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setPositions(prevPositions => 
        prevPositions.map(position => ({
          ...position,
          categories: position.categories.map(category => ({ ...category, scored: false }))
        }))
      )
    }
  }

  const handleResetCard = () => {
    if (activePosition === null) return

    setPositions(prevPositions => {
      const newPositions = [...prevPositions]
      newPositions[activePosition].categories = newPositions[activePosition].categories.map(
        category => ({ ...category, scored: false })
      )
      return newPositions
    })
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col">
      <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <ResultsSummary positions={positions} onResetAllScores={handleResetAllScores} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center mb-6"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/myDigitalLife_002-FLgvhgqgQLGf4kiTeGoFrYIsOSgFOL.png"
            alt="Isometric cityscape illustration representing digital life"
            className="max-w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[600px] object-contain rounded-lg"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 sm:p-6 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent"
        role="region"
        aria-label="Daily timeline navigation"
      >
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto pb-4">
            <div className="relative min-w-[800px] mb-6">
              {/* Timeline bar */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 rounded-full"
                   style={{ 
                     width: `${(positions.reduce((sum, pos) => sum + pos.categories.filter(c => c.scored).length, 0) / (positions.length * 10)) * 100}%`
                   }} 
              />

              {/* Timeline positions */}
              <div className="relative flex justify-between w-full">
                {positions.map((position, index) => {
                  const score = position.categories.filter(cat => cat.scored).length
                  const isComplete = score === position.categories.length
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex flex-col items-center cursor-pointer group relative"
                      onClick={() => handlePositionClick(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handlePositionClick(index)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${position.label}, ${position.year}, ${score} of ${position.categories.length} categories completed`}
                    >
                      {/* Marker */}
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 mb-3 relative z-10 ${
                          index === activePosition 
                            ? 'bg-blue-500 ring-4 ring-blue-400 ring-opacity-50' 
                            : isComplete
                            ? 'bg-green-500 group-hover:bg-green-400 group-hover:ring-4 group-hover:ring-green-400 group-hover:ring-opacity-50'
                            : score > 0
                            ? 'bg-yellow-500 group-hover:bg-yellow-400 group-hover:ring-4 group-hover:ring-yellow-400 group-hover:ring-opacity-50'
                            : 'bg-gray-600 group-hover:bg-blue-400 group-hover:ring-4 group-hover:ring-blue-400 group-hover:ring-opacity-50'
                        } focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500`}
                      >
                        {isComplete && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                          >
                            <Sparkles size={16} className="text-green-400" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Label */}
                      <div className="text-center">
                        <div className="text-xs font-semibold group-hover:text-blue-400 transition-colors duration-300 mb-1">
                          {position.label}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors duration-300 mb-1">
                          {position.year}
                        </div>
                        <div className={`text-xs font-bold mt-1 px-2 py-1 rounded-full ${
                          isComplete 
                            ? 'bg-green-900 text-green-300'
                            : score > 0
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {score}/10
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card Modal */}
      <AnimatePresence>
        {activePosition !== null && (
          <TimelineCard 
            position={positions[activePosition]}
            onClose={handleCloseCard}
            onCategoryClick={handleCategoryClick}
            onResetCard={handleResetCard}
          />
        )}
      </AnimatePresence>
    </div>
  )
}