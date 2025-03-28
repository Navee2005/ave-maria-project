/**
 * Utility functions for fetching content from the JSON file
 */

// Default content as fallback
const defaultContent = {
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
    subheading: "Professional Media Services for Churches",
    description: "We offer a wide range of media services to help churches effectively communicate their message.",
    items: [
      {
        title: "Video Production",
        description:
          "Professional video services including filming, editing, and post-production for sermons, events, and promotional content.",
        icon: "Video",
      },
      {
        title: "Photography",
        description: "High-quality photography for church events, staff portraits, and promotional materials.",
        icon: "Camera",
      },
      {
        title: "Graphic Design",
        description: "Custom graphics for social media, bulletins, banners, and other church communications.",
        icon: "PenTool",
      },
      {
        title: "Website Development",
        description: "Modern, responsive websites that help churches connect with their community online.",
        icon: "Globe",
      },
    ],
  },
  footer: {
    logo: "Ave Maria Media Services",
    tagline: "Spreading Faith Through Media",
    address: "123 Faith Street, Anytown, USA 12345",
    phone: "(555) 123-4567",
    email: "info@avemariamedia.org",
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
  // Add other default sections as needed
}

/**
 * Client-side function to fetch content
 * This is used in client components
 */
export async function fetchContent(section: string) {
  try {
    // Add a cache-busting query parameter with the current timestamp
    const timestamp = new Date().getTime()

    // Use the API route instead of direct file access
    const response = await fetch(`/api/content?section=${section}&t=${timestamp}`, {
      // Prevent caching
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch content: ${response.status} ${response.statusText}`)
      return defaultContent[section] || null
    }

    const data = await response.json()

    // If the API returns the entire content object, extract the requested section
    if (data && data[section]) {
      return data[section]
    }

    // If the API returns just the section data
    if (data && !data.error) {
      return data
    }

    console.warn(`Section ${section} not found in content, using default`)
    return defaultContent[section] || null
  } catch (error) {
    console.error(`Error fetching content for ${section}:`, error)
    return defaultContent[section] || null
  }
}

/**
 * Server-side function to fetch content
 * This is used in server components
 */
export async function getContent(section: string) {
  try {
    // Add a cache-busting query parameter with the current timestamp
    const timestamp = new Date().getTime()

    // Use the API route instead of direct file access
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/content?section=${section}&t=${timestamp}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )

    if (!response.ok) {
      console.error(`Failed to fetch content: ${response.status} ${response.statusText}`)
      return defaultContent[section] || null
    }

    const data = await response.json()

    // If the API returns the entire content object, extract the requested section
    if (data && data[section]) {
      return data[section]
    }

    // If the API returns just the section data
    if (data && !data.error) {
      return data
    }

    console.warn(`Section ${section} not found in content, using default`)
    return defaultContent[section] || null
  } catch (error) {
    console.error(`Error fetching content for ${section}:`, error)
    return defaultContent[section] || null
  }
}

/**
 * Function to update content
 * @param section The section to update
 * @param content The new content for the section
 */
export async function updateContent(section: string, content: any) {
  try {
    // First, get the current content
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/content?t=${timestamp}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`)
    }

    const currentContent = await response.json()

    // Update the specified section
    const updatedContent = {
      ...currentContent,
      [section]: content,
    }

    // Save the updated content
    const updateResponse = await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContent),
    })

    if (!updateResponse.ok) {
      throw new Error(`Failed to update content: ${updateResponse.status} ${updateResponse.statusText}`)
    }

    return true
  } catch (error) {
    console.error(`Error updating content for ${section}:`, error)
    return false
  }
}

