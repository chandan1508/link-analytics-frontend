


import React from 'react'
import { FaMousePointer, FaUser, FaPercentage } from 'react-icons/fa'

const StatsCards = ({ links = [] }) => {
  // Calculate total clicks across all links
  const totalClicks = links.reduce((sum, link) => sum + (link.totalClicks || 0), 0)
  
  // Calculate unique clicks across all links
  const uniqueClicks = links.reduce((sum, link) => sum + (link.uniqueClicks || 0), 0)
  
  // Calculate CTR (assuming you have visitor data, otherwise you can remove this)
  const ctr = totalClicks > 0 ? ((uniqueClicks / totalClicks) * 100).toFixed(1) : 0

  const stats = [
    {
      title: 'Total Clicks',
      value: totalClicks,
      icon: <FaMousePointer className="text-blue-500 text-xl" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Unique Clicks',
      value: uniqueClicks,
      icon: <FaUser className="text-green-500 text-xl" />,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Click Rate',
      value: `${ctr}%`,
      icon: <FaPercentage className="text-purple-500 text-xl" />,
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} p-4 rounded-lg shadow-sm`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-2 rounded-full bg-white shadow-xs`}>
              {stat.icon}
            </div>
          </div>
          {index === 2 && ( // Only show CTR help text on the last card
            <p className="text-xs text-gray-500 mt-2">
              Percentage of unique clicks vs total clicks
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default StatsCards