import { useEffect, useState } from 'react'

type ValidationErrors<T> = { [K in keyof T]: string }

export function useFormValidation<T>(initialData: T, validate: (data: T) => ValidationErrors<T>) {
  const [formData, setFormData] = useState<T>(initialData)
  const [errors, setErrors] = useState<ValidationErrors<T>>(validate(initialData))
  const [isReadyForSubmit, setIsReadyForSubmit] = useState(false)

  const handleFieldChange = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    const newErrors = validate(formData)
    setErrors(newErrors)
    setIsReadyForSubmit(Object.values(newErrors).every((err) => err === ''))
  }, [formData])

  return {
    handleFieldChange,
    formData,
    setFormData,
    errors,
    setErrors,
    isReadyForSubmit,
    setIsReadyForSubmit,
  }
}
