import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Initial content data for your website
const initialContent = {
  global: {
    colors: {
      primary: "#2563eb",
      secondary: "#f3f4f6",
      accent: "#3b82f6",
      text: {
        light: "#1f2937",
        dark: "#f9fafb",
        muted: "#6b7280",
      },
      background: {
        light: "#ffffff",
        dark: "#111827",
      },
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },
  hero: {
    heading1: "Spreading Faith Through Media",
    heading2: "Ave Maria Media Services",
    description:
      "We provide free professional media services to churches, helping them spread their message through high-quality content.",
    backgroundImage: "/images/hero-worship.png",
    overlayOpacity: 0.6,
    textColor: "#ffffff",
    primaryButton: {
      text: "Our Services",
      url: "#services",
      backgroundColor: "#2563eb",
      textColor: "#ffffff",
      hoverBackgroundColor: "#1d4ed8",
    },
    secondaryButton: {
      text: "Get in touch",
      url: "#contact",
      backgroundColor: "#ffffff",
      textColor: "#2563eb",
      hoverBackgroundColor: "#f9fafb",
    },
  },
  services: {
    heading: "Our Services",
    headingColor: "",
    subheading: "Professional Media Services for Churches",
    subheadingColor: "",
    description: "We offer a wide range of media services to help churches effectively communicate their message.",
    descriptionColor: "",
    backgroundColor: "",
    items: [
      {
        title: "Video Production",
        description: "Professional video recording and editing for sermons, events, and promotional content.",
        icon: "Video",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
      {
        title: "Photography",
        description: "High-quality photography for church events, portraits, and promotional materials.",
        icon: "Camera",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
      {
        title: "Audio Production",
        description: "Professional audio recording and mixing for sermons, worship music, and podcasts.",
        icon: "Music",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
      {
        title: "Content Creation",
        description: "Engaging content for social media, websites, and other digital platforms.",
        icon: "Edit",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
    ],
  },
  footer: {
    logo: "Ave Maria Media Services",
    logoColor: "",
    tagline: "Spreading Faith Through Media",
    taglineColor: "",
    address: "123 Faith Street, Anytown, USA 12345",
    phone: "(555) 123-4567",
    email: "info@avemariamedia.org",
    backgroundColor: "",
    textColor: "",
    socialLinks: [
      {
        platform: "Facebook",
        url: "#",
        icon: "Facebook",
      },
      {
        platform: "Instagram",
        url: "#",
        icon: "Instagram",
      },
      {
        platform: "Twitter",
        url: "#",
        icon: "Twitter",
      },
      {
        platform: "YouTube",
        url: "#",
        icon: "Youtube",
      },
    ],
    quickLinks: [
      {
        label: "Services",
        url: "#services",
      },
      {
        label: "Portfolio",
        url: "#portfolio",
      },
      {
        label: "About Us",
        url: "#about",
      },
      {
        label: "Donate",
        url: "#donate",
      },
      {
        label: "Contact",
        url: "#contact",
      },
    ],
    copyright: "© 2023 Ave Maria Media Services. All rights reserved.",
  },
}

export async function GET() {
  try {
    const contentFilePath = path.join(process.cwd(), "public", "content.json")

    // Check if the content.json file already exists
    let contentExists = false
    try {
      await fs.promises.access(contentFilePath)
      contentExists = true
    } catch (error) {
      contentExists = false
    }

    // If the file doesn't exist, create it with the initial content
    if (!contentExists) {
      // Make sure the directory exists
      const dir = path.dirname(contentFilePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      // Write the initial content to the file
      fs.writeFileSync(contentFilePath, JSON.stringify(initialContent, null, 2))

      return NextResponse.json({
        success: true,
        message: "Content file created successfully",
        path: contentFilePath,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Content file already exists",
      path: contentFilePath,
    })
  } catch (error) {
    console.error("Error initializing content file:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    )
  }
}

