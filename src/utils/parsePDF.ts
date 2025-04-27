import * as PDFJS from 'pdfjs-dist';

// Set worker source path for PDF.js
PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export const parsePDF = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    
    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target!.result as ArrayBuffer);
        const loadingTask = PDFJS.getDocument(typedArray);
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const textItems = textContent.items.map((item: any) => item.str);
          fullText += textItems.join(' ') + '\n';
        }
        
        resolve(fullText);
      } catch (error) {
        reject(error);
      }
    };
    
    fileReader.onerror = (error) => {
      reject(error);
    };
    
    fileReader.readAsArrayBuffer(file);
  });
};