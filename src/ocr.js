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

export function extractAmounts(text) {
  const amounts = []
  const maybeAmounts = []
  
  // Split text into lines
  const lines = text.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue
    
    // Extract yen amount from line
    const amount = extractYenAmount(trimmedLine)
    if (amount === 0) continue
    
    // If line contains yen symbol or kanji, it's more likely to be an amount
    if (trimmedLine.includes('円') || trimmedLine.includes('¥')) {
      if (!amounts.includes(amount)) {
        amounts.push(amount)
      }
    } else {
      if (!maybeAmounts.includes(amount)) {
        maybeAmounts.push(amount)
      }
    }
  }
  
  // Sort in descending order
  amounts.sort((a, b) => b - a)
  maybeAmounts.sort((a, b) => b - a)
  
  // Return top 3 of each, combined
  const results = []
  results.push(...amounts.slice(0, 3))
  results.push(...maybeAmounts.slice(0, 3))
  
  return results
}

function extractYenAmount(text) {
  let digits = ''
  
  // Extract digits from text
  for (const char of text) {
    if (/\d/.test(char)) {
      digits += char
    }
    // Stop if we have more than 8 digits (avoid very large numbers)
    if (digits.length > 8) return 0
  }
  
  if (!digits) return 0
  
  const amount = parseInt(digits, 10)
  
  // Return amount if it's in reasonable range (101 to 999999)
  if (amount >= 101 && amount <= 999999) {
    return amount
  }
  
  return 0
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