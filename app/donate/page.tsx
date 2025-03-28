"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, DollarSign, Calendar, Gift, CreditCard, Check } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function DonatePage() {
  const [amount, setAmount] = useState("")
  const [donationType, setDonationType] = useState("one-time")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAmountClick = (value: string) => {
    setAmount(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Donation successful!",
        description: `Thank you for your ${donationType === "monthly" ? "monthly" : "one-time"} donation of $${amount}.`,
        variant: "default",
      })
      // Reset form
      setAmount("")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-white/30"></div>
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-white/30"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-4">Support Our Ministry</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Your generous donations allow us to continue providing free media services to churches in need. Every
              contribution makes a difference in our ability to serve and expand our reach.
            </p>
          </div>
        </div>

        {/* Donation Options */}
        <div className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ways to Give</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the donation option that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-secondary rounded-lg p-8 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">One-time Gift</h3>
                <p className="text-muted-foreground mb-6">
                  Support our ministry with a one-time donation of any amount.
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setDonationType("one-time")
                    document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <DollarSign className="h-4 w-4 mr-2" /> Donate Now
                </Button>
              </div>

              <div className="bg-secondary rounded-lg p-8 text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Monthly Partner</h3>
                <p className="text-muted-foreground mb-6">Become a monthly partner to provide sustainable support.</p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setDonationType("monthly")
                    document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <DollarSign className="h-4 w-4 mr-2" /> Become a Partner
                </Button>
              </div>

              <div className="bg-secondary rounded-lg p-8 text-center">
                <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Equipment Donation</h3>
                <p className="text-muted-foreground mb-6">Donate cameras, audio equipment, or other media gear.</p>
                <Link href="/#contact">
                  <Button className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" /> Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="py-16 bg-muted" id="donation-form">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-background rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Make a {donationType === "monthly" ? "Monthly" : "One-time"} Donation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">Select Amount</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className={amount === "25" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleAmountClick("25")}
                    >
                      $25
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={amount === "50" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleAmountClick("50")}
                    >
                      $50
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={amount === "100" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleAmountClick("100")}
                    >
                      $100
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={amount === "250" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleAmountClick("250")}
                    >
                      $250
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={amount === "500" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleAmountClick("500")}
                    >
                      $500
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={amount === "1000" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleAmountClick("1000")}
                    >
                      $1000
                    </Button>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-muted-foreground mb-1">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-muted-foreground sm:text-sm">$</span>
                      </div>
                      <Input
                        type="number"
                        name="custom-amount"
                        id="custom-amount"
                        className="pl-7 block w-full"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">Donation Frequency</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className={donationType === "one-time" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setDonationType("one-time")}
                    >
                      One-time
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={donationType === "monthly" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setDonationType("monthly")}
                    >
                      Monthly
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">Your Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-muted-foreground mb-1">
                          First Name
                        </label>
                        <Input id="first-name" name="first-name" required />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-muted-foreground mb-1">
                          Last Name
                        </label>
                        <Input id="last-name" name="last-name" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                        Email Address
                      </label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">Payment Information</h3>
                  <div className="p-4 border border-border rounded-md bg-secondary/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Secure Payment</span>
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Payment information would be collected securely here. For demonstration purposes, this section is
                      simplified.
                    </p>
                  </div>
                </div>

                <Button className="w-full" size="lg" type="submit" disabled={isSubmitting || !amount}>
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
                      Processing...
                    </span>
                  ) : (
                    "Complete Donation"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Your donation is tax-deductible
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Your Impact</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                See how your donations help us serve churches
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Churches served annually</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <p className="text-muted-foreground">Media projects completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Of donations go to our mission</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/#contact">
                <Button variant="outline">Questions about donating? Contact us</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

