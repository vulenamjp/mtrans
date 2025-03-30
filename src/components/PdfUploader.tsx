// app/components/PdfUploader.tsx
'use client';

import { ExtractedText } from '@/utils/pdf-parser';
import { useState } from 'react';

export default function PdfUploader() {
    const [pdfData, setPdfData] = useState<ExtractedText[] | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check if it's a PDF
        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file');
            return;
        }

        setLoading(true);
        setError(null);
        setPdfData(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload PDF');
            }

            const data = await response.json();
            setPdfData(data.pdfData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PDF Text Extractor</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>

      {loading && <p className="text-blue-500">Processing PDF...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {pdfData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Extracted Text:</h2>
          <div className="p-4 bg-gray-50 border rounded-md whitespace-pre-wrap">
            {pdfData.map((page) => (
              <div key={page.pageNo} className="mb-4">
                <h3 className="text-lg font-medium mb-2">Page {page.pageNo}</h3>
                <p>{page.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    );
}