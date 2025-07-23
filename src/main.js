import { initCamera, capturePhoto } from './camera.js'
import { processOCR, extractAmounts } from './ocr.js'
import { shareFile } from './share.js'
import { buildFileName } from './utils.js'
import { showAmountDialog, showItemDialog } from './dialog.js'

const elements = {
  video: document.getElementById('camera-video'),
  placeholder: document.getElementById('camera-placeholder'),
  captureBtn: document.getElementById('capture-btn'),
  progressContainer: document.getElementById('progress-container'),
  progressFill: document.getElementById('progress-fill'),
  progressText: document.getElementById('progress-text'),
  output: document.getElementById('output'),
  outputText: document.getElementById('output-text'),
  error: document.getElementById('error'),
  canvas: document.getElementById('capture-canvas')
}

let cameraStream = null

async function init() {
  try {
    cameraStream = await initCamera(elements.video)
    elements.placeholder.style.display = 'none'
    elements.captureBtn.disabled = false
  } catch (err) {
    showError('カメラへのアクセスが拒否されました。設定を確認してください。')
    console.error('Camera init error:', err)
  }

  elements.captureBtn.addEventListener('click', handleCapture)

  // iOS PWA camera recovery on visibility change
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && cameraStream) {
      const tracks = cameraStream.getVideoTracks()
      if (tracks.length === 0 || tracks[0].readyState !== 'live') {
        try {
          cameraStream = await initCamera(elements.video)
        } catch (err) {
          console.error('Camera recovery failed:', err)
        }
      }
    }
  })
}

async function handleCapture() {
  try {
    hideError()
    elements.captureBtn.disabled = true
    
    // Capture photo
    const blob = await capturePhoto(elements.video, elements.canvas)
    
    // Show progress
    elements.progressContainer.classList.add('active')
    elements.output.classList.remove('active')
    
    // Process OCR
    const text = await processOCR(blob, (progress) => {
      const percent = Math.round(progress * 100)
      elements.progressFill.style.width = `${percent}%`
      elements.progressText.textContent = `${percent}%`
    })
    
    // Hide progress
    elements.progressContainer.classList.remove('active')
    
    if (!text || text.trim().length === 0) {
      showError('テキストを認識できませんでした。')
      return
    }
    
    // Show result
    elements.output.classList.add('active')
    elements.outputText.textContent = text
    
    // Extract amounts from OCR text
    const amounts = extractAmounts(text)
    
    if (amounts.length === 0) {
      // No amounts found, share with date only
      const fileName = buildFileName()
      const file = new File([blob], fileName, { type: 'image/jpeg' })
      await shareWithGoogleDrive(file)
    } else {
      // Show amount selection dialog
      showAmountDialog(amounts, async (selectedAmount) => {
        if (selectedAmount === null) {
          // User selected "none of the above"
          const fileName = buildFileName()
          const file = new File([blob], fileName, { type: 'image/jpeg' })
          await shareWithGoogleDrive(file)
        } else {
          // Show item selection dialog
          showItemDialog(async (selectedItem) => {
            // Build filename with amount and item
            const fileName = buildFileName(selectedAmount, selectedItem)
            const file = new File([blob], fileName, { type: 'image/jpeg' })
            await shareWithGoogleDrive(file)
          })
        }
      })
    }
    
  } catch (err) {
    showError('処理中にエラーが発生しました: ' + err.message)
    console.error('Capture error:', err)
  } finally {
    elements.captureBtn.disabled = false
  }
}

async function shareWithGoogleDrive(file) {
  const shared = await shareFile(file, file.name)
  if (!shared) {
    showError('共有に失敗しました。手動でダウンロードしてください。')
  }
}

function showError(message) {
  elements.error.textContent = message
  elements.error.classList.add('active')
}

function hideError() {
  elements.error.classList.remove('active')
}

// Initialize on load
init()