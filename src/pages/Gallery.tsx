
import { useState, useEffect } from 'react';
import { GalleryGrid } from '@/components/GalleryGrid';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description?: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading gallery images
    const loadGalleryImages = () => {
      const galleryImages: GalleryImage[] = [
        // Rooms
        {
          id: '1',
          src: '/src/assets/modern-room.jpg',
          title: 'Modern Deluxe Room',
          category: 'rooms',
          description: 'Spacious modern room with city view'
        },
        {
          id: '2',
          src: '/src/assets/hero-lake-kivu.jpg',
          title: 'Lake Kivu View Room',
          category: 'rooms',
          description: 'Room with stunning Lake Kivu view'
        },
        // Exterior
        {
          id: '3',
          src: '/src/assets/building-exterior.jpg',
          title: 'Hotel Exterior',
          category: 'exterior',
          description: 'Main building exterior view'
        },
        {
          id: '4',
          src: '/src/assets/building-exterior-stairs.jpg',
          title: 'Building Stairs',
          category: 'exterior',
          description: 'Elegant exterior staircase'
        },
        {
          id: '5',
          src: '/src/assets/buildings-complex.jpg',
          title: 'Buildings Complex',
          category: 'exterior',
          description: 'Complete hotel complex view'
        },
        {
          id: '6',
          src: '/src/assets/exterior-wide-view.jpg',
          title: 'Wide Exterior View',
          category: 'exterior',
          description: 'Panoramic view of the hotel'
        },
        // Facilities
        {
          id: '7',
          src: '/src/assets/reception-desk.jpg',
          title: 'Reception Desk',
          category: 'facilities',
          description: 'Modern reception and check-in area'
        },
        {
          id: '8',
          src: '/src/assets/reception-interior.jpg',
          title: 'Reception Interior',
          category: 'facilities',
          description: 'Spacious reception interior'
        },
        {
          id: '9',
          src: '/src/assets/choice-lounge-buildings.jpg',
          title: 'Choice Lounge',
          category: 'facilities',
          description: 'Comfortable lounge area'
        },
        {
          id: '10',
          src: '/src/assets/choice-lounge-exterior.jpg',
          title: 'Lounge Exterior',
          category: 'facilities',
          description: 'Outdoor lounge area'
        },
        {
          id: '11',
          src: '/src/assets/garden-lounge.jpg',
          title: 'Garden Lounge',
          category: 'facilities',
          description: 'Beautiful garden lounge area'
        },
        // Views
        {
          id: '12',
          src: '/src/assets/lake-kivu-balcony-view.jpg',
          title: 'Balcony View',
          category: 'views',
          description: 'Lake Kivu view from room balcony'
        },
        {
          id: '13',
          src: '/src/assets/area-overview.jpg',
          title: 'Area Overview',
          category: 'views',
          description: 'Overview of the surrounding area'
        },
        {
          id: '14',
          src: '/src/assets/location-overview.jpg',
          title: 'Location Overview',
          category: 'views',
          description: 'Strategic location overview'
        },
      ];

      setTimeout(() => {
        setImages(galleryImages);
        setLoading(false);
      }, 1000);
    };

    loadGalleryImages();
  }, []);

  const categories = ['rooms', 'exterior', 'facilities', 'views'];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-4 w-96" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Photo Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our beautiful hotel through our comprehensive photo gallery. 
              From elegant rooms to stunning views, discover what makes us special.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <GalleryGrid images={images} categories={categories} />
      </div>
    </div>
  );
};

export default Gallery;
