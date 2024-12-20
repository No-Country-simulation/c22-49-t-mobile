import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Court } from '@/types/navigationTypes'

type CourtContextType = {
  selectedCourt: Court | null
  setSelectedCourt: (court: Court | null) => void
}

const CourtContext = createContext<CourtContextType | undefined>(undefined)

export const CourtProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null)

  return (
    <CourtContext.Provider value={{ selectedCourt, setSelectedCourt }}>
      {children}
    </CourtContext.Provider>
  )
}

export const useCourt = () => {
  const context = useContext(CourtContext)

  if (!context) {
    throw new Error('useCourt must be used within a CourtProvider')
  }

  return context
}
