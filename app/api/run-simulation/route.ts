import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create /data directory if it doesn't exist
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // File name with timestamp
    const filePath = path.join(
      dir,
      `simulation-${Date.now()}.json`
    );

    // Write JSON to file
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    console.log("Saved simulation payload to:", filePath);

    return NextResponse.json({
      status: "ok",
      message: "Simulation received and saved",
      file: filePath,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}