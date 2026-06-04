  // ---- view switching ----
  function setView(v){
    document.querySelectorAll('.view').forEach(s=>s.classList.toggle('active', s.id==='view-'+v));
    document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.view===v));
  }
  document.querySelectorAll('.tab[data-view]').forEach(t=>t.addEventListener('click',e=>{ if(!e.target.closest('.x')) setView(t.dataset.view); }));
  document.querySelectorAll('.nav-item[data-view], .subitem[data-view]').forEach(n=>n.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item, .subitem').forEach(x=>x.classList.remove('active'));
    n.classList.add('active');
    setView(n.dataset.view);
  }));
  function toggleGroup(el){ el.parentElement.classList.toggle('open'); }
  function openModal(){ document.getElementById('overlay').classList.add('show'); }
  function closeModal(){ document.getElementById('overlay').classList.remove('show'); }
  document.getElementById('overlay').addEventListener('click',e=>{ if(e.target.id==='overlay') closeModal(); });

  // ---- calendar build (May 2026: starts Friday) ----
  const events = {
    1:[{c:'done',cust:'RS1 Bill Customer',ord:'ORD799',staff:'RS1 staff',t:'15:00 - 05:00',b:[1,1,1]}],
    21:[{c:'done',cust:'rb customer',ord:'ORD690',staff:'RB Staff',t:'15:00 - 18:00',b:[1,1,1]}],
    25:[{c:'done',cust:'rb customer',ord:'ORD781',staff:'RB Staff',t:'12:00 - 15:00',b:[1,1,1]},
        {c:'pending',cust:'rb customer',ord:'ORD796',staff:'RB Staff',t:'12:00 - 15:00',b:[0,0,0]}],
    26:[{c:'done',cust:'rb customer',ord:'ORD793',staff:'RB Staff',t:'08:30 - 11:30',b:[1,1,1]},
        {c:'partial',cust:'AV Customer',ord:'ORD798',staff:'RS staff',t:'08:30 - 11:30',b:[0,0,1]}],
    27:[{c:'pending',cust:'rb customer',ord:'ORD802',staff:'RB Staff',t:'15:00 - 17:30',b:[0,0,0]},
        {c:'done',cust:'rb customer',ord:'ORD801',staff:'RB Staff',t:'15:00 - 17:00',b:[1,1,1]}],
  };
  const grid = document.getElementById('calGrid');
  ['日','月','火','水','木','金','土'].forEach((d,i)=>{
    const el=document.createElement('div'); el.className='dow'+(i===0?' sun':i===6?' sat':''); el.textContent=d; grid.appendChild(el);
  });
  // May 1 2026 = Friday (col index 5). prev April days 26-30 in first 5 cols.
  const cells=[];
  for(let d=26; d<=30; d++) cells.push({day:d,muted:true});
  for(let d=1; d<=31; d++) cells.push({day:d,muted:false});
  while(cells.length%7!==0) cells.push({day:cells.length-35+1,muted:true,trail:true});
  cells.forEach((c,idx)=>{
    const col = idx%7;
    const div=document.createElement('div');
    div.className='cell'+(c.muted?' muted':'')+(col===0?' sun':col===6?' sat':'')+(!c.muted&&c.day===28?' today':'');
    let html='<div class="dnum">'+c.day+'</div>';
    if(!c.muted && events[c.day]){
      events[c.day].forEach(ev=>{
        const bg = ev.b.map(x=>'<span class="b '+(x?'ok':'no')+'">'+(x?'済':'未')+'</span>').join('');
        html+='<div class="ev '+ev.c+'" onclick="setView(\'form\')">'+
          '<div class="badges">'+bg+'</div>'+
          '<span class="ev-cust">'+ev.cust+'</span>'+
          '<span class="ev-meta">'+ev.ord+' ・ '+ev.staff+'</span>'+
          '<div class="ev-time"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'+ev.t+'</div>'+
        '</div>';
      });
    }
    div.innerHTML=html;
    grid.appendChild(div);
  });

  // ---- list build ----
  const rows=[
    {id:827,a:0,s:0,r:0,sf:0,bs:0,nu:0,date:'2026-05-28',no:'ORD000000804',svc:'BS',cd:'777771',name:'rb customer 3'},
    {id:826,a:1,s:1,r:1,sf:0,bs:0,nu:0,date:'2026-05-28',no:'ORD000000803',svc:'BS',cd:'777771',name:'rb customer 3'},
    {id:825,a:0,s:0,r:0,sf:0,bs:0,nu:0,date:'2026-05-27',no:'ORD000000802',svc:'CM',cd:'111999',name:'rb customer'},
    {id:824,a:1,s:1,r:1,sf:0,bs:0,nu:0,date:'2026-05-27',no:'ORD000000801',svc:'BS',cd:'111999',name:'rb customer'},
    {id:822,a:1,s:1,r:1,sf:1,bs:1,nu:1,date:'2026-05-26',no:'ORD000000799',svc:'BS',cd:'000004',name:'RS1 Bill Customer'},
    {id:821,a:0,s:0,r:1,sf:0,bs:0,nu:0,date:'2026-05-26',no:'ORD000000798',svc:'BS',cd:'000001',name:'AV Customer'},
    {id:820,a:0,s:0,r:0,sf:0,bs:0,nu:0,date:'2026-05-26',no:'ORD000000797',svc:'BS',cd:'000001',name:'AV Customer'},
    {id:819,a:0,s:0,r:0,sf:0,bs:0,nu:0,date:'2026-05-25',no:'ORD000000796',svc:'BS',cd:'111999',name:'rb customer'},
    {id:818,a:1,s:1,r:1,sf:0,bs:0,nu:0,date:'2026-05-26',no:'ORD000000795',svc:'CM',cd:'111999',name:'rb customer'},
    {id:817,a:0,s:0,r:0,sf:0,bs:0,nu:0,date:'2026-05-22',no:'ORD000000794',svc:'EH',cd:'200359',name:'フジ住宅株式会社 大阪支社'},
    {id:816,a:1,s:1,r:1,sf:0,bs:0,nu:0,date:'2026-05-26',no:'ORD000000793',svc:'CM',cd:'111999',name:'rb customer'},
  ];
  const yes='<span class="stat-yes">済</span>';
  const lb=document.getElementById('listBody');
  rows.forEach((r,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=` <td class="num">${i+1}</td>
      <td><button class="iconbtn" onclick="setView('form')"><svg viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
      <td class="num">${r.id}</td>
      <td>${r.a?yes:''}</td><td>${r.s?yes:''}</td><td>${r.r?yes:''}</td><td>${r.sf?yes:''}</td><td>${r.bs?yes:''}</td><td>${r.nu?yes:''}</td>
      <td class="num">${r.date}</td><td class="num">${r.no}</td>
      <td><span class="svc-tag svc-${r.svc.toLowerCase()}">${r.svc}</span></td>
      <td class="num">${r.cd}</td><td style="font-weight:600;">${r.name}</td>`;
    lb.appendChild(tr);
  });