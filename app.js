/* Glamor Attire.
   Everything the owner is likely to change lives in BRAND, FILTERS and PRODUCTS below. */
'use strict';

const BRAND = {
  name: 'Glamor Attire',
  // Digits only, with country code, e.g. '2348012345678'.
  // While empty, WhatsApp opens and asks the customer to choose who to send the order to.
  whatsapp: '',
  // Handle without the @. While empty, Instagram links stay hidden.
  instagram: '',
  currency: 'NGN',
};

// `cover` is the photo used for the category tile on the home page.
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New In', cover: 'purple-bloom-2' },
  { id: 'kaftans', label: 'Kaftans & Bubus', cover: 'blue-orchid-1' },
  { id: 'abayas', label: 'Abayas', cover: 'ruffle-burgundy-3' },
  { id: 'sets', label: 'Sets & Gowns', cover: 'palm-leaf-2' },
];

// price: a number (e.g. 85000) shows as currency; null shows "Price on request".
// images: how many photos exist for the piece, named <id>-1, <id>-2 ... in assets/img.
const PRODUCTS = [
  { id: 'rose-panel', name: 'Panel Kaftan', colour: 'Rose & Magenta', category: 'kaftans', isNew: true, price: null, images: 1,
    description: 'A kaftan with a solid rose front panel set against a hand-drawn magenta print, with a headscarf to match.' },
  { id: 'embroidered-bubu', name: 'Embroidered Bubu', colour: 'Lemon & Violet', category: 'kaftans', isNew: true, price: null, images: 1,
    description: 'A lemon bubu with a bib of gold floral embroidery, falling into violet hand-dyed sleeves and hem.' },
  { id: 'ruffle-burgundy', name: 'Ruffle Sleeve Abaya', colour: 'Burgundy', category: 'abayas', isNew: true, price: null, images: 3,
    description: 'A floor-length abaya with a clean V neckline and sheer sleeves built from tiers of sculpted ruffles.' },
  { id: 'purple-bloom', name: 'Bloom Kaftan', colour: 'Violet', category: 'kaftans', isNew: true, price: null, images: 3,
    description: 'A draped kaftan in an oversized violet floral, finished with a fishtail hem. Styled with a headscarf in the same print.' },
  { id: 'rose-bloom', name: 'Bloom Kaftan', colour: 'Rose Red', category: 'kaftans', isNew: true, price: null, images: 4,
    description: 'The Bloom print in deep rose on blush. A high neck, generous batwing sleeves and a hem made to move.' },
  { id: 'bell-burgundy', name: 'Bell Sleeve Abaya', colour: 'Burgundy', category: 'abayas', isNew: true, price: null, images: 2,
    description: 'A fluid burgundy abaya with sheer, voluminous bell sleeves gathered at the cuff.' },
  { id: 'blue-orchid', name: 'Orchid Bubu', colour: 'Blush & Blue', category: 'kaftans', isNew: true, price: null, images: 2,
    description: 'A relaxed bubu in a blush and blue orchid print with a V neckline and a softly gathered hem.' },
  { id: 'pleated-dusk', name: 'Pleated Cape Set', colour: 'Dusk Blue', category: 'sets', isNew: true, price: null, images: 1,
    description: 'A finely pleated two-piece: a cape-sleeve top with a keyhole neckline over a wide-leg trouser.' },
  { id: 'pleated-mocha', name: 'Pleated Cape Set', colour: 'Mocha', category: 'sets', isNew: true, price: null, images: 2,
    description: 'The pleated cape set in a marbled mocha and black print, with a matching headscarf.' },
  { id: 'watercolour-cape', name: 'Watercolour Cape Kaftan', colour: 'Multicolour', category: 'kaftans', isNew: true, price: null, images: 1,
    description: 'A sheer, scallop-edged cape over a fitted column, in a watercolour print with a draped cowl neckline.' },
  { id: 'ruffle-black', name: 'Ruffle Sleeve Abaya', colour: 'Black', category: 'abayas', isNew: true, price: null, images: 1,
    description: 'The ruffle sleeve abaya in black, shown with the Glamor Attire signature scarf.' },
  { id: 'palm-leaf', name: 'Palm Leaf Gown', colour: 'Rose & Wine', category: 'sets', isNew: false, price: null, images: 4,
    description: 'A fitted, long-sleeved gown with a square neckline in a rose and wine palm print. Shown with and without a lace veil.' },
  { id: 'laceup-azure', name: 'Lace-Up Kaftan', colour: 'Azure & Gold', category: 'kaftans', isNew: false, price: null, images: 1,
    description: 'A satin kaftan with a lace-up neckline and a ruched waist, in azure and gold.' },
  { id: 'laceup-leopard', name: 'Lace-Up Kaftan', colour: 'Silver Leopard', category: 'kaftans', isNew: false, price: null, images: 1,
    description: 'The lace-up kaftan in a tonal silver leopard jacquard with wide draped sleeves.' },
  { id: 'laceup-swirl', name: 'Lace-Up Kaftan', colour: 'Rose Swirl', category: 'kaftans', isNew: false, price: null, images: 1,
    description: 'The lace-up kaftan in a rose swirl print, worn with a lace shawl.' },
];

const BAG_KEY = 'glamor-attire-bag';
const TILE_SIZES = '(min-width: 64rem) 25vw, (min-width: 40rem) 33vw, 50vw';
const PRODUCT_SIZES = '(min-width: 64rem) 58vw, 100vw';

const productById = new Map(PRODUCTS.map((product) => [product.id, product]));
const filterById = new Map(FILTERS.map((filter) => [filter.id, filter]));

// Catches the mistakes most likely to creep in when the lists above are edited.
console.assert(productById.size === PRODUCTS.length, 'PRODUCTS: duplicate id');
console.assert(PRODUCTS.every((p) => filterById.has(p.category)), 'PRODUCTS: unknown category');
console.assert(/^\d*$/.test(BRAND.whatsapp), 'BRAND.whatsapp must be digits only');

const $ = (id) => document.getElementById(id);

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const formatPrice = (product) =>
  product.price == null
    ? 'Price on request'
    : new Intl.NumberFormat('en', { style: 'currency', currency: BRAND.currency, maximumFractionDigits: 0 }).format(product.price);

const photo = (name, alt, sizes) =>
  `<img src="assets/img/${name}-640.jpg" srcset="assets/img/${name}-640.jpg 640w, assets/img/${name}-1170.jpg 1170w" sizes="${sizes}" alt="${escapeHtml(alt)}" loading="lazy">`;

const matchesFilter = (product, filterId) =>
  filterId === 'all' || (filterId === 'new' ? product.isNew : product.category === filterId);

const whatsappUrl = (message) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

// Falls back to the raw value so a mistyped category cannot break search or the product view.
const categoryLabel = (product) => filterById.get(product.category)?.label ?? product.category;

const describe = (product) => `${product.name} (${product.colour})`;

const orderMessage = (ids) =>
  [`Hello ${BRAND.name}, I would like to order:`, ...ids.map((id, index) => `${index + 1}. ${describe(productById.get(id))}`)].join('\n');

/* ---------- Tiles ---------- */

const tile = (product) => `
  <button class="tile" type="button" data-product="${product.id}">
    <span class="tile-media">${photo(`${product.id}-1`, '', TILE_SIZES)}</span>
    <span class="tile-name">${escapeHtml(product.name)}</span>
    <span class="tile-meta">${escapeHtml(product.colour)}</span>
    <span class="tile-meta">${formatPrice(product)}</span>
  </button>`;

const tiles = (products) => products.map(tile).join('');

/* ---------- Collection + filters ---------- */

let activeFilter = 'all';

function renderCollection() {
  const visible = PRODUCTS.filter((product) => matchesFilter(product, activeFilter));
  $('collectionGrid').innerHTML = tiles(visible);
  $('collectionCount').textContent = `${visible.length} ${visible.length === 1 ? 'piece' : 'pieces'}`;
  $('filters').innerHTML = FILTERS.map((filter) => `
    <button class="pill" type="button" data-filter="${filter.id}" aria-pressed="${filter.id === activeFilter}">${escapeHtml(filter.label)}</button>`).join('');
}

function applyFilter(filterId) {
  if (!filterById.has(filterId)) return;
  activeFilter = filterId;
  renderCollection();
  closeDialogs();
  $('filters').querySelector('[aria-pressed="true"]').focus({ preventScroll: true });
  $('collection').scrollIntoView();
}

/* ---------- Dialogs ---------- */

function closeDialogs() {
  document.querySelectorAll('dialog[open]').forEach((dialog) => dialog.close());
}

function openDialog(id) {
  closeDialogs();
  const dialog = $(id);
  dialog.showModal();
  // Focus the panel itself (screen readers announce its name) unless it asks for a field, like search.
  if (!dialog.querySelector('[autofocus]')) dialog.focus();
}

function closeOnBackdrop(event) {
  const dialog = event.currentTarget;
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  const isInside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  if (!isInside) dialog.close();
}

/* ---------- Product view ---------- */

function openProduct(id) {
  const product = productById.get(id);
  if (!product) return;
  const gallery = Array.from({ length: product.images }, (_, index) =>
    photo(`${product.id}-${index + 1}`, `${describe(product)}, view ${index + 1}`, PRODUCT_SIZES)).join('');
  const enquiry = whatsappUrl(`Hello ${BRAND.name}, I would like to enquire about: ${describe(product)}`);
  $('productBody').innerHTML = `
    <div class="product-gallery">${gallery}</div>
    <div class="product-info">
      <p class="eyebrow">${escapeHtml(categoryLabel(product))}${product.isNew ? ' · New' : ''}</p>
      <h2 id="productName">${escapeHtml(product.name)}</h2>
      <p class="muted">${escapeHtml(product.colour)}</p>
      <p class="product-price">${formatPrice(product)}</p>
      <p>${escapeHtml(product.description)}</p>
      <div class="product-actions">
        <button class="btn btn-primary" type="button" data-add="${product.id}">${bag.includes(product.id) ? 'View in Bag' : 'Add to Bag'}</button>
      </div>
      <a class="btn" href="${enquiry}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
      <details>
        <summary>Sizing &amp; Fit</summary>
        <p>Share your measurements when you order and we will advise on the best fit for this silhouette.</p>
      </details>
      <details>
        <summary>Ordering &amp; Delivery</summary>
        <p>Add this piece to your bag and send us your selection. Availability, payment and delivery are confirmed with you directly.</p>
      </details>
    </div>`;
  openDialog('product');
  $('product').scrollTop = 0;
}

/* ---------- Bag ---------- */

function loadBag() {
  try {
    const stored = JSON.parse(localStorage.getItem(BAG_KEY));
    return Array.isArray(stored) ? stored.filter((id) => productById.has(id)) : [];
  } catch (error) {
    console.warn('Bag could not be restored; starting empty.', error);
    return [];
  }
}

let bag = loadBag();

function setBag(nextBag) {
  bag = nextBag;
  try {
    localStorage.setItem(BAG_KEY, JSON.stringify(bag));
  } catch (error) {
    console.warn('Bag could not be saved; it will last for this visit only.', error);
  }
  renderBag();
}

function renderBag() {
  const count = $('bagCount');
  count.textContent = bag.length;
  count.hidden = bag.length === 0;
  $('bagList').innerHTML = bag.map((id) => {
    const product = productById.get(id);
    return `
      <li class="bag-item">
        ${photo(`${id}-1`, '', '6rem')}
        <div>
          <p>${escapeHtml(product.name)}</p>
          <p class="muted">${escapeHtml(product.colour)} · ${formatPrice(product)}</p>
          <button class="link" type="button" data-remove="${id}">Remove</button>
        </div>
      </li>`;
  }).join('');
  $('bagFoot').innerHTML = bag.length
    ? `<a class="btn btn-primary" href="${whatsappUrl(orderMessage(bag))}" target="_blank" rel="noopener">Send Order on WhatsApp</a>
       <p class="muted">We confirm availability, sizing and payment with you in the chat.</p>`
    : `<p class="muted">Your bag is empty.</p>
       <button class="btn" type="button" data-filter="all">View the Collection</button>`;
}

/* ---------- Search ---------- */

function renderSearch() {
  const query = $('searchInput').value.trim().toLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  const results = words.length
    ? PRODUCTS.filter((product) => {
        const haystack = `${product.name} ${product.colour} ${categoryLabel(product)}`.toLowerCase();
        return words.every((word) => haystack.includes(word));
      })
    : [];
  $('searchResults').innerHTML = tiles(results);
  $('searchStatus').textContent = !words.length
    ? 'Try "kaftan", "abaya", "pleated" or a colour.'
    : results.length
      ? `${results.length} ${results.length === 1 ? 'piece' : 'pieces'}`
      : `No pieces match "${query}".`;
}

/* ---------- Static lists ---------- */

function renderStaticLists() {
  const shopFilters = FILTERS.filter((filter) => filter.id !== 'all');
  const shopLinks = [...shopFilters, { id: 'all', label: 'The Collection' }]
    .map((filter) => `<li><button type="button" data-filter="${filter.id}">${escapeHtml(filter.label)}</button></li>`).join('');
  $('menuShop').innerHTML = shopLinks;
  $('footerShop').innerHTML = shopLinks;

  $('newInRail').innerHTML = tiles(PRODUCTS.filter((product) => product.isNew));
  $('categories').innerHTML = shopFilters.map((filter) => `
    <button class="category" type="button" data-filter="${filter.id}">
      <span class="tile-media">${photo(filter.cover, '', TILE_SIZES)}</span>
      <span class="tile-name">${escapeHtml(filter.label)}</span>
    </button>`).join('');

  const hello = whatsappUrl(`Hello ${BRAND.name}`);
  const instagramUrl = BRAND.instagram && `https://www.instagram.com/${encodeURIComponent(BRAND.instagram)}/`;
  $('contactActions').innerHTML =
    `<a class="btn btn-primary" href="${hello}" target="_blank" rel="noopener">Message us on WhatsApp</a>` +
    (instagramUrl ? `<a class="btn" href="${instagramUrl}" target="_blank" rel="noopener">Follow on Instagram</a>` : '');
  $('footerConnect').innerHTML =
    `<li><a href="${hello}" target="_blank" rel="noopener">WhatsApp</a></li>` +
    (instagramUrl ? `<li><a href="${instagramUrl}" target="_blank" rel="noopener">Instagram</a></li>` : '');
}

/* ---------- Hero reel ----------
   Phones show one clip at a time and alternate; from 600px both play side by side.
   Nothing downloads until play() is called, so visitors on Data Saver or with reduced
   motion switched on get the still frame and a Play button instead. */

const clips = [...document.querySelectorAll('.hero-clip')];
const sideBySide = matchMedia('(min-width: 37.5rem)');
const prefersStill = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;

let isHeroPaused = prefersStill;
let isHeroVisible = true;

function renderHeroToggle() {
  $('heroToggle').dataset.state = isHeroPaused ? 'paused' : 'playing';
  $('heroToggle').setAttribute('aria-label', isHeroPaused ? 'Play video' : 'Pause video');
}

function syncHero() {
  clips.forEach((clip) => {
    clip.loop = sideBySide.matches;
    const shouldPlay = !isHeroPaused && isHeroVisible && (sideBySide.matches || clip.classList.contains('is-active'));
    if (!shouldPlay) { clip.pause(); return; }
    clip.play().catch((error) => {
      if (error.name === 'AbortError') return; // superseded by a newer play/pause, not a failure
      // Autoplay refused (iOS Low Power Mode, browser policy): keep the still frame, offer Play.
      if (error.name !== 'NotAllowedError') console.warn('Hero video could not play.', error);
      isHeroPaused = true;
      renderHeroToggle();
    });
  });
  renderHeroToggle();
}

function showNextClip(finished) {
  if (sideBySide.matches) return; // side by side, each clip simply loops
  const next = clips[(clips.indexOf(finished) + 1) % clips.length];
  clips.forEach((clip) => clip.classList.toggle('is-active', clip === next));
  next.currentTime = 0;
  syncHero();
}

clips.forEach((clip) => clip.addEventListener('ended', () => showNextClip(clip)));
sideBySide.addEventListener('change', syncHero); // e.g. a foldable being opened or closed

/* ---------- Wiring ---------- */

const ACTIONS = '[data-open],[data-close],[data-product],[data-filter],[data-add],[data-remove],[data-rail],[data-hero-toggle]';

document.addEventListener('click', (event) => {
  const target = event.target.closest(ACTIONS);
  if (!target) return;
  const { open, product, filter, add, remove, rail } = target.dataset;
  if (open) openDialog(open);
  else if (product) openProduct(product);
  else if (filter) applyFilter(filter);
  else if (add) { if (!bag.includes(add)) setBag([...bag, add]); openDialog('bag'); }
  else if (remove) {
    setBag(bag.filter((id) => id !== remove));
    ($('bagList').querySelector('[data-remove]') || $('bag').querySelector('[data-close]')).focus();
  }
  else if (rail) $('newInRail').scrollBy({ left: Number(rail) * $('newInRail').clientWidth });
  else if ('heroToggle' in target.dataset) { isHeroPaused = !isHeroPaused; syncHero(); }
  else target.closest('dialog').close(); // data-close; links carry on to their anchor
});

document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', closeOnBackdrop));
$('searchInput').addEventListener('input', renderSearch);
$('searchInput').addEventListener('search', renderSearch); // Escape or the clear button empties the box

// Past the hero: the header turns solid and the films stop playing (battery, data).
new IntersectionObserver(
  ([entry]) => {
    $('header').classList.toggle('is-solid', !entry.isIntersecting);
    isHeroVisible = entry.isIntersecting;
    syncHero();
  },
  { rootMargin: `-${$('header').offsetHeight}px 0px 0px 0px` },
).observe($('hero'));

renderStaticLists();
renderCollection();
renderBag();
renderSearch();
