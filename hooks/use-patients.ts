"use client"

import { useState, useEffect } from "react"
import type { Patient } from "@/lib/types"
import { mockPatients } from "@/lib/mock-data"

interface UsePatientsReturn {
  patients: Patient[]
  loading: boolean
  error: string | null
  addPatient: (patient: Omit<Patient, "id">) => void
  updatePatient: (id: number, updates: Partial<Patient>) => void
  deletePatient: (id: number) => void
}

export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate API call with loading state
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate potential error (uncomment to test error state)
        // if (Math.random() > 0.8) {
        //   throw new Error('Failed to fetch patients')
        // }

        setPatients(mockPatients)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  const addPatient = (newPatientData: Omit<Patient, "id">) => {
    const newPatient: Patient = {
      ...newPatientData,
      id: Math.max(...patients.map((p) => p.id)) + 1,
    }
    setPatients((prev) => [newPatient, ...prev])
  }

  const updatePatient = (id: number, updates: Partial<Patient>) => {
    setPatients((prev) => prev.map((patient) => (patient.id === id ? { ...patient, ...updates } : patient)))
  }

  const deletePatient = (id: number) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id))
  }

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
  }
}
