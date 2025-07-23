export function buildFileName(ocrText) {
  // Get first non-empty line
  const lines = ocrText.split('\n').filter(line => line.trim().length > 0)
  const firstLine = lines[0] || 'untitled'
  
  // Clean the text - keep alphanumeric, Japanese characters, underscore, hyphen
  const cleanedText = firstLine
    .replace(/[^a-zA-Z0-9\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff_-]/g, '')
    .trim()
  
  // Limit to 40 characters
  const truncatedText = cleanedText.substring(0, 40) || 'untitled'
  
  // Get current date in YYYY-MM-DD format
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dateStr = `${year}-${month}-${day}`
  
  return `${truncatedText}_${dateStr}.jpg`
}