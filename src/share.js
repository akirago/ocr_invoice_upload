export async function shareFile(file, fileName) {
  // Check if Web Share API Level 2 is available
  if (navigator.share && navigator.canShare) {
    const shareData = {
      files: [file],
      title: fileName,
      text: 'Save to Google Drive'
    }
    
    try {
      // Check if files can be shared
      if (navigator.canShare(shareData)) {
        await navigator.share(shareData)
        return true
      }
    } catch (err) {
      // User cancelled or share failed
      console.log('Share cancelled or failed:', err)
    }
  }
  
  // Fallback to download
  downloadFile(file, fileName)
  return false
}

function downloadFile(file, fileName) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 100)
}