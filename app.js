const products = [
  // الخضروات
  {id:"tomato",name:"طماطة",price:450,emoji:"🍅",type:"veg"},
  {id:"potato",name:"بطاطا",price:200,emoji:"🥔",type:"veg"},
  {id:"onion",name:"بصل",price:250,emoji:"🧅",type:"veg"},
  {id:"garlic",name:"ثوم",price:800,emoji:"🧄",type:"veg"},
  {id:"cucumber",name:"خيار",price:300,emoji:"🥒",type:"veg"},
  {id:"eggplant",name:"باذنجان",price:600,emoji:"🍆",type:"veg"},
  {id:"pepper",name:"فلفل أخضر",price:350,emoji:"🫑",type:"veg"},
  {id:"hotpepper",name:"فلفل حار",price:400,emoji:"🌶️",type:"veg"},
  {id:"zucchini",name:"كوسة",price:400,emoji:"🥒",type:"veg"},
  {id:"okra",name:"بامية",price:700,emoji:"🥬",type:"veg"},
  {id:"lettuce",name:"خس",price:400,emoji:"🥬",type:"veg"},
  {id:"cabbage",name:"ملفوف",price:350,emoji:"🥬",type:"veg"},
  {id:"cauliflower",name:"زهرة",price:600,emoji:"🥦",type:"veg"},
  {id:"spinach",name:"سبانخ",price:300,emoji:"🥬",type:"veg"},
  {id:"beans",name:"فاصوليا",price:500,emoji:"🫘",type:"veg"},
  {id:"peas",name:"بازلاء",price:450,emoji:"🫛",type:"veg"},
  {id:"corn",name:"ذرة",price:700,emoji:"🌽",type:"veg"},
  {id:"carrot",name:"جزر",price:300,emoji:"🥕",type:"veg"},
  {id:"turnip",name:"شلغم",price:300,emoji:"🥕",type:"veg"},
  {id:"beet",name:"شمندر",price:350,emoji:"🫐",type:"veg"},

  // الفواكه
  {id:"apple",name:"تفاح",price:600,emoji:"🍎",type:"fruit"},
  {id:"banana",name:"موز",price:500,emoji:"🍌",type:"fruit"},
  {id:"orange",name:"برتقال",price:400,emoji:"🍊",type:"fruit"},
  {id:"mandarin",name:"يوسفي",price:450,emoji:"🍊",type:"fruit"},
  {id:"grapes",name:"عنب",price:800,emoji:"🍇",type:"fruit"},
  {id:"watermelon",name:"رقي",price:700,emoji:"🍉",type:"fruit"},
  {id:"melon",name:"شمام",price:650,emoji:"🍈",type:"fruit"},
  {id:"strawberry",name:"فراولة",price:900,emoji:"🍓",type:"fruit"},
  {id:"pear",name:"إجاص",price:700,emoji:"🍐",type:"fruit"},
  {id:"peach",name:"دراق",price:750,emoji:"🍑",type:"fruit"},
  {id:"pomegranate",name:"رمان",price:600,emoji:"🍎",type:"fruit"},
  {id:"fig",name:"تين",price:850,emoji:"🍈",type:"fruit"},
  {id:"dates",name:"تمر",price:1000,emoji:"🌴",type:"fruit"},
  {id:"kiwi",name:"كيوي",price:900,emoji:"🥝",type:"fruit"},
  {id:"mango",name:"مانجو",price:1200,emoji:"🥭",type:"fruit"}
];

let cart = JSON.parse(localStorage.getItem("cart")||"{}");
let customer = JSON.parse(localStorage.getItem("customer")||"{}");

const vegDiv = document.getElementById("vegProducts");
const fruitDiv = document.getElementById("fruitProducts");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const custName = document.getElementById("custName");
const custPhone = document.getElementById("custPhone");
const custAddress = document.getElementById("custAddress");

function renderProducts(){
  vegDiv.innerHTML="";
  fruitDiv.innerHTML="";
  products.forEach(p=>{
    const card = `
      <div class="card">
        <div class="veg-emoji">${p.emoji}</div>
        <strong>${p.name}</strong>
        <div>${p.price} د.ع</div>
        <button class="btn primary" onclick="addProduct('${p.id}',this)">أضف إلى السلة</button>
        <div class="added-msg">تمت الإضافة ✔</div>
      </div>`;
    (p.type==="veg"?vegDiv:fruitDiv).innerHTML+=card;
  });
}

function addProduct(id,btn){
  cart[id]=(cart[id]||0)+1;
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
  const msg = btn.nextElementSibling;
  msg.style.display="block";
  setTimeout(()=>msg.style.display="none",1200);
}

function renderCart(){
  cartItems.innerHTML="";
  let total=0;
  if(Object.keys(cart).length===0){
    cartItems.textContent="السلة فارغة";
    cartTotal.textContent=0;
    return;
  }
  for(let id in cart){
    const p=products.find(x=>x.id===id);
    const sub=p.price*cart[id];
    total+=sub;
    cartItems.innerHTML+=`
      <div class="cart-row">
        <div>${p.name}</div>
        <div>
          <button onclick="changeQty('${id}',-1)">−</button>
          <span>${cart[id]}</span>
          <button onclick="changeQty('${id}',1)">+</button>
        </div>
        <div>${sub} د.ع</div>
      </div>`;
  }
  cartTotal.textContent=total;
}

function changeQty(id,delta){
  cart[id]+=delta;
  if(cart[id]<=0) delete cart[id];
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

renderProducts();
renderCart();