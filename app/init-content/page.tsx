"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InitContentPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function initContent() {
      try {
        const response = await fetch("/api/init-content")
        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setMessage(data.message)
        } else {
          setStatus("error")
          setMessage(data.error || "Failed to initialize content")
        }
      } catch (error) {
        setStatus("error")
        setMessage(String(error))
      }
    }

    initContent()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Content Initialization</h1>

      {status === "loading" && (
        <div className="p-4 bg-blue-50 text-blue-700 rounded-md">Initializing content.json file...</div>
      )}

      {status === "success" && <div className="p-4 bg-green-50 text-green-700 rounded-md mb-4">{message}</div>}

      {status === "error" && <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">Error: {message}</div>}

      <div className="mt-6">
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}

