export async function initCamera(videoElement) {
  const constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 1920 },
      height: { ideal: 1440 }
    },
    audio: false
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    videoElement.srcObject = stream
    
    // Wait for video to be ready
    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        videoElement.play()
        resolve()
      }
    })
    
    return stream
  } catch (err) {
    // Fallback to any camera if rear camera not available
    if (err.name === 'OverconstrainedError') {
      const fallbackStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      videoElement.srcObject = fallbackStream
      await new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
          videoElement.play()
          resolve()
        }
      })
      return fallbackStream
    }
    throw err
  }
}

export async function capturePhoto(videoElement, canvasElement) {
  const context = canvasElement.getContext('2d')
  
  // Set canvas size to match video
  canvasElement.width = videoElement.videoWidth
  canvasElement.height = videoElement.videoHeight
  
  // Draw video frame to canvas
  context.drawImage(videoElement, 0, 0)
  
  // Convert to JPEG blob
  return new Promise((resolve, reject) => {
    canvasElement.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create image blob'))
        }
      },
      'image/jpeg',
      0.85 // 85% quality for smaller file size
    )
  })
}