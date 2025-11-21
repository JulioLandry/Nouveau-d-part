/* ================== CONFIG ================== */
const CONFIG = {
  // ---- EmailJS (DEMO values) ----
  emailjsPublicKey : "DEMO_PUBLIC_KEY_REPLACE_ME",
  emailjsServiceId : "DEMO_SERVICE_ID",
  emailjsTemplateId: "DEMO_TEMPLATE_ID",
  // ---- Our receiving addresses / IDs ----
  wallets: {
    // Mobile money numbers
    mvola : {label:"Mvola",  num:"0347451051", name:"Julio Landry", logo:"Mvola"},
    orange: {label:"Orange Money", num:"0324923117", name:"Julio Landry", logo:"Orange"},
    airtel: {label:"Airtel Money", num:"0331483290", name:"Julio RANDRIANARIMANANA", logo:"Airtel"},
    // eWallets (Using fiat symbols for logo/unit)
    wise:   {label:"Wise",   addr:"WISE-ACCOUNT-ID-EXEMPLE",    name:"TakaloCash", unit:"$"},
    paypal: {label:"PayPal", addr:"paypal@takalocash.mg",       name:"TakaloCash", unit:"$"},
    skrill: {label:"Skrill", addr:"skrill@takalocash.mg",       name:"TakaloCash", unit:"€"},
    payoneer:{label:"Payoneer", addr:"PAYONEER-ID-EXEMPLE",     name:"TakaloCash", unit:"$"}
  },
  cryptoAddrs: {
    BTC:"bc1-EXEMPLE-BTC-ADDRESS", ETH:"0xEXEMPLEETHADDRESS", LTC:"ltc1qEXEMPLE", BCH:"qzEXEMPLEBCH",
    USDT:"TEXEMPLEUSDT", USDC:"0xEXEMPLEUSDC", BUSD:"0xEXEMPLEBUSD", DAI:"0xEXEMPLEDAI",
    ADA:"addr1EXEMPLEADA", SOL:"SoLExemple1111", DOT:"dotEXEMPLE", LINK:"0xEXEMPLELINK", UNI:"0xEXEMPLEUNI", CAKE:"0xEXEMPLECAKE"
  },
  // Mobile money prefix detection for Withdrawal
  mobilePrefixes: {
    mvola: ['034', '038'], airtel: ['033'], orange: ['032', '037']
  },
  // Combined primary and extra selection lists
  primarySelection: ["BTC","ETH","USDT","wise","paypal"], 
  extraSelection: ["LTC","BCH","USDC","BUSD","DAI","ADA","SOL","DOT","LINK","UNI","CAKE","skrill","payoneer"],

  // rates: 1 unit = MGA (example)
  ratesMGA: {
    BTC:150_000_000, ETH:9_000_000, LTC:350_000, BCH:2_800_000,
    USDT:4_500, USDC:4_500, BUSD:4_500, DAI:4_500,
    ADA:1_200, SOL:700_000, DOT:120_000, LINK:80_000, UNI:60_000, CAKE:30_000,
    USD:4_400, EUR:4_800 // FIAT rates
  },
  fees: { depot:0.003, retrait:0.005, transfert:0.004 },
  
  // ===================================
  // LANGUAGE DICTIONARY
  // ===================================
  LANGUAGES: {
    en: { // English
      tab_depot: "Deposit", tab_retrait: "Withdrawal", tab_transfert: "Transfer",
      rates_current: "Current Rates:", rates_loading: "Loading...", rates_note_mga: "MGA (Rate loading)",
      rates_info_title: "View live exchange rates and volatility.",
      
      // Deposit
      dep_send_label: "Send (Mobile Money)", dep_send_info: "Enter the Ariary amount you wish to send via mobile money.",
      dep_placeholder_ariary: "Ariary amount", dep_choose_pay: "Choose payment method:",
      dep_note_send_to: "Send to", dep_note_name: "Name",
      dep_receive_label: "Receive", dep_addr_label: "Your Receiving Address",
      dep_addr_info: "The address of your receiving wallet (crypto) or your e-wallet identifier (e-wallet).",
      dep_addr_placeholder: "Your Address/ID",
      dep_fee: "Fee",

      // Withdrawal
      ret_send_label: "Send (Crypto or E-wallet)", ret_send_info: "Enter the crypto or fiat amount you wish to send to us.",
      ret_placeholder_send: "0.00000000", ret_our_addr_label: "Our Receiving Address/ID",
      ret_our_addr_info: "This is TakaloCash's address/ID for your selected currency. Send ONLY the selected currency.",
      ret_copy: "Copy", ret_send_only_in: "Send only in",
      ret_receive_label: "Receive (Mobile Money)", ret_method_label: "Reception Method (Mobile Money)",
      ret_method_info: "The system will automatically detect the provider (Mvola/Orange/Airtel) based on the number prefix.",
      ret_phone_placeholder: "Mobile Money Number (e.g., 034...)",
      ret_default_wallet: "Mobile Money",
      ret_name_label: "Account Holder Name", ret_name_info: "The full name registered with the mobile money account.",
      ret_name_placeholder: "Ex: Rakoto",

      // Transfer
      trf_send_label: "Send (Source)", trf_send_info: "Enter the amount of the source crypto or e-wallet you wish to send.",
      trf_our_addr_info: "This is TakaloCash's address/ID for your selected currency. Send ONLY the selected currency.",
      trf_top_note_source: "Source",
      trf_choose_receive_label: "Choose Crypto/E-wallet to Receive",
      trf_choose_receive_info: "Select the crypto or e-wallet you wish to receive after the exchange.",
      trf_receive_label: "Receive (Target)",
      trf_dest_addr_label: "Your Receiving Address",
      trf_dest_addr_info: "The address of your receiving wallet or your e-wallet ID.",
      trf_dest_addr_placeholder: "Your wallet address / ID",

      // Common
      common_rate_template: rate => `1 {unit} ≈ ${rate} MGA`,
      common_rate_conversion: (rate, unitSrc, unitTgt) => `1 ${unitSrc} ≈ ${rate} ${unitTgt}`,
      common_note_instruction: "The instruction for the crypto/e-wallet selection should appear here (e.g., *Cryptos are processed instantly. E-wallets may take up to 2 hours.*)."
    },
    fr: { // French
      tab_depot: "Dépôt", tab_retrait: "Retrait", tab_transfert: "Transfert",
      rates_current: "Taux Actuels :", rates_loading: "Chargement...", rates_note_mga: "MGA (Taux en cours)",
      rates_info_title: "Consulter les taux de change en direct et la volatilité.",
      
      // Deposit
      dep_send_label: "Envoyer (Mobile Money)", dep_send_info: "Saisissez le montant en Ariary que vous souhaitez envoyer par mobile money.",
      dep_placeholder_ariary: "Montant en Ariary", dep_choose_pay: "Choisissez la méthode de paiement :",
      dep_note_send_to: "Envoyer à", dep_note_name: "Nom",
      dep_receive_label: "Recevoir", dep_addr_label: "Votre Adresse de Réception",
      dep_addr_info: "L'adresse de votre portefeuille de réception (crypto) ou votre identifiant e-wallet (porte-monnaie électronique).",
      dep_addr_placeholder: "Votre Adresse/ID",
      dep_fee: "Frais",

      // Withdrawal
      ret_send_label: "Envoyer (Crypto ou E-wallet)", ret_send_info: "Saisissez le montant en crypto ou en fiat que vous souhaitez nous envoyer.",
      ret_placeholder_send: "0.00000000", ret_our_addr_label: "Notre Adresse/ID de Réception",
      ret_our_addr_info: "Ceci est l'adresse/ID de TakaloCash pour la devise sélectionnée. Envoyez UNIQUEMENT la devise sélectionnée.",
      ret_copy: "Copier", ret_send_only_in: "Envoyer uniquement en",
      ret_receive_label: "Recevoir (Mobile Money)", ret_method_label: "Méthode de Réception (Mobile Money)",
      ret_method_info: "Le système détectera automatiquement le fournisseur (Mvola/Orange/Airtel) basé sur le préfixe du numéro.",
      ret_phone_placeholder: "Numéro Mobile Money (ex: 034...)",
      ret_default_wallet: "Mobile Money",
      ret_name_label: "Nom du Titulaire du Compte", ret_name_info: "Le nom complet enregistré sur le compte mobile money.",
      ret_name_placeholder: "Ex: Rakoto",

      // Transfer
      trf_send_label: "Envoyer (Source)", trf_send_info: "Saisissez le montant de la crypto ou e-wallet source que vous souhaitez envoyer.",
      trf_our_addr_info: "Ceci est l'adresse/ID de TakaloCash pour la devise sélectionnée. Envoyez UNIQUEMENT la devise sélectionnée.",
      trf_top_note_source: "Source",
      trf_choose_receive_label: "Choisir Crypto/E-wallet à Recevoir",
      trf_choose_receive_info: "Sélectionnez la crypto ou l'e-wallet que vous souhaitez recevoir après l'échange.",
      trf_receive_label: "Recevoir (Cible)",
      trf_dest_addr_label: "Votre Adresse de Réception",
      trf_dest_addr_info: "L'adresse de votre portefeuille de réception ou votre ID e-wallet.",
      trf_dest_addr_placeholder: "Votre adresse de portefeuille / ID",

      // Common
      common_rate_template: rate => `1 {unit} ≈ ${rate} MGA`,
      common_rate_conversion: (rate, unitSrc, unitTgt) => `1 ${unitSrc} ≈ ${rate} ${unitTgt}`,
      common_note_instruction: "L'instruction pour la sélection crypto/e-wallet doit apparaître ici (ex : *Les cryptos sont traitées instantanément. Les e-wallets peuvent prendre jusqu'à 2 heures.*)."
    },
    mg: { // Malagasy
      tab_depot: "Fametrahana", tab_retrait: "Fanesorana", tab_transfert: "Fifampizarana",
      rates_current: "Tombam-bidy ankehitriny :", rates_loading: "Eo am-panafarana...", rates_note_mga: "MGA (Tombam-bidy mihetsika)",
      rates_info_title: "Jereo ny tombam-bidy sy ny fiovaovan'ny vidiny.",
      
      // Deposit
      dep_send_label: "Alefaso (Mobile Money)", dep_send_info: "Ampidiro ny vola Ariary tianao halefa amin'ny alalan'ny mobile money.",
      dep_placeholder_ariary: "Vola Ariary", dep_choose_pay: "Fidio ny fomba fandoavam-bola :",
      dep_note_send_to: "Alefaso amin'ny", dep_note_name: "Anarana",
      dep_receive_label: "Raiso", dep_addr_label: "Adiresy handraisanao vola",
      dep_addr_info: "Ny adiresy amin'ny kitapom-bolanao (crypto) na ny identifiant an'ny e-wallet-nao.",
      dep_addr_placeholder: "Ny Adiresinao/ID",
      dep_fee: "Sarany",

      // Withdrawal
      ret_send_label: "Alefaso (Crypto na E-wallet)", ret_send_info: "Ampidiro ny vola crypto na fiat tianao halefa any aminay.",
      ret_placeholder_send: "0.00000000", ret_our_addr_label: "Ny Adiresy/ID Handraisanay Vola",
      ret_our_addr_info: "Ity no adiresy/ID an'ny TakaloCash ho an'ny vola nofidinao. Alefaso IZAO IHANY io vola io.",
      ret_copy: "Adikao", ret_send_only_in: "Alefaso amin'ny",
      ret_receive_label: "Raiso (Mobile Money)", ret_method_label: "Fomba Fandraisana (Mobile Money)",
      ret_method_info: "Ho hitan'ny rafitra avy hatrany ny mpamatsy (Mvola/Orange/Airtel) amin'ny alalan'ny prefix amin'ny laharana.",
      ret_phone_placeholder: "Laharana Mobile Money (ohatra: 034...)",
      ret_default_wallet: "Mobile Money",
      ret_name_label: "Anaran'ny Tompon'ny Kaonty", ret_name_info: "Ny anarana feno voasoratra amin'ny kaonty mobile money.",
      ret_name_placeholder: "Ohatra: Rakoto",

      // Transfer
      trf_send_label: "Alefaso (Loharano)", trf_send_info: "Ampidiro ny vola avy amin'ny crypto na e-wallet tianao halefa.",
      trf_our_addr_info: "Ity no adiresy/ID an'ny TakaloCash ho an'ny vola nofidinao. Alefaso IZAO IHANY io vola io.",
      trf_top_note_source: "Loharano",
      trf_choose_receive_label: "Fidio ny Crypto/E-wallet horaisina",
      trf_choose_receive_info: "Fidio ny crypto na e-wallet tianao horaisina aorian'ny fifanakalozana.",
      trf_receive_label: "Raiso (Hafarana)",
      trf_dest_addr_label: "Adiresy handraisanao vola",
      trf_dest_addr_info: "Ny adiresy amin'ny kitapom-bolanao na ny ID an'ny e-wallet-nao.",
      trf_dest_addr_placeholder: "Ny adiresy kitapom-bolanao / ID",

      // Common
      common_rate_template: rate => `1 {unit} ≈ ${rate} MGA`,
      common_rate_conversion: (rate, unitSrc, unitTgt) => `1 ${unitSrc} ≈ ${rate} ${unitTgt}`,
      common_note_instruction: "Tokony hipetraka eto ny toromarika momba ny fifidianana crypto/e-wallet (ohatra: *Vitan'ny crypto avy hatrany ny transaction. Mety haharitra 2 ora ny e-wallets.*)."
    }
  }
};

/* ================== INIT ================== */
(function(){
  // Initialize EmailJS if the library is loaded
  if(window.emailjs){
    try{ emailjs.init({publicKey: CONFIG.emailjsPublicKey}); }catch(e){}
  }
})();
const $ = s=>document.querySelector(s);
const $$ = s=>document.querySelectorAll(s);
function toast(msg, ms=2500){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"), ms); }

/* ===== State ===== */
let currentLang="en"; 
let currentSelection="BTC";       
let transferTarget="USDT";        
let payChoice="mvola";            
let showExtraSelection=false;
let withdrawalWallet="mvola";     

/* ===================================
 * LANGUAGE HELPER
 * =================================== */
function t(key, lang = currentLang) {
  return CONFIG.LANGUAGES[lang]?.[key] || CONFIG.LANGUAGES['en']?.[key] || key;
}

function switchLanguage(lang) {
    if (CONFIG.LANGUAGES.hasOwnProperty(lang)) {
        currentLang = lang;
        
        // 1. Update tab labels (using IDs)
        $("#tab-depot").textContent = t('tab_depot');
        $("#tab-retrait").textContent = t('tab_retrait');
        $("#tab-transfert").textContent = t('tab_transfert');
        
        // 2. Update all hardcoded/placeholder labels and titles (using data-attributes)
        // Update general labels
        $("#dep-send-label").firstChild.textContent = t('dep_send_label');
        $("#dep-receive-label").textContent = t('dep_receive_label');
        $("#ret-send-label").firstChild.textContent = t('ret_send_label');
        $("#ret-receive-label").textContent = t('ret_receive_label');
        $("#trf-send-label").firstChild.textContent = t('trf_send_label');
        $("#trf-receive-label").textContent = t('trf_receive_label');
        $("#trf-choose-receive_label").firstChild.textContent = t('trf_choose_receive_label');
        
        // Update placeholders
        $("#dep-amount-ariary").placeholder = t('dep_placeholder_ariary');
        $("#dep-addr").placeholder = t('dep_addr_placeholder');
        $("#ret-amount-send").placeholder = t('ret_placeholder_send');
        $("#ret-phone").placeholder = t('ret_phone_placeholder');
        $("#ret-name").placeholder = t('ret_name_placeholder');
        $("#trf-dest-addr").placeholder = t('trf_dest_addr_placeholder');

        // Update titles (info icons)
        $$('[data-i18n-title]').forEach(el => {
            el.title = t(el.dataset.i18nTitle);
        });

        // 3. Update language switcher appearance
        $$('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // 4. Re-render all dynamic content
        refreshAll();
    }
}

/* ===== Utility Functions ===== */
function isCrypto(key) {
  return CONFIG.cryptoAddrs.hasOwnProperty(key);
}
function getUnit(key) {
    if (isCrypto(key)) return key;
    if (CONFIG.wallets[key]?.unit) return CONFIG.wallets[key].unit;
    return key; 
}
function getAddress(key) {
    if (isCrypto(key)) return CONFIG.cryptoAddrs[key];
    if (CONFIG.wallets[key]?.addr) return CONFIG.wallets[key].addr;
    return CONFIG.wallets[key]?.num || "N/A";
}
function getRateMGA(key) {
    if (isCrypto(key)) return CONFIG.ratesMGA[key];
    const unit = CONFIG.wallets[key]?.unit;
    if (unit) {
        const rateKey = unit.replace('$', 'USD').replace('€', 'EUR');
        return CONFIG.ratesMGA[rateKey] || 0;
    }
    return 0;
}

/* ===== Build selectable chips (uses translated e-wallet labels) ===== */
function chip(label, active, onClick, isExpander=false){
  const b=document.createElement("button");
  
  if (isExpander) {
    b.className = "expand-inline-btn";
    b.classList.toggle("open", active);
    // Use an icon that looks like a plus/minus or expander
    b.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
  } else {
    // Determine class for crypto or e-wallet
    b.className = isCrypto(label) ? "chip" : "ewbtn";
    b.textContent = isCrypto(label) ? label : (CONFIG.wallets[label]?.label || label);
  }
  
  b.setAttribute("aria-pressed", active?"true":"false");
  b.addEventListener("click", onClick);
  return b;
}

/* ===== Render Unified Strip (Stable rendering logic) ===== */
function renderUnifiedStrip(mode="depot"){
  let activeSelectionKey = (mode === "transfert") ? transferTarget : currentSelection;
  
  const handleSelectionClick = (key, mode) => {
    if(mode === "transfert"){
      transferTarget = key;
    } else {
      currentSelection = key;
    }
    refreshAll();
  };
  
  const renderStrip = (stripEl, list, isTargetStrip) => {
    if (!stripEl) return;
    stripEl.innerHTML = "";
    
    list.forEach(key=>{
      stripEl.appendChild(chip(key, key===activeSelectionKey, ()=>handleSelectionClick(key, isTargetStrip ? 'transfert' : mode)));
    });
    
    // Add expander button to the primary strip (Source or Transfer Target)
    if ((stripEl.id === 'unifiedStrip' && !isTargetStrip) || (stripEl.id === 'unifiedStripTransfer' && isTargetStrip)) {
        const expander = chip(null, showExtraSelection, toggleSelection, true);
        stripEl.appendChild(expander);
    }
  };
  
  const toggleSelection = () => { showExtraSelection=!showExtraSelection; renderUnifiedStrip(getActiveTab()); };
  
  // --- 1. Source Selection Strip (Used for Depot, Withdrawal, and Transfer Source) ---
  const primaryStrip = $("#unifiedStrip");
  const extraStrip = $("#unifiedStripExtra");
  
  renderStrip(primaryStrip, CONFIG.primarySelection, false);
  if (extraStrip) {
      extraStrip.style.display = showExtraSelection ? 'flex' : 'none';
      renderStrip(extraStrip, CONFIG.extraSelection, false);
  }

  // --- 2. Transfer Target Selection Strip (Used only for Transfer Target) ---
  if (mode === 'transfert') {
      activeSelectionKey = transferTarget; // Switch active key to target
      
      const primaryStripT = $("#unifiedStripTransfer");
      const extraStripT = $("#unifiedStripTransferExtra");

      renderStrip(primaryStripT, CONFIG.primarySelection, true);
      if (extraStripT) {
          extraStripT.style.display = showExtraSelection ? 'flex' : 'none';
          renderStrip(extraStripT, CONFIG.extraSelection, true);
      }
  }
}

/* ===== Update Crypto Selector/Rates (uses t()) ===== */
function updateCryptoDropdown() {
  const dropdown = $("#crypto-dropdown");
  dropdown.innerHTML = "";
  // Filter ensures only crypto symbols appear in the dropdown
  [...CONFIG.primarySelection.filter(isCrypto), ...CONFIG.extraSelection.filter(isCrypto)].forEach(sym => {
    const item = document.createElement("div");
    item.className = "crypto-item";
    if (sym === currentSelection) item.classList.add("active");
    item.innerHTML = `
      <span>${sym}</span>
      <span class="crypto-rate">${CONFIG.ratesMGA[sym]?.toLocaleString() || t('rates_note_mga')}</span>
    `;
    item.addEventListener("click", () => {
      currentSelection = sym;
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
  const ratesPanelTitle = $("#rates-panel-title");
  const ratesInfoBtn = $("#rates-panel .info-icon");
  const fiatDisplay = $("#fiat-rate-display");
  
  // Update static titles
  ratesPanelTitle.firstChild.textContent = t('rates_current');
  ratesInfoBtn.title = t('rates_info_title');

  // 1. Current Crypto Rate
  const rateKey = isCrypto(currentSelection) ? currentSelection : 'BTC'; 
  const rateMGA = CONFIG.ratesMGA[rateKey];
  
  if (rateKey && rateMGA) {
    display.textContent = t('common_rate_template')
                            .replace('{unit}', rateKey)
                            .replace('...', rateMGA.toLocaleString());
  } else {
    display.textContent = t('rates_loading');
  }

  // 2. FIAT Rates
  const rateUSD = CONFIG.ratesMGA.USD || '...';
  const rateEUR = CONFIG.ratesMGA.EUR || '...';
  fiatDisplay.textContent = `1 $ = ${rateUSD.toLocaleString()} MGA | 1 € = ${rateEUR.toLocaleString()} MGA`;
}

function getActiveTab() {
  return $(".tab[aria-selected='true']").dataset.tab;
}

/* ---------------------------------
 * MAIN REFRESH FUNCTIONS (i18n integrated)
 * --------------------------------- */

function updateDepotDest(){
  const destEl = $("#dep-pay-dest");
  const nameEl = $("#dep-pay-name");
  const wallet = CONFIG.wallets[payChoice];
  
  $("#dep-note-send-to-label").textContent = t('dep_note_send_to');
  $("#dep-note-name-label").textContent = t('dep_note_name');
  
  destEl.textContent = wallet.num || wallet.addr;
  nameEl.textContent = wallet.name;
}

function refreshDepot(){
  const target = currentSelection; 
  const amountAriary = parseFloat($("#dep-amount-ariary").value) || 0;
  let rateTarget = getRateMGA(target);
  const feeRate = CONFIG.fees.depot;

  const amountAfterFeeAriary = amountAriary * (1 - feeRate);
  let amountTarget = 0;
  let unitTarget = getUnit(target);
  
  // Update static labels that require i18n
  $("#dep-choose-pay-label").textContent = t('dep_choose_pay');
  $("#dep-addr-label").firstChild.textContent = t('dep_addr_label');

  let rateNote = t('common_rate_template').replace('{unit}', unitTarget).replace('...', t('rates_note_mga'));
  
  if (rateTarget > 0) {
    amountTarget = amountAfterFeeAriary / rateTarget;
    rateNote = t('common_rate_template')
               .replace('{unit}', unitTarget)
               .replace('...', rateTarget.toLocaleString());
  }
  
  $("#dep-amount-crypto").value = amountTarget.toFixed(isCrypto(target) ? 8 : 2);
  $("#dep-receive-unit").textContent = unitTarget;
  $("#dep-rate-note").textContent = rateNote;
  $("#dep-fee-note").textContent = `${t('dep_fee')}: ${feeRate*100}%`;
  
  updateDepotDest();
}

function detectMobileWallet(phoneNumber) {
  const prefix = phoneNumber.substring(0, 3);
  for (const [walletKey, prefixes] of Object.entries(CONFIG.mobilePrefixes)) {
    if (prefixes.includes(prefix)) {
      return walletKey;
    }
  }
  return null;
}

function refreshRetrait(){
  const source = currentSelection; 
  const amountSource = parseFloat($("#ret-amount-send").value) || 0;
  const rateSource = getRateMGA(source);
  const feeRate = CONFIG.fees.retrait;
  const amountAfterFeeSource = amountSource * (1 - feeRate);
  const amountAriary = amountAfterFeeSource * rateSource; 
  
  let unitSource = getUnit(source);
  
  // Update static labels that require i18n
  $("#ret-our-addr-label").firstChild.textContent = t('ret_our_addr_label');
  $("#ret-copy").textContent = t('ret_copy'); 
  $("#ret-method-label").firstChild.textContent = t('ret_method_label');
  $("#ret-name-label").firstChild.textContent = t('ret_name_label');
  
  let rateNote = t('common_rate_template').replace('{unit}', unitSource).replace('...', t('rates_note_mga'));
  
  if (rateSource > 0) {
    rateNote = t('common_rate_template')
               .replace('{unit}', unitSource)
               .replace('...', rateSource.toLocaleString());
  }

  // 1. Update Wallet based on phone number (Detection Logic)
  const phoneInput = $("#ret-phone");
  const phoneNum = phoneInput.value.trim();
  const detectedWallet = detectMobileWallet(phoneNum);
  const walletIcon = $("#ret-wallet-icon");
  $("#ret-our-addr").value = getAddress(source); // Our address for the source
  
  if (phoneNum.length >= 3 && detectedWallet) {
    withdrawalWallet = detectedWallet;
    walletIcon.textContent = CONFIG.wallets[withdrawalWallet]?.logo || detectedWallet;
  } else {
    walletIcon.textContent = phoneNum.length > 0 ? '...' : t('ret_default_wallet');
    withdrawalWallet = 'mvola'; 
  }
  
  // 2. Update UI
  $("#ret-amount-ariary").value = Math.round(amountAriary).toLocaleString();
  $("#ret-send-unit").textContent = unitSource;
  $("#ret-rate-note").textContent = rateNote;
  $("#ret-fee-note").textContent = `${t('dep_fee')}: ${feeRate*100}%`;
  
  $("#ret-currency-only").innerHTML = `${t('ret_send_only_in')} <b>${unitSource}</b>`;
}

function refreshTransfer(){
  const source = currentSelection;
  const target = transferTarget;
  const amountSource = parseFloat($("#trf-amount-top").value) || 0;
  
  const rateSourceMGA = getRateMGA(source);
  const rateTargetMGA = getRateMGA(target);
  const feeRate = CONFIG.fees.transfert;
  
  let amountTarget = 0;
  let unitSource = getUnit(source);
  let unitTarget = getUnit(target);
  
  // Update static labels that require i18n
  $("#trf-copy").textContent = t('ret_copy'); 
  $("#trf-our-addr-label").firstChild.textContent = t('ret_our_addr_label'); // Re-use
  $("#trf-dest-addr-label").firstChild.textContent = t('trf_dest_addr_label');

  let displayRateNote = t('common_rate_conversion').replace('{unitSrc}', unitSource).replace('{unitTgt}', unitTarget).replace('...', t('rates_note_mga'));
  
  if (rateSourceMGA > 0 && rateTargetMGA > 0) {
    const amountMGA = amountSource * rateSourceMGA;
    const amountTargetRaw = amountMGA / rateTargetMGA;
    amountTarget = amountTargetRaw * (1 - feeRate);

    const cryptoToCryptoRate = (rateSourceMGA / rateTargetMGA) * (1 - feeRate);
    displayRateNote = t('common_rate_conversion')
                        .replace('{unitSrc}', unitSource)
                        .replace('{unitTgt}', unitTarget)
                        .replace('...', cryptoToCryptoRate.toFixed(4));
  }

  // Update SEND fields
  $("#trf-amount-top").value = amountSource.toFixed(isCrypto(source) ? 8 : 2);
  $("#trf-top-suffix").textContent = unitSource;
  $("#trf-top-note").textContent = `${t('trf_top_note_source')}: ${unitSource}`;
  $("#trf-our-addr").value = getAddress(source);
  
  // Update RECEIVE fields
  $("#trf-amount-bot").value = amountTarget.toFixed(isCrypto(target) ? 8 : 2);
  $("#trf-bot-suffix").textContent = unitTarget;
  $("#trf-rate-note").textContent = displayRateNote;
}

// Main refresh orchestrator
function refreshAll(){
  updateCurrentRateDisplay();
  
  // Update the common instruction note
  $("#first-instruction").textContent = t('common_note_instruction');

  const activeTab = getActiveTab();
  renderUnifiedStrip(activeTab); 
  
  if (activeTab === "depot") refreshDepot();
  if (activeTab === "retrait") refreshRetrait();
  if (activeTab === "transfert") refreshTransfer();
}

/* ===== Event Listeners ===== */
// Tab Switching
$$(".tab").forEach(t=>{
  t.addEventListener("click",()=>{
    $$(".tab").forEach(x=>x.setAttribute("aria-selected","false"));
    t.setAttribute("aria-selected","true");
    const tab=t.dataset.tab;
    $("#panel-depot").hidden = tab!=="depot";
    $("#panel-retrait").hidden = tab!=="retrait";
    $("#panel-transfert").hidden = tab!=="transfert";
    showExtraSelection=false;
    refreshAll();
  });
});

// Deposit Pay Options
$("#dep-pay-opts").addEventListener("click",(e)=>{
  const btn=e.target.closest(".paybtn"); if(!btn) return;
  payChoice = btn.dataset.pay;
  $$("#dep-pay-opts .paybtn").forEach(b=>b.setAttribute("aria-pressed", b.dataset.pay===payChoice?"true":"false"));
  updateDepotDest();
});

// Copy Buttons
["ret","trf"].forEach(k=>{
  $(`#${k}-copy`).addEventListener("click",()=>{ $(`#${k}-our-addr`).select(); document.execCommand("copy"); toast(t('ret_copy') + "ed!"); }); 
});

// Input Listeners for Auto-Update
$("#dep-amount-ariary").addEventListener("input", refreshDepot);
$("#ret-amount-send").addEventListener("input", refreshRetrait);
$("#ret-phone").addEventListener("input", refreshRetrait);
$("#trf-amount-top").addEventListener("input", refreshTransfer);

// Initial call on load
document.addEventListener("DOMContentLoaded", () => {
  setupCryptoSelector();
  // Set up language buttons
  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });
  // Initialize with the default language (and runs refreshAll)
  switchLanguage(currentLang); 
});
