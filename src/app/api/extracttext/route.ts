import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdfFile') as File | null;

    if (pdfFile) {
      console.log('PDF file size:', pdfFile.size, 'bytes');
    }

    if (!pdfFile) {
      return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    }

    // Convert the File object to a Buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use pdf-parse to extract text from the PDF
    const data = await pdf(buffer);

    return NextResponse.json({ text: data.text }, { status: 200 });
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return NextResponse.json({ error: 'Failed to extract text from PDF. ' + error }, { status: 500 });
  }
}