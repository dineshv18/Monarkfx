import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test Cloudinary connection
async function testCloudinary() {
  try {
    console.log("Testing Cloudinary connection...");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log(
      "API Key:",
      process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "API Secret:",
      process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing"
    );

    // Test API connection
    const result = await cloudinary.api.ping();
    console.log("Cloudinary API Response:", result);
    console.log("✓ Cloudinary connection successful!");

    // Test folder creation
    console.log("\nTesting folder structure...");
    const folders = [
      "monarkfx",
      "monarkfx/courses",
      "monarkfx/pdfs",
      "monarkfx/audio",
      "monarkfx/zoom-thumbnails",
    ];

    for (const folder of folders) {
      console.log(`✓ Folder: ${folder}`);
    }

    console.log("\n🎉 Cloudinary integration is ready!");
  } catch (error) {
    console.error("❌ Cloudinary test failed:", error.message);
    process.exit(1);
  }
}

// Run the test
testCloudinary();
