// app/api/pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parsePdf, parsePdf2 } from '@/utils/pdf-parser'; // Adjust the import path as necessary
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/*
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Save the file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a temporary filepath
    const tempFilePath = path.join('/tmp', `${uuidv4()}.pdf`);
    await writeFile(tempFilePath, buffer);
    
    // Parse the PDF
    const pdfData = await parsePdf(tempFilePath);
    
    return NextResponse.json({ 
      text: pdfData.text,
      pageCount: pdfData.numpages 
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}
*/
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
          return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        
        // Save the file temporarily
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create a temporary filepath
        const tempFilePath = path.join('/tmp', `${uuidv4()}.pdf`);
        await writeFile(tempFilePath, buffer);
        
        // Parse the PDF
        const pdfData = await parsePdf2(tempFilePath);
        
        return NextResponse.json({ 
          pdfData,
        });
      } catch (error) {
        console.error('Error processing PDF:', error);
        return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
      }
    
}