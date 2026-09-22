/* COUNCIL CORE - BCM BASANT CITY */

const accounts={
    admin:{password:"admin123",role:"admin",name:"Council Administrator"},
    student:{password:"student123",role:"student",name:"Council Student"}
  };
  
  const councilMembers=[
  ["JASHANPREET SINGH","XII","Non-Medical","HEAD BOY","Cabinet"],
  ["ANWESHA PARIDA","XII","MEDICAL","HEAD GIRL","Cabinet"],
  ["DIVESH BATRA","XI","COMM. (B)","VICE HEAD BOY","Cabinet"],
  ["YASKEET KAUR","XII","HUMANITIES","VICE HEAD GIRL","Cabinet"],
  ["AKSHRA BHALLA","XII","HUMANITIES","CULTURAL SECRETARY","Cabinet"],
  ["RUCHIKA PANDEY","XI","HUMANITIES","CULTURAL SECRETARY","Cabinet"],
  ["PIYUSH","XI","COMM.(B)","ENVIRONMENTAL SECRETARY","Cabinet"],
  ["PARYANSHI","X","E","ENVIRONMENTAL SECRETARY","Cabinet"],
  ["ARYAN PATHAK","XI","Non-Medical","SPORTS SECRETARY","Cabinet"],
  ["MODIT KHANDELWAL","XI","COMM. (A)","SPORTS SECRETARY","Cabinet"],
  ["AKSHAT TRIPATHI","XI","NM","DISCIPLINE INCHARGE","Cabinet"],
  ["DISHA JAIDKA","X","E","DISCIPLINE INCHARGE","Cabinet"],
  
  ["ABHIJEET S. SIDHU","X","D","CAPTAIN","Red"],
  ["BHAVYA GUPTA","IX","C","VICE CAPTAIN","Red"],
  ["NAMAN SATHWARA","VII","C","PREFECT","Red"],
  ["NAMNEET KAUR","VII","D","PREFECT","Red"],
  ["AISHLEEN KAUR","VII","E","PREFECT","Red"],
  ["ASHNA THAKUR","VIII","B","PREFECT","Red"],
  ["MANSIRAT KAUR","VIII","D","PREFECT","Red"],
  ["ANUSHKA YADAV","IX","C","PREFECT","Red"],
  ["PARAS BENJWAL","X","C","PREFECT","Red"],
  ["KAAVYA SHARMA","IX","E","PREFECT","Red"],
  
  ["MANDEEP KAUR","XI","MEDICAL","CAPTAIN","Blue"],
  ["SARISHTI","X","E","VICE CAPTAIN","Blue"],
  ["NAVREET KAUR","VII","E","PREFECT","Blue"],
  ["SAYESHA VERMA","VIII","B","PREFECT","Blue"],
  ["SAANVI","VIII","D","PREFECT","Blue"],
  ["TAMANNA SHREYASHI","VIII","B","PREFECT","Blue"],
  ["KIRATJOT","IX","A","PREFECT","Blue"],
  ["YUVRAJ","X","E","PREFECT","Blue"],
  ["SUHANA","X","D","PREFECT","Blue"],
  ["JAPNOOR","X","D","PREFECT","Blue"],
  
  ["HARMANPREET KAUR","X","D","CAPTAIN","Orange"],
  ["SAANCHI VERMA","VIII","D","VICE CAPTAIN","Orange"],
  ["LOVELEEN","VII","A","PREFECT","Orange"],
  ["BHAVNEET KAUR","VII","C","PREFECT","Orange"],
  ["JASHANDEEP KAUR","VII","C","PREFECT","Orange"],
  ["ROOPAL","IX","B","PREFECT","Orange"],
  ["ISHIKA SHARMA","X","C","PREFECT","Orange"],
  ["HARSIMRAN KAUR","X","C","PREFECT","Orange"],
  ["SUKHMAN SINGH","VII","A","PREFECT","Orange"],
  ["RIYA","X","E","PREFECT","Orange"],
  
  ["NORAVJEET KAUR","XII","MEDICAL","CAPTAIN","Yellow"],
  ["GRACY CHAWLA","VIII","B","VICE CAPTAIN","Yellow"],
  ["MANYATA BALDUA","VII","E","PREFECT","Yellow"],
  ["OJAS SINGLA","VII","A","PREFECT","Yellow"],
  ["PRAGATI CHOPRA","VII","B","PREFECT","Yellow"],
  ["HARMAN SINGH","VIII","B","PREFECT","Yellow"],
  ["HARSIRAT KAUR","VIII","B","PREFECT","Yellow"],
  ["HARJAS KAUR","IX","D","PREFECT","Yellow"],
  ["AAYSHA RAHAMAN","X","D","PREFECT","Yellow"],
  ["KEERATJOT KAUR","X","E","PREFECT","Yellow"]
  ];
  
  const officialStudents=councilMembers.map((m,i)=>({
   id:i+1,name:m[0],class:m[1],section:m[2],post:m[3],house:m[4],
   transport:"Not specified"
  }));
  
  const defaultDuties=[
   {id:1,studentId:3,duty:"Council Coordination",date:getToday(),location:"Council Room",status:"Active"},
   {id:2,studentId:1,duty:"Morning Assembly",date:getToday(),location:"Assembly Ground",status:"Pending"},
   {id:3,studentId:13,duty:"House Duty",date:getToday(),location:"Main Block",status:"Active"}
  ];
  
  const defaultNotices=[
   {id:1,title:"Student Council Directory Updated",content:"The Council Core directory now contains the complete 2026–27 Student Council.",priority:"Important",author:"Council Administrator",date:getToday()},
   {id:2,title:"Council Room Guidelines",content:"All council members must maintain the attendance register and keep the Student Council room organised.",priority:"Normal",author:"Council Administrator",date:getToday()}
  ];
  
  function getData(key,fallback){const s=localStorage.getItem(key);if(!s){localStorage.setItem(key,JSON.stringify(fallback));return fallback}try{return JSON.parse(s)}catch{return fallback}}
  function saveData(key,data){localStorage.setItem(key,JSON.stringify(data))}
  function getToday(){return new Date().toISOString().split("T")[0]}
  
  let students=getData("cc_students_2026_27",officialStudents);
  if(students.length!==52 || !students.some(s=>s.name==="DIVESH BATRA")){students=officialStudents;saveData("cc_students_2026_27",students)}
  let duties=getData("cc_duties",defaultDuties);
  let notices=getData("cc_notices",defaultNotices);
  let logs=getData("cc_logs",[]);
  let currentUser=null;
  
  document.getElementById("loginForm").addEventListener("submit",e=>{
   e.preventDefault();
   const username=document.getElementById("username").value.trim().toLowerCase();
   const password=document.getElementById("password").value;
   const role=document.getElementById("loginRole").value;
   const a=accounts[username];
   if(a&&a.password===password&&a.role===role){currentUser={username,role,name:a.name};sessionStorage.setItem("cc_user",JSON.stringify(currentUser));initializeApp()}
   else showToast("Invalid username, password or access level.");
  });
  
  const saved=sessionStorage.getItem("cc_user");if(saved){try{currentUser=JSON.parse(saved);initializeApp()}catch{}}
  
  function initializeApp(){
   document.getElementById("loginScreen").classList.add("hidden");document.getElementById("app").classList.remove("hidden");
   document.getElementById("sidebarUsername").textContent=currentUser.name;
   document.getElementById("sidebarRole").textContent=currentUser.role==="admin"?"Administrator":"Student";
   document.getElementById("welcomeName").textContent=currentUser.name.split(" ")[0];
   const initials=currentUser.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
   document.getElementById("userAvatar").textContent=initials;document.getElementById("topAvatar").textContent=initials;
   document.querySelectorAll(".admin-only").forEach(x=>x.style.display=currentUser.role==="admin"?"":"none");
   updateDate();renderEverything();
  }
  
  document.getElementById("logoutBtn").onclick=()=>{sessionStorage.removeItem("cc_user");location.reload()};
  
  document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>showSection(b.dataset.section));
  function showSection(id){
   document.querySelectorAll(".page-section").forEach(s=>s.classList.remove("active-section"));
   document.getElementById(id).classList.add("active-section");
   document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.section===id));
   const titles={dashboard:"Dashboard",duties:"Duty Allocator",students:"Student Council",houses:"House Management",notices:"Notice Board",logs:"Edit Logs"};
   document.getElementById("pageTitle").textContent=titles[id];
  }
  function updateDate(){document.getElementById("currentDate").textContent=new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}
  
  function renderEverything(){renderStats();renderDashboard();renderStudents();renderDuties();renderHouses();renderNotices();renderLogs();populateDutyStudents()}
  function renderStats(){document.getElementById("totalStudents").textContent=students.length;document.getElementById("totalDuties").textContent=duties.length;document.getElementById("totalHouses").textContent=5;document.getElementById("totalNotices").textContent=notices.length}
  
  function renderDashboard(){
   const n=document.getElementById("dashboardNotices");const latest=notices.slice().reverse().slice(0,4);
   n.innerHTML=latest.length?latest.map(x=>`<div class="notice-mini"><strong>${esc(x.title)}</strong><p>${esc(x.content).slice(0,110)}...</p></div>`).join(""):`<div class="empty-state">No notices published.</div>`;
   const d=document.getElementById("dashboardDuties");const td=duties.filter(x=>x.date===getToday());
   d.innerHTML=td.length?td.map(x=>{const s=findStudent(x.studentId);return `<div class="notice-mini"><strong>${esc(x.duty)}</strong><p>${s?esc(s.name):"Unknown"} · ${esc(x.location)}</p></div>`}).join(""):`<div class="empty-state">No duties for today.</div>`;
  }
  
  function renderStudents(){
   const c=document.getElementById("studentsGrid"),q=(document.getElementById("studentSearch").value||"").toLowerCase(),h=document.getElementById("houseFilter").value,t=document.getElementById("transportFilter").value;
   const list=students.filter(s=>(`${s.name} ${s.class} ${s.section} ${s.post}`).toLowerCase().includes(q)&&(h==="all"||s.house===h)&&(t==="all"||s.transport===t));
   c.innerHTML=list.length?list.map(s=>`<div class="student-card"><div class="student-top"><div class="student-avatar">${initials(s.name)}</div><div><h3>${esc(s.name)}</h3><div class="class-name">${esc(s.class)} ${esc(s.section)}</div><div class="post-name">${esc(s.post)}</div></div></div><div class="student-details"><div class="detail-box"><span>House</span><strong>${esc(s.house)}</strong></div><div class="detail-box"><span>Conveyance</span><strong>${esc(s.transport)}</strong></div></div>${currentUser.role==="admin"?`<button class="table-action" style="margin-top:15px" onclick="deleteStudent(${s.id})">Remove Student</button>`:""}</div>`).join(""):`<div class="empty-state">No students found.</div>`;
  }
  
  document.getElementById("studentSearch").oninput=renderStudents;document.getElementById("houseFilter").onchange=renderStudents;document.getElementById("transportFilter").onchange=renderStudents;
  
  function renderHouses(){
   const c=document.getElementById("housesGrid"),houses=["Cabinet","Red","Blue","Orange","Yellow"];
   c.innerHTML=houses.map(h=>{const ms=students.filter(s=>s.house===h);return `<div class="house-card"><div class="house-icon">${h==="Cabinet"?"C":h[0]}</div><h2>${h}${h==="Cabinet"?"":" House"}</h2><div class="count">${ms.length}</div><div class="house-members">${ms.map(s=>esc(s.name)).join(", ")||"No members assigned."}</div></div>`}).join("");
  }
  
  function renderDuties(){
   const body=document.getElementById("dutiesTable"),q=(document.getElementById("dutySearch").value||"").toLowerCase(),f=document.getElementById("dutyFilter").value;
   const list=duties.filter(d=>{const s=findStudent(d.studentId);return `${d.duty} ${d.location} ${s?.name||""}`.toLowerCase().includes(q)&&(f==="all"||d.status===f)});
   body.innerHTML=list.length?list.map(d=>{const s=findStudent(d.studentId);return `<tr><td><strong>${s?esc(s.name):"Unknown"}</strong></td><td>${s?esc(s.house):"—"}</td><td>${esc(d.duty)}</td><td>${formatDate(d.date)}</td><td>${esc(d.location)}</td><td><span class="status">${esc(d.status)}</span></td><td>${currentUser.role==="admin"?`<button class="table-action" onclick="deleteDuty(${d.id})">Delete</button>`:"—"}</td></tr>`}).join(""):`<tr><td colspan="7"><div class="empty-state">No duties found.</div></td></tr>`;
  }
  document.getElementById("dutySearch").oninput=renderDuties;document.getElementById("dutyFilter").onchange=renderDuties;
  
  function populateDutyStudents(){document.getElementById("dutyStudent").innerHTML=students.map(s=>`<option value="${s.id}">${esc(s.name)} — ${esc(s.house)}</option>`).join("")}
  function openDutyModal(){if(!isAdmin())return;populateDutyStudents();document.getElementById("dutyDate").value=getToday();document.getElementById("dutyModal").classList.add("show")}
  document.getElementById("dutyForm").onsubmit=e=>{
   e.preventDefault();if(!isAdmin())return;
   const d={id:Date.now(),studentId:+document.getElementById("dutyStudent").value,duty:document.getElementById("dutyName").value.trim(),date:document.getElementById("dutyDate").value,location:document.getElementById("dutyLocation").value.trim(),status:document.getElementById("dutyStatus").value};
   duties.push(d);saveData("cc_duties",duties);const s=findStudent(d.studentId);addLog("Allocated duty",`${d.duty} assigned to ${s?.name||"student"}`);closeModal("dutyModal");e.target.reset();renderEverything();showToast("Duty allocated successfully.");
  };
  function deleteDuty(id){if(!isAdmin())return;const d=duties.find(x=>x.id===id);if(!d||!confirm("Delete this duty allocation?"))return;duties=duties.filter(x=>x.id!==id);saveData("cc_duties",duties);addLog("Deleted duty",`Duty "${d.duty}" was deleted.`);renderEverything();showToast("Duty deleted.")}
  
  function openStudentModal(){if(isAdmin())document.getElementById("studentModal").classList.add("show")}
  document.getElementById("studentForm").onsubmit=e=>{
   e.preventDefault();if(!isAdmin())return;
   const s={id:Date.now(),name:document.getElementById("studentName").value.trim(),class:document.getElementById("studentClass").value.trim(),section:document.getElementById("studentSection").value.trim(),post:document.getElementById("studentPost").value.trim(),house:document.getElementById("studentHouse").value,transport:document.getElementById("studentTransport").value};
   students.push(s);saveData("cc_students_2026_27",students);addLog("Added student",`${s.name} was added to ${s.house}.`);closeModal("studentModal");e.target.reset();renderEverything();showToast("Student added.");
  };
  function deleteStudent(id){if(!isAdmin())return;const s=findStudent(id);if(!s||!confirm(`Remove ${s.name} from the directory?`))return;students=students.filter(x=>x.id!==id);saveData("cc_students_2026_27",students);addLog("Removed student",`${s.name} was removed.`);renderEverything();showToast("Student removed.")}
  
  function renderNotices(){
   const c=document.getElementById("noticesGrid"),list=notices.slice().reverse();
   c.innerHTML=list.length?list.map(n=>`<div class="notice-card ${n.priority==="Urgent"?"urgent":""}"><p class="eyebrow">${esc(n.priority)}</p><h2>${esc(n.title)}</h2><p>${esc(n.content)}</p><div class="notice-meta"><span>${esc(n.author)} · ${formatDate(n.date)}</span>${currentUser.role==="admin"?`<button class="table-action" onclick="deleteNotice(${n.id})">Delete</button>`:""}</div></div>`).join(""):`<div class="empty-state">No notices published.</div>`;
  }
  function openNoticeModal(){if(isAdmin())document.getElementById("noticeModal").classList.add("show")}
  document.getElementById("noticeForm").onsubmit=e=>{
   e.preventDefault();if(!isAdmin())return;const n={id:Date.now(),title:document.getElementById("noticeTitle").value.trim(),content:document.getElementById("noticeContent").value.trim(),priority:document.getElementById("noticePriority").value,author:currentUser.name,date:getToday()};notices.push(n);saveData("cc_notices",notices);addLog("Published notice",`Notice "${n.title}" was published.`);closeModal("noticeModal");e.target.reset();renderEverything();showToast("Notice published.");
  };
  function deleteNotice(id){if(!isAdmin())return;const n=notices.find(x=>x.id===id);if(!n||!confirm("Delete this notice?"))return;notices=notices.filter(x=>x.id!==id);saveData("cc_notices",notices);addLog("Deleted notice",`Notice "${n.title}" was deleted.`);renderEverything();showToast("Notice deleted.")}
  
  function addLog(action,details){logs.push({id:Date.now(),date:new Date().toISOString(),user:currentUser?.name||"System",action,details});saveData("cc_logs",logs);renderLogs()}
  function renderLogs(){const b=document.getElementById("logsTable");b.innerHTML=logs.length?logs.slice().reverse().map(l=>`<tr><td>${formatDateTime(l.date)}</td><td>${esc(l.user)}</td><td><strong>${esc(l.action)}</strong></td><td>${esc(l.details)}</td></tr>`).join(""):`<tr><td colspan="4"><div class="empty-state">No activity recorded.</div></td></tr>`}
  function clearLogs(){if(!isAdmin()||!confirm("Clear the complete edit log?"))return;logs=[];saveData("cc_logs",logs);renderLogs();showToast("Edit logs cleared.")}
  function closeModal(id){document.getElementById(id).classList.remove("show")}
  document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));
  
  function findStudent(id){return students.find(s=>s.id===Number(id))}
  function isAdmin(){return currentUser?.role==="admin"}
  function initials(n){return n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}
  function formatDate(d){return d?new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"}
  function formatDateTime(d){return new Date(d).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
  function esc(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
  let toastTimer;function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),3000)}
  