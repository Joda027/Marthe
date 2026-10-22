/* ---------------- logo ---------------- */
const LOGO_DATA = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDgiIGZpbGw9IiMxRTEwMTciIHN0cm9rZT0iI0M2QTI0RCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0M2QTI0RCIgc3Ryb2tlLXdpZHRoPSIwLjc1IiBvcGFjaXR5PSIwLjYiLz4KPHRleHQgeD0iNTAiIHk9IjYzIiBmb250LWZhbWlseT0iR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiBmb250LXNpemU9IjM0IiBmb250LXN0eWxlPSJpdGFsaWMiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNERkM5OEMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlJTPC90ZXh0Pgo8L3N2Zz4K";
document.getElementById('favicon').href = LOGO_DATA;
document.getElementById('logoImgHeader').src = LOGO_DATA;
document.getElementById('logoImgFooter').src = LOGO_DATA;
document.getElementById('logoImgHero').src = LOGO_DATA;

/* ---------------- data ---------------- */
const WHATSAPP_NUMBER = "224000000000"; // TODO: remplacer par le vrai numéro Rem's Store

const icons = {
  nuisette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-3 0-5 2-5 5v2l-3 9c3 2 12 2 16 0l-3-9V8c0-3-2-5-5-5z"/><path d="M9 8c1 1 5 1 6 0"/></svg>`,
  ensemble: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6c2-2 5-2 8-2s6 0 8 2l-2 3-2-1v10H8V8l-2 1z"/></svg>`,
  body: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3h6l1 5-2 2v9a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-9L8 8z"/></svg>`,
  slip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h16l-1 6c-1 5-4 8-7 8s-6-3-7-8z"/><path d="M4 5l1 4M20 5l-1 4"/></svg>`,
  menotte: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M11 12h2"/></svg>`,
  bijoux3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 22c0-3 2.5-5 6-5s6 2 6 5"/></svg>`,
  montre: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 9v3l2 1"/><path d="M9 3h6M9 21h6"/></svg>`,
  contour: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="8" width="12" height="10" rx="1.5"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></svg>`,
  concealer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="9" y="3" width="6" height="6" rx="1"/><path d="M10 9v10a2 2 0 0 0 4 0V9"/></svg>`,
  sourcil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 15c3-6 13-6 16 0"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>`,
  autre: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6 2 9.2h7.6z"/></svg>`,
};
const iconLabels = {
  nuisette:"Nuisette", ensemble:"Ensemble", body:"Body-suit", slip:"Slip",
  menotte:"Accessoire", bijoux3:"Bijoux 3 pièces", montre:"Montre",
  contour:"Contour", concealer:"Concealer", sourcil:"Sourcils", autre:"Autre"
};
const catMedia = {Lingerie:"media-lingerie", Bijoux:"media-bijoux", Maquillage:"media-maquillage"};

let productSeq = 10;
const products = [
  {id:1, name:"Robe nuisette en dentelle", cat:"Lingerie", price:150000, desc:"Nuisette longue en dentelle fine, doublure satinée.", iconKey:"nuisette", media:"media-lingerie", addedBy:"Rem's Store",
    colors:[{name:"Rouge",hex:"#9C2B41"},{name:"Noir",hex:"#1E1017"},{name:"Beige",hex:"#D9B99B"}]},
  {id:2, name:"Ensemble soutien-gorge & slip en dentelle", cat:"Lingerie", price:120000, desc:"Parure assortie en dentelle brodée, plusieurs tailles.", iconKey:"ensemble", media:"media-lingerie", addedBy:"Rem's Store",
    colors:[{name:"Noir",hex:"#1E1017"},{name:"Bordeaux",hex:"#7A1F31"}]},
  {id:3, name:"Body-suit en dentelle", cat:"Lingerie", price:130000, desc:"Body une pièce, dentelle extensible et confortable.", iconKey:"body", media:"media-lingerie", addedBy:"Rem's Store",
    colors:[{name:"Noir",hex:"#1E1017"},{name:"Blanc",hex:"#F3E9E2"}]},
  {id:4, name:"Slips en dentelle (lot de 3)", cat:"Lingerie", price:40000, desc:"Lot de 3 slips assortis, coloris variés.", iconKey:"slip", media:"media-lingerie", addedBy:"Rem's Store", colors:[]},
  {id:5, name:"Menottes accessoire", cat:"Lingerie", price:60000, desc:"Accessoire satiné, finition doublée.", iconKey:"menotte", media:"media-lingerie", addedBy:"Rem's Store",
    colors:[{name:"Noir",hex:"#1E1017"},{name:"Rouge",hex:"#9C2B41"}]},
  {id:6, name:"Ensemble 3 pièces", cat:"Bijoux", price:90000, desc:"Collier, bracelet et boucles d'oreilles assortis.", iconKey:"bijoux3", media:"media-bijoux", addedBy:"Rem's Store",
    colors:[{name:"Doré",hex:"#C6A24D"},{name:"Argenté",hex:"#C6C6C6"}]},
  {id:7, name:"Ensemble montre-bracelet", cat:"Bijoux", price:150000, desc:"Montre et bracelet dorés, coffret inclus.", iconKey:"montre", media:"media-bijoux", addedBy:"Rem's Store",
    colors:[{name:"Doré",hex:"#C6A24D"},{name:"Argenté",hex:"#C6C6C6"},{name:"Noir",hex:"#1E1017"}]},
  {id:8, name:"Contour visage", cat:"Maquillage", price:70000, desc:"Palette de contouring, longue tenue.", iconKey:"contour", media:"media-maquillage", addedBy:"Rem's Store",
    colors:[{name:"Clair",hex:"#E8C9A0"},{name:"Médium",hex:"#C68642"},{name:"Foncé",hex:"#8D5524"}]},
  {id:9, name:"Concealer anti-cernes", cat:"Maquillage", price:45000, desc:"Correcteur haute couvrance, fini naturel.", iconKey:"concealer", media:"media-maquillage", addedBy:"Rem's Store",
    colors:[{name:"Clair",hex:"#E8C9A0"},{name:"Médium",hex:"#C68642"},{name:"Foncé",hex:"#8D5524"}]},
  {id:10, name:"Pommade à sourcils", cat:"Maquillage", price:35000, desc:"Tenue longue durée, application précise.", iconKey:"sourcil", media:"media-maquillage", addedBy:"Rem's Store",
    colors:[{name:"Blond",hex:"#C9A227"},{name:"Brun",hex:"#6B4226"},{name:"Noir",hex:"#1E1017"}]},
];

let activeFilter = "Tout";
let searchTerm = "";
let selectedColor = {}; // productId -> color name

const fmt = n => Math.round(n).toLocaleString('fr-FR') + " GNF";

/* ---------------- promotions ---------------- */
let promo = { enabled:false, label:"Promo de la semaine", percent:10, scope:"Tout" };

function applyPromo(product){
  if(!promo.enabled) return { finalPrice:product.price, hasPromo:false };
  if(promo.scope !== "Tout" && promo.scope !== product.cat) return { finalPrice:product.price, hasPromo:false };
  const finalPrice = Math.round(product.price * (1 - promo.percent/100));
  return { finalPrice, hasPromo:true };
}

/* ---------------- users & auth ---------------- */
let users = {
  admin: { password:"RemsAdmin2026", role:"admin", name:"Administrateur" }
};
let currentUser = null; // {username, role, name}

/* ---------------- orders (for stats) ---------------- */
let orders = []; // {date: Date, total: number, items:[{name, qty}]}
(function seedOrders(){
  const topSellers = [products[0], products[1], products[7], products[5]];
  for(let d = 6; d >= 1; d--){
    const date = new Date();
    date.setDate(date.getDate() - d);
    const count = Math.floor(Math.random()*3); // 0-2 orders that day
    for(let i=0;i<count;i++){
      const p = topSellers[Math.floor(Math.random()*topSellers.length)];
      const qty = 1 + Math.floor(Math.random()*2);
      orders.push({ date:new Date(date), total:p.price*qty, items:[{name:p.name, qty}] });
    }
  }
})();

/* ================= PRODUCT GRID (boutique) ================= */
function renderGrid(){
  const grid = document.getElementById('productGrid');
  const filtered = products.filter(p=>{
    const matchCat = activeFilter === "Tout" || p.cat === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
  document.getElementById('countLabel').textContent = filtered.length + (filtered.length>1 ? " articles" : " article");
  grid.innerHTML = filtered.map(p => {
    const { finalPrice, hasPromo } = applyPromo(p);
    const curColor = selectedColor[p.id] || (p.colors && p.colors[0] ? p.colors[0].name : null);
    const swatches = (p.colors && p.colors.length) ? `
      <div class="swatch-row" data-swatch-for="${p.id}">
        ${p.colors.map(c => `<span class="swatch ${c.name===curColor?'active':''}" style="background:${c.hex}" data-id="${p.id}" data-color="${c.name}" title="${c.name}"></span>`).join('')}
        <span class="swatch-label">${curColor||''}</span>
      </div>` : '';
    return `
    <div class="card">
      <div class="card-media ${p.media}">
        <span class="tag-onmedia">${p.cat}</span>
        ${icons[p.iconKey] || icons.autre}
      </div>
      <div class="card-body">
        <h4>${p.name}</h4>
        <p class="desc">${p.desc}</p>
        ${swatches}
        <div class="price-row">
          <span class="price">
            ${hasPromo ? `<span class="price-old">${p.price.toLocaleString('fr-FR')}</span>`:''}
            ${finalPrice.toLocaleString('fr-FR')}<span class="cur">GNF</span>
            ${hasPromo ? `<span class="promo-tag">${promo.label}</span>`:''}
          </span>
        </div>
        <div class="card-actions">
          <button class="btn btn-outline btn-sm" data-add="${p.id}">Ajouter au panier</button>
          <a class="btn btn-whatsapp btn-sm" target="_blank" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour Rem's Store, je souhaite commander : ${p.name}${curColor?' - '+curColor:''} (${fmt(finalPrice)})`)}">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// delegated events on product grid: swatches + add-to-cart
document.getElementById('productGrid').addEventListener('click', e=>{
  const sw = e.target.closest('.swatch');
  if(sw){
    selectedColor[sw.dataset.id] = sw.dataset.color;
    renderGrid();
    return;
  }
  const addBtn = e.target.closest('[data-add]');
  if(addBtn){
    addToCart(Number(addBtn.dataset.add));
  }
});

function setFilter(cat){
  activeFilter = cat;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
  document.querySelectorAll('.cat-card').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  renderGrid();
}

document.getElementById('chipRow').addEventListener('click', e=>{
  const chip = e.target.closest('.chip');
  if(chip) setFilter(chip.dataset.filter);
});
document.querySelectorAll('.cat-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    setFilter(card.dataset.cat);
    document.getElementById('produits').scrollIntoView({behavior:'smooth'});
  });
});
document.querySelectorAll('[data-cat-link]').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    setFilter(link.dataset.catLink);
    document.getElementById('produits').scrollIntoView({behavior:'smooth'});
  });
});
document.getElementById('searchInput').addEventListener('input', e=>{
  searchTerm = e.target.value;
  renderGrid();
});

/* ================= CART ================= */
let cart = {}; // key -> {id,name,color,qty,unitPrice,media,iconKey}
let cartSeq = 0;

function findCartKey(id, color){
  return Object.keys(cart).find(k => cart[k].id===id && cart[k].color===color);
}
function addToCart(id){
  const p = products.find(p=>p.id===id);
  if(!p) return;
  const color = selectedColor[id] || (p.colors && p.colors[0] ? p.colors[0].name : null);
  const { finalPrice } = applyPromo(p);
  let key = findCartKey(id, color);
  if(key){
    cart[key].qty += 1;
  } else {
    key = 'c' + (cartSeq++);
    cart[key] = { id, name:p.name, color, qty:1, unitPrice:finalPrice, media:p.media, iconKey:p.iconKey };
  }
  updateCartUI();
  showToast("Article ajouté au panier");
}
function changeQty(key, delta){
  if(!cart[key]) return;
  cart[key].qty += delta;
  if(cart[key].qty <= 0) delete cart[key];
  updateCartUI();
}
function removeItem(key){
  delete cart[key];
  updateCartUI();
}
function cartCount(){
  return Object.values(cart).reduce((a,it)=>a+it.qty,0);
}
function cartTotal(){
  return Object.values(cart).reduce((sum,it)=>sum + it.unitPrice*it.qty, 0);
}
function updateCartUI(){
  document.getElementById('cartBadge').textContent = cartCount();
  const itemsWrap = document.getElementById('drawerItems');
  const entries = Object.entries(cart);
  if(entries.length === 0){
    itemsWrap.innerHTML = `<div class="drawer-empty">Votre panier est vide.<br>Ajoutez un article pour commencer.</div>`;
  } else {
    itemsWrap.innerHTML = entries.map(([key,it])=>`
      <div class="drawer-item">
        <div class="thumb ${it.media}">${icons[it.iconKey]||icons.autre}</div>
        <div class="drawer-item-info">
          <h6>${it.name}${it.color ? ' <span style="font-weight:400; color:rgba(58,37,48,0.55);">— '+it.color+'</span>' : ''}</h6>
          <div class="meta">
            <button class="qty-btn" data-qty="${key}" data-delta="-1">−</button>
            ${it.qty}
            <button class="qty-btn" data-qty="${key}" data-delta="1">+</button>
            <span>${fmt(it.unitPrice*it.qty)}</span>
            <span class="remove-link" data-remove="${key}">retirer</span>
          </div>
        </div>
      </div>`).join('');
  }
  document.getElementById('cartTotal').textContent = fmt(cartTotal());
}
document.getElementById('drawerItems').addEventListener('click', e=>{
  const qtyBtn = e.target.closest('[data-qty]');
  if(qtyBtn){ changeQty(qtyBtn.dataset.qty, Number(qtyBtn.dataset.delta)); return; }
  const rm = e.target.closest('[data-remove]');
  if(rm){ removeItem(rm.dataset.remove); }
});

document.getElementById('checkoutBtn').addEventListener('click', e=>{
  e.preventDefault();
  const entries = Object.values(cart);
  const msgLines = entries.map(it => `• ${it.name}${it.color?' - '+it.color:''} x${it.qty} — ${fmt(it.unitPrice*it.qty)}`);
  const msg = entries.length
    ? `Bonjour Rem's Store, je souhaite commander :%0A${msgLines.join('%0A')}%0A%0ATotal : ${fmt(cartTotal())}`
    : `Bonjour Rem's Store, je souhaite passer commande.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  if(entries.length){
    orders.push({ date:new Date(), total:cartTotal(), items: entries.map(it=>({name:it.name, qty:it.qty})) });
    cart = {};
    updateCartUI();
    closeCart();
    showToast("Commande envoyée sur WhatsApp");
  }
});

function openCart(){
  document.getElementById('drawer').classList.add('show');
  document.getElementById('overlay').classList.add('show');
}
function closeCart(){
  document.getElementById('drawer').classList.remove('show');
  document.getElementById('overlay').classList.remove('show');
}

let toastTimer;
function showToast(text){
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ================= LOGIN ================= */
function openLogin(){
  document.getElementById('loginModal').classList.add('show');
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}
function closeLogin(){
  document.getElementById('loginModal').classList.remove('show');
}
function attemptLogin(){
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  const rec = users[u];
  if(rec && rec.password === p){
    currentUser = { username:u, role:rec.role, name:rec.name };
    closeLogin();
    openAdmin();
  } else {
    document.getElementById('loginError').classList.add('show');
  }
}
function logout(){
  currentUser = null;
  closeAdmin();
}

/* ================= ADMIN DASHBOARD ================= */
function openAdmin(){
  if(!currentUser) return;
  document.getElementById('adminOverlay').classList.add('show');
  document.getElementById('logoImgAdmin').src = LOGO_DATA;
  document.getElementById('whoName').textContent = currentUser.name;
  document.getElementById('whoRole').textContent = currentUser.role === 'admin' ? '(Administrateur)' : '(Collaborateur)';
  document.querySelectorAll('.admin-only').forEach(el=>{
    el.style.display = currentUser.role === 'admin' ? '' : 'none';
  });
  switchAdminPanel('dashboard');
}
function closeAdmin(){
  document.getElementById('adminOverlay').classList.remove('show');
}
document.getElementById('adminSidebar').addEventListener('click', e=>{
  const item = e.target.closest('.admin-nav-item');
  if(item) switchAdminPanel(item.dataset.panel);
});
function switchAdminPanel(name){
  if(name === 'equipe' && currentUser.role !== 'admin') name = 'dashboard';
  document.querySelectorAll('.admin-nav-item').forEach(b=>b.classList.toggle('active', b.dataset.panel===name));
  document.querySelectorAll('.admin-panel').forEach(p=>p.classList.toggle('active', p.id==='panel-'+name));
  if(name==='dashboard') renderDashboard();
  if(name==='produits') renderProductsAdmin();
  if(name==='promotions') renderPromoForm();
  if(name==='equipe') renderTeam();
}

/* ---- dashboard / stats ---- */
function renderDashboard(){
  const revenue = orders.reduce((s,o)=>s+o.total,0);
  const count = orders.length;
  const avg = count ? revenue/count : 0;
  document.getElementById('statRevenue').textContent = fmt(revenue);
  document.getElementById('statOrders').textContent = count;
  document.getElementById('statAvg').textContent = fmt(avg);

  const tally = {};
  orders.forEach(o => o.items.forEach(it => { tally[it.name] = (tally[it.name]||0) + it.qty; }));
  let topName = '—', topQty = 0;
  Object.entries(tally).forEach(([name,qty])=>{ if(qty>topQty){ topQty=qty; topName=name; } });
  document.getElementById('statTop').textContent = topQty ? `${topName} (${topQty})` : '—';

  // weekly chart: last 7 days, Lun -> Dim order
  const days = [];
  for(let d=6; d>=0; d--){
    const date = new Date();
    date.setDate(date.getDate()-d);
    date.setHours(0,0,0,0);
    days.push(date);
  }
  const labels = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  const counts = days.map(date=>{
    return orders.filter(o=>{
      const od = new Date(o.date); od.setHours(0,0,0,0);
      return od.getTime() === date.getTime();
    }).length;
  });
  const max = Math.max(1, ...counts);
  document.getElementById('weeklyChart').innerHTML = days.map((date,i)=>`
    <div class="bar-col">
      <div class="bar-val">${counts[i]}</div>
      <div class="bar" style="height:${(counts[i]/max*100).toFixed(0)}%"></div>
      <div class="bar-label">${labels[date.getDay()]}</div>
    </div>`).join('');
}

/* ---- products (admin) ---- */
let editingProductId = null;
let chipColors = [];

function populateIconSelect(){
  const sel = document.getElementById('pIcon');
  sel.innerHTML = Object.keys(iconLabels).map(k=>`<option value="${k}">${iconLabels[k]}</option>`).join('');
}
function addColorChip(){
  const hex = document.getElementById('pColorHex').value;
  const name = document.getElementById('pColorName').value.trim();
  if(!name) return;
  chipColors.push({name, hex});
  document.getElementById('pColorName').value = '';
  renderColorChips();
}
function renderColorChips(){
  document.getElementById('colorChipList').innerHTML = chipColors.map((c,i)=>`
    <span class="color-chip"><span class="dot" style="background:${c.hex}"></span>${c.name}<span class="x" data-rm-chip="${i}">×</span></span>
  `).join('');
}
document.getElementById('colorChipList').addEventListener('click', e=>{
  const x = e.target.closest('[data-rm-chip]');
  if(x){ chipColors.splice(Number(x.dataset.rmChip),1); renderColorChips(); }
});

function resetProductForm(){
  editingProductId = null;
  chipColors = [];
  document.getElementById('pName').value = '';
  document.getElementById('pCat').value = 'Lingerie';
  document.getElementById('pPrice').value = '';
  document.getElementById('pIcon').value = 'autre';
  document.getElementById('pDesc').value = '';
  renderColorChips();
  document.getElementById('productFormTitle').textContent = 'Ajouter un article';
  document.getElementById('productSubmitBtn').textContent = "Ajouter l'article";
  document.getElementById('productCancelBtn').style.display = 'none';
}

function submitProductForm(){
  const name = document.getElementById('pName').value.trim();
  const cat = document.getElementById('pCat').value;
  const price = Number(document.getElementById('pPrice').value);
  const iconKey = document.getElementById('pIcon').value;
  const desc = document.getElementById('pDesc').value.trim();
  if(!name || !price){ showToast("Nom et prix requis"); return; }

  if(editingProductId){
    if(currentUser.role !== 'admin'){ showToast("Seul l'administrateur peut modifier un article"); return; }
    const p = products.find(p=>p.id===editingProductId);
    Object.assign(p, { name, cat, price, iconKey, desc, media:catMedia[cat], colors:[...chipColors] });
  } else {
    products.push({
      id: ++productSeq, name, cat, price, desc, iconKey,
      media: catMedia[cat], addedBy: currentUser.name, colors:[...chipColors]
    });
  }
  resetProductForm();
  renderProductsAdmin();
  renderGrid();
  showToast(editingProductId ? "Article modifié" : "Article ajouté");
}

function editProduct(id){
  if(currentUser.role !== 'admin') return;
  const p = products.find(p=>p.id===id);
  if(!p) return;
  editingProductId = id;
  chipColors = (p.colors||[]).map(c=>({...c}));
  document.getElementById('pName').value = p.name;
  document.getElementById('pCat').value = p.cat;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pIcon').value = p.iconKey;
  document.getElementById('pDesc').value = p.desc;
  renderColorChips();
  document.getElementById('productFormTitle').textContent = "Modifier l'article";
  document.getElementById('productSubmitBtn').textContent = "Enregistrer les modifications";
  document.getElementById('productCancelBtn').style.display = 'inline-flex';
  document.querySelector('.add-product-box').scrollIntoView({behavior:'smooth'});
}

function deleteProduct(id){
  if(currentUser.role !== 'admin') return;
  const p = products.find(p=>p.id===id);
  if(!p) return;
  if(!confirm(`Retirer "${p.name}" de la boutique ?`)) return;
  products.splice(products.findIndex(p=>p.id===id), 1);
  renderProductsAdmin();
  renderGrid();
  showToast("Article retiré");
}

function renderProductsAdmin(){
  populateIconSelect();
  document.getElementById('pIcon').value = 'autre';
  const isAdmin = currentUser.role === 'admin';
  document.getElementById('produitsNote').textContent = isAdmin
    ? "En tant qu'administrateur, vous pouvez ajouter, modifier ou retirer n'importe quel article."
    : "Vous pouvez ajouter des articles. Seul l'administrateur peut les modifier ou les retirer.";
  document.getElementById('productsTableBody').innerHTML = products.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>${p.cat}</td>
      <td>${fmt(p.price)}</td>
      <td>${(p.colors||[]).map(c=>`<span class="swatch" style="background:${c.hex}" title="${c.name}"></span>`).join(' ') || '—'}</td>
      <td>${p.addedBy}</td>
      <td>
        <div class="table-actions">
          ${isAdmin ? `<button class="icon-action" data-edit="${p.id}">Modifier</button><button class="icon-action danger" data-del="${p.id}">Retirer</button>` : ''}
        </div>
      </td>
    </tr>`).join('');
}
document.getElementById('productsTableBody').addEventListener('click', e=>{
  const ed = e.target.closest('[data-edit]');
  if(ed){ editProduct(Number(ed.dataset.edit)); return; }
  const del = e.target.closest('[data-del]');
  if(del){ deleteProduct(Number(del.dataset.del)); }
});

/* ---- promotions ---- */
function renderPromoForm(){
  document.getElementById('promoEnabled').checked = promo.enabled;
  document.getElementById('promoLabel').value = promo.label;
  document.getElementById('promoPercent').value = promo.percent;
  document.getElementById('promoScope').value = promo.scope;
  updatePromoPreview();
}
function updatePromoPreview(){
  const el = document.getElementById('promoPreview');
  if(!promo.enabled){ el.textContent = "Aucune promotion active actuellement."; return; }
  const scopeText = promo.scope === 'Tout' ? 'toute la boutique' : `la catégorie ${promo.scope}`;
  el.textContent = `« ${promo.label} » — ${promo.percent}% de réduction sur ${scopeText}, visible immédiatement sur la boutique.`;
}
function savePromo(){
  promo.enabled = document.getElementById('promoEnabled').checked;
  promo.label = document.getElementById('promoLabel').value.trim() || 'Promotion';
  promo.percent = Math.min(90, Math.max(1, Number(document.getElementById('promoPercent').value) || 10));
  promo.scope = document.getElementById('promoScope').value;
  updatePromoPreview();
  renderGrid();
  showToast("Promotion enregistrée");
}

/* ---- team (admin only) ---- */
function renderTeam(){
  document.getElementById('teamError').classList.remove('show');
  document.getElementById('tName').value = '';
  document.getElementById('tUser').value = '';
  document.getElementById('tPass').value = '';
  document.getElementById('teamTableBody').innerHTML = Object.entries(users).map(([username,rec])=>`
    <tr>
      <td>${rec.name}</td>
      <td>${username}</td>
      <td><span class="role-pill ${rec.role==='admin'?'admin':''}">${rec.role==='admin'?'Admin':'Collaborateur'}</span></td>
      <td>${rec.role!=='admin' ? `<button class="icon-action danger" data-del-team="${username}">Retirer</button>` : ''}</td>
    </tr>`).join('');
}
document.getElementById('teamTableBody').addEventListener('click', e=>{
  const del = e.target.closest('[data-del-team]');
  if(del){ deleteCollaborator(del.dataset.delTeam); }
});

function addCollaborator(){
  const name = document.getElementById('tName').value.trim();
  const username = document.getElementById('tUser').value.trim();
  const pass = document.getElementById('tPass').value;
  document.getElementById('teamError').classList.remove('show');
  if(!name || !username || !pass){ showToast("Tous les champs sont requis"); return; }
  if(users[username]){
    document.getElementById('teamError').classList.add('show');
    return;
  }
  users[username] = { password:pass, role:'collaborateur', name };
  renderTeam();
  showToast("Collaborateur ajouté");
}

function deleteCollaborator(username){
  if(username === 'admin') return;
  if(!confirm(`Retirer ${users[username].name} de l'équipe ?`)) return;
  delete users[username];
  renderTeam();
  showToast("Collaborateur retiré");
}

/* ================= INIT ================= */
resetProductForm();
renderGrid();
updateCartUI();
