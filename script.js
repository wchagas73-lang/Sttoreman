const WHATSAPP_NUMBER = "5532999953215";
const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
let cart = [];
let activeCategory = "Todos";
let selectedProduct = null;
const $ = s => document.querySelector(s);

function renderFilters(){
 const cats=["Todos",...new Set(PRODUCTS.map(p=>p.category))];
 $("#category-filters").innerHTML=cats.map(c=>`<button class="filter ${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");
 document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.cat;renderFilters();renderProducts()}));
}
function renderProducts(){
 let list=PRODUCTS.filter(p=>(activeCategory==="Todos"||p.category===activeCategory)&&(`${p.name} ${p.category} ${p.id}`.toLowerCase().includes($("#search").value.toLowerCase())));
 const sort=$("#sort").value;
 if(sort==="price-asc")list.sort((a,b)=>a.price-b.price);
 if(sort==="price-desc")list.sort((a,b)=>b.price-a.price);
 if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 $("#product-total").textContent=`${list.length} produto(s)`;
 $("#product-grid").innerHTML=list.map(p=>`<article class="product-card"><img loading="lazy" src="${p.images[0]}" alt="${p.name}"><div class="card-copy"><h3>${p.name}</h3><p class="price">${money(p.price)}</p><button data-product="${p.id}">VER DETALHES</button></div></article>`).join("")||'<p class="muted">Nenhum produto encontrado.</p>';
 document.querySelectorAll("[data-product]").forEach(b=>b.addEventListener("click",()=>openProduct(b.dataset.product)));
}
function openModal(id){$("#"+id).classList.add("open");$("#"+id).setAttribute("aria-hidden","false")}
function closeModal(id){$("#"+id).classList.remove("open");$("#"+id).setAttribute("aria-hidden","true")}
function openProduct(id){
 selectedProduct=PRODUCTS.find(p=>p.id===id);
 $("#detail-category").textContent=selectedProduct.category;
 $("#detail-name").textContent=selectedProduct.name;
 $("#detail-price").textContent=money(selectedProduct.price);
 $("#detail-description").textContent=selectedProduct.description;
 $("#detail-image").src=selectedProduct.images[0];
 $("#detail-image").alt=selectedProduct.name;
 $("#detail-color").innerHTML=selectedProduct.colors.map(c=>`<option>${c}</option>`).join("");
 $("#detail-size").innerHTML=selectedProduct.sizes.map(s=>`<option>${s}</option>`).join("");
 $("#detail-qty").value=1;
 $("#detail-thumbs").innerHTML=selectedProduct.images.map((src,i)=>`<button data-img="${i}"><img src="${src}" alt="Foto ${i+1} de ${selectedProduct.name}"></button>`).join("");
 document.querySelectorAll("[data-img]").forEach(b=>b.addEventListener("click",()=>$("#detail-image").src=selectedProduct.images[Number(b.dataset.img)]));
 openModal("product-modal");
}
function addItem(){
 const qty=Math.max(1,parseInt($("#detail-qty").value||"1",10));
 const color=$("#detail-color").value,size=$("#detail-size").value;
 const existing=cart.find(i=>i.id===selectedProduct.id&&i.color===color&&i.size===size);
 if(existing)existing.qty+=qty;else cart.push({id:selectedProduct.id,name:selectedProduct.name,price:selectedProduct.price,color,size,qty});
 closeModal("product-modal");renderCart();
}
function renderCart(){
 $("#cart-count").textContent=cart.reduce((n,i)=>n+i.qty,0);
 $("#cart-items").innerHTML=cart.length?cart.map((i,index)=>`<div class="cart-row"><div><strong>${i.name}</strong><small>${i.color} • Tam. ${i.size} • Qtd. ${i.qty}</small><small>${money(i.price*i.qty)}</small></div><button data-remove="${index}">REMOVER</button></div>`).join(""):'<p class="muted">Sua sacola está vazia.</p>';
 $("#cart-total").textContent=money(cart.reduce((n,i)=>n+i.price*i.qty,0));
 document.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart.splice(Number(b.dataset.remove),1);renderCart()}));
}
function checkout(){
 if(!cart.length){alert("Adicione pelo menos um produto à sacola.");return}
 const name=$("#customer-name").value.trim();
 if(!name){alert("Informe seu nome para enviar o pedido.");$("#customer-name").focus();return}
 const lines=["Olá, STTOREMEN! Quero fazer este pedido:","",`Nome: ${name}`,""];
 cart.forEach((i,n)=>lines.push(`${n+1}. ${i.name}`,`   Cor: ${i.color} | Tamanho: ${i.size} | Quantidade: ${i.qty}`,`   Subtotal: ${money(i.price*i.qty)}`));
 lines.push("",`TOTAL: ${money(cart.reduce((n,i)=>n+i.price*i.qty,0))}`);
 const note=$("#customer-note").value.trim();if(note)lines.push("",`Observações: ${note}`);
 lines.push("","Aguardo confirmação de disponibilidade e forma de pagamento.");
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,"_blank");
}
document.addEventListener("DOMContentLoaded",()=>{
 renderFilters();renderProducts();renderCart();
 $("#search").addEventListener("input",renderProducts);$("#sort").addEventListener("change",renderProducts);
 $("#add-to-cart").addEventListener("click",addItem);$("#open-cart").addEventListener("click",()=>{renderCart();openModal("cart-modal")});
 $("#checkout").addEventListener("click",checkout);
 document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
 document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));
});
