const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

async function testPDF() {
    const filePath = path.join(
        __dirname,
        "uploads",
        "1790269410696-405555359.pdf"
    );

    if (!fs.existsSync(filePath)) {
        console.log("PDF file not found:", filePath);
        return;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: fileBuffer });

    try {
        const result = await parser.getText();
        const extractedText = result.text || "";

        console.log("Extracted characters:", extractedText.length);
        console.log("Extracted text preview:");
        console.log(extractedText.substring(0, 1000));
    } catch (error) {
        console.error("PDF extraction failed:", error.message);
    } finally {
        await parser.destroy();
    }
}

testPDF();