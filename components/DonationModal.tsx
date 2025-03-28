"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DollarSign, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  donationType: "one-time" | "monthly" | "equipment"
}

export default function DonationModal({ isOpen, onClose, donationType }: DonationModalProps) {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()

      toast({
        title: "Donation initiated",
        description: `Thank you for your ${donationType === "monthly" ? "monthly" : "one-time"} donation of $${amount}!`,
        variant: "default",
      })

      // Redirect to donation page for complete form
      router.push("/donate")
    }, 1500)
  }

  const getTitle = () => {
    switch (donationType) {
      case "one-time":
        return "Make a One-time Donation"
      case "monthly":
        return "Become a Monthly Partner"
      case "equipment":
        return "Donate Equipment"
    }
  }

  const getDescription = () => {
    switch (donationType) {
      case "one-time":
        return "Your one-time gift helps us provide free media services to churches in need."
      case "monthly":
        return "Your monthly support provides sustainable funding for our ongoing ministry."
      case "equipment":
        return "Please provide details about the equipment you'd like to donate."
    }
  }

  if (donationType === "equipment") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="equipment" className="text-sm font-medium">
                  Equipment Description
                </label>
                <Input
                  id="equipment"
                  placeholder="Describe the equipment you'd like to donate"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact" className="text-sm font-medium">
                  Contact Information
                </label>
                <Input id="contact" placeholder="Your email or phone number" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAmount("25")}
                className={amount === "25" ? "bg-primary text-primary-foreground" : ""}
              >
                $25
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAmount("50")}
                className={amount === "50" ? "bg-primary text-primary-foreground" : ""}
              >
                $50
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAmount("100")}
                className={amount === "100" ? "bg-primary text-primary-foreground" : ""}
              >
                $100
              </Button>
            </div>
            <div className="grid gap-2">
              <label htmlFor="custom-amount" className="text-sm font-medium">
                Custom Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="custom-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="pl-9"
                  min="1"
                  required
                />
              </div>
            </div>
            {donationType === "monthly" && (
              <div className="flex items-center space-x-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">You can cancel your monthly donation at any time</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !amount}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing
                </span>
              ) : (
                "Donate Now"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

