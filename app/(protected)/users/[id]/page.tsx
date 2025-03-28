"use client"

import type React from "react"
import { use } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Save } from "lucide-react"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: userId } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch user")
        }
        const { data } = await response.json()
        // Check if there's an updated version in localStorage
        const storedUpdates = localStorage.getItem("updatedUsers")
        if (storedUpdates) {
          const updatedUsers = JSON.parse(storedUpdates)
          if (updatedUsers[userId]) {
            // Merge updated fields
            Object.assign(data, updatedUsers[userId])
          }
        }
        setUser(data)
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user details. Please try again.",
          variant: "destructive",
        })
        router.push("/users")
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [userId, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error("Failed to update user")
      }
      console.log("User updated successfully!")
      // Save the updated data to localStorage so that the dashboard can pick up the changes
      const storedUpdates = localStorage.getItem("updatedUsers")
      const updatedUsers = storedUpdates ? JSON.parse(storedUpdates) : {}
      updatedUsers[userId] = { ...formData }
      localStorage.setItem("updatedUsers", JSON.stringify(updatedUsers))
      toast({
        title: "Success",
        description: "User updated successfully.",
      })
      // Navigate back to the dashboard so it re-fetches the latest data (merged with localStorage changes)
      router.push("/users")
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center">
        <p>User not found</p>
        <Button onClick={() => router.push("/users")} className="mt-4">
          Back to Users
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => router.push("/users")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit User</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="h-32 w-32 rounded-full object-cover border-4 border-background"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
