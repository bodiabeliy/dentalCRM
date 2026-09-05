import { useState, useEffect } from 'react'
import { patientsApi } from '../../../entities/patient'
import type { Patient } from '../../../entities/patient'

export function usePatientDetails(patientId: string) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true)
        const patientData = await patientsApi.getPatient(patientId)
        setPatient(patientData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch patient')
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchPatient()
    }
  }, [patientId])

  const updatePatient = async (data: Partial<Patient>) => {
    if (!patient) return

    try {
      const updatedPatient = await patientsApi.updatePatient({
        id: patient.id,
        ...data,
      })
      setPatient(updatedPatient)
      return updatedPatient
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update patient')
      throw err
    }
  }

  return {
    patient,
    loading,
    error,
    updatePatient,
  }
}
