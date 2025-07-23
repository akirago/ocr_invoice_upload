(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();async function S(o){const t={video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1440}},audio:!1};try{const e=await navigator.mediaDevices.getUserMedia(t);return o.srcObject=e,await new Promise(n=>{o.onloadedmetadata=()=>{o.play(),n()}}),e}catch(e){if(e.name==="OverconstrainedError"){const n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});return o.srcObject=n,await new Promise(a=>{o.onloadedmetadata=()=>{o.play(),a()}}),n}throw e}}async function x(o,t){const e=t.getContext("2d");return t.width=o.videoWidth,t.height=o.videoHeight,e.drawImage(o,0,0),new Promise((n,a)=>{t.toBlob(s=>{s?n(s):a(new Error("Failed to create image blob"))},"image/jpeg",.85)})}const k="modulepreload",D=function(o){return"/ocr_invoice_upload/"+o},L={},P=function(t,e,n){let a=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),i=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=Promise.allSettled(e.map(l=>{if(l=D(l),l in L)return;L[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":k,u||(c.as="script"),c.crossOrigin="",c.href=l,i&&c.setAttribute("nonce",i),document.head.appendChild(c),u)return new Promise((p,h)=>{c.addEventListener("load",p),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return a.then(r=>{for(const i of r||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})};let g=null;async function T(){if(g)return g;const{createWorker:o}=await P(async()=>{const{createWorker:t}=await import("./index-BZH6TDpT.js").then(e=>e.i);return{createWorker:t}},[]);return g=await o("jpn",1,{logger:t=>{t.status==="recognizing text"&&t.progress&&window.ocrProgressCallback&&window.ocrProgressCallback(t.progress)}}),g}async function B(o,t){window.ocrProgressCallback=t;try{t(0);const e=await T(),n=await _(o),{data:{text:a}}=await e.recognize(n);return t(1),a}catch(e){throw console.error("OCR error:",e),new Error("OCR処理に失敗しました")}finally{delete window.ocrProgressCallback}}function O(o){const t=[],e=[],a=o.replace(/1(\d{3})/g,"¥$1").replace(/\|(\d{3})/g,"¥$1").replace(/l(\d{3})/g,"¥$1").replace(/I(\d{3})/g,"¥$1").split(`
`);for(const l of a){const u=l.trim();if(!u)continue;const m=j(u);m!==0&&(u.includes("円")||u.includes("¥")?t.includes(m)||t.push(m):e.includes(m)||e.push(m))}t.sort((l,u)=>u-l),e.sort((l,u)=>u-l);const s=[];let r=0,i=0;for(;s.length<9&&(r<t.length||i<e.length);)r<t.length&&s.push(t[r++]),s.length<9&&i<e.length&&s.push(e[i++]);return s}function F(o){const t=[],e=[/\b(20\d{2})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})\.(0?[1-9]|1[0-2])\.(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日\b/g,/\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(20\d{2})\b/g];for(const n of e){let a;for(;(a=n.exec(o))!==null;){let s,r,i;if(n.source.includes("(0?[1-9]|1[0-2])")&&(a[3]&&a[3].length===4?(r=a[1],i=a[2],s=a[3]):(s=a[1],r=a[2],i=a[3])),s=parseInt(s,10),r=parseInt(r,10),i=parseInt(i,10),s>=2020&&s<=2030&&r>=1&&r<=12&&i>=1&&i<=31){const l=`${s}-${String(r).padStart(2,"0")}-${String(i).padStart(2,"0")}`;t.includes(l)||t.push(l)}}}return t}function j(o){let t="";for(const n of o){if(/\d/.test(n))t+=n;else if(n===","||n===".")continue;if(t.length>5)return 0}if(!t)return 0;const e=parseInt(t,10);return e>=100&&e<=3e4?e:0}function _(o){return new Promise((t,e)=>{const n=new FileReader;n.onloadend=()=>t(n.result),n.onerror=e,n.readAsDataURL(o)})}window.addEventListener("beforeunload",async()=>{g&&await g.terminate()});async function N(o,t){if(navigator.share&&navigator.canShare){const e={files:[o],title:t,text:"Save to Google Drive"};try{if(navigator.canShare(e))return await navigator.share(e),!0}catch(n){console.log("Share cancelled or failed:",n)}}return R(o,t),!1}function R(o,t){const e=URL.createObjectURL(o),n=document.createElement("a");n.href=e,n.download=t,n.style.display="none",document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(e)},100)}function v(o=null,t=null,e=null){let n;if(e)n=e;else{const s=new Date,r=s.getFullYear(),i=String(s.getMonth()+1).padStart(2,"0"),l=String(s.getDate()).padStart(2,"0");n=`${r}-${i}-${l}`}let a=n;return o&&(a+=`_${o}`),t&&(a+=`_${t}`),`${a}.jpg`}const E="drive-ocr-expense-items",U=[{id:"kaigi",label:"会議"},{id:"kousai",label:"交際"},{id:"koutuuhi",label:"交通費"},{id:"iryou",label:"医療"}];function $(){try{const o=localStorage.getItem(E);if(o)return JSON.parse(o)}catch(o){console.error("Failed to load expense items:",o)}return[...U]}function q(o){try{localStorage.setItem(E,JSON.stringify(o))}catch(t){console.error("Failed to save expense items:",t)}}function M(o){const t=$(),e=o.toLowerCase().replace(/[^a-z0-9]/g,"_");return t.some(n=>n.id===e)?!1:(t.push({id:e,label:o}),q(t),!0)}function A(o,t){const e=document.createElement("div");e.className="dialog-backdrop",e.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">金額を選択してください</h3>
      <div class="dialog-options">
        ${o.map((r,i)=>`
          <button class="dialog-option" data-value="${r}">
            ¥${r.toLocaleString()}
          </button>
        `).join("")}
        <button class="dialog-option dialog-manual" data-value="manual">
          ✍️ 手動入力
        </button>
        <input type="number" class="dialog-amount-input" id="manual-amount-input" 
               placeholder="金額を入力" min="100" max="30000" 
               style="display: none;">
        <button class="dialog-option" data-value="none">
          上記以外
        </button>
        <button class="dialog-option dialog-retry" data-value="retry">
          📷 撮り直す
        </button>
      </div>
    </div>
  `;const n=e.querySelector("#manual-amount-input"),a=e.querySelector(".dialog-manual"),s=r=>{if(r.target.classList.contains("dialog-option")){const i=r.target.dataset.value;i==="manual"?(n.style.display="block",a.style.display="none",n.focus()):i==="retry"?(e.remove(),t("retry")):(e.remove(),t(i==="none"?null:i))}};n.addEventListener("keypress",r=>{if(r.key==="Enter"){const i=parseInt(n.value,10);i>=100&&i<=3e4?(e.remove(),t(String(i))):(n.style.borderColor="#f44336",setTimeout(()=>{n.style.borderColor="#4285f4"},1e3))}}),n.addEventListener("blur",r=>{setTimeout(()=>{e.contains(n)&&!n.value&&(n.style.display="none",a.style.display="block")},200)}),e.addEventListener("click",s),document.body.appendChild(e)}function C(o){const t=$(),e=document.createElement("div");e.className="dialog-backdrop",e.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">項目を選択してください</h3>
      <div class="dialog-options">
        ${t.map(r=>`
          <button class="dialog-option" data-value="${r.id}">
            ${r.label}
          </button>
        `).join("")}
        <button class="dialog-option dialog-add" data-value="add">
          ➕ 項目を追加
        </button>
        <input type="text" class="dialog-item-input" id="new-item-input" 
               placeholder="新しい項目名" 
               style="display: none;">
      </div>
    </div>
  `;const n=e.querySelector("#new-item-input"),a=e.querySelector(".dialog-add"),s=r=>{if(r.target.classList.contains("dialog-option")){const i=r.target.dataset.value;i==="add"?(n.style.display="block",a.style.display="none",n.focus()):(e.remove(),o(i))}};n.addEventListener("keypress",r=>{if(r.key==="Enter"){const i=n.value.trim();i&&(M(i)?(e.remove(),C(o)):(n.style.borderColor="#f44336",setTimeout(()=>{n.style.borderColor="#4285f4"},1e3)))}}),n.addEventListener("blur",r=>{setTimeout(()=>{e.contains(n)&&!n.value&&(n.style.display="none",a.style.display="block")},200)}),e.addEventListener("click",s),document.body.appendChild(e)}function b(o,t){const e=new Date,n=new Date(e);n.setDate(n.getDate()-1);const a=c=>{const p=c.getFullYear(),h=String(c.getMonth()+1).padStart(2,"0"),I=String(c.getDate()).padStart(2,"0");return`${p}-${h}-${I}`},s=a(e),r=a(n),i=document.createElement("div");i.className="dialog-backdrop",i.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">日付を選択してください</h3>
      <div class="dialog-options">
        <button class="dialog-option" data-value="${s}">
          今日 (${s})
        </button>
        <button class="dialog-option" data-value="${r}">
          昨日 (${r})
        </button>
        ${o.map(c=>`
          <button class="dialog-option" data-value="${c}">
            画像から読み取った日付 (${c})
          </button>
        `).join("")}
        <button class="dialog-option dialog-manual" data-value="manual">
          📅 手動で選ぶ
        </button>
        <input type="date" class="dialog-date-input" id="manual-date-input" value="${s}" style="display: none;">
        <button class="dialog-option" data-value="none">
          選択しない
        </button>
      </div>
    </div>
  `;const l=i.querySelector("#manual-date-input"),u=i.querySelector(".dialog-manual"),m=c=>{if(c.target.classList.contains("dialog-option")){const p=c.target.dataset.value;p==="manual"?(l.style.display="block",u.style.display="none",l.focus(),l.showPicker()):(i.remove(),t(p==="none"?null:p))}};l.addEventListener("change",c=>{const p=c.target.value;p&&(i.remove(),t(p))}),l.addEventListener("blur",c=>{setTimeout(()=>{i.contains(l)&&(l.style.display="none",u.style.display="block")},200)}),i.addEventListener("click",m),document.body.appendChild(i)}const d={video:document.getElementById("camera-video"),placeholder:document.getElementById("camera-placeholder"),captureBtn:document.getElementById("capture-btn"),progressContainer:document.getElementById("progress-container"),progressFill:document.getElementById("progress-fill"),progressText:document.getElementById("progress-text"),output:document.getElementById("output"),outputText:document.getElementById("output-text"),error:document.getElementById("error"),canvas:document.getElementById("capture-canvas")};let f=null;async function W(){try{f=await S(d.video),d.placeholder.style.display="none",d.captureBtn.disabled=!1}catch(o){y("カメラへのアクセスが拒否されました。設定を確認してください。"),console.error("Camera init error:",o)}d.captureBtn.addEventListener("click",H),document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="visible"&&f){const o=f.getVideoTracks();if(o.length===0||o[0].readyState!=="live")try{f=await S(d.video)}catch(t){console.error("Camera recovery failed:",t)}}})}async function H(){try{Y(),d.captureBtn.disabled=!0;const o=await x(d.video,d.canvas);d.progressContainer.classList.add("active"),d.output.classList.remove("active");const t=await B(o,a=>{const s=Math.round(a*100);d.progressFill.style.width=`${s}%`,d.progressText.textContent=`${s}%`});if(d.progressContainer.classList.remove("active"),!t||t.trim().length===0){y("テキストを認識できませんでした。");return}d.output.classList.add("active"),d.outputText.textContent=t;const e=O(t),n=F(t);e.length===0?b(n,async a=>{const s=v(null,null,a),r=new File([o],s,{type:"image/jpeg"});await w(r)}):A(e,async a=>{if(a==="retry"){d.output.classList.remove("active");return}else a===null?b(n,async s=>{const r=v(null,null,s),i=new File([o],r,{type:"image/jpeg"});await w(i)}):b(n,async s=>{C(async r=>{const i=v(a,r,s),l=new File([o],i,{type:"image/jpeg"});await w(l)})})})}catch(o){y("処理中にエラーが発生しました: "+o.message),console.error("Capture error:",o)}finally{d.captureBtn.disabled=!1}}async function w(o){await N(o,o.name)||y("共有に失敗しました。手動でダウンロードしてください。")}function y(o){d.error.textContent=o,d.error.classList.add("active")}function Y(){d.error.classList.remove("active")}W();
