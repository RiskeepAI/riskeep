import { Suspense } from 'react'
import RegisterPageContent from '@/components/auth/RegisterPageContent'

export const metadata = { title: 'Crear cuenta — Riskeep' }

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterPageContent />
    </Suspense>
  )
}
