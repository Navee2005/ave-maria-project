import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Check if the content.json file exists in the public directory
    const publicDir = path.join(process.cwd(), "public")
    const contentFilePath = path.join(publicDir, "content.json")

    let fileExists = false
    try {
      await fs.promises.access(contentFilePath, fs.constants.F_OK)
      fileExists = true
    } catch (error) {
      fileExists = false
    }

    // List files in the public directory
    const files = await fs.promises.readdir(publicDir)

    return NextResponse.json({
      success: true,
      contentFileExists: fileExists,
      publicDirFiles: files,
      contentFilePath,
    })
  } catch (error) {
    console.error("Error checking content file:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    )
  }
}

