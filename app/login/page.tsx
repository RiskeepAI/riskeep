import { Suspense } from 'react'
import LoginPageContent from '@/components/auth/LoginPageContent'

export const metadata = { title: 'Iniciar sesión — Riskeep' }

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  )
}
