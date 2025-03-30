// src/utils/pdf-parser.ts
import fs from 'fs';
import { parse } from 'path';
import pdfParse from 'pdf-parse';

export interface PDFData {
    text: string;
    numpages: number;
    info: Record<string, any>;
    metadata: any;
    version: string;
}

export async function parsePdf(filepath: string): Promise<PDFData> {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        return await pdfParse(dataBuffer);
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF file');
    }
}

export async function parsePdf2(filepath: string): Promise<ExtractedText[]> {
    const dataBuffer = fs.readFileSync(filepath);
    return await readPdfPageByPageWithLines(dataBuffer);
}

import pdf from 'pdf-parse';

interface ExtractedText {
    pageNo: number;
    content: string[];
    texts: string[];
}

async function readPdfPageByPageWithLines(pdfBuffer: Buffer): Promise<ExtractedText[]> {
    try {
        const extractedData: ExtractedText[] = [];

        const pdfData = await pdf(pdfBuffer, {
            pagerender: async(pageData) => {
                // Process the page data here if needed
                const textContent = await pageData.getTextContent();
                
                const rawTexts = textContent.items.map((item: { str: string }) => item.str.trim());
                
                const nonEmptyTexts = rawTexts.filter((text: string) => text !== '');

                const combinedText = nonEmptyTexts.join(' ');
                const lines = combinedText.split(/\r\n|\r|\n/).map((line: string) => line.trim()).filter((line: string) => line !== '');
                console.log('lines:', lines);
                const pageNumber = parseInt(pageData.pageNumber);
                extractedData.push({ pageNo: pageNumber, content:combinedText, texts: nonEmptyTexts });
                return { pageNo: 0, content:[], texts: [] }; 
            },
        });

        return extractedData;
    } catch (error) {
        console.error('Error reading PDF:', error);
        return [];
    }
}


export type { ExtractedText };
