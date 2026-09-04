
interface GalleryFilterBarProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export function GalleryFilterBar({ categories, activeFilter, onFilterChange }: GalleryFilterBarProps) {
  return (
    <div className="gallery-filter-bar">
      <button
        className={`gallery-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
        onClick={() => onFilterChange('All')}
      >
        All Highlights
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`gallery-filter-btn ${activeFilter === category ? 'active' : ''}`}
          onClick={() => onFilterChange(category)}
        >
          {category}s
        </button>
      ))}
    </div>
  );
}
