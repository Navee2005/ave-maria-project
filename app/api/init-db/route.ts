import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Initial content data for your website
const initialContent = [
  {
    section: "hero",
    content: {
      heading: "Simplify Your Workflow",
      subheading: "with StreamLine",
      description:
        "Boost productivity and streamline your business processes with our powerful SaaS platform. Designed for teams of all sizes.",
      backgroundImage: "/placeholder.svg?height=1080&width=1920",
      primaryButtonText: "Get started",
      secondaryButtonText: "Learn more",
    },
  },
  {
    section: "features",
    content: {
      heading: "Features",
      subheading: "Everything you need to streamline your workflow",
      description:
        "StreamLine offers a comprehensive set of features designed to boost your productivity and simplify your business processes.",
      features: [
        {
          name: "Lightning Fast",
          description: "Our platform is optimized for speed, ensuring quick load times and responsive interactions.",
          icon: "Zap",
        },
        {
          name: "Intuitive Interface",
          description: "A user-friendly interface that's easy to navigate, making your work more efficient.",
          icon: "Layers",
        },
        {
          name: "Team Collaboration",
          description: "Seamlessly work together with your team members in real-time.",
          icon: "Users",
        },
        {
          name: "Advanced Analytics",
          description: "Gain valuable insights with our powerful analytics and reporting tools.",
          icon: "TrendingUp",
        },
      ],
    },
  },
  {
    section: "testimonials",
    content: {
      heading: "Trusted by businesses worldwide",
      subheading: "Here's what our satisfied customers have to say about StreamLine",
      testimonials: [
        {
          name: "Sarah Thompson",
          role: "CEO at TechCorp",
          image: "/placeholder.svg?height=400&width=400",
          quote:
            "StreamLine has revolutionized our workflow. It's intuitive, powerful, and has significantly boosted our team's productivity.",
        },
        {
          name: "John Davis",
          role: "Marketing Director at GrowthHub",
          image: "/placeholder.svg?height=400&width=400",
          quote:
            "The analytics features in StreamLine have provided us with invaluable insights. It's been a game-changer for our marketing strategies.",
        },
        {
          name: "Emily Chen",
          role: "Product Manager at InnovateCo",
          image: "/placeholder.svg?height=400&width=400",
          quote:
            "The collaboration tools in StreamLine have made remote work seamless for our team. It's an essential part of our daily operations now.",
        },
      ],
    },
  },
  {
    section: "pricing",
    content: {
      heading: "Simple, transparent pricing",
      subheading: "Choose the plan that's right for your business",
      plans: [
        {
          name: "Starter",
          price: "$29",
          period: "per month",
          features: ["5 team members", "Basic analytics", "24/7 support", "10GB storage"],
          buttonText: "Get started",
        },
        {
          name: "Professional",
          price: "$99",
          period: "per month",
          features: [
            "Unlimited team members",
            "Advanced analytics",
            "Priority support",
            "100GB storage",
            "Custom integrations",
          ],
          buttonText: "Get started",
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "Contact us for pricing",
          features: [
            "Unlimited everything",
            "Dedicated account manager",
            "Custom feature development",
            "On-premise deployment option",
          ],
          buttonText: "Contact sales",
        },
      ],
    },
  },
  {
    section: "cta",
    content: {
      heading: "Ready to streamline your workflow?",
      subheading: "Start your free trial today.",
      description: "Join thousands of satisfied customers who have transformed their business with StreamLine.",
      buttonText: "Get started for free",
    },
  },
  {
    section: "footer",
    content: {
      companyName: "StreamLine, Inc.",
      copyright: "© 2023 StreamLine, Inc. All rights reserved.",
      links: {
        product: [
          { text: "Features", url: "#" },
          { text: "Pricing", url: "#" },
          { text: "Integrations", url: "#" },
          { text: "API", url: "#" },
        ],
        company: [
          { text: "About", url: "#" },
          { text: "Blog", url: "#" },
          { text: "Careers", url: "#" },
          { text: "Press", url: "#" },
        ],
        legal: [
          { text: "Privacy", url: "#" },
          { text: "Terms", url: "#" },
          { text: "Cookie Policy", url: "#" },
        ],
      },
      socialLinks: [
        { platform: "Facebook", url: "#" },
        { platform: "Twitter", url: "#" },
        { platform: "Instagram", url: "#" },
        { platform: "LinkedIn", url: "#" },
      ],
    },
  },
]

export async function GET() {
  try {
    // Initialize content for each section
    const results = []

    for (const item of initialContent) {
      // Check if the section already exists
      const { data: existingData, error: checkError } = await supabase
        .from("content")
        .select("*")
        .eq("section", item.section)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        console.error(`Error checking for existing content in section ${item.section}:`, checkError)
        results.push({
          section: item.section,
          status: "error",
          message: checkError.message,
        })
        continue
      }

      if (existingData) {
        // Update existing content
        const { error: updateError } = await supabase
          .from("content")
          .update({ content: item.content, updated_at: new Date() })
          .eq("section", item.section)

        if (updateError) {
          results.push({
            section: item.section,
            status: "error",
            message: updateError.message,
          })
        } else {
          results.push({
            section: item.section,
            status: "updated",
          })
        }
      } else {
        // Insert new content
        const { error: insertError } = await supabase.from("content").insert([
          {
            section: item.section,
            content: item.content,
          },
        ])

        if (insertError) {
          results.push({
            section: item.section,
            status: "error",
            message: insertError.message,
          })
        } else {
          results.push({
            section: item.section,
            status: "created",
          })
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Content initialization completed",
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Initialization failed:", error)
    return NextResponse.json({ success: false, error: "Initialization failed", details: error }, { status: 500 })
  }
}

