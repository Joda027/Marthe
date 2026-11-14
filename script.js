
/* ---------------- Supabase ---------------- */
const SUPABASE_URL = "https://zcuxxoeiflpyrmlhwxlb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_kMRsQDrsw775x-97u1Zs9w_d_dsAA07";
if(!window.supabase){
  document.addEventListener('DOMContentLoaded', () => {
    const t = document.getElementById('toast');
    if(t){ t.textContent = "Erreur de connexion au serveur. Rechargez la page."; t.classList.add('show'); }
  });
  throw new Error("Supabase JS n'a pas pu se charger (CDN injoignable ou bloqué).");
}
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

let products = []; // loaded from Supabase

async function loadProducts(){
  const { data, error } = await supabaseClient.from('products').select('*').order('id');
  if(error){ console.error('loadProducts', error); showToast("Erreur de chargement des produits"); return; }
  products = data.map(p => ({
    id: p.id, name: p.name, cat: p.cat, price: p.price, desc: p.description || '',
    iconKey: p.icon_key, media: catMedia[p.cat] || 'media-lingerie', addedBy: p.added_by,
    isNew: p.is_new, colors: p.colors || []
  }));
}

let activeFilter = "Tout";
let searchTerm = "";
let selectedColor = {}; // productId -> color name
let wishlist = new Set(); // productId

const fmt = n => Math.round(n).toLocaleString('fr-FR') + " GNF";

/* ---------------- promotions ---------------- */
let promo = { enabled:false, label:"Promo de la semaine", percent:10, scope:"Tout" };

async function loadPromo(){
  const { data, error } = await supabaseClient.from('promotions').select('*').eq('id', 1).single();
  if(error){ console.error('loadPromo', error); return; }
  promo = { enabled: data.enabled, label: data.label, percent: data.percent, scope: data.scope };
}

function applyPromo(product){
  if(!promo.enabled) return { finalPrice:product.price, hasPromo:false };
  if(promo.scope !== "Tout" && promo.scope !== product.cat) return { finalPrice:product.price, hasPromo:false };
  const finalPrice = Math.round(product.price * (1 - promo.percent/100));
  return { finalPrice, hasPromo:true };
}

/* ---------------- users & auth ---------------- */
let currentUser = null; // {id, role, name}

async function setCurrentUserFromSession(session){
  if(!session){ currentUser = null; return; }
  const { data: profile, error } = await supabaseClient.from('profiles').select('*').eq('id', session.user.id).single();
  if(error || !profile){
    currentUser = { id: session.user.id, role: 'collaborateur', name: session.user.email };
  } else {
    currentUser = { id: session.user.id, role: profile.role, name: profile.name };
  }
}

/* ---------------- orders (for stats) ---------------- */
let orders = []; // {date: Date, total: number, items:[{name, qty}]}

async function loadOrders(){
  const { data, error } = await supabaseClient.from('orders').select('*').order('created_at', { ascending:false }).limit(500);
  if(error){ console.error('loadOrders', error); return; }
  orders = data.map(o => ({ date: new Date(o.created_at), total: o.total, items: o.items || [] }));
}

/* ================= PRODUCT GRID (boutique) ================= */
function renderGrid(){
  const grid = document.getElementById('productGrid');
  const filtered = products.filter(p=>{
    const matchCat = activeFilter === "Tout" ? true
      : activeFilter === "Promo" ? applyPromo(p).hasPromo
      : p.cat === activeFilter;
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
    const wished = wishlist.has(p.id);
    return `
    <div class="card">
      <div class="card-media ${p.media}">
        ${hasPromo ? `<span class="corner-badge corner-promo">Promo</span>` : (p.isNew ? `<span class="corner-badge corner-new">Nouveau</span>` : '')}
        <button class="wish-btn ${wished?'active':''}" data-wish="${p.id}" aria-label="Ajouter aux favoris">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${wished?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 5.8 5c2 0 3.4 1 6.2 4 2.8-3 4.2-4 6.2-4 3.5 0 5.3 3.4 3.8 6.9C19.5 16.4 12 21 12 21z"/></svg>
        </button>
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
  const wishBtn = e.target.closest('[data-wish]');
  if(wishBtn){
    const id = Number(wishBtn.dataset.wish);
    if(wishlist.has(id)) wishlist.delete(id); else wishlist.add(id);
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

document.getElementById('checkoutBtn').addEventListener('click', async e=>{
  e.preventDefault();
  const entries = Object.values(cart);
  const msgLines = entries.map(it => `• ${it.name}${it.color?' - '+it.color:''} x${it.qty} — ${fmt(it.unitPrice*it.qty)}`);
  const msg = entries.length
    ? `Bonjour Rem's Store, je souhaite commander :%0A${msgLines.join('%0A')}%0A%0ATotal : ${fmt(cartTotal())}`
    : `Bonjour Rem's Store, je souhaite passer commande.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  if(entries.length){
    const total = cartTotal();
    const items = entries.map(it=>({name:it.name, qty:it.qty}));
    cart = {};
    updateCartUI();
    closeCart();
    showToast("Commande envoyée sur WhatsApp");
    const { error } = await supabaseClient.from('orders').insert({ total, items });
    if(error) console.error('order insert failed', error);
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
function openTeamSpace(){
  if(currentUser) openAdmin(); else openLogin();
}
function openLogin(){
  document.getElementById('loginModal').classList.add('show');
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}
function closeLogin(){
  document.getElementById('loginModal').classList.remove('show');
}
async function attemptLogin(){
  const email = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if(error || !data.session){
    document.getElementById('loginError').classList.add('show');
    return;
  }
  await setCurrentUserFromSession(data.session);
  closeLogin();
  openAdmin();
}
async function logout(){
  await supabaseClient.auth.signOut();
  currentUser = null;
  closeAdmin();
}

/* ================= ADMIN DASHBOARD ================= */
async function openAdmin(){
  if(!currentUser) return;
  document.getElementById('adminOverlay').classList.add('show');
  document.getElementById('whoName').textContent = currentUser.name;
  document.getElementById('whoRole').textContent = currentUser.role === 'admin' ? '(Administrateur)' : '(Collaborateur)';
  document.querySelectorAll('.admin-only').forEach(el=>{
    el.style.display = currentUser.role === 'admin' ? '' : 'none';
  });
  await switchAdminPanel('dashboard');
}
function closeAdmin(){
  document.getElementById('adminOverlay').classList.remove('show');
}
document.getElementById('adminSidebar').addEventListener('click', e=>{
  const item = e.target.closest('.admin-nav-item');
  if(item) switchAdminPanel(item.dataset.panel);
});
async function switchAdminPanel(name){
  if(name === 'equipe' && currentUser.role !== 'admin') name = 'dashboard';
  document.querySelectorAll('.admin-nav-item').forEach(b=>b.classList.toggle('active', b.dataset.panel===name));
  document.querySelectorAll('.admin-panel').forEach(p=>p.classList.toggle('active', p.id==='panel-'+name));
  if(name==='dashboard'){ await loadOrders(); renderDashboard(); }
  if(name==='produits'){ await loadProducts(); renderProductsAdmin(); }
  if(name==='promotions') renderPromoForm();
  if(name==='equipe'){ await loadTeam(); renderTeam(); }
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

async function submitProductForm(){
  const name = document.getElementById('pName').value.trim();
  const cat = document.getElementById('pCat').value;
  const price = Number(document.getElementById('pPrice').value);
  const iconKey = document.getElementById('pIcon').value;
  const desc = document.getElementById('pDesc').value.trim();
  if(!name || !price){ showToast("Nom et prix requis"); return; }

  if(editingProductId){
    if(currentUser.role !== 'admin'){ showToast("Seul l'administrateur peut modifier un article"); return; }
    const { error } = await supabaseClient.from('products').update({
      name, cat, price, icon_key: iconKey, description: desc, colors: chipColors
    }).eq('id', editingProductId);
    if(error){ console.error(error); showToast("Erreur lors de la modification"); return; }
  } else {
    const { error } = await supabaseClient.from('products').insert({
      name, cat, price, icon_key: iconKey, description: desc, colors: chipColors,
      added_by: currentUser.name, is_new: false
    });
    if(error){ console.error(error); showToast("Erreur lors de l'ajout"); return; }
  }
  const wasEditing = !!editingProductId;
  resetProductForm();
  await loadProducts();
  renderProductsAdmin();
  renderGrid();
  showToast(wasEditing ? "Article modifié" : "Article ajouté");
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

async function deleteProduct(id){
  if(currentUser.role !== 'admin') return;
  const p = products.find(p=>p.id===id);
  if(!p) return;
  if(!confirm(`Retirer "${p.name}" de la boutique ?`)) return;
  const { error } = await supabaseClient.from('products').delete().eq('id', id);
  if(error){ console.error(error); showToast("Erreur lors de la suppression"); return; }
  await loadProducts();
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
function updateFloatingPromo(){
  const badge = document.getElementById('floatingPromo');
  if(!promo.enabled){ badge.style.display = 'none'; return; }
  document.getElementById('floatingPromoText').textContent = `${promo.label} · -${promo.percent}%`;
  badge.style.display = 'flex';
}
async function savePromo(){
  const enabled = document.getElementById('promoEnabled').checked;
  const label = document.getElementById('promoLabel').value.trim() || 'Promotion';
  const percent = Math.min(90, Math.max(1, Number(document.getElementById('promoPercent').value) || 10));
  const scope = document.getElementById('promoScope').value;
  const { error } = await supabaseClient.from('promotions').update({ enabled, label, percent, scope }).eq('id', 1);
  if(error){ console.error(error); showToast("Erreur lors de l'enregistrement"); return; }
  promo = { enabled, label, percent, scope };
  updatePromoPreview();
  updateFloatingPromo();
  renderGrid();
  showToast("Promotion enregistrée");
}

/* ---- team (admin only, read-only — accounts managed in Supabase) ---- */
let teamProfiles = [];
async function loadTeam(){
  const { data, error } = await supabaseClient.from('profiles').select('*').order('role', { ascending:false });
  if(error){ console.error('loadTeam', error); return; }
  teamProfiles = data;
}
function renderTeam(){
  document.getElementById('teamTableBody').innerHTML = teamProfiles.map(p=>`
    <tr>
      <td>${p.name}</td>
      <td><span class="role-pill ${p.role==='admin'?'admin':''}">${p.role==='admin'?'Admin':'Collaborateur'}</span></td>
    </tr>`).join('');
}

/* ================= INIT ================= */
async function init(){
  resetProductForm();
  await loadProducts();
  await loadPromo();
  renderGrid();
  updateCartUI();
  updateFloatingPromo();

  const { data: { session } } = await supabaseClient.auth.getSession();
  if(session) await setCurrentUserFromSession(session);
}
init();
