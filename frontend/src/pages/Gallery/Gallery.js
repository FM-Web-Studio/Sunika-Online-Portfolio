import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Sparkles, LayoutGrid, List, Search, X } from 'lucide-react';
import styles from './Gallery.module.css';
import galleryData from '../../information/gallery.json';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArtwork]);

  // Dynamically import images from all categories
  const importCategoryImages = (categoryKey) => {
    const images = {};
    
    try {
      const context = require.context('../../images/Gallery', true, /\.(png|jpe?g|svg|webp)$/);
      context.keys().forEach((key) => {
        const folderMatch = key.match(/^\.\/([^/]+)\//);
        if (folderMatch && folderMatch[1].toLowerCase() === categoryKey.toLowerCase()) {
          const number = parseInt(key.match(/(\d+)/)?.[0]);
          if (number) {
            images[number] = context(key);
          }
        }
      });
    } catch (error) {
      console.error(`Error loading ${categoryKey}:`, error);
    }
    return images;
  };

  // Build artwork collection dynamically
  const allArtwork = useMemo(() => {
    const artwork = [];
    
    Object.keys(galleryData).forEach(categoryKey => {
      const categoryImages = importCategoryImages(categoryKey);
      const items = galleryData[categoryKey];
      
      if (Array.isArray(items)) {
        items.forEach(item => {
          artwork.push({
            ...item,
            image: categoryImages[item.number],
            category: categoryKey,
            categoryDisplay: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
          });
        });
      }
    });
    
    return artwork;
  }, []);

  // Get categories
  const categories = useMemo(() => {
    const cats = Object.keys(galleryData).map(key => ({
      id: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      count: galleryData[key]?.length || 0
    }));
    return [{ id: 'all', label: 'All', count: allArtwork.length }, ...cats];
  }, [allArtwork]);

  // Filter artwork
  const filteredArtwork = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? allArtwork 
      : allArtwork.filter(art => art.category === activeCategory);
    
    if (searchTerm) {
      filtered = filtered.filter(art => 
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [allArtwork, activeCategory, searchTerm]);

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Sparkles className={styles.heroIcon} size={64} />
        <h1 className={styles.heroTitle}>Gallery</h1>
        <p className={styles.heroSubtitle}>Explore a curated collection of artistic works</p>
      </section>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search artwork..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <div className={styles.viewControls}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        {categories.map(({ id, label, count }) => (
          <button
            key={id}
            className={`${styles.categoryBtn} ${activeCategory === id ? styles.active : ''}`}
            onClick={() => setActiveCategory(id)}
          >
            <span>{label}</span>
            <span className={styles.categoryCount}>{count}</span>
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className={`${styles.gallery} ${styles[viewMode]}`}>
        {filteredArtwork.map((artwork, index) => (
          <article
            key={`${artwork.category}-${artwork.number}`}
            className={styles.artworkItem}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className={styles.artworkImage}>
              {artwork.image ? (
                <img src={artwork.image} alt={artwork.title} />
              ) : (
                <div className={styles.placeholder}>
                  <Sparkles size={48} />
                  <p>No image</p>
                </div>
              )}
              {artwork.sold && (
                <div className={styles.soldBadge}>
                  <span>SOLD</span>
                </div>
              )}
            </div>
            <div className={styles.artworkContent}>
              <div className={styles.artworkHeader}>
                <h3 className={styles.artworkTitle}>{artwork.title}</h3>
                {artwork.price > 0 && !artwork.sold && (
                  <span className={styles.artworkPrice}>R{artwork.price.toLocaleString()}</span>
                )}
              </div>
              <p className={styles.artworkDescription}>{artwork.description}</p>
              <span className={styles.artworkCategory}>{artwork.categoryDisplay}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredArtwork.length === 0 && (
        <div className={styles.emptyState}>
          <Sparkles size={64} />
          <h3>No artwork found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedArtwork && ReactDOM.createPortal(
        <div className={styles.lightbox} onClick={() => setSelectedArtwork(null)}>
          <div className={styles.lightboxOverlay} />
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrapper}>
              {selectedArtwork.image && (
                <img src={selectedArtwork.image} alt={selectedArtwork.title} />
              )}
              {selectedArtwork.sold && (
                <div className={styles.soldBadge}>
                  <span>SOLD</span>
                </div>
              )}
            </div>
            <div className={styles.lightboxDetails}>
              <span className={styles.lightboxCategory}>{selectedArtwork.categoryDisplay}</span>
              <h2 className={styles.lightboxTitle}>{selectedArtwork.title}</h2>
              <p className={styles.lightboxDescription}>{selectedArtwork.description}</p>
              {selectedArtwork.price > 0 && !selectedArtwork.sold && (
                <div className={styles.lightboxPrice}>R{selectedArtwork.price.toLocaleString()}</div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;