"use client"

import { useState } from 'react'
import { X, Check, Newspaper, Radio, Car, Cloud, Wifi, Activity, MessageSquare, MapPin, Dumbbell, Train, Navigation, RefreshCw } from 'lucide-react'

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl p-6 w-full max-w-xl animate-in fade-in duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">{position.label}</h2>
            <p className="text-lg text-gray-400">Time: {position.year}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <p className="text-base text-gray-300 mb-4">{position.description}</p>
        <h3 className="text-xl font-semibold mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {position.categories.map((category, index) => (
            <button
              key={index}
              className={`flex justify-between items-center p-2 rounded transition-colors duration-300 ${
                category.scored 
                  ? 'bg-green-900 text-green-100' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
              onClick={() => onCategoryClick(index)}
              disabled={category.scored}
            >
              <span className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </span>
              {category.scored && <Check size={20} className="text-green-400" />}
            </button>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
          <p className="text-xl font-bold">Total Score: <span className="text-blue-400">{totalScore} / 10</span></p>
          <button
            onClick={onResetCard}
            className="flex items-center px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors duration-300"
          >
            <RefreshCw size={16} className="mr-2" />
            Reset Card
          </button>
        </div>
      </div>
    </div>
  )
}

const ResultsSummary = ({ positions, onResetAllScores }: { positions: TimelinePosition[], onResetAllScores: () => void }) => {
  const totalScore = positions.reduce((sum, position) => 
    sum + position.categories.filter(cat => cat.scored).length, 0
  )
  const maxScore = positions.length * 10

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-100">Digital Life Progress Summary</h2>
        <button
          onClick={onResetAllScores}
          className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
        >
          <RefreshCw size={16} className="mr-2" />
          Reset All Scores
        </button>
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-base font-semibold text-gray-300">Total Score:</span>
        <span className="text-xl font-bold text-blue-400">{totalScore} / {maxScore}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${(totalScore / maxScore) * 100}%` }}
        ></div>
      </div>
{/*       <div className="grid grid-cols-4 gap-2">
        {positions.map((position, index) => (
          <div key={index} className="bg-gray-700 rounded p-2 text-center">
            <div className="font-semibold text-xs mb-1 text-gray-300">{position.label}</div>
            <div className="text-blue-400 font-bold text-sm">
              {position.categories.filter(cat => cat.scored).length} / 10
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default function Component() {
  const [positions, setPositions] = useState<TimelinePosition[]>([
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
  ])

  const [activePosition, setActivePosition] = useState<number | null>(null)

  const handlePositionClick = (index: number) => {
    setActivePosition(index)
  }

  const handleCloseCard = () => {
    setActivePosition(null)
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
    setPositions(prevPositions => 
      prevPositions.map(position => ({
        ...position,
        categories: position.categories.map(category => ({ ...category, scored: false }))
      }))
    )
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
    <div className="w-[1440px] h-[900px] mx-auto bg-black text-white flex flex-col justify-between">
      <div className="flex-grow p-4">
        <ResultsSummary positions={positions} onResetAllScores={handleResetAllScores} />
        <div className="flex justify-center items-center mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/myDigitalLife_002-FLgvhgqgQLGf4kiTeGoFrYIsOSgFOL.png"
            alt="Isometric cityscape illustration"
            className="max-w-full max-h-[600px] object-contain"
          />
        </div>
      </div>
      <div className="p-4 bg-gray-900 rounded-t-lg shadow-lg">
        <div className="overflow-x-auto">
          <div className="relative mb-4">
            {/* Timeline bar */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2" />

            {/* Timeline positions */}
            <div className="relative flex justify-between w-full">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handlePositionClick(index)}
                >
                  {/* Marker */}
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === activePosition ? 'bg-blue-500' : 'bg-gray-600 group-hover:bg-blue-400'
                    } mb-2 transition-colors duration-300`}
                  />
                  {/* Label */}
                  <div className="text-center">
                    <div className="text-xs font-semibold group-hover:text-blue-400 transition-colors duration-300">{position.label}</div>
                    <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors duration-300">{position.year}</div>
                    <div className="text-xs font-medium text-blue-400 mt-1">
                      Score: {position.categories.filter(cat => cat.scored).length}/10
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card */}
      {activePosition !== null && (
        <TimelineCard 
          position={positions[activePosition]}
          onClose={handleCloseCard}
          onCategoryClick={handleCategoryClick}
          onResetCard={handleResetCard}
        />
      )}
    </div>
  )
}