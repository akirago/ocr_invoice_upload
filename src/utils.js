export function buildFileName(amount = null, item = null) {
  // Get current date in YYYY-MM-DD format
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dateStr = `${year}-${month}-${day}`
  
  // Build filename: date_amount_item.jpg
  let fileName = dateStr
  if (amount) fileName += `_${amount}`
  if (item) fileName += `_${item}`
  
  return `${fileName}.jpg`
}

