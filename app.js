/* ==========================================================================
   AURA GALLERY — Interactive JavaScript Application
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. ARTWORK DATASET
  // ------------------------------------------------------------------------
  const artworks = [
    {
      id: 'cyberpunk_nebula',
      title: 'Cyberpunk Nebula',
      category: 'digital',
      year: 2026,
      medium: 'Digital Fine Art',
      dimensions: '48" x 36" (122 x 91 cm)',
      likes: 142,
      status: 'Available',
      statusClass: 'status-available',
      badge: 'Spotlight',
      story: 'An ethereal futuristic nebula swirling over a glowing neon metropolis, exploring the boundary between digital space and cosmic energy.',
      palette: ['#66fcf1', '#a855f7', '#1e1b4b', '#0f172a', '#38bdf8'],
      image: 'assets/images/cyberpunk_nebula.jpg'
    },
    {
      id: 'golden_solitude',
      title: 'Golden Solitude',
      category: 'oil',
      year: 2025,
      medium: 'Oil & Gold Leaf on Canvas',
      dimensions: '40" x 30" (101 x 76 cm)',
      likes: 189,
      status: 'Limited Edition',
      statusClass: 'status-edition',
      badge: 'Impasto',
      story: 'Expressive impasto portrait combining raw emotional brushwork with 24k gold leaf textures against a deep oceanic teal backdrop.',
      palette: ['#f59e0b', '#0f766e', '#1e293b', '#d97706', '#0284c7'],
      image: 'assets/images/golden_solitude.jpg'
    },
    {
      id: 'surreal_flora',
      title: 'Surreal Flora',
      category: 'surreal',
      year: 2026,
      medium: 'Digital Surrealism',
      dimensions: '36" x 36" (91 x 91 cm)',
      likes: 215,
      status: 'Available',
      statusClass: 'status-available',
      badge: 'Bioluminescent',
      story: 'A luminous twilight forest garden featuring translucent, glass-like flowers glowing with bioluminescent emerald energy.',
      palette: ['#38bdf8', '#10b981', '#0284c7', '#052e16', '#a7f3d0'],
      image: 'assets/images/surreal_flora.jpg'
    },
    {
      id: 'ether_prism',
      title: 'Ether Prism',
      category: 'concept',
      year: 2025,
      medium: '3D Crystalline Concept',
      dimensions: '50" x 38" (127 x 96 cm)',
      likes: 98,
      status: 'Private Collection',
      statusClass: 'status-private',
      badge: '3D Render',
      story: 'An architectural exploration of light refraction, where floating crystalline polyhedrons project vivid chromatic caustics across a minimalist gallery space.',
      palette: ['#e0e7ff', '#818cf8', '#312e81', '#f43f5e', '#6366f1'],
      image: 'assets/images/ether_prism.jpg'
    },
    {
      id: 'serene_coastal',
      title: 'Serene Coastal',
      category: 'photography',
      year: 2024,
      medium: 'Fine Art Photography',
      dimensions: '60" x 34" (152 x 86 cm)',
      likes: 164,
      status: 'Limited Edition',
      statusClass: 'status-edition',
      badge: 'Long Exposure',
      story: 'Long exposure coastal seascape captured during sunset, transforming turbulent waves into a silky fog beneath warm pastel skies.',
      palette: ['#f472b6', '#fb923c', '#334155', '#e2e8f0', '#94a3b8'],
      image: 'assets/images/serene_coastal.jpg'
    },
    {
      id: 'cosmic_revery',
      title: 'Cosmic Revery',
      category: 'oil',
      year: 2026,
      medium: 'Oil & Gold Leaf Tapestry',
      dimensions: '48" x 36" (122 x 91 cm)',
      likes: 270,
      status: 'Available',
      statusClass: 'status-available',
      badge: 'Museum Piece',
      story: 'Celestial map painting illustrating astronomical charts integrated with fluid indigo impasto oil paint and radiant gold sunburst motifs.',
      palette: ['#fbbf24', '#1e3a8a', '#0f172a', '#f59e0b', '#3b82f6'],
      image: 'assets/images/cosmic_revery.jpg'
    }
  ];

  // ------------------------------------------------------------------------
  // 2. STATE MANAGEMENT
  // ------------------------------------------------------------------------
  let activeCategory = 'all';
  let activeLayout = 'grid';
  let activeSort = 'featured';
  let searchQuery = '';
  let showingFavoritesOnly = false;

  // Favorites in LocalStorage
  let favorites = new Set(JSON.parse(localStorage.getItem('aura_art_favorites') || '[]'));

  // Lightbox State
  let currentLightboxArt = null;
  let zoomLevel = 1;

  // DOM Elements
  const gridContainer = document.getElementById('artwork-grid');
  const emptyState = document.getElementById('empty-state');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const favBadge = document.getElementById('fav-badge');
  const favBtn = document.getElementById('fav-btn');
  const favoritesBanner = document.getElementById('favorites-only-banner');
  const clearFavFilterBtn = document.getElementById('clear-favorites-filter');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sortSelect = document.getElementById('sort-select');

  // Lightbox Modal DOM
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxArtist = document.getElementById('lightbox-artist');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxMedium = document.getElementById('lightbox-medium');
  const lightboxDimensions = document.getElementById('lightbox-dimensions');
  const lightboxStatus = document.getElementById('lightbox-status');
  const lightboxPalette = document.getElementById('lightbox-palette');
  const lightboxFavBtn = document.getElementById('lightbox-fav-btn');
  const lightboxInquireBtn = document.getElementById('lightbox-inquire-btn');
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const zoomResetBtn = document.getElementById('zoom-reset');
  const zoomLevelText = document.getElementById('zoom-level');

  // Wall Simulator DOM
  const wallArtSelect = document.getElementById('wall-art-select');
  const wallScaleSlider = document.getElementById('wall-scale-slider');
  const scaleValueLabel = document.getElementById('scale-value-label');
  const roomCanvas = document.getElementById('room-canvas');
  const wallFrameWrapper = document.getElementById('wall-frame-wrapper');
  const wallPreviewImg = document.getElementById('wall-preview-img');
  const wallArtLabel = document.getElementById('wall-art-label');
  const roomOptionBtns = document.querySelectorAll('.room-option-btn');

  // Contact Form & Select
  const formArtworkSelect = document.getElementById('form-artwork-select');
  const inquiryForm = document.getElementById('inquiry-form');

  // ------------------------------------------------------------------------
  // 3. INITIALIZATION
  // ------------------------------------------------------------------------
  function init() {
    updateFavBadge();
    populateSelectDropdowns();
    renderGallery();
    initTheme();
    setupEventListeners();
    initWallSimulator();
  }

  // ------------------------------------------------------------------------
  // 4. RENDER GALLERY
  // ------------------------------------------------------------------------
  function renderGallery() {
    let filtered = artworks.filter(art => {
      // Category filter
      if (activeCategory !== 'all' && art.category !== activeCategory) return false;
      
      // Favorites filter mode
      if (showingFavoritesOnly && !favorites.has(art.id)) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchMedium = art.medium.toLowerCase().includes(q);
        const matchCategory = art.category.toLowerCase().includes(q);
        const matchStory = art.story.toLowerCase().includes(q);
        if (!matchTitle && !matchMedium && !matchCategory && !matchStory) return false;
      }

      return true;
    });

    // Sorting
    if (activeSort === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeSort === 'newest') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (activeSort === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Grid layout class
    gridContainer.className = `artwork-grid ${activeLayout}-layout`;

    if (filtered.length === 0) {
      gridContainer.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    } else {
      emptyState.classList.add('hidden');
    }

    // Generate HTML
    gridContainer.innerHTML = filtered.map(art => {
      const isFav = favorites.has(art.id);
      return `
        <article class="art-card" data-id="${art.id}">
          <div class="art-card-media" onclick="openLightbox('${art.id}')">
            <span class="card-badge ${art.statusClass}">${art.status}</span>
            <button class="card-fav-btn ${isFav ? 'active' : ''}" 
                    onclick="event.stopPropagation(); toggleFavorite('${art.id}')"
                    title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
              <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <img src="${art.image}" alt="${art.title}" class="art-card-img" loading="lazy">
            <div class="art-card-overlay">
              <span class="quick-view-btn"><i class="fa-solid fa-expand"></i> View Details</span>
            </div>
          </div>

          <div class="art-card-info">
            <div class="art-card-header">
              <span class="art-category">${art.category}</span>
              <span class="art-year">${art.year}</span>
            </div>
            <h3 class="art-card-title" onclick="openLightbox('${art.id}')">${art.title}</h3>
            <div class="art-card-details">
              <span class="art-medium">${art.medium}</span>
              <span class="art-likes-count"><i class="fa-solid fa-heart text-danger"></i> ${art.likes + (isFav ? 1 : 0)}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ------------------------------------------------------------------------
  // 5. FAVORITES SYSTEM
  // ------------------------------------------------------------------------
  window.toggleFavorite = function(artId) {
    const art = artworks.find(a => a.id === artId);
    if (!art) return;

    if (favorites.has(artId)) {
      favorites.delete(artId);
      showToast(`Removed "${art.title}" from your favorites.`);
    } else {
      favorites.add(artId);
      showToast(`Saved "${art.title}" to your favorites! ❤️`);
    }

    localStorage.setItem('aura_art_favorites', JSON.stringify(Array.from(favorites)));
    updateFavBadge();
    renderGallery();

    if (currentLightboxArt && currentLightboxArt.id === artId) {
      updateLightboxFavButton();
    }
  };

  function updateFavBadge() {
    favBadge.textContent = favorites.size;
    if (favorites.size > 0) {
      favBadge.classList.remove('hidden');
    }
  }

  // ------------------------------------------------------------------------
  // 6. LIGHTBOX MODAL & ZOOM
  // ------------------------------------------------------------------------
  window.openLightbox = function(artId) {
    const art = artworks.find(a => a.id === artId);
    if (!art) return;

    currentLightboxArt = art;
    zoomLevel = 1;
    updateZoomTransform();

    lightboxImg.src = art.image;
    lightboxImg.alt = art.title;
    lightboxTitle.textContent = art.title;
    lightboxArtist.textContent = `By Ruinuo • ${art.year} Edition`;
    lightboxCategory.textContent = art.category.toUpperCase();
    lightboxDescription.textContent = art.story;
    lightboxMedium.textContent = art.medium;
    lightboxDimensions.textContent = art.dimensions;
    lightboxStatus.textContent = art.status;
    lightboxStatus.className = `status-badge ${art.statusClass}`;

    // Render Swatches
    lightboxPalette.innerHTML = art.palette.map(hex => `
      <div class="swatch-item" style="background-color: ${hex}" data-color="${hex}" title="Copy Color: ${hex}" onclick="copyColor('${hex}')"></div>
    `).join('');

    updateLightboxFavButton();

    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  function closeLightboxModal() {
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
    currentLightboxArt = null;
  }

  function updateLightboxFavButton() {
    if (!currentLightboxArt) return;
    const isFav = favorites.has(currentLightboxArt.id);
    lightboxFavBtn.innerHTML = isFav 
      ? `<i class="fa-solid fa-heart text-danger"></i> Saved to Favorites` 
      : `<i class="fa-regular fa-heart"></i> Add to Favorites`;
  }

  lightboxFavBtn.addEventListener('click', () => {
    if (currentLightboxArt) {
      toggleFavorite(currentLightboxArt.id);
    }
  });

  lightboxInquireBtn.addEventListener('click', () => {
    closeLightboxModal();
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    if (currentLightboxArt) {
      formArtworkSelect.value = currentLightboxArt.id;
    }
  });

  // Zoom Controls
  zoomInBtn.addEventListener('click', () => {
    if (zoomLevel < 2.5) {
      zoomLevel += 0.25;
      updateZoomTransform();
    }
  });

  zoomOutBtn.addEventListener('click', () => {
    if (zoomLevel > 0.75) {
      zoomLevel -= 0.25;
      updateZoomTransform();
    }
  });

  zoomResetBtn.addEventListener('click', () => {
    zoomLevel = 1;
    updateZoomTransform();
  });

  function updateZoomTransform() {
    lightboxImg.style.transform = `scale(${zoomLevel})`;
    zoomLevelText.textContent = `${Math.round(zoomLevel * 100)}%`;
  }

  window.copyColor = function(hex) {
    navigator.clipboard.writeText(hex).then(() => {
      showToast(`Color ${hex} copied to clipboard!`);
    });
  };

  // ------------------------------------------------------------------------
  // 7. WALL PREVIEWER (VIRTUAL ROOM SIMULATOR)
  // ------------------------------------------------------------------------
  function populateSelectDropdowns() {
    const optionsHtml = artworks.map(art => `
      <option value="${art.id}">${art.title} (${art.dimensions.split('(')[0].trim()})</option>
    `).join('');

    wallArtSelect.innerHTML = optionsHtml;
    formArtworkSelect.innerHTML = optionsHtml;
  }

  function initWallSimulator() {
    updateWallPreview();

    wallArtSelect.addEventListener('change', (e) => {
      updateWallPreview();
    });

    wallScaleSlider.addEventListener('input', (e) => {
      const scaleVal = e.target.value;
      const scaleFactor = scaleVal / 100;
      wallFrameWrapper.style.transform = `scale(${scaleFactor})`;
      scaleValueLabel.textContent = `${getScaleTerm(scaleVal)} (${scaleVal}%)`;
    });

    roomOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roomOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const roomClass = btn.dataset.room;
        roomCanvas.className = `room-canvas ${roomClass}`;
      });
    });
  }

  function updateWallPreview() {
    const artId = wallArtSelect.value;
    const art = artworks.find(a => a.id === artId);
    if (art) {
      wallPreviewImg.src = art.image;
      wallPreviewImg.alt = art.title;
      wallArtLabel.textContent = `${art.title} • ${art.dimensions}`;
    }
  }

  function getScaleTerm(val) {
    if (val < 85) return 'Compact';
    if (val <= 115) return 'Medium';
    return 'Gallery Oversized';
  }

  // ------------------------------------------------------------------------
  // 8. THEME TOGGLE (DARK / LIGHT)
  // ------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('aura_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('aura_theme', newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} theme mode.`);
  });

  // ------------------------------------------------------------------------
  // 9. EVENT LISTENERS SETUP
  // ------------------------------------------------------------------------
  function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.trim() !== '') {
        searchClear.classList.remove('hidden');
      } else {
        searchClear.classList.add('hidden');
      }
      renderGallery();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.classList.add('hidden');
      renderGallery();
    });

    document.getElementById('reset-search-btn')?.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';
      showingFavoritesOnly = false;
      favoritesBanner.classList.add('hidden');
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
      renderGallery();
    });

    // Category Tabs
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        renderGallery();
      });
    });

    // Layout Switchers
    document.querySelectorAll('.layout-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeLayout = btn.dataset.layout;
        renderGallery();
      });
    });

    // Sort Select
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderGallery();
    });

    // Favorites Button
    favBtn.addEventListener('click', () => {
      showingFavoritesOnly = !showingFavoritesOnly;
      if (showingFavoritesOnly) {
        favoritesBanner.classList.remove('hidden');
        showToast('Filtering gallery by your saved favorites.');
      } else {
        favoritesBanner.classList.add('hidden');
      }
      renderGallery();
    });

    clearFavFilterBtn.addEventListener('click', () => {
      showingFavoritesOnly = false;
      favoritesBanner.classList.add('hidden');
      renderGallery();
    });

    // Lightbox modal close
    lightboxClose.addEventListener('click', closeLightboxModal);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightboxModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
        closeLightboxModal();
      }
    });

    // Hero Spotlight click
    document.getElementById('hero-spotlight').addEventListener('click', () => {
      openLightbox('cyberpunk_nebula');
    });

    // Contact Form Submit
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      showToast(`Thank you, ${name}! Your inquiry has been sent to Ruinuo Studio.`);
      inquiryForm.reset();
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    mobileMenuBtn?.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-secondary)';
        navLinks.style.padding = '1.5rem';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. TOAST NOTIFICATIONS
  // ------------------------------------------------------------------------
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-sparkles text-cyan"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Run initialization
  init();
});
