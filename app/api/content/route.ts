import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const contentFilePath = path.join(process.cwd(), "public", "content.json")

// GET handler to retrieve content
export async function GET(request: NextRequest) {
  try {
    // Get the section parameter from the URL
    const section = request.nextUrl.searchParams.get("section")

    // Check if the file exists
    if (!fs.existsSync(contentFilePath)) {
      console.error("Content file not found at:", contentFilePath)
      return NextResponse.json({ error: "Content file not found" }, { status: 404 })
    }

    // Read the content file
    const contentData = fs.readFileSync(contentFilePath, "utf8")

    try {
      const content = JSON.parse(contentData)

      // If a specific section was requested, return just that section
      if (section && content[section]) {
        return NextResponse.json(content[section])
      }

      // Otherwise return the entire content object
      return NextResponse.json(content)
    } catch (parseError) {
      console.error("Error parsing content.json:", parseError)
      return NextResponse.json({ error: "Failed to parse content.json" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error reading content file:", error)
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 })
  }
}

// POST handler to update content
export async function POST(request: NextRequest) {
  try {
    const updatedContent = await request.json()

    // Check if the directory exists, create it if not
    const dir = path.dirname(contentFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Write the updated content to the file
    fs.writeFileSync(contentFilePath, JSON.stringify(updatedContent, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating content file:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

