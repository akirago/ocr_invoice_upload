let tesseractWorker = null

async function initTesseract() {
  if (tesseractWorker) return tesseractWorker

  // Dynamic import to lazy-load Tesseract
  const { createWorker } = await import('tesseract.js')
  
  tesseractWorker = await createWorker('jpn', 1, {
    logger: (m) => {
      // Forward progress to callback if available
      if (m.status === 'recognizing text' && m.progress) {
        if (window.ocrProgressCallback) {
          window.ocrProgressCallback(m.progress)
        }
      }
    }
  })
  
  return tesseractWorker
}

export async function processOCR(imageBlob, progressCallback) {
  window.ocrProgressCallback = progressCallback
  
  try {
    progressCallback(0)
    
    // Initialize Tesseract worker
    const worker = await initTesseract()
    
    // Convert blob to data URL for Tesseract
    const imageUrl = await blobToDataUrl(imageBlob)
    
    // Perform OCR
    const { data: { text } } = await worker.recognize(imageUrl)
    
    progressCallback(1)
    
    return text
  } catch (err) {
    console.error('OCR error:', err)
    throw new Error('OCR処理に失敗しました')
  } finally {
    delete window.ocrProgressCallback
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Cleanup function for when the page unloads
window.addEventListener('beforeunload', async () => {
  if (tesseractWorker) {
    await tesseractWorker.terminate()
  }
})