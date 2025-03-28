// app/api/extracttext/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdfFile') as File | null;

    if (!pdfFile) {
      return NextResponse.json({ error: 'Vui lòng tải lên tệp PDF.' }, { status: 400 });
    }

    const buffer = await pdfFile.arrayBuffer();

    const data = await pdf(Buffer.from(buffer));

    return NextResponse.json({ text: data.text }, { status: 200 });
  } catch (error) {
    console.error('Lỗi trích xuất PDF:', error);
    return NextResponse.json({ error: 'Không thể trích xuất văn bản từ PDF.' }, { status: 500 });
  }
}