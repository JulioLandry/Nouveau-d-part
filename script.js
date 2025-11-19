/* ================== CONFIG ================== */
const CONFIG = {
  // ---- EmailJS (DEMO values — soloinao) ----
  emailjsPublicKey : "DEMO_PUBLIC_KEY_REPLACE_ME",
  emailjsServiceId : "DEMO_SERVICE_ID",
  emailjsTemplateId: "DEMO_TEMPLATE_ID",
  // ---- Contact links ----
  emailTo   : "contact@takalocash.mg",
  phoneCall : "+261347451051",
  facebook  : "https://facebook.com/",
  whatsapp  : "https://wa.me/261347451051",
  // ---- Our receiving addresses / IDs ----
  wallets: {
    // Mobile money numbers (used as "destination" rehefa voafidy izy)
    mvola : {label:"Mvola",  num:"0347451051", name:"Julio Landry", logo:"Mvola"},
    orange: {label:"Orange Money", num:"0324923117", name:"Julio Landry", logo:"Orange"},
    airtel: {label:"Airtel Money", num:"0331483290", name:"Julio RANDRIANARIMANANA", logo:"Airtel"},
    // eWallets
    wise:   {label:"Wise",   addr:"WISE-ACCOUNT-ID-EXEMPLE",    name:"TakaloCash", logo:"$"},
    paypal: {label:"PayPal", addr:"paypal@takalocash.mg",       name:"TakaloCash", logo:"$"},
    skrill: {label:"Skrill", addr:"skrill@takalocash.mg",       name:"TakaloCash", logo:"€"},
    payoneer:{label:"Payoneer", addr:"PAYONEER-ID-EXEMPLE",     name:"TakaloCash", logo:"$"}
  },
  cryptoAddrs: {
    BTC:"bc1-EXEMPLE-BTC-ADDRESS",
    ETH:"0xEXEMPLEETHADDRESS",
    LTC:"ltc1qEXEMPLE",
    BCH:"qzEXEMPLEBCH",
    USDT:"TEXEMPLEUSDT",
    USDC:"0xEXEMPLEUSDC",
    BUSD:"0xEXEMPLEBUSD",
    DAI:"0xEXEMPLEDAI",
    ADA:"addr1EXEMPLEADA",
    SOL:"SoLExemple1111",
    DOT:"dotEXEMPLE",
    LINK:"0xEXEMPLELINK",
    UNI:"0xEXEMPLEUNI",
    CAKE:"0xEXEMPLECAKE"
  },
  cryptosPrimary: ["BTC","ETH","USDT","LTC","BCH"],
  cryptosExtra:   ["USDC","BUSD","DAI","ADA","SOL","DOT","LINK","UNI","CAKE"],
  ewalletsPrimary:["wise","paypal","skrill","payoneer"],
  // rates: 1 unit crypto = MGA (exemple)
  ratesMGA: {
    BTC:150_000_000, ETH:9_000_000, LTC:350_000, BCH:2_800_000,
    USDT:4_500, USDC:4_500, BUSD:4_500, DAI:4_500,
    ADA:1_200, SOL:700_000, DOT:120_000, LINK:80_000, UNI:60_000, CAKE:30_000
  },
  fees: { depot:0.003, retrait:0.005, transfert:0.004 }
};

/* ================== INIT ================== */
(function(){
  if(window.emailjs){
    try{ emailjs.init({publicKey: CONFIG.emailjsPublicKey}); }catch(e){}
  }
})();
const $ = s=>document.querySelector(s);
const $$ = s=>document.querySelectorAll(s);
function toast(msg, ms=2500){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"), ms); }

/* ===== State ===== */
let currentLang="fr";
let currentCrypto="BTC";          // crypto selection
let transferTarget="USDT";        // target crypto/ewallet
let payChoice="mvola";            // payment choice (can be mobile, ewallet, or crypto code)
let showMoreCryptos=false, showMoreEwallets=false;
let showMoreCryptos2=false, showMoreEwallets2=false;
let showMoreCryptos3=false, showMoreEwallets3=false;

/* ===== Build selectable chips ===== */
function chip(label, active, onClick){
  const b=document.createElement("button");
  b.className="chip"; b.textContent=label; b.setAttribute("aria-pressed", active?"true":"false");
  b.addEventListener("click", onClick); return b;
}
function ewbtn(key, label, active, onClick){
  const b=document.createElement("button");
  b.className="ewbtn"; b.textContent=label; b.setAttribute("aria-pressed", active?"true":"false");
  b.dataset.key=key; b.addEventListener("click", onClick); return b;
}

function renderStrips(){
  // top crypto strip (main)
  const strip=$("#cryptoStrip"); strip.innerHTML="";
  [...CONFIG.cryptosPrimary, ...(showMoreCryptos?CONFIG.cryptosExtra:[])].forEach(sym=>{
    strip.appendChild(chip(sym, sym===currentCrypto, ()=>{ currentCrypto=sym; if(payChoice in CONFIG.wallets || CONFIG.cryptoAddrs[payChoice]){/* keep */} refreshAll(); }));
  });
  // top ewallet strip
  const ew=$("#ewalletStrip"); ew.innerHTML="";
  [...CONFIG.ewalletsPrimary, ...(showMoreEwallets?[]:[])].forEach(k=>{
    const lab=CONFIG.wallets[k].label; ew.appendChild(ewbtn(k, lab, k===payChoice, ()=>{ payChoice=k; refreshAll(); }));
  });
  // transfer strips
  const stripT=$("#cryptoStripTransfer"); if(stripT){ stripT.innerHTML="";
    [...CONFIG.cryptosPrimary, ...(showMoreCryptos3?CONFIG.cryptosExtra:[])].forEach(sym=>{
      stripT.appendChild(chip(sym, sym===transferTarget, ()=>{ transferTarget=sym; refreshTransfer(); }));
    });
  }
  const ewT=$("#ewalletStripTransfer"); if(ewT){ ewT.innerHTML="";
    CONFIG.ewalletsPrimary.forEach(k=>{
      const lab=CONFIG.wallets[k].label; ewT.appendChild(ewbtn(k, lab, k===transferTarget, ()=>{ transferTarget=k; refreshTransfer(); }));
    });
  }
}

/* ===== Crypto Selector ===== */
function setupCryptoSelector() {
  const selectorBtn = $("#crypto-selector-btn");
  const dropdown = $("#crypto-dropdown");
  
  selectorBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    selectorBtn.classList.toggle("open");
    dropdown.classList.toggle("open");
  });
  
  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!selectorBtn.contains(e.target) && !dropdown.contains(e.target)) {
      selectorBtn.classList.remove("open");
      dropdown.classList.remove("open");
    }
  });
  
  // Update dropdown content
  updateCryptoDropdown();
}

function updateCryptoDropdown() {
  const dropdown = $("#crypto-dropdown");
  dropdown.innerHTML = "";
  
  // Add all cryptos to dropdown
  [...CONFIG.cryptosPrimary, ...CONFIG.cryptosExtra].forEach(sym => {
    const item = document.createElement("div");
    item.className = "crypto-item";
    if (sym === currentCrypto) item.classList.add("active");
    
    item.innerHTML = `
      <span>${sym}</span>
      <span class="crypto-rate">${CONFIG.ratesMGA[sym]?.toLocaleString() || '...'} MGA</span>
    `;
    
    item.addEventListener("click", () => {
      currentCrypto = sym;
      $("#crypto-selector-btn").classList.remove("open");
      dropdown.classList.remove("open");
      refreshAll();
    });
    
    dropdown.appendChild(item);
  });
}

function updateCurrentRateDisplay() {
  const display = $("#current-rate-display");
  if (currentCrypto && CONFIG.ratesMGA[currentCrypto]) {
    display.textContent = `1 ${currentCrypto} = ${CONFIG.ratesMGA[currentCrypto].toLocaleString()} MGA`;
  } else {
    display.textContent = "Chargement...";
  }
}

/* ===== Crypto Rates ===== */
const cryptoMapping = {
  BTC:"btc-bitcoin",
  ETH:"eth-ethereum",
  USDT:"usdt-tether",
  LTC:"ltc-litecoin",
  BCH:"bch-bitcoin-cash",
  USDC:"usdc-usd-coin",
  BUSD:"busd-binance-usd",
  DAI:"dai-dai",
  ADA:"ada-cardano",
  SOL:"sol-solana",
  DOT:"dot-polkadot",
  LINK:"link-chainlink",
  UNI:"uni-uniswap",
  CAKE:"cake-pancakeswap"
};

const fallbackRates = {
  BTC:150000,
  ETH:9000,
  USDT:1,
  LTC:350,
  BCH:2800,
  USDC:1,
  BUSD:1,
  DAI:1,
  ADA:1.2,
  SOL:70,
  DOT:12,
  LINK:8,
  UNI:6,
  CAKE:3
};

let ratesUSD = {};

async function fetchRate(sym){
  const id = cryptoMapping[sym];
  try{
    const resp = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`);
    if(!resp.ok) throw new Error("API error");
    const data = await resp.json();
    return data.quotes.USD.price || fallbackRates[sym];
  }catch(e){
    console.warn(`Erreur pour ${sym}:`, e);
    return fallbackRates[sym];
  }
}

async function updateRates(){
  const allCryptos = [...CONFIG.cryptosPrimary, ...CONFIG.cryptosExtra];
  
  for(const sym of allCryptos){
    const rate = await fetchRate(sym);
    ratesUSD[sym] = rate;
    
    // Update config with live rates (scaled from USD to MGA based on fallback ratio)
    if (fallbackRates[sym] && rate) {
      CONFIG.ratesMGA[sym] = Math.round(rate * (CONFIG.ratesMGA[sym] / fallbackRates[sym]));
    }
  }
  
  // Update UI
  updateCurrentRateDisplay();
  updateCryptoDropdown();
  refreshAll();
}

/* ===== Expanders (+) ===== */
function toggleBtn(el, open){
  el.innerHTML = open
    ? `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Réduire`
    : `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Plus`;
}
$("#toggleMoreCryptos").addEventListener("click", ()=>{ showMoreCryptos=!showMoreCryptos; renderStrips(); toggleBtn($("#toggleMoreCryptos"), showMoreCryptos); });
$("#toggleMoreEwallets").addEventListener("click", ()=>{ showMoreEwallets=!showMoreEwallets; renderStrips(); toggleBtn($("#toggleMoreEwallets"), showMoreEwallets); });
$("#toggleMoreCryptos2").addEventListener("click", ()=>{ showMoreCryptos2=!showMoreCryptos2; showMoreCryptos=showMoreCryptos2; renderStrips(); toggleBtn($("#toggleMoreCryptos2"), showMoreCryptos2); });
$("#toggleMoreEwallets2").addEventListener("click", ()=>{ showMoreEwallets2=!showMoreEwallets2; showMoreEwallets=showMoreEwallets2; renderStrips(); toggleBtn($("#toggleMoreEwallets2"), showMoreEwallets2); });
$("#toggleMoreCryptos3").addEventListener("click", ()=>{ showMoreCryptos3=!showMoreCryptos3; renderStrips(); toggleBtn($("#toggleMoreCryptos3"), showMoreCryptos3); });
$("#toggleMoreEwallets3").addEventListener("click", ()=>{ showMoreEwallets3=!showMoreEwallets3; renderStrips(); toggleBtn($("#toggleMoreEwallets3"), showMoreEwallets3); });

/* ===== Tabs ===== */
$$(".tab").forEach(t=>{
  t.addEventListener("click",()=>{
    $$(".tab").forEach(x=>x.setAttribute("aria-selected","false"));
    t.setAttribute("aria-selected","true");
    const tab=t.dataset.tab;
    $("#panel-depot").hidden = tab!=="depot";
    $("#panel-retrait").hidden = tab!=="retrait";
    $("#panel-transfert").hidden = tab!=="transfert";
    refreshAll();
  });
});

/* ===== Payment options (Depot quick buttons) ===== */
$("#dep-pay-opts").addEventListener("click",(e)=>{
  const btn=e.target.closest(".paybtn"); if(!btn) return;
  payChoice = btn.dataset.pay; // can be mobile money key OR ewallet key OR crypto code
  $$("#dep-pay-opts .paybtn").forEach(b=>b.setAttribute("aria-pressed", b.dataset.pay===payChoice?"true":"false"));
  updateDepotDest();
});

/* ===== Accept checkboxes -> enable buttons ===== */
["dep","ret","trf"].forEach(k=>{
  $(`#${k}-accept`).addEventListener("change",()=>{ $(`#${k}-preview`).disabled = ! $(`#${k}-accept`).checked; });
});

/* ===== Copy buttons ===== */
$("#dep-copy").addEventListener("click",()=>{ const el=$("#dep-addr"); el.select(); document.execCommand("copy"); toast("Copié !"); });
$("#ret-copy").addEventListener("click",()=>{ $("#ret-our-addr").select(); document.execCommand("copy"); toast("Copié !"); });

/* ===== Inputs & selects (Stubs) ===== */
function updateDepotDest(){
  const destEl = $("#dep-pay-dest");
  const nameEl = $("#dep-pay-name");
  const logoEl = $("#dep-pay-logo");
  const addrEl = $("#dep-addr");
  const addrNoteEl = $("#dep-addr-note");
  const addrLabelEl = $("#dep-addr-label");

  const wallet = CONFIG.wallets[payChoice];
  
  // Reset for dynamic update
  addrEl.value = "";
  addrNoteEl.textContent = "";
  addrLabelEl.textContent = "Adresse de paiement";

  if (wallet) {
    destEl.textContent = wallet.num || wallet.addr;
    nameEl.textContent = wallet.name;
    logoEl.textContent = wallet.logo;

    if (wallet.num) {
      // Mobile money
      addrEl.value = CONFIG.cryptoAddrs[currentCrypto] || "N/A";
      addrEl.readOnly = true;
      addrNoteEl.textContent = `Veuillez envoyer votre ${currentCrypto} à cette adresse.`;
      addrLabelEl.textContent = `${currentCrypto} adresse de réception (TakaloCash)`;
    } else if (wallet.addr) {
      // E-wallet
      addrEl.value = wallet.addr;
      addrEl.readOnly = true;
      addrNoteEl.textContent = `Cet identifiant/adresse est celui de TakaloCash sur ${wallet.label}. Veuillez envoyer à cette adresse.`;
    }
  }
  // Fallback for Crypto payments (not currently supported in pay-opts, but good to have)
  else if (CONFIG.cryptoAddrs[payChoice]) {
    // ...
  }
}

function refreshDepot(){
  const amountAriary = parseFloat($("#dep-amount-ariary").value) || 0;
  const rate = CONFIG.ratesMGA[currentCrypto] || 0;
  const feeRate = CONFIG.fees.depot;

  const amountAfterFeeAriary = amountAriary * (1 - feeRate);
  let amountCrypto = 0;
  if (rate > 0) {
    amountCrypto = amountAfterFeeAriary / rate;
  }

  // Update UI
  $("#dep-amount-crypto").value = amountCrypto.toFixed(8);
  $("#dep-crypto-suffix").textContent = currentCrypto;
  $("#dep-rate-note").textContent = `1 ${currentCrypto} = ${rate.toLocaleString()} MGA`;
  $("#dep-fee-note").textContent = `Frais: ${feeRate*100}%`;
  
  updateDepotDest();
}

function refreshRetrait(){
  const amountCrypto = parseFloat($("#ret-amount-crypto").value) || 0;
  const rate = CONFIG.ratesMGA[currentCrypto] || 0;
  const feeRate = CONFIG.fees.retrait;

  const amountAfterFeeCrypto = amountCrypto * (1 - feeRate);
  const amountAriary = amountAfterFeeCrypto * rate;

  // Update UI
  $("#ret-amount-ariary").value = Math.round(amountAriary).toLocaleString() + " MGA";
  $("#ret-crypto-suffix").textContent = currentCrypto;
  $("#ret-rate-note").textContent = `1 ${currentCrypto} = ${rate.toLocaleString()} MGA`;
  $("#ret-fee-note").textContent = `Frais: ${feeRate*100}%`;
  
  $("#ret-our-addr").value = CONFIG.cryptoAddrs[currentCrypto] || "N/A";
  $("#ret-crypto-only").innerHTML = `Envoyer seulement en <b>${currentCrypto}</b>`;
}

function refreshTransfer(){
  const sourceCrypto = currentCrypto;
  const target = transferTarget;
  const amountSource = parseFloat($("#trf-amount-top").value) || 0;
  
  const rateSource = CONFIG.ratesMGA[sourceCrypto] || 0;
  
  // Determine target rate (crypto or fixed 1 unit for e-wallet estimate)
  let rateTarget;
  let targetType;
  if (CONFIG.ratesMGA[target]) {
    rateTarget = CONFIG.ratesMGA[target];
    targetType = 'crypto';
  } else if (CONFIG.wallets[target]) {
    // Assume fixed 1 MGA for e-wallet transfer calculation, but this is a complex step.
    // In reality, this should be a predefined exchange rate between crypto and the e-wallet value (USD/EUR).
    // Using USDT rate as a proxy for stable value.
    rateTarget = CONFIG.ratesMGA['USDT'];
    targetType = 'ewallet';
  } else {
    rateTarget = 0;
    targetType = 'unknown';
  }
  
  const feeRate = CONFIG.fees.transfert;
  let amountTarget = 0;
  let displayRateNote = `1 ${sourceCrypto} = … ${target}`;
  
  if (rateSource > 0 && rateTarget > 0) {
    // Convert source to MGA equivalent
    const amountMGA = amountSource * rateSource;
    // Convert MGA equivalent to target value
    const amountTargetRaw = amountMGA / rateTarget;
    
    amountTarget = amountTargetRaw * (1 - feeRate);

    // Update display rate note
    const cryptoToCryptoRate = (rateSource / rateTarget) * (1 - feeRate);
    displayRateNote = `1 ${sourceCrypto} ≈ ${cryptoToCryptoRate.toFixed(4)} ${target}`;
  }

  // Update UI
  $("#trf-amount-bot").value = amountTarget.toFixed(targetType === 'crypto' ? 8 : 2);
  $("#trf-top-suffix").textContent = sourceCrypto;
  $("#trf-bot-suffix").textContent = target;
  $("#trf-top-note").textContent = `Crypto source: ${sourceCrypto}`;
  $("#trf-rate-note").textContent = displayRateNote;
}

function refreshAll(){
  updateCurrentRateDisplay();
  renderStrips();
  // Check which tab is open and refresh it
  if (!$("#panel-depot").hidden) refreshDepot();
  if (!$("#panel-retrait").hidden) refreshRetrait();
  if (!$("#panel-transfert").hidden) refreshTransfer();
}


/* ===== Lang flags (kept, tsy ovaina ny style) ===== */
$("#lang-fr").addEventListener("click", ()=>{ setLang("fr"); });
$("#lang-mg").addEventListener("click", ()=>{ setLang("mg"); });
function setLang(l){
  currentLang=l;
  $("#lang-fr").classList.toggle("lang-active", l==="fr");
  $("#lang-mg").classList.toggle("lang-active", l==="mg");
  // (mitahiry ny wording ankehitriny, tsy ovaina firy; minimalist)
}

/* ===== Footer CTAs ===== */
$("#cta-email").addEventListener("click",()=>window.location.href=`mailto:${CONFIG.emailTo}`);
$("#cta-call").addEventListener("click",()=>window.location.href=`tel:${CONFIG.phoneCall}`);
$("#cta-fb").addEventListener("click",()=>window.open(CONFIG.facebook,"_blank"));
$("#cta-wa").addEventListener("click",()=>window.open(CONFIG.whatsapp,"_blank"));

/* ===== Modal Toggles ===== */
$$(".legal a").forEach(a => {
  a.addEventListener("click", () => {
    const modalId = a.dataset.modal;
    const dialog = $(`#dlg-${modalId}`);
    if (dialog) dialog.showModal();
  });
});


// Initial call on load
document.addEventListener("DOMContentLoaded", () => {
  setupCryptoSelector();
  updateRates(); // Start fetching live rates
  refreshAll();
});
