
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
    // Load gallery images from lovable-uploads
    const loadGalleryImages = () => {
      const galleryImages: GalleryImage[] = [
                 // Rooms & Accommodation
         {
           id: '1',
           src: '/src/assets/room1.JPG',
           title: 'Deluxe Room 1',
           category: 'rooms',
           description: 'Spacious deluxe room with modern amenities'
         },
         {
           id: '2',
           src: '/src/assets/room2.JPG',
           title: 'Deluxe Room 2',
           category: 'rooms',
           description: 'Comfortable room with elegant design'
         },
         {
           id: '3',
           src: '/src/assets/room3.JPG',
           title: 'Deluxe Room 3',
           category: 'rooms',
           description: 'Modern room with premium features'
         },
         {
           id: '4',
           src: '/src/assets/room5.JPG',
           title: 'Deluxe Room 5',
           category: 'rooms',
           description: 'Spacious accommodation with lake views'
         },
         {
           id: '5',
           src: '/src/assets/room6.JPG',
           title: 'Deluxe Room 6',
           category: 'rooms',
           description: 'Elegant room with contemporary design'
         },
         {
           id: '6',
           src: '/src/assets/room7.JPG',
           title: 'Deluxe Room 7',
           category: 'rooms',
           description: 'Comfortable room with modern amenities'
         },
         {
           id: '7',
           src: '/src/assets/room8.JPG',
           title: 'Deluxe Room 8',
           category: 'rooms',
           description: 'Premium room with excellent views'
         },
         {
           id: '8',
           src: '/src/assets/room9.JPG',
           title: 'Deluxe Room 9',
           category: 'rooms',
           description: 'Spacious room with elegant furnishings'
         },
         {
           id: '9',
           src: '/src/assets/room10.JPG',
           title: 'Deluxe Room 10',
           category: 'rooms',
           description: 'Modern room with comfort and style'
         },
         {
           id: '10',
           src: '/src/assets/room11.JPG',
           title: 'Deluxe Room 11',
           category: 'rooms',
           description: 'Premium accommodation with lake views'
         },
         {
           id: '11',
           src: '/src/assets/room12.JPG',
           title: 'Deluxe Room 12',
           category: 'rooms',
           description: 'Luxury room with stunning surroundings'
         },
                 // Views & Surroundings
         {
           id: '12',
           src: '/src/assets/lake-view.JPG',
           title: 'Lake View',
           category: 'views',
           description: 'Breathtaking view of Lake Kivu'
         },
         {
           id: '13',
           src: '/src/assets/sideview.JPG',
           title: 'Side View',
           category: 'views',
           description: 'Side view of the property'
         },
         {
           id: '14',
           src: '/src/assets/roadside.JPG',
           title: 'Roadside View',
           category: 'views',
           description: 'Roadside view of Choice Lounge'
         },
         {
           id: '15',
           src: '/src/assets/welcome.JPG',
           title: 'Bralirwa View',
           category: 'views',
           description: 'Welcome view of the property'
         },
         // Exterior & Building
         {
           id: '16',
           src: '/src/assets/garden.JPG',
           title: 'Garden',
           category: 'exterior',
           description: 'Beautiful garden area'
         },
         {
           id: '17',
           src: '/src/assets/parking.JPG',
           title: 'Parking',
           category: 'exterior',
           description: 'Parking area'
         },
         {
           id: '18',
           src: '/lovable-uploads/0a3290a9-0599-4978-aacf-a48cf81b6058.png',
           title: 'Gets',
           category: 'exterior',
           description: 'Exterior view of the building'
         },
         // Facilities & Common Areas
         {
           id: '19',
           src: '/src/assets/welcome.JPG',
           title: 'Welcome',
           category: 'facilities',
           description: 'Welcome area and reception'
         },
         {
           id: '20',
           src: '/lovable-uploads/59fc69b5-7037-47f2-b683-1a341ff3108a.png',
           title: 'Reception',
           category: 'facilities',
           description: 'Modern reception and check-in area'
         },
         {
           id: '21',
           src: '/lovable-uploads/5bfa8317-87af-48e8-9f73-8bdc38ffaecd.png',
           title: 'Kitchen',
           category: 'facilities',
           description: 'Kitchen facilities'
         },
         {
           id: '22',
           src: '/lovable-uploads/6e31e932-b01f-4f3a-9167-88a8cd1165d3.png',
           title: 'Saloon',
           category: 'facilities',
           description: 'Saloon area'
         }
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
