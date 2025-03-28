"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { LogOut, Users } from "lucide-react"

export default function Header() {
  const { logout } = useAuth()

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/users" className="font-bold text-xl">
          User Management
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/users">
            <Button variant="ghost" size="sm" className="gap-2">
              <Users size={16} />
              Users
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

