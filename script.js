/* ================== CONFIG (English) ================== */
const CONFIG = {
  // ---- EmailJS (DEMO values) ----
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
    // Mobile money numbers (used as "destination" when chosen)
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
  // Mobile money prefix detection for Withdrawal
  mobilePrefixes: {
    mvola: ['034', '038'],
    airtel: ['033'],
    orange: ['032', '037']
  },
  cryptosPrimary: ["BTC","ETH","USDT","LTC","BCH"],
  cryptosExtra:   ["USDC","BUSD","DAI","ADA","SOL","DOT","LINK","UNI","CAKE"],
  ewalletsPrimary:["wise","paypal","skrill","payoneer"],
  // rates: 1 unit crypto = MGA (example)
  ratesMGA: {
    BTC:150_000_000, ETH:9_000_000, LTC:350_000, BCH:2_800_000,
    USDT:4_500, USDC:4_500, BUSD:4_500, DAI:4_500,
    ADA:1_200, SOL:700_000, DOT:120_000, LINK:80_000, UNI:60_000, CAKE:30_000
  },
  fees: { depot:0.003, retrait:0.005, transfert:0.004 },
  
  // New: Instruction texts for info icons
  infoTexts: {
    rates: "View live exchange rates and volatility.",
    depot_send: "Enter the Ariary amount you wish to send.",
    depot_addr: "The address of your Bitcoin wallet where you want to receive the funds.",
    depot_holder: "The name or phone number associated with your payment method (Mvola, Orange, etc.).",
    retrait_send: "Enter the crypto amount you wish to send to us.",
    retrait_our_addr: "This is TakaloCash's address for your crypto. Send ONLY the selected currency.",
    retrait_reception: "The system will automatically detect the provider (Mvola/Orange/Airtel) based on the number prefix.",
    retrait_holder: "The full name registered with the mobile money or e-wallet account.",
    transfert_send: "Enter the amount of the source crypto you wish to send.",
    transfert_receive_select: "Select the crypto or e-wallet you wish to receive after the exchange.",
    transfert_addr: "The address of your receiving wallet or your e-wallet ID.",
    strip_selection: (mode) => `Select the crypto or e-wallet you want to use for the ${mode}.`
  }
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
let currentLang="en";
let currentCrypto="BTC";          // crypto selection (source for all modes)
let transferTarget="USDT";        // target crypto/ewallet (for transfer)
let payChoice="mvola";            // payment choice (mobile money / ewallet)
let showExtraCryptos=false;
let showExtraEwallets=false;
let withdrawalWallet="mvola";     // The detected/selected wallet for withdrawal

/* ===== Build selectable chips ===== */
function chip(label, active, onClick, isExpander=false){
  const b=document.createElement("button");
  b.className=isExpander ? "expand-inline-btn" : "chip";
  b.setAttribute("aria-pressed", active?"true":"false");
  b.addEventListener("click", onClick);
  
  if (isExpander) {
    b.classList.toggle("open", active);
    b.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
  } else {
    b.textContent=label;
  }
  return b;
}
function ewbtn(key, label, active, onClick){
  const b=document.createElement("button");
  b.className="ewbtn"; b.textContent=label; b.setAttribute("aria-pressed", active?"true":"false");
  b.dataset.key=key; b.addEventListener("click", onClick); return b;
}

/* ===== Render Strips (Crypto/Ewallet selection chips) ===== */
function renderStrips(mode="depot"){
  let targetCrypto = (mode === "transfert") ? transferTarget : currentCrypto;
  let targetEwallet = (mode === "transfert") ? transferTarget : payChoice;

  // --- CRYPTO STRIPS ---
  const handleCryptoClick = (sym) => {
    if(mode === "transfert"){
      transferTarget = sym;
    } else {
      currentCrypto = sym;
    }
    refreshAll();
  };
  const renderCryptoStrip = (stripEl, extraToggleState, toggleCallback) => {
    stripEl.innerHTML = "";
    [...CONFIG.cryptosPrimary, ...(extraToggleState ? CONFIG.cryptosExtra : [])].forEach(sym=>{
      stripEl.appendChild(chip(sym, sym===targetCrypto, ()=>handleCryptoClick(sym)));
    });
    // Add expander button
    stripEl.appendChild(chip(null, extraToggleState, toggleCallback, true));
  };

  // Main Crypto Strip (Depot/Withdrawal source)
  const strip=$("#cryptoStrip");
  const toggleCryptos = () => { showExtraCryptos=!showExtraCryptos; renderStrips(getActiveTab()); };
  renderCryptoStrip(strip, showExtraCryptos, toggleCryptos);

  // Transfer Crypto Strip (Transfer target)
  const stripT=$("#cryptoStripTransfer");
  if(stripT) {
    const toggleCryptosT = () => { showExtraCryptos=!showExtraCryptos; renderStrips("transfert"); };
    renderCryptoStrip(stripT, showExtraCryptos, toggleCryptosT);
  }

  // --- EWALLET STRIPS ---
  const handleEwalletClick = (key) => {
    if(mode === "transfert"){
      transferTarget = key;
    } else {
      payChoice = key; // for depot
      withdrawalWallet = key; // for retrait, though phone number is primary trigger
    }
    refreshAll();
  };
  const renderEwalletStrip = (stripEl, extraToggleState, toggleCallback) => {
    stripEl.innerHTML = "";
    [...CONFIG.ewalletsPrimary, ...(extraToggleState ? [] : [])].forEach(k=>{
      const lab=CONFIG.wallets[k].label;
      stripEl.appendChild(ewbtn(k, lab, k===targetEwallet, ()=>handleEwalletClick(k)));
    });
    // Add expander button (E-wallets usually don't have many extra)
    // stripEl.appendChild(chip(null, extraToggleState, toggleCallback, true)); 
  };
  
  // Main Ewallet Strip (Depot payment/Withdrawal target)
  const ew=$("#ewalletStrip");
  const toggleEwallets = () => { showExtraEwallets=!showExtraEwallets; renderStrips(getActiveTab()); };
  renderEwalletStrip(ew, showExtraEwallets, toggleEwallets);

  // Transfer Ewallet Strip (Transfer target)
  const ewT=$("#ewalletStripTransfer");
  if(ewT) {
    const toggleEwalletsT = () => { showExtraEwallets=!showExtraEwallets; renderStrips("transfert"); };
    renderEwalletStrip(ewT, showExtraEwallets, toggleEwalletsT);
  }
}

/* ===== Crypto Selector (Rates dropdown) ===== */
// (Functions updateCryptoDropdown, setupCryptoSelector, updateCurrentRateDisplay remain largely the same)
function updateCryptoDropdown() {
  const dropdown = $("#crypto-dropdown");
  dropdown.innerHTML = "";
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
function setupCryptoSelector() {
  const selectorBtn = $("#crypto-selector-btn");
  const dropdown = $("#crypto-dropdown");
  selectorBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    selectorBtn.classList.toggle("open");
    dropdown.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!selectorBtn.contains(e.target) && !dropdown.contains(e.target)) {
      selectorBtn.classList.remove("open");
      dropdown.classList.remove("open");
    }
  });
  updateCryptoDropdown();
}
function updateCurrentRateDisplay() {
  const display = $("#current-rate-display");
  if (currentCrypto && CONFIG.ratesMGA[currentCrypto]) {
    display.textContent = `1 ${currentCrypto} = ${CONFIG.ratesMGA[currentCrypto].toLocaleString()} MGA`;
  } else {
    display.textContent = "Loading...";
  }
}

/* ===== Rates Fetching (remains the same) ===== */
const cryptoMapping = {
  //... (as before)
};
const fallbackRates = {
  //... (as before)
};
let ratesUSD = {};
async function fetchRate(sym){
  //... (as before)
}
async function updateRates(){
  //... (as before)
  refreshAll();
}

/* ===== Tabs ===== */
function getActiveTab() {
  return $(".tab[aria-selected='true']").dataset.tab;
}
$$(".tab").forEach(t=>{
  t.addEventListener("click",()=>{
    $$(".tab").forEach(x=>x.setAttribute("aria-selected","false"));
    t.setAttribute("aria-selected","true");
    const tab=t.dataset.tab;
    $("#panel-depot").hidden = tab!=="depot";
    $("#panel-retrait").hidden = tab!=="retrait";
    $("#panel-transfert").hidden = tab!=="transfert";
    // Reset expanders when changing tab
    showExtraCryptos=false;
    showExtraEwallets=false;
    refreshAll();
  });
});

/* ===== Payment options (Depot quick buttons) ===== */
$("#dep-pay-opts").addEventListener("click",(e)=>{
  const btn=e.target.closest(".paybtn"); if(!btn) return;
  payChoice = btn.dataset.pay;
  $$("#dep-pay-opts .paybtn").forEach(b=>b.setAttribute("aria-pressed", b.dataset.pay===payChoice?"true":"false"));
  updateDepotDest();
});

/* ===== Accept checkboxes -> enable buttons ===== */
["dep","ret","trf"].forEach(k=>{
  $(`#${k}-accept`).addEventListener("change",()=>{ $(`#${k}-preview`).disabled = ! $(`#${k}-accept`).checked; });
});

/* ===== Copy buttons ===== */
$("#ret-copy").addEventListener("click",()=>{ $("#ret-our-addr").select(); document.execCommand("copy"); toast("Copied!"); });


/* ---------------------------------
 * MAIN REFRESH FUNCTIONS
 * --------------------------------- */

// Deposit specific refresh
function updateDepotDest(){
  const destEl = $("#dep-pay-dest");
  const nameEl = $("#dep-pay-name");
  const logoEl = $("#dep-pay-logo");
  const addrLabelEl = $("#dep-addr-label");
  
  const wallet = CONFIG.wallets[payChoice];
  
  if (wallet) {
    destEl.textContent = wallet.num || wallet.addr;
    nameEl.textContent = wallet.name;
    logoEl.textContent = wallet.logo;
    
    // Update Crypto Address Label dynamically
    addrLabelEl.firstChild.textContent = `Your ${currentCrypto} Address`;
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

  $("#dep-amount-crypto").value = amountCrypto.toFixed(8);
  $("#dep-crypto-suffix").textContent = currentCrypto;
  $("#dep-rate-note").textContent = `1 ${currentCrypto} = ${rate.toLocaleString()} MGA`;
  $("#dep-fee-note").textContent = `Fee: ${feeRate*100}%`;
  
  updateDepotDest();
}

// Withdrawal specific refresh
function detectMobileWallet(phoneNumber) {
  const prefix = phoneNumber.substring(0, 3);
  for (const [walletKey, prefixes] of Object.entries(CONFIG.mobilePrefixes)) {
    if (prefixes.includes(prefix)) {
      return walletKey;
    }
  }
  return null; // Undetected
}

function refreshRetrait(){
  const amountCrypto = parseFloat($("#ret-amount-crypto").value) || 0;
  const rate = CONFIG.ratesMGA[currentCrypto] || 0;
  const feeRate = CONFIG.fees.retrait;

  const amountAfterFeeCrypto = amountCrypto * (1 - feeRate);
  const amountAriary = amountAfterFeeCrypto * rate;
  
  // 1. Update Wallet based on phone number
  const phoneInput = $("#ret-phone");
  const phoneNum = phoneInput.value.trim();
  const detectedWallet = detectMobileWallet(phoneNum);
  if (detectedWallet) {
    withdrawalWallet = detectedWallet;
  } else if (!phoneNum || phoneNum.length < 3) {
    withdrawalWallet = 'mvola'; // Default if empty
  }
  
  // 2. Update UI
  $("#ret-amount-ariary").value = Math.round(amountAriary).toLocaleString() + " MGA";
  $("#ret-crypto-suffix").textContent = currentCrypto;
  $("#ret-rate-note").textContent = `1 ${currentCrypto} = ${rate.toLocaleString()} MGA`;
  $("#ret-fee-note").textContent = `Fee: ${feeRate*100}%`;
  
  $("#ret-our-addr").value = CONFIG.cryptoAddrs[currentCrypto] || "N/A";
  $("#ret-crypto-only").innerHTML = `Send only in <b>${currentCrypto}</b>`;
  $("#ret-wallet-icon").textContent = CONFIG.wallets[withdrawalWallet]?.logo || '...';
}

// Transfer specific refresh
function refreshTransfer(){
  const sourceCrypto = currentCrypto;
  const target = transferTarget;
  const amountSource = parseFloat($("#trf-amount-top").value) || 0;
  
  const rateSource = CONFIG.ratesMGA[sourceCrypto] || 0;
  
  let rateTarget;
  let targetType;
  if (CONFIG.ratesMGA[target]) {
    rateTarget = CONFIG.ratesMGA[target];
    targetType = 'crypto';
  } else if (CONFIG.wallets[target]) {
    rateTarget = CONFIG.ratesMGA['USDT']; // Using USDT as a stable proxy rate for e-wallets
    targetType = 'ewallet';
  } else {
    rateTarget = 0;
    targetType = 'unknown';
  }
  
  const feeRate = CONFIG.fees.transfert;
  let amountTarget = 0;
  let displayRateNote = `1 ${sourceCrypto} = … ${target}`;
  
  if (rateSource > 0 && rateTarget > 0) {
    const amountMGA = amountSource * rateSource;
    const amountTargetRaw = amountMGA / rateTarget;
    amountTarget = amountTargetRaw * (1 - feeRate);

    const cryptoToCryptoRate = (rateSource / rateTarget) * (1 - feeRate);
    displayRateNote = `1 ${sourceCrypto} ≈ ${cryptoToCryptoRate.toFixed(4)} ${target}`;
  }

  $("#trf-amount-bot").value = amountTarget.toFixed(targetType === 'crypto' ? 8 : 2);
  $("#trf-top-suffix").textContent = sourceCrypto;
  $("#trf-bot-suffix").textContent = target;
  $("#trf-top-note").textContent = `Source Crypto: ${sourceCrypto}`;
  $("#trf-rate-note").textContent = displayRateNote;
}

// Main refresh orchestrator
function refreshAll(){
  updateCurrentRateDisplay();
  
  const activeTab = getActiveTab();
  renderStrips(activeTab); // Render chips based on active tab and expander state
  
  if (activeTab === "depot") refreshDepot();
  if (activeTab === "retrait") refreshRetrait();
  if (activeTab === "transfert") refreshTransfer();
}

/* ===== Event Listeners for Dynamic Refresh ===== */
$("#dep-amount-ariary").addEventListener("input", refreshDepot);
$("#ret-amount-crypto").addEventListener("input", refreshRetrait);
$("#ret-phone").addEventListener("input", refreshRetrait);
$("#trf-amount-top").addEventListener("input", refreshTransfer);

/* ===== Lang flags (simplified for English default) ===== */
// Note: Full multi-language implementation would require a dedicated translation object.
$("#lang-fr").addEventListener("click", ()=>{ setLang("fr"); });
$("#lang-mg").addEventListener("click", ()=>{ setLang("mg"); });
$("#lang-en").addEventListener("click", ()=>{ setLang("en"); });
function setLang(l){
  currentLang=l;
  // This is a stub: real implementation would swap all strings on the page
  $("#lang-fr").classList.toggle("lang-active", l==="fr");
  $("#lang-mg").classList.toggle("lang-active", l==="mg");
  $("#lang-en").classList.toggle("lang-active", l==="en");
}


/* ===== Footer CTAs & Modals (remains the same) ===== */
$("#cta-email").addEventListener("click",()=>window.location.href=`mailto:${CONFIG.emailTo}`);
$("#cta-call").addEventListener("click",()=>window.location.href=`tel:${CONFIG.phoneCall}`);
$("#cta-fb").addEventListener("click",()=>window.open(CONFIG.facebook,"_blank"));
$("#cta-wa").addEventListener("click",()=>window.open(CONFIG.whatsapp,"_blank"));

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
  updateRates(); // Start fetching live rates and then calls refreshAll()
});
