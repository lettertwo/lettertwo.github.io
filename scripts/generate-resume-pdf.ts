import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __homedir = os.homedir();

async function generateResumePDF() {
  const outDir = path.join(__dirname, "../out");
  const resumeHTML = path.join(outDir, "resume.html");
  const resumePDF = path.join(outDir, "resume.pdf");

  // Verify HTML file exists
  if (!fs.existsSync(resumeHTML)) {
    throw new Error(
      `Resume HTML not found at ${resumeHTML}. Did you run 'pnpm build' first?`,
    );
  }

  // Create a simple HTTP server to serve the static files
  const server = http.createServer(async (req, res) => {
    const url = req.url === "/" ? "/resume.html" : (req.url ?? "/resume.html");
    // Decode URL to handle spaces and special characters
    const decodedUrl = decodeURIComponent(url);
    const filePath = path.join(outDir, decodedUrl);

    console.log(`  ╭─ ${url}`);
    console.log(`  ╰──▶ ${filePath.replace(__homedir, "~")}`);

    try {
      const stats = await stat(filePath);
      if (stats.isFile()) {
        // Set appropriate content type
        const ext = path.extname(filePath);
        const contentType =
          {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".json": "application/json",
            ".woff": "font/woff",
            ".woff2": "font/woff2",
            ".ttf": "font/ttf",
            ".otf": "font/otf",
            ".eot": "application/vnd.ms-fontobject",
            ".svg": "image/svg+xml",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".webp": "image/webp",
            ".ico": "image/x-icon",
          }[ext] || "application/octet-stream";

        res.writeHead(200, { "Content-Type": contentType });
        createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  // Start server on random port
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to start server");
  }
  const port = address.port;
  const serverUrl = `http://127.0.0.1:${port}/resume.html`;

  console.log(`Started HTTP server on port ${port}`);
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    // devtools: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    console.log("Loading resume page...");
    await page.goto(serverUrl, {
      waitUntil: "networkidle0",
    });

    // Emulate print media to apply @media print styles
    console.log("Applying print media styles...");
    await page.emulateMediaType("print");

    console.log("Generating PDF...");
    await page.pdf({
      path: resumePDF,
      format: "Letter",
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      waitForFonts: true,
      // chromium default margin is 0.4in
      margin: {
        top: "0.4in",
        right: "0.4in",
        bottom: "0.4in",
        left: "0.4in",
      },
    });

    console.log(`✓ PDF generated successfully at ${resumePDF}`);
  } finally {
    await browser.close();
    server.close();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateResumePDF().catch((error) => {
    console.error("Error generating PDF:", error);
    process.exit(1);
  });
}

export { generateResumePDF };
