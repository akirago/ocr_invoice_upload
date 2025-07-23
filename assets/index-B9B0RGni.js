(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();async function S(n){const t={video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1440}},audio:!1};try{const o=await navigator.mediaDevices.getUserMedia(t);return n.srcObject=o,await new Promise(e=>{n.onloadedmetadata=()=>{n.play(),e()}}),o}catch(o){if(o.name==="OverconstrainedError"){const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});return n.srcObject=e,await new Promise(a=>{n.onloadedmetadata=()=>{n.play(),a()}}),e}throw o}}async function k(n,t){const o=t.getContext("2d");return t.width=n.videoWidth,t.height=n.videoHeight,o.drawImage(n,0,0),new Promise((e,a)=>{t.toBlob(s=>{s?e(s):a(new Error("Failed to create image blob"))},"image/jpeg",.85)})}const x="modulepreload",D=function(n){return"/ocr_invoice_upload/"+n},L={},P=function(t,o,e){let a=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),i=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=Promise.allSettled(o.map(l=>{if(l=D(l),l in L)return;L[l]=!0;const u=l.endsWith(".css"),y=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${y}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":x,u||(c.as="script"),c.crossOrigin="",c.href=l,i&&c.setAttribute("nonce",i),document.head.appendChild(c),u)return new Promise((m,h)=>{c.addEventListener("load",m),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return a.then(r=>{for(const i of r||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})};let p=null;async function B(){if(p)return p;const{createWorker:n}=await P(async()=>{const{createWorker:t}=await import("./index-BZH6TDpT.js").then(o=>o.i);return{createWorker:t}},[]);return p=await n("jpn",1,{logger:t=>{t.status==="recognizing text"&&t.progress&&window.ocrProgressCallback&&window.ocrProgressCallback(t.progress)}}),p}async function T(n,t){window.ocrProgressCallback=t;try{t(0);const o=await B(),e=await _(n),{data:{text:a}}=await o.recognize(e);return t(1),a}catch(o){throw console.error("OCR error:",o),new Error("OCR処理に失敗しました")}finally{delete window.ocrProgressCallback}}function O(n){const t=[],o=[],e=n.split(`
`);for(const i of e){const l=i.trim();if(!l)continue;const u=F(l);u!==0&&(l.includes("円")||l.includes("¥")?t.includes(u)||t.push(u):o.includes(u)||o.push(u))}t.sort((i,l)=>l-i),o.sort((i,l)=>l-i);const a=[];let s=0,r=0;for(;a.length<9&&(s<t.length||r<o.length);)s<t.length&&a.push(t[s++]),a.length<9&&r<o.length&&a.push(o[r++]);return a}function j(n){const t=[],o=[/\b(20\d{2})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})\.(0?[1-9]|1[0-2])\.(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日\b/g,/\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(20\d{2})\b/g];for(const e of o){let a;for(;(a=e.exec(n))!==null;){let s,r,i;if(e.source.includes("(0?[1-9]|1[0-2])")&&(a[3]&&a[3].length===4?(r=a[1],i=a[2],s=a[3]):(s=a[1],r=a[2],i=a[3])),s=parseInt(s,10),r=parseInt(r,10),i=parseInt(i,10),s>=2020&&s<=2030&&r>=1&&r<=12&&i>=1&&i<=31){const l=`${s}-${String(r).padStart(2,"0")}-${String(i).padStart(2,"0")}`;t.includes(l)||t.push(l)}}}return t}function F(n){let t=n.replace(/(\d)j(\d{3})/g,"$1,$2").replace(/(\d)J(\d{3})/g,"$1,$2");if(t.match(/^\s*¥(\d{1,2})\s*$/))return 0;let e="",a=t.includes("¥")||t.includes("円");for(const r of t){if(/\d/.test(r))e+=r;else if(r===","||r===".")continue;if(e.length>5)return 0}if(!e)return 0;e.length===4&&!a&&n.match(/^\s*1\d{3}\s*$/)&&n.match(/[¥円]/);const s=parseInt(e,10);return s>=100&&s<=3e4?s:0}function _(n){return new Promise((t,o)=>{const e=new FileReader;e.onloadend=()=>t(e.result),e.onerror=o,e.readAsDataURL(n)})}window.addEventListener("beforeunload",async()=>{p&&await p.terminate()});async function N(n,t){if(navigator.share&&navigator.canShare){const o={files:[n],title:t,text:"Save to Google Drive"};try{if(navigator.canShare(o))return await navigator.share(o),!0}catch(e){console.log("Share cancelled or failed:",e)}}return R(n,t),!1}function R(n,t){const o=URL.createObjectURL(n),e=document.createElement("a");e.href=o,e.download=t,e.style.display="none",document.body.appendChild(e),e.click(),setTimeout(()=>{document.body.removeChild(e),URL.revokeObjectURL(o)},100)}function v(n=null,t=null,o=null){let e;if(o)e=o;else{const s=new Date,r=s.getFullYear(),i=String(s.getMonth()+1).padStart(2,"0"),l=String(s.getDate()).padStart(2,"0");e=`${r}-${i}-${l}`}let a=e;return n&&(a+=`_${n}`),t&&(a+=`_${t}`),`${a}.jpg`}const E="drive-ocr-expense-items",U=[{id:"kaigi",label:"会議"},{id:"kousai",label:"交際"},{id:"koutuuhi",label:"交通費"},{id:"iryou",label:"医療"}];function $(){try{const n=localStorage.getItem(E);if(n)return JSON.parse(n)}catch(n){console.error("Failed to load expense items:",n)}return[...U]}function M(n){try{localStorage.setItem(E,JSON.stringify(n))}catch(t){console.error("Failed to save expense items:",t)}}function q(n){const t=$(),o=n.toLowerCase().replace(/[^a-z0-9]/g,"_");return t.some(e=>e.id===o)?!1:(t.push({id:o,label:n}),M(t),!0)}function A(n,t){const o=document.createElement("div");o.className="dialog-backdrop",o.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">金額を選択してください</h3>
      <div class="dialog-options">
        ${n.map((r,i)=>`
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
  `;const e=o.querySelector("#manual-amount-input"),a=o.querySelector(".dialog-manual"),s=r=>{if(r.target.classList.contains("dialog-option")){const i=r.target.dataset.value;i==="manual"?(e.style.display="block",a.style.display="none",e.focus()):i==="retry"?(o.remove(),t("retry")):(o.remove(),t(i==="none"?null:i))}};e.addEventListener("keypress",r=>{if(r.key==="Enter"){const i=parseInt(e.value,10);i>=100&&i<=3e4?(o.remove(),t(String(i))):(e.style.borderColor="#f44336",setTimeout(()=>{e.style.borderColor="#4285f4"},1e3))}}),e.addEventListener("blur",r=>{setTimeout(()=>{o.contains(e)&&!e.value&&(e.style.display="none",a.style.display="block")},200)}),o.addEventListener("click",s),document.body.appendChild(o)}function C(n){const t=$(),o=document.createElement("div");o.className="dialog-backdrop",o.innerHTML=`
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
  `;const e=o.querySelector("#new-item-input"),a=o.querySelector(".dialog-add"),s=r=>{if(r.target.classList.contains("dialog-option")){const i=r.target.dataset.value;i==="add"?(e.style.display="block",a.style.display="none",e.focus()):(o.remove(),n(i))}};e.addEventListener("keypress",r=>{if(r.key==="Enter"){const i=e.value.trim();i&&(q(i)?(o.remove(),C(n)):(e.style.borderColor="#f44336",setTimeout(()=>{e.style.borderColor="#4285f4"},1e3)))}}),e.addEventListener("blur",r=>{setTimeout(()=>{o.contains(e)&&!e.value&&(e.style.display="none",a.style.display="block")},200)}),o.addEventListener("click",s),document.body.appendChild(o)}function b(n,t){const o=new Date,e=new Date(o);e.setDate(e.getDate()-1);const a=c=>{const m=c.getFullYear(),h=String(c.getMonth()+1).padStart(2,"0"),I=String(c.getDate()).padStart(2,"0");return`${m}-${h}-${I}`},s=a(o),r=a(e),i=document.createElement("div");i.className="dialog-backdrop",i.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">日付を選択してください</h3>
      <div class="dialog-options">
        <button class="dialog-option" data-value="${s}">
          今日 (${s})
        </button>
        <button class="dialog-option" data-value="${r}">
          昨日 (${r})
        </button>
        ${n.map(c=>`
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
  `;const l=i.querySelector("#manual-date-input"),u=i.querySelector(".dialog-manual"),y=c=>{if(c.target.classList.contains("dialog-option")){const m=c.target.dataset.value;m==="manual"?(l.style.display="block",u.style.display="none",l.focus(),l.showPicker()):(i.remove(),t(m==="none"?null:m))}};l.addEventListener("change",c=>{const m=c.target.value;m&&(i.remove(),t(m))}),l.addEventListener("blur",c=>{setTimeout(()=>{i.contains(l)&&(l.style.display="none",u.style.display="block")},200)}),i.addEventListener("click",y),document.body.appendChild(i)}const d={video:document.getElementById("camera-video"),placeholder:document.getElementById("camera-placeholder"),captureBtn:document.getElementById("capture-btn"),progressContainer:document.getElementById("progress-container"),progressFill:document.getElementById("progress-fill"),progressText:document.getElementById("progress-text"),output:document.getElementById("output"),outputText:document.getElementById("output-text"),error:document.getElementById("error"),canvas:document.getElementById("capture-canvas")};let g=null;async function W(){try{g=await S(d.video),d.placeholder.style.display="none",d.captureBtn.disabled=!1}catch(n){f("カメラへのアクセスが拒否されました。設定を確認してください。"),console.error("Camera init error:",n)}d.captureBtn.addEventListener("click",Y),document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="visible"&&g){const n=g.getVideoTracks();if(n.length===0||n[0].readyState!=="live")try{g=await S(d.video)}catch(t){console.error("Camera recovery failed:",t)}}})}async function Y(){try{H(),d.captureBtn.disabled=!0;const n=await k(d.video,d.canvas);d.progressContainer.classList.add("active"),d.output.classList.remove("active");const t=await T(n,a=>{const s=Math.round(a*100);d.progressFill.style.width=`${s}%`,d.progressText.textContent=`${s}%`});if(d.progressContainer.classList.remove("active"),!t||t.trim().length===0){f("テキストを認識できませんでした。");return}d.output.classList.add("active"),d.outputText.textContent=t;const o=O(t),e=j(t);o.length===0?b(e,async a=>{const s=v(null,null,a),r=new File([n],s,{type:"image/jpeg"});await w(r)}):A(o,async a=>{if(a==="retry"){d.output.classList.remove("active");return}else a===null?b(e,async s=>{const r=v(null,null,s),i=new File([n],r,{type:"image/jpeg"});await w(i)}):b(e,async s=>{C(async r=>{const i=v(a,r,s),l=new File([n],i,{type:"image/jpeg"});await w(l)})})})}catch(n){f("処理中にエラーが発生しました: "+n.message),console.error("Capture error:",n)}finally{d.captureBtn.disabled=!1}}async function w(n){await N(n,n.name)||f("共有に失敗しました。手動でダウンロードしてください。")}function f(n){d.error.textContent=n,d.error.classList.add("active")}function H(){d.error.classList.remove("active")}W();
