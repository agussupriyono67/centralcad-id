



(function () {

  var siteHeader = document.querySelector('.site-header');

  var promoBanner = null;

  var promoBannerClose = null;



  function updatePromoBarOffset() {

    var promoHeight = 0;

    if (promoBanner && !promoBanner.hasAttribute('hidden')) promoHeight = promoBanner.offsetHeight || 0;

    document.documentElement.style.setProperty('--promo-bar-height', promoHeight + 'px');

  }



  function updateHeaderOffset() {

    if (!siteHeader) return;

    document.documentElement.style.setProperty('--header-offset', siteHeader.offsetHeight + 'px');

  }



  function updateStickyHeaderState() {

    if (!siteHeader) return;

    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);

  }



  updatePromoBarOffset();

  updateHeaderOffset();

  updateStickyHeaderState();



  if (promoBannerClose && promoBanner) {

    promoBannerClose.addEventListener('click', function () {

      promoBanner.setAttribute('hidden', 'hidden');

      updatePromoBarOffset();

      updateHeaderOffset();

    });

  }



  window.addEventListener('scroll', updateStickyHeaderState, { passive: true });

  window.addEventListener('resize', function () {

    updatePromoBarOffset();

    updateHeaderOffset();

  });

  window.addEventListener('load', function () {

    updatePromoBarOffset();

    updateHeaderOffset();

  });



  var youtubeFrames = document.querySelectorAll('[data-youtube-video]');



  youtubeFrames.forEach(function (frame) {

    var cover = frame.querySelector('.video-cover');

    var videoId = frame.dataset.videoId || 'poRFQEC30os';

    if (!cover) return;



    cover.addEventListener('click', function () {

      if (frame.querySelector('iframe')) return;

      var pageOrigin = (window.location && window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'https://www.zwsoft.com';

      var pageUrl = (window.location && /^https?:/.test(window.location.href)) ? window.location.href : 'https://www.zwsoft.com/';

      var params = new URLSearchParams({

        autoplay: '1',

        rel: '0',

        modestbranding: '1',

        playsinline: '1',

        enablejsapi: '1',

        origin: pageOrigin,

        widget_referrer: pageUrl

      });



      var iframe = document.createElement('iframe');

      iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?' + params.toString();

      iframe.title = 'Pemutar video YouTube';

      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

      iframe.referrerPolicy = 'no-referrer-when-downgrade';

      iframe.allowFullscreen = true;

      iframe.loading = 'eager';

      frame.appendChild(iframe);

      frame.classList.add('is-playing');

    });

  });



  var featureAccordion = document.querySelector('[data-feature-accordion]');

  var featureItems = document.querySelectorAll('[data-feature-accordion] .acc-item');

  var featureImage = document.querySelector('[data-feature-image]');

  var featureAutoTimer = null;

  var featureAutoDelay = 15000;

  var reduceFeatureMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;



  function clearFeatureAutoAdvance() {

    if (featureAutoTimer) window.clearTimeout(featureAutoTimer);

    featureAutoTimer = null;

  }



  function getActiveFeatureIndex() {

    var activeIndex = Array.prototype.findIndex.call(featureItems, function (item) {

      return item.classList.contains('active');

    });

    return activeIndex >= 0 ? activeIndex : 0;

  }



  function scheduleFeatureAutoAdvance(activeIndex) {

    clearFeatureAutoAdvance();

    if (reduceFeatureMotion || featureItems.length < 2) return;



    featureAutoTimer = window.setTimeout(function () {

      var nextIndex = (activeIndex + 1) % featureItems.length;

      activateFeatureItem(nextIndex, true);

    }, featureAutoDelay);

  }



  function activateFeatureItem(index, shouldAutoAdvance) {

    var item = featureItems[index];

    if (!item) return;



    featureItems.forEach(function (other) {

      var otherTrigger = other.querySelector('.acc-trigger');

      other.classList.remove('active');

      if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');

    });



    /* Force reflow so the active underline animation restarts from the left. */

    void item.offsetWidth;



    item.classList.add('active');

    var trigger = item.querySelector('.acc-trigger');

    if (trigger) trigger.setAttribute('aria-expanded', 'true');



    if (featureImage && item.dataset.img) {

      featureImage.src = item.dataset.img;

    }



    if (shouldAutoAdvance) {

      scheduleFeatureAutoAdvance(index);

    }

  }



  featureItems.forEach(function (item, index) {

    var trigger = item.querySelector('.acc-trigger');

    var panel = item.querySelector('.acc-panel');

    if (!trigger) return;

    if (panel && !panel.id) {

      panel.id = 'feature-panel-' + index;

      trigger.setAttribute('aria-controls', panel.id);

    }

    trigger.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

    trigger.addEventListener('click', function () {

      activateFeatureItem(index, true);

    });

  });



  if (featureAccordion) {

    featureAccordion.addEventListener('mouseenter', function () {

      /* Keep the carousel running even when hovering, so the 15s progress line and tab switch stay in sync. */

      scheduleFeatureAutoAdvance(getActiveFeatureIndex());

    });

  }



  document.addEventListener('visibilitychange', function () {

    if (document.hidden) {

      clearFeatureAutoAdvance();

    } else {

      scheduleFeatureAutoAdvance(getActiveFeatureIndex());

    }

  });



  scheduleFeatureAutoAdvance(getActiveFeatureIndex());



  var industryTabs = document.querySelectorAll('[data-industry-tabs] .industry-tab');

  var industryTitle = document.querySelector('[data-industry-title]');

  var industryCopy = document.querySelector('[data-industry-copy]');

  var industryVisual = document.querySelector('[data-industry-visual]');

  var industryLogoImgs = document.querySelectorAll('.industry-card .client-logos img');



  function preloadIndustryImage(src) {

    if (!src) return;

    var cachedImage = new Image();

    cachedImage.decoding = 'async';

    cachedImage.src = src;

  }



  function runWhenIdle(callback) {

    if ('requestIdleCallback' in window) {

      window.requestIdleCallback(callback, { timeout: 2500 });

    } else {

      window.setTimeout(callback, 600);

    }

  }



  industryTabs.forEach(function (tab) {

    tab.setAttribute('aria-pressed', tab.classList.contains('active') ? 'true' : 'false');

  });



  runWhenIdle(function () {

    industryTabs.forEach(function (tab) {

      preloadIndustryImage(tab.dataset.visual);

      if (tab.dataset.logos) {

        tab.dataset.logos.split('|').forEach(preloadIndustryImage);

      }

    });

  });



  industryTabs.forEach(function (tab) {

    tab.addEventListener('click', function () {

      industryTabs.forEach(function (other) {

        other.classList.remove('active');

        other.setAttribute('aria-pressed', 'false');

      });

      tab.classList.add('active');

      tab.setAttribute('aria-pressed', 'true');

      if (industryTitle) industryTitle.textContent = tab.dataset.title || '';

      if (industryCopy) industryCopy.textContent = tab.dataset.copy || '';

      if (industryVisual && tab.dataset.visual) {

        industryVisual.src = tab.dataset.visual;

        industryVisual.alt = (tab.dataset.title || 'Industri') + ' - visual';

      }

      if (industryLogoImgs.length) {

        var logos = (tab.dataset.logos || '').split('|');

        industryLogoImgs.forEach(function (img, index) {

          if (logos[index]) {

            img.style.opacity = '0';

            img.src = logos[index];

            img.alt = (tab.dataset.title || 'Industri') + ' - logo klien ' + (index + 1);

            img.decoding = 'async';

            img.onload = function () { img.style.opacity = '1'; };

            img.onerror = function () { img.style.opacity = '1'; };

            if (img.complete) window.requestAnimationFrame(function () { img.style.opacity = '1'; });

          } else {

            img.removeAttribute('src');

            img.alt = '';

            img.style.opacity = '0';

          }

        });

      }

    });

  });



  // Indonesia standalone pricing (IDR)

  // 3-year cost = first-year license + 2 years of YM

  var STANDARD_LICENSE_PRICE = 17000000;

  var STANDARD_YM = 3400000;

  var PROFESSIONAL_LICENSE_PRICE = 26400000;

  var PROFESSIONAL_YM = 5300000;

  var YEARS = 3;

  var MAX_CURRENT_CAD_COST = 9999999999;



  var cadCostInput = document.getElementById('cadCost');

  var seatRange = document.getElementById('seatRange');

  var seatValue = document.getElementById('seatValue');

  var standardCost = document.getElementById('standardCost');

  var professionalCost = document.getElementById('professionalCost');

  var currentCost = document.getElementById('currentCost');

  var standardSaving = document.getElementById('standardSaving');

  var professionalSaving = document.getElementById('professionalSaving');

  var standardBar = document.getElementById('standardBar');

  var professionalBar = document.getElementById('professionalBar');

  var currentBar = document.getElementById('currentBar');



  function parseIDRValue(value) {

    var raw = String(value || '').trim().toLowerCase();

    if (!raw) return 0;



    var isJuta = /\bjt\b|juta/.test(raw);

    raw = raw.replace(/rp/g, '').replace(/juta/g, '').replace(/jt/g, '').replace(/\s+/g, '');



    if (isJuta) {

      // Supports formats such as 70.5 jt, 70,5 jt, and 1.057,5 jt.

      if (raw.indexOf(',') !== -1 && raw.indexOf('.') !== -1) {

        raw = raw.replace(/\./g, '').replace(',', '.');

      } else if (raw.indexOf(',') !== -1) {

        raw = raw.replace(',', '.');

      }

      return (parseFloat(raw) || 0) * 1000000;

    }



    // If a full Rupiah amount is entered, keep supporting it as well.

    var digitsOnly = raw.replace(/[^0-9]/g, '');

    if (digitsOnly.length >= 6) return Number(digitsOnly) || 0;



    // Short numeric entries are treated as juta, e.g. 70.5 = Rp 70.5 jt.

    raw = raw.replace(',', '.');

    return (parseFloat(raw) || 0) * 1000000;

  }



  function formatJutaNumber(value) {

    var juta = Math.max(0, Number(value) || 0) / 1000000;

    var rounded = Math.round(juta * 10) / 10;

    return rounded.toLocaleString('id-ID', {

      minimumFractionDigits: 0,

      maximumFractionDigits: 1

    });

  }



  function formatIDR(value) {

    return 'Rp ' + formatJutaNumber(value) + ' jt';

  }



  function calculateZwcadThreeYearCost(licensePrice, yearlyYM, seats) {

    return (licensePrice + yearlyYM * (YEARS - 1)) * seats;

  }



  function getMaxBarHeight() {

    if (window.innerWidth <= 640) return 230;

    if (window.innerWidth <= 980) return 280;

    return 315;

  }



  function updateRangeFill() {

    if (!seatRange) return;

    var min = Number(seatRange.min) || 1;

    var max = Number(seatRange.max) || 10;

    var value = Number(seatRange.value) || min;

    var percentage = ((value - min) * 100) / Math.max(max - min, 1);

    seatRange.style.backgroundSize = percentage + '% 100%';

  }



  function setIDRValue(el, targetValue) {

    if (!el) return;

    el.textContent = formatIDR(targetValue);

  }



  function setBarHeight(bar, height) {

    if (!bar) return;

    bar.style.height = height + 'px';

  }



  function updateBars(standard, professional, current, annualCost) {

    var maxBarHeight = getMaxBarHeight();

    var minBarHeight = 24;

    var maxSeats = seatRange ? Number(seatRange.max) || 10 : 10;



    var standardMax = calculateZwcadThreeYearCost(STANDARD_LICENSE_PRICE, STANDARD_YM, maxSeats);

    var professionalMax = calculateZwcadThreeYearCost(PROFESSIONAL_LICENSE_PRICE, PROFESSIONAL_YM, maxSeats);

    var currentMax = Math.max(Number(annualCost) || 0, 1) * maxSeats * YEARS;

    var referenceCost = Math.max(standardMax, professionalMax, currentMax, standard, professional, current, 1);



    function getDynamicBarHeight(cost) {

      return Math.min(

        Math.max((cost / referenceCost) * maxBarHeight, minBarHeight),

        maxBarHeight

      );

    }



    setBarHeight(standardBar, getDynamicBarHeight(standard));

    setBarHeight(professionalBar, getDynamicBarHeight(professional));

    setBarHeight(currentBar, getDynamicBarHeight(current));

  }



  function updateCalculator() {

    if (!cadCostInput || !seatRange) return;



    var seats = Number(seatRange.value) || 1;

    var annualCost = parseIDRValue(cadCostInput.value);



    if (annualCost > MAX_CURRENT_CAD_COST) {

      annualCost = MAX_CURRENT_CAD_COST;

      cadCostInput.value = formatIDR(MAX_CURRENT_CAD_COST);

      cadCostInput.classList.add('input-error');

    } else {

      cadCostInput.classList.remove('input-error');

    }



    var standard = calculateZwcadThreeYearCost(STANDARD_LICENSE_PRICE, STANDARD_YM, seats);

    var professional = calculateZwcadThreeYearCost(PROFESSIONAL_LICENSE_PRICE, PROFESSIONAL_YM, seats);

    var current = annualCost * seats * YEARS;

    var standardDifference = Math.max(current - standard, 0);

    var professionalDifference = Math.max(current - professional, 0);



    if (seatValue) seatValue.textContent = seats;

    setIDRValue(standardCost, standard);

    setIDRValue(professionalCost, professional);

    setIDRValue(currentCost, current);

    setIDRValue(standardSaving, standardDifference);

    setIDRValue(professionalSaving, professionalDifference);



    updateBars(standard, professional, current, annualCost);

    updateRangeFill();

  }



  if (seatRange) {

    seatRange.addEventListener('input', updateCalculator);

  }



  if (cadCostInput) {

    cadCostInput.addEventListener('focus', function () {

      var value = parseIDRValue(cadCostInput.value);

      if (!value) {

        cadCostInput.value = '';

        return;

      }

      var juta = Math.round((value / 1000000) * 10) / 10;

      cadCostInput.value = String(juta);

    });



    cadCostInput.addEventListener('input', updateCalculator);



    cadCostInput.addEventListener('blur', function () {

      var value = parseIDRValue(cadCostInput.value);

      cadCostInput.value = value ? formatIDR(value) : '';

      updateCalculator();

    });

  }



  window.addEventListener('resize', updateCalculator);



  [standardBar, professionalBar, currentBar].forEach(function (bar) {

    if (bar) bar.style.height = '0px';

  });



  window.requestAnimationFrame(updateCalculator);

})();







  function updateCountryFlag(select) {

    var option = select.options[select.selectedIndex];

    var flag = option.getAttribute('data-flag') || '🌐';

    var flagEl = document.getElementById('current-phone-flag');

    if (flagEl) flagEl.textContent = flag;

  }



  function handleZwcadFormSubmit(e) {

    e.preventDefault();

    var form = document.getElementById('zwcad-trial-form');

    var successBlock = document.getElementById('zwcad-form-success');

    var submitBtn = document.getElementById('submit-btn');



    var firstName = (document.getElementById('first_name').value || '').trim();

    var lastName = (document.getElementById('last_name').value || '').trim();

    var email = (document.getElementById('email').value || '').trim();

    var phone = (document.getElementById('phone').value || '').trim();

    var company = (document.getElementById('company').value || '').trim();

    var industrySelect = document.getElementById('industry');

    var industry = industrySelect ? industrySelect.value : '';



    var waMessage = "Halo CAD Indonesia, aku mau coba trial 30 hari ZWCAD-nya nih 😊\n\n" +

      "Berikut data pendaftaran saya:\n" +

      "- Nama: " + firstName + " " + lastName + "\n" +

      "- Email: " + email + "\n" +

      "- No WhatsApp: " + phone + "\n" +

      "- Perusahaan/Studio: " + company + "\n" +

      "- Industri: " + industry + "\n\n" +

      "Mohon dibantu untuk info lisensi dan panduan aktivasinya ya. Terima kasih banyak!";



    var waLink = "https://wa.me/6281912244664?text=" + encodeURIComponent(waMessage);



    if (submitBtn) {

      submitBtn.textContent = 'Menghubungkan ke WhatsApp...';

      submitBtn.disabled = true;

    }



    // Open WhatsApp in new tab

    window.open(waLink, '_blank', 'noopener,noreferrer');



    setTimeout(function() {

      form.style.display = 'none';

      successBlock.style.display = 'block';



      // Auto trigger installer download

      var downloadLink = document.createElement('a');

      downloadLink.href = 'https://www.dropbox.com/scl/fi/yywdfdlbnj2g33a2k2b11/ZWCAD_2026_Eng_Win_64bit_20251210.exe?rlkey=a0hmtwdao4wx04b995ee6ezum&dl=1';

      downloadLink.setAttribute('download', 'ZWCAD_2026_Eng_Win_64bit.exe');

      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);

    }, 500);

  }



