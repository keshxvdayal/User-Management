import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import Header from "@/components/header"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-6">{children}</main>
      </div>
    </AuthProvider>
  )
}

