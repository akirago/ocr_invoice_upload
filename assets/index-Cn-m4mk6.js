(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();async function L(a){const e={video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1440}},audio:!1};try{const t=await navigator.mediaDevices.getUserMedia(e);return a.srcObject=t,await new Promise(n=>{a.onloadedmetadata=()=>{a.play(),n()}}),t}catch(t){if(t.name==="OverconstrainedError"){const n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});return a.srcObject=n,await new Promise(o=>{a.onloadedmetadata=()=>{a.play(),o()}}),n}throw t}}async function E(a,e){const t=e.getContext("2d");return e.width=a.videoWidth,e.height=a.videoHeight,t.drawImage(a,0,0),new Promise((n,o)=>{e.toBlob(r=>{r?n(r):o(new Error("Failed to create image blob"))},"image/jpeg",.85)})}const C="modulepreload",k=function(a){return"/ocr_invoice_upload/"+a},S={},x=function(e,t,n){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(t.map(l=>{if(l=k(l),l in S)return;S[l]=!0;const u=l.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":C,u||(c.as="script"),c.crossOrigin="",c.href=l,s&&c.setAttribute("nonce",s),document.head.appendChild(c),u)return new Promise((g,h)=>{c.addEventListener("load",g),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&r(s.reason);return e().catch(r)})};let m=null;async function I(){if(m)return m;const{createWorker:a}=await x(async()=>{const{createWorker:e}=await import("./index-BZH6TDpT.js").then(t=>t.i);return{createWorker:e}},[]);return m=await a("jpn",1,{logger:e=>{e.status==="recognizing text"&&e.progress&&window.ocrProgressCallback&&window.ocrProgressCallback(e.progress)}}),m}async function D(a,e){window.ocrProgressCallback=e;try{e(0);const t=await I(),n=await O(a),{data:{text:o}}=await t.recognize(n);return e(1),o}catch(t){throw console.error("OCR error:",t),new Error("OCR処理に失敗しました")}finally{delete window.ocrProgressCallback}}function P(a){const e=[],t=[],o=a.replace(/1(\d{3})/g,"¥$1").replace(/\|(\d{3})/g,"¥$1").replace(/l(\d{3})/g,"¥$1").replace(/I(\d{3})/g,"¥$1").split(`
`);for(const l of o){const u=l.trim();if(!u)continue;const p=T(u);p!==0&&(u.includes("円")||u.includes("¥")?e.includes(p)||e.push(p):t.includes(p)||t.push(p))}e.sort((l,u)=>u-l),t.sort((l,u)=>u-l);const r=[];let i=0,s=0;for(;r.length<9&&(i<e.length||s<t.length);)i<e.length&&r.push(e[i++]),r.length<9&&s<t.length&&r.push(t[s++]);return r}function B(a){const e=[],t=[/\b(20\d{2})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})\.(0?[1-9]|1[0-2])\.(0?[1-9]|[12][0-9]|3[01])\b/g,/\b(20\d{2})年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日\b/g,/\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(20\d{2})\b/g];for(const n of t){let o;for(;(o=n.exec(a))!==null;){let r,i,s;if(n.source.includes("(0?[1-9]|1[0-2])")&&(o[3]&&o[3].length===4?(i=o[1],s=o[2],r=o[3]):(r=o[1],i=o[2],s=o[3])),r=parseInt(r,10),i=parseInt(i,10),s=parseInt(s,10),r>=2020&&r<=2030&&i>=1&&i<=12&&s>=1&&s<=31){const l=`${r}-${String(i).padStart(2,"0")}-${String(s).padStart(2,"0")}`;e.includes(l)||e.push(l)}}}return e}function T(a){let e="";for(const n of a){if(/\d/.test(n))e+=n;else if(n===","||n===".")continue;if(e.length>5)return 0}if(!e)return 0;const t=parseInt(e,10);return t>=100&&t<=3e4?t:0}function O(a){return new Promise((e,t)=>{const n=new FileReader;n.onloadend=()=>e(n.result),n.onerror=t,n.readAsDataURL(a)})}window.addEventListener("beforeunload",async()=>{m&&await m.terminate()});async function j(a,e){if(navigator.share&&navigator.canShare){const t={files:[a],title:e,text:"Save to Google Drive"};try{if(navigator.canShare(t))return await navigator.share(t),!0}catch(n){console.log("Share cancelled or failed:",n)}}return F(a,e),!1}function F(a,e){const t=URL.createObjectURL(a),n=document.createElement("a");n.href=t,n.download=e,n.style.display="none",document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(t)},100)}function v(a=null,e=null,t=null){let n;if(t)n=t;else{const r=new Date,i=r.getFullYear(),s=String(r.getMonth()+1).padStart(2,"0"),l=String(r.getDate()).padStart(2,"0");n=`${i}-${s}-${l}`}let o=n;return a&&(o+=`_${a}`),e&&(o+=`_${e}`),`${o}.jpg`}function R(a,e){const t=document.createElement("div");t.className="dialog-backdrop",t.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">金額を選択してください</h3>
      <div class="dialog-options">
        ${a.map((i,s)=>`
          <button class="dialog-option" data-value="${i}">
            ¥${i.toLocaleString()}
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
  `;const n=t.querySelector("#manual-amount-input"),o=t.querySelector(".dialog-manual"),r=i=>{if(i.target.classList.contains("dialog-option")){const s=i.target.dataset.value;s==="manual"?(n.style.display="block",o.style.display="none",n.focus()):s==="retry"?(t.remove(),e("retry")):(t.remove(),e(s==="none"?null:s))}};n.addEventListener("keypress",i=>{if(i.key==="Enter"){const s=parseInt(n.value,10);s>=100&&s<=3e4?(t.remove(),e(String(s))):(n.style.borderColor="#f44336",setTimeout(()=>{n.style.borderColor="#4285f4"},1e3))}}),n.addEventListener("blur",i=>{setTimeout(()=>{t.contains(n)&&!n.value&&(n.style.display="none",o.style.display="block")},200)}),t.addEventListener("click",r),document.body.appendChild(t)}function U(a){const e=[{id:"kaigi",label:"会議"},{id:"kousai",label:"交際"},{id:"koutuuhi",label:"交通費"},{id:"iryou",label:"医療"}],t=document.createElement("div");t.className="dialog-backdrop",t.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">項目を選択してください</h3>
      <div class="dialog-options">
        ${e.map(o=>`
          <button class="dialog-option" data-value="${o.id}">
            ${o.label}
          </button>
        `).join("")}
      </div>
    </div>
  `;const n=o=>{if(o.target.classList.contains("dialog-option")){const r=o.target.dataset.value;t.remove(),a(r)}};t.addEventListener("click",n),document.body.appendChild(t)}function b(a,e){const t=new Date,n=new Date(t);n.setDate(n.getDate()-1);const o=c=>{const g=c.getFullYear(),h=String(c.getMonth()+1).padStart(2,"0"),$=String(c.getDate()).padStart(2,"0");return`${g}-${h}-${$}`},r=o(t),i=o(n),s=document.createElement("div");s.className="dialog-backdrop",s.innerHTML=`
    <div class="dialog">
      <h3 class="dialog-title">日付を選択してください</h3>
      <div class="dialog-options">
        <button class="dialog-option" data-value="${r}">
          今日 (${r})
        </button>
        <button class="dialog-option" data-value="${i}">
          昨日 (${i})
        </button>
        ${a.map(c=>`
          <button class="dialog-option" data-value="${c}">
            画像から読み取った日付 (${c})
          </button>
        `).join("")}
        <button class="dialog-option dialog-manual" data-value="manual">
          📅 手動で選ぶ
        </button>
        <input type="date" class="dialog-date-input" id="manual-date-input" value="${r}" style="display: none;">
        <button class="dialog-option" data-value="none">
          選択しない
        </button>
      </div>
    </div>
  `;const l=s.querySelector("#manual-date-input"),u=s.querySelector(".dialog-manual"),p=c=>{if(c.target.classList.contains("dialog-option")){const g=c.target.dataset.value;g==="manual"?(l.style.display="block",u.style.display="none",l.focus(),l.showPicker()):(s.remove(),e(g==="none"?null:g))}};l.addEventListener("change",c=>{const g=c.target.value;g&&(s.remove(),e(g))}),l.addEventListener("blur",c=>{setTimeout(()=>{s.contains(l)&&(l.style.display="none",u.style.display="block")},200)}),s.addEventListener("click",p),document.body.appendChild(s)}const d={video:document.getElementById("camera-video"),placeholder:document.getElementById("camera-placeholder"),captureBtn:document.getElementById("capture-btn"),progressContainer:document.getElementById("progress-container"),progressFill:document.getElementById("progress-fill"),progressText:document.getElementById("progress-text"),output:document.getElementById("output"),outputText:document.getElementById("output-text"),error:document.getElementById("error"),canvas:document.getElementById("capture-canvas")};let f=null;async function _(){try{f=await L(d.video),d.placeholder.style.display="none",d.captureBtn.disabled=!1}catch(a){y("カメラへのアクセスが拒否されました。設定を確認してください。"),console.error("Camera init error:",a)}d.captureBtn.addEventListener("click",N),document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="visible"&&f){const a=f.getVideoTracks();if(a.length===0||a[0].readyState!=="live")try{f=await L(d.video)}catch(e){console.error("Camera recovery failed:",e)}}})}async function N(){try{q(),d.captureBtn.disabled=!0;const a=await E(d.video,d.canvas);d.progressContainer.classList.add("active"),d.output.classList.remove("active");const e=await D(a,o=>{const r=Math.round(o*100);d.progressFill.style.width=`${r}%`,d.progressText.textContent=`${r}%`});if(d.progressContainer.classList.remove("active"),!e||e.trim().length===0){y("テキストを認識できませんでした。");return}d.output.classList.add("active"),d.outputText.textContent=e;const t=P(e),n=B(e);t.length===0?b(n,async o=>{const r=v(null,null,o),i=new File([a],r,{type:"image/jpeg"});await w(i)}):R(t,async o=>{if(o==="retry"){d.output.classList.remove("active");return}else o===null?b(n,async r=>{const i=v(null,null,r),s=new File([a],i,{type:"image/jpeg"});await w(s)}):U(async r=>{b(n,async i=>{const s=v(o,r,i),l=new File([a],s,{type:"image/jpeg"});await w(l)})})})}catch(a){y("処理中にエラーが発生しました: "+a.message),console.error("Capture error:",a)}finally{d.captureBtn.disabled=!1}}async function w(a){await j(a,a.name)||y("共有に失敗しました。手動でダウンロードしてください。")}function y(a){d.error.textContent=a,d.error.classList.add("active")}function q(){d.error.classList.remove("active")}_();
