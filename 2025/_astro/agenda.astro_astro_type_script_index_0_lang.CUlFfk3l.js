const w=window.__starWhiteSrc,o=document.querySelector("dialog");function A(){return{tabs:Array.from(o.querySelectorAll(".modal__tabs > button")),topicPanel:o.querySelector('[data-panel="topic"]'),speakerPanel:o.querySelector('[data-panel="speaker"]')}}function R(){o.showModal(),o.offsetHeight,o.classList.add("show")}function $(){o.classList.remove("show"),setTimeout(()=>{o.close()},300)}function I(e){const{tabs:t}=A();t.forEach(n=>n.classList.remove("is-active")),e.classList.add("is-active");const s=e.dataset.tab;o.querySelectorAll(".modal__panel").forEach(n=>{n.classList.toggle("hidden",n.dataset.panel!==s)})}let i=null,_="",u="",S="";function B(e,t,s,n){i=e,_=t||"",u=s||"",S=n||"";const{topicPanel:d,speakerPanel:p}=A();if(d){const l=e.topics.map(a=>`<span class="tag">${a}</span>`).join("");let r="";e.target_audience&&e.target_audience.trim()&&(r+=`
                    <div class="modal__info-item">
                        <img src="${w}" alt="star" class="modal__info-icon" />
                        <span class="modal__info-label">目標會眾</span>
                        <span class="modal__info-separator">|</span>
                        <span class="modal__text">${e.target_audience.replace(/\n/g,"<br>")}</span>
                    </div>
                `),e.prerequisites&&e.prerequisites.trim()&&(r+=`
                    <div class="modal__info-item">
                        <img src="${w}" alt="star" class="modal__info-icon" />
                        <span class="modal__info-label">先備知識</span>
                        <span class="modal__info-separator">|</span>
                        <span class="modal__text">${e.prerequisites.replace(/\n/g,"<br>")}</span>
                    </div>
                `),e.expected_gains&&e.expected_gains.trim()&&(r+=`
                    <div class="modal__info-item">
                        <img src="${w}" alt="star" class="modal__info-icon" />
                        <span class="modal__info-label">會眾預期收穫</span>
                        <span class="modal__info-separator">|</span>
                        <span class="modal__text">${e.expected_gains.replace(/\n/g,"<br>")}</span>
                    </div>
                `),d.innerHTML=`
                <h3 class="modal__session-title">${e.title||""}</h3>
                <div class="modal__tags">${l}</div>
                <div class="modal__divider"></div>
                <p class="modal__text">${(e.description||"").replace(/\n/g,"<br>")}</p>
                ${r}
            `}if(p&&e.speaker){const l=Array.isArray(e.speaker)?e.speaker:[e.speaker];let r="";l.forEach((a,f)=>{const h=(a.title||"").split(`
`),c=h.length>1?h[0]:"",y=h.length>1?h[1]:h[0];let m="";(a.website||a.facebook||a.linkedin||a.github)&&(m='<div class="social-links">',a.website&&(m+=`<a href="${a.website}" target="_blank" rel="noopener noreferrer" aria-label="Website"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></a>`),a.facebook&&(m+=`<a href="${a.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>`),a.linkedin&&(m+=`<a href="${a.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>`),a.github&&(m+=`<a href="${a.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>`),m+="</div>"),r+=`
                    <div class="speaker__head ${l.length>1?"speaker__head-multiple":""}">
                        <img class="avatar" src="${a.avatarUrl||"/2025/avatar-demo.webp"}" alt="speaker" />
                        <div class="speaker__info">
                            <div class="name">${a.name}</div>
                            ${c?`
                            <div class="speaker__company-row">
                                <span class="company-name">${c}</span>
                                <span class="max-sm:hidden">
                                    ${m}
                                </span>
                            </div>
                            `:""}
                            <div class="title">${y}</div>
                        </div>
                    </div>
                    <div class="speaker__company-row">
                        <span class="sm:hidden">
                            ${m}
                        </span>
                    </div>
                    ${a.bio?`
                    <div class="speaker__bio-section">
                        <div class="speaker__bio-label">
                            <img src="${w}" alt="star" />
                            <span>介紹</span>
                        </div>
                        <p class="modal__text">${(a.bio||"").replace(/\n/g,"<br>")}</p>
                    </div>
                    `:""}
                    ${f<l.length-1?'<div class="modal__divider"></div>':""}
                `}),p.innerHTML=r}}function H(){if(!i||!_||!u)return;const e=`${_}-${u}-${i.room}`,t=`${window.location.origin}${window.location.pathname}#${e}`,s={title:`MOPCON 2025 - ${i.title}`,text:`${i.title}
講者: ${i.speaker?.name||"待定"}

${i.description||""}`,url:t};navigator.share?navigator.share(s).then(()=>console.log("Shared successfully")).catch(n=>console.log("Error sharing:",n)):navigator.clipboard.writeText(t).then(()=>{alert(`議程連結已複製到剪貼簿！
`+t)}).catch(n=>{console.error("Failed to copy:",n),alert("無法複製到剪貼簿")})}function P(){if(!i||!_||!u)return;const t={day1:"2025-11-08",day2:"2025-11-09"}[_];if(!t)return;const[s,n]=u.split(":").map(Number),[d,p]=(S||u).split(":").map(Number),l=new Date(t+"T"+u+":00"),r=new Date(t+"T"+(S||u)+":00"),a=g=>{const C=g.getFullYear(),D=String(g.getMonth()+1).padStart(2,"0"),x=String(g.getDate()).padStart(2,"0"),N=String(g.getHours()).padStart(2,"0"),O=String(g.getMinutes()).padStart(2,"0"),q=String(g.getSeconds()).padStart(2,"0");return`${C}${D}${x}T${N}${O}${q}`},f=a(l),h=a(r);let c=i.description||"";i.target_audience&&(c+=`\\n\\n目標會眾: ${i.target_audience}`),i.prerequisites&&(c+=`\\n先備知識: ${i.prerequisites}`),i.expected_gains&&(c+=`\\n預期收穫: ${i.expected_gains}`);const y=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//MOPCON 2025//Agenda//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",`DTSTART:${f}`,`DTEND:${h}`,`SUMMARY:${i.title}`,`DESCRIPTION:${c.replace(/\n/g,"\\n")}`,`LOCATION:MOPCON 2025 - ${i.room||""}`,i.speaker?.name?`ORGANIZER;CN=${i.speaker.name}:MAILTO:noreply@mopcon.org`:"","STATUS:CONFIRMED","TRANSP:OPAQUE",`UID:mopcon-2025-${_}-${u}-${i.room}@mopcon.org`,`DTSTAMP:${a(new Date)}`,"END:VEVENT","END:VCALENDAR"].filter(g=>g).join(`\r
`),m=new Blob([y],{type:"text/calendar;charset=utf-8"}),k=URL.createObjectURL(m),v=document.createElement("a");v.href=k,v.download=`mopcon-2025-${i.title.replace(/[\s:]/g,"-").toLowerCase()}.ics`,document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(k)}function b(e){e?history.replaceState(null,"",`#${e}`):history.replaceState(null,"",window.location.pathname)}function T(){const e=window.location.hash.slice(1);if(!e)return;const t=e.split("-");if(t.length<3)return;const s=t[0],n=t.slice(1,-1).join("-"),d=t[t.length-1];if(!document.querySelector(`.agenda__grid[data-day="${s}"]`))return;document.querySelectorAll(".agenda__grid").forEach(a=>{a.classList.toggle("hidden",a.dataset.day!==s)});const l=document.querySelector(".agenda__seg .segmented");if(l){const a=new CustomEvent("change",{detail:s});l.dispatchEvent(a)}const r=document.querySelector(`.agenda__cardbtn[data-day="${s}"][data-time-slot="${n}"][data-session*='"room":"${d}"']`);r&&setTimeout(()=>{r.click()},100)}document.addEventListener("click",e=>{const t=e.target,s=t.closest("[data-open-modal]");if(s&&o){const r=s.getAttribute("data-session"),a=s.getAttribute("data-day"),f=s.getAttribute("data-time-slot"),h=s.getAttribute("data-time-end");if(r)try{const c=JSON.parse(r);B(c,a||void 0,f||void 0,h||void 0),R(),a&&f&&c.room&&b(`${a}-${f}-${c.room}`)}catch(c){console.error("Failed to parse session data:",c)}return}if((t.closest(".modal__close")||t.closest(".modal__close_button"))&&o){$(),b();return}const d=t.closest(".modal__tabs > button");if(d&&o.contains(d)){I(d);return}const p=t.closest("[data-share-session]");if(p&&o.contains(p)){H();return}const l=t.closest("[data-add-calendar]");if(l&&o.contains(l)){P();return}});o&&(o.addEventListener("click",e=>{e.target===o&&($(),b())}),o.addEventListener("close",()=>{o.classList.remove("show")}),o.addEventListener("keydown",e=>{e.key==="Escape"&&($(),b())}));function M(){const e=document.querySelectorAll("#agenda-filters button"),t=[];e.forEach(n=>{n.classList.contains("is-selected")&&t.push(n.textContent?.trim()||"")}),document.querySelectorAll(".agenda__cardbtn").forEach(n=>{const d=n.getAttribute("data-topics");if(d)try{const p=JSON.parse(d);if(t.length===0){n.classList.remove("hidden");return}const l=p.some(r=>t.includes(r));n.classList.toggle("hidden",!l)}catch{n.classList.remove("hidden")}})}const E=document.getElementById("agenda-filters");E&&E.addEventListener("click",e=>{const t=e.target.closest("button");t&&(t.classList.toggle("is-selected"),M())});const L=document.querySelector(".agenda__seg .segmented");L&&L.addEventListener("change",e=>{const t=e.detail;document.querySelectorAll(".agenda__grid").forEach(s=>{s.classList.toggle("hidden",s.dataset.day!==t)})});M();window.location.hash&&setTimeout(()=>{T()},200);window.addEventListener("hashchange",()=>{window.location.hash?T():o&&o.open&&$()});
