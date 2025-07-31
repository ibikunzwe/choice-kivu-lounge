
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, Grid, List, Download, Share, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories?: string[];
}

export const GalleryGrid = ({ images, categories = [] }: GalleryGridProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const allCategories = ['all', ...categories];

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
      const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           image.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [images, selectedCategory, searchQuery]);

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${image.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: image.src,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(image.src);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'} found
      </div>

      {/* Image Grid/List */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "space-y-4"
      )}>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative overflow-hidden rounded-lg cursor-pointer",
              viewMode === 'list' && "flex gap-4 p-4 border hover:bg-muted/50"
            )}
            onClick={() => setLightboxImage(image)}
          >
            <div className={cn(
              "relative overflow-hidden rounded-lg",
              viewMode === 'grid' ? "aspect-square" : "w-32 h-32 flex-shrink-0"
            )}>
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            
            <div className={cn(
              "absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity",
              viewMode === 'list' && "relative opacity-100 flex-1 flex flex-col justify-center"
            )}>
              <div className={cn(
                "text-white p-4 space-y-1",
                viewMode === 'list' && "text-foreground p-0"
              )}>
                <h3 className="font-semibold">{image.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {image.category}
                </Badge>
                {image.description && viewMode === 'list' && (
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                )}
              </div>
              
              {viewMode === 'grid' && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(image);
                    }}
                  >
                    <Share className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images found matching your criteria.</p>
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {lightboxImage && (
            <div className="relative">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(lightboxImage)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleShare(lightboxImage)}
                >
                  <Share className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setLightboxImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{lightboxImage.title}</h3>
                  <Badge variant="secondary">{lightboxImage.category}</Badge>
                </div>
                {lightboxImage.description && (
                  <p className="text-muted-foreground">{lightboxImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
