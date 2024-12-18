'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface PredictionResult {
  id: string
  timestamp: Date
  prediction: boolean
  metrics: {
    pregnancies: number
    glucose: number
    bloodPressure: number
    skinThickness: number
    insulin: number
    bmi: number
    dpf: number
    age: number
  }
}

interface PredictionHistoryContextType {
  history: PredictionResult[]
  addPrediction: (result: Omit<PredictionResult, 'id' | 'timestamp'>) => void
}

const PredictionHistoryContext = createContext<PredictionHistoryContextType | undefined>(undefined)

export function PredictionHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<PredictionResult[]>([])

  const addPrediction = (result: Omit<PredictionResult, 'id' | 'timestamp'>) => {
    const newPrediction: PredictionResult = {
      ...result,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setHistory(prevHistory => [newPrediction, ...prevHistory])
  }

  return (
    <PredictionHistoryContext.Provider value={{ history, addPrediction }}>
      {children}
    </PredictionHistoryContext.Provider>
  )
}

export function usePredictionHistory() {
  const context = useContext(PredictionHistoryContext)
  if (context === undefined) {
    throw new Error('usePredictionHistory must be used within a PredictionHistoryProvider')
  }
  return context
}

