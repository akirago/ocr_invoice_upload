(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();async function L(o){const t={video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1440}},audio:!1};try{const n=await navigator.mediaDevices.getUserMedia(t);return o.srcObject=n,await new Promise(r=>{o.onloadedmetadata=()=>{o.play(),r()}}),n}catch(n){if(n.name==="OverconstrainedError"){const r=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});return o.srcObject=r,await new Promise(e=>{o.onloadedmetadata=()=>{o.play(),e()}}),r}throw n}}async function E(o,t){const n=t.getContext("2d");return t.width=o.videoWidth,t.height=o.videoHeight,n.drawImage(o,0,0),new Promise((r,e)=>{t.toBlob(a=>{a?r(a):e(new Error("Failed to create image blob"))},"image/jpeg",.85)})}const C="modulepreload",k=function(o){return"/ocr_invoice_upload/"+o},S={},D=function(t,n,r){let e=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));e=Promise.allSettled(n.map(l=>{if(l=k(l),l in S)return;S[l]=!0;const g=l.endsWith(".css"),y=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${y}`))return;const c=document.createElement("link");if(c.rel=g?"stylesheet":C,g||(c.as="script"),c.crossOrigin="",c.href=l,s&&c.setAttribute("nonce",s),document.head.appendChild(c),g)return new Promise((u,h)=>{c.addEventListener("load",u),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return e.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})};let f=null;async function P(){if(f)return f;const{createWorker:o}=await D(async()=>{const{createWorker:t}=await import("./index-BZH6TDpT.js").then(n=>n.i);return{createWorker:t}},[]);return f=await o("jpn",1,{logger:t=>{t.status==="recognizing text"&&t.progress&&window.ocrProgressCallback&&window.ocrProgressCallback(t.progress)}}),f}async function x(o,t){window.ocrProgressCallback=t;try{t(0);const n=await P(),r=await j(o),{data:{text:e}}=await n.recognize(r);return t(1),e}catch(n){throw console.error("OCR error:",n),new Error("OCR処理に失敗しました")}finally{delete window.ocrProgressCallback}}function I(o){const t=[],n=[],r=o.split(`
`);for(const a of r){const i=a.trim();if(!i)continue;const s=O(i);s!==0&&(i.includes("円")||i.includes("¥")?t.includes(s)||t.push(s):n.includes(s)||n.push(s))}t.sort((a,i)=>i-a),n.sort((a,i)=>i-a);const e=[];return e.push(...t.slice(0,3)),e.push(...n.slice(0,3)),e}function B(o){const t=[],n=[/\b(20\d{2})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})\.(0?[1-9]|1[0-2])\.(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日\b/g,/\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(20\d{2})\b/g];for(const r of n){let e;for(;(e=r.exec(o))!==null;){let a,i,s;if(r.source.includes("(0?[1-9]|1[0-2])")&&(e[3]&&e[3].length===4?(i=e[1],s=e[2],a=e[3]):(a=e[1],i=e[2],s=e[3])),a=parseInt(a,10),i=parseInt(i,10),s=parseInt(s,10),a>=2020&&a<=2030&&i>=1&&i<=12&&s>=1&&s<=31){const l=`${a}-${String(i).padStart(2,"0")}-${String(s).padStart(2,"0")}`;t.includes(l)||t.push(l)}}}return t}function O(o){let t="";for(const r of o){if(/\d/.test(r))t+=r;else if(r===","||r===".")continue;if(t.length>5)return 0}if(!t)return 0;const n=parseInt(t,10);return n>=100&&n<=3e4?n:0}function j(o){return new Promise((t,n)=>{const r=new FileReader;r.onloadend=()=>t(r.result),r.onerror=n,r.readAsDataURL(o)})}window.addEventListener("beforeunload",async()=>{f&&await f.terminate()});async function T(o,t){if(navigator.share&&navigator.canShare){const n={files:[o],title:t,text:"Save to Google Drive"};try{if(navigator.canShare(n))return await navigator.share(n),!0}catch(r){console.log("Share cancelled or failed:",r)}}return F(o,t),!1}function F(o,t){const n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=t,r.style.display="none",document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r),URL.revokeObjectURL(n)},100)}function v(o=null,t=null,n=null){let r;if(n)r=n;else{const a=new Date,i=a.getFullYear(),s=String(a.getMonth()+1).padStart(2,"0"),l=String(a.getDate()).padStart(2,"0");r=`${i}-${s}-${l}`}let e=r;return o&&(e+=`_${o}`),t&&(e+=`_${t}`),`${e}.jpg`}function R(o,t){const n=document.createElement("div");n.className="dialog-backdrop",n.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">金額を選択してください</h3>
      <div class="dialog-options">
        ${o.map((e,a)=>`
          <button class="dialog-option" data-value="${e}">
            ¥${e.toLocaleString()}
          </button>
        `).join("")}
        <button class="dialog-option" data-value="none">
          上記以外
        </button>
        <button class="dialog-option dialog-retry" data-value="retry">
          📷 撮り直す
        </button>
      </div>
    </div>
  `;const r=e=>{if(e.target.classList.contains("dialog-option")){const a=e.target.dataset.value;n.remove(),t(a==="retry"?"retry":a==="none"?null:a)}};n.addEventListener("click",r),document.body.appendChild(n)}function U(o){const t=[{id:"kaigi",label:"会議"},{id:"kousai",label:"交際"},{id:"koutuuhi",label:"交通費"},{id:"iryou",label:"医療"}],n=document.createElement("div");n.className="dialog-backdrop",n.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">項目を選択してください</h3>
      <div class="dialog-options">
        ${t.map(e=>`
          <button class="dialog-option" data-value="${e.id}">
            ${e.label}
          </button>
        `).join("")}
      </div>
    </div>
  `;const r=e=>{if(e.target.classList.contains("dialog-option")){const a=e.target.dataset.value;n.remove(),o(a)}};n.addEventListener("click",r),document.body.appendChild(n)}function b(o,t){const n=new Date,r=new Date(n);r.setDate(r.getDate()-1);const e=c=>{const u=c.getFullYear(),h=String(c.getMonth()+1).padStart(2,"0"),$=String(c.getDate()).padStart(2,"0");return`${u}-${h}-${$}`},a=e(n),i=e(r),s=document.createElement("div");s.className="dialog-backdrop",s.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">日付を選択してください</h3>
      <div class="dialog-options">
        <button class="dialog-option" data-value="${a}">
          今日 (${a})
        </button>
        <button class="dialog-option" data-value="${i}">
          昨日 (${i})
        </button>
        ${o.map(c=>`
          <button class="dialog-option" data-value="${c}">
            画像から読み取った日付 (${c})
          </button>
        `).join("")}
        <button class="dialog-option dialog-manual" data-value="manual">
          📅 手動で選ぶ
        </button>
        <input type="date" class="dialog-date-input" id="manual-date-input" value="${a}" style="display: none;">
        <button class="dialog-option" data-value="none">
          選択しない
        </button>
      </div>
    </div>
  `;const l=s.querySelector("#manual-date-input"),g=s.querySelector(".dialog-manual"),y=c=>{if(c.target.classList.contains("dialog-option")){const u=c.target.dataset.value;u==="manual"?(l.style.display="block",g.style.display="none",l.focus(),l.showPicker()):(s.remove(),t(u==="none"?null:u))}};l.addEventListener("change",c=>{const u=c.target.value;u&&(s.remove(),t(u))}),l.addEventListener("blur",c=>{setTimeout(()=>{s.contains(l)&&(l.style.display="none",g.style.display="block")},200)}),s.addEventListener("click",y),document.body.appendChild(s)}const d={video:document.getElementById("camera-video"),placeholder:document.getElementById("camera-placeholder"),captureBtn:document.getElementById("capture-btn"),progressContainer:document.getElementById("progress-container"),progressFill:document.getElementById("progress-fill"),progressText:document.getElementById("progress-text"),output:document.getElementById("output"),outputText:document.getElementById("output-text"),error:document.getElementById("error"),canvas:document.getElementById("capture-canvas")};let p=null;async function _(){try{p=await L(d.video),d.placeholder.style.display="none",d.captureBtn.disabled=!1}catch(o){m("カメラへのアクセスが拒否されました。設定を確認してください。"),console.error("Camera init error:",o)}d.captureBtn.addEventListener("click",N),document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="visible"&&p){const o=p.getVideoTracks();if(o.length===0||o[0].readyState!=="live")try{p=await L(d.video)}catch(t){console.error("Camera recovery failed:",t)}}})}async function N(){try{A(),d.captureBtn.disabled=!0;const o=await E(d.video,d.canvas);d.progressContainer.classList.add("active"),d.output.classList.remove("active");const t=await x(o,e=>{const a=Math.round(e*100);d.progressFill.style.width=`${a}%`,d.progressText.textContent=`${a}%`});if(d.progressContainer.classList.remove("active"),!t||t.trim().length===0){m("テキストを認識できませんでした。");return}d.output.classList.add("active"),d.outputText.textContent=t;const n=I(t),r=B(t);n.length===0?b(r,async e=>{const a=v(null,null,e),i=new File([o],a,{type:"image/jpeg"});await w(i)}):R(n,async e=>{if(e==="retry"){d.output.classList.remove("active");return}else e===null?b(r,async a=>{const i=v(null,null,a),s=new File([o],i,{type:"image/jpeg"});await w(s)}):U(async a=>{b(r,async i=>{const s=v(e,a,i),l=new File([o],s,{type:"image/jpeg"});await w(l)})})})}catch(o){m("処理中にエラーが発生しました: "+o.message),console.error("Capture error:",o)}finally{d.captureBtn.disabled=!1}}async function w(o){await T(o,o.name)||m("共有に失敗しました。手動でダウンロードしてください。")}function m(o){d.error.textContent=o,d.error.classList.add("active")}function A(){d.error.classList.remove("active")}_();
