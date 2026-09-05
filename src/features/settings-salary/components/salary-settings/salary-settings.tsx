import { SalaryPayments } from '../payments'
import { useEffect } from 'react'

export function SalarySettings({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  useEffect(() => {
    setSubtitle('ЗП, бонуси')
  }, [setSubtitle])

  return <SalaryPayments />
}
