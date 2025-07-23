export function showAmountDialog(amounts, callback) {
  const dialog = document.createElement('div')
  dialog.className = 'dialog-backdrop'
  dialog.innerHTML = `
    <div class="dialog">
      <h3 class="dialog-title">金額を選択してください</h3>
      <div class="dialog-options">
        ${amounts.map((amount, index) => `
          <button class="dialog-option" data-value="${amount}">
            ¥${amount.toLocaleString()}
          </button>
        `).join('')}
        <button class="dialog-option" data-value="none">
          上記以外
        </button>
      </div>
    </div>
  `
  
  const handleClick = (e) => {
    if (e.target.classList.contains('dialog-option')) {
      const value = e.target.dataset.value
      dialog.remove()
      callback(value === 'none' ? null : value)
    }
  }
  
  dialog.addEventListener('click', handleClick)
  document.body.appendChild(dialog)
}

export function showItemDialog(callback) {
  const items = [
    { id: 'kaigi', label: '会議' },
    { id: 'kousai', label: '交際' },
    { id: 'koutuuhi', label: '交通費' },
    { id: 'iryou', label: '医療' }
  ]
  
  const dialog = document.createElement('div')
  dialog.className = 'dialog-backdrop'
  dialog.innerHTML = `
    <div class="dialog">
      <h3 class="dialog-title">項目を選択してください</h3>
      <div class="dialog-options">
        ${items.map(item => `
          <button class="dialog-option" data-value="${item.id}">
            ${item.label}
          </button>
        `).join('')}
      </div>
    </div>
  `
  
  const handleClick = (e) => {
    if (e.target.classList.contains('dialog-option')) {
      const value = e.target.dataset.value
      dialog.remove()
      callback(value)
    }
  }
  
  dialog.addEventListener('click', handleClick)
  document.body.appendChild(dialog)
}