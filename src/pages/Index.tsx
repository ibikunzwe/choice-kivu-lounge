
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight, 
  Star,
  Wifi,
  Coffee,
  Car,
  Bath,
  BedDouble,
  Sunrise,
  UtensilsCrossed,
  Router,
  ChevronLeft,
  Play,
  Quote,
  Users,
  MapIcon,
  Calendar,
  Instagram
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProgressiveImage } from '@/components/ProgressiveImage';

const Index = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      src: '/lovable-uploads/0849b1ad-cc06-4512-8eb7-940258e20b07.png',
      alt: 'Choice Lounge Garden View',
      title: 'Relax in Style by Lake Kivu',
      subtitle: 'Your modern getaway in Nyamyumba/Brasserie with lake views, comfort, and tranquility.'
    },
    {
      src: '/lovable-uploads/94a5a83c-e851-4ad2-9f13-03a961e676fb.png',
      alt: 'Lake Kivu Sunset View',
      title: 'Breathtaking Lake Views',
      subtitle: 'Watch stunning sunsets over Lake Kivu from your private balcony.'
    },
    {
      src: '/lovable-uploads/59fc69b5-7037-47f2-b683-1a341ff3108a.png',
      alt: 'Modern Reception Area',
      title: 'Modern Comfort',
      subtitle: 'Experience luxury amenities and warm Rwandan hospitality.'
    },
    {
      src: '/lovable-uploads/3b651f93-4f0e-4417-ba7a-39c66ad3afb8.png',
      alt: 'Choice Lounge Exterior',
      title: 'Premium Location',
      subtitle: 'Steps away from Lake Kivu shores in the heart of Rubavu District.'
    }
  ];

  const services = [
    { 
      icon: <BedDouble className="h-8 w-8" />, 
      title: 'Room Accommodation', 
      desc: 'Spacious and clean rooms with modern amenities and lake views.',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      icon: <Sunrise className="h-8 w-8" />, 
      title: 'Lake View Garden', 
      desc: 'Enjoy morning coffee with breathtaking Lake Kivu panoramas.',
      color: 'bg-orange-50 text-orange-600'
    },
    { 
      icon: <UtensilsCrossed className="h-8 w-8" />, 
      title: 'Room Service', 
      desc: 'Fresh local beverages and snacks delivered to your room.',
      color: 'bg-green-50 text-green-600'
    },
    { 
      icon: <Router className="h-8 w-8" />, 
      title: 'Free Wi-Fi & Parking', 
      desc: 'Stay connected with high-speed internet and secure parking.',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const rooms = [
    {
      name: 'Deluxe Lake View Room',
      price: 'From $120/night',
      features: ['Lake View', 'Private Balcony', 'King Bed', 'Free Wi-Fi'],
      image: '/lovable-uploads/2f6167db-cbce-460c-87f6-8a8baac608c4.png'
    },
    {
      name: 'Garden Suite',
      price: 'From $85/night',
      features: ['Garden View', 'Spacious', 'Queen Bed', 'Mini Bar'],
      image: '/lovable-uploads/6b1804d8-13b4-45b9-9b41-534077a484ab.png'
    },
    {
      name: 'Standard Room',
      price: 'From $65/night',
      features: ['Cozy Space', 'Double Bed', 'Modern Bath', 'AC'],
      image: '/lovable-uploads/4dc3774e-ba4e-4de5-85ce-5004b6d09f34.png'
    }
  ];

  const testimonials = [
    {
      quote: "A peaceful retreat with beautiful views and warm service. The sunset from our balcony was unforgettable!",
      name: "Marie K.",
      rating: 5,
      image: "/lovable-uploads/8f1e6ff0-893c-44b7-bf4b-8acfef1956a5.png"
    },
    {
      quote: "Choice Lounge exceeded our expectations. Perfect location by Lake Kivu and excellent hospitality.",
      name: "David M.",
      rating: 5,
      image: "/lovable-uploads/afa508c5-1113-4b8c-a13e-8084238a2dbb.png"
    },
    {
      quote: "The garden area is perfect for relaxation. Clean rooms, friendly staff, and amazing lake views!",
      name: "Sarah L.",
      rating: 5,
      image: "/lovable-uploads/92641135-f4ee-4d34-914c-40c69f0346db.png"
    }
  ];

  const attractions = [
    { name: 'Lake Kivu Beaches', desc: 'Crystal clear waters perfect for swimming' },
    { name: 'Local Markets', desc: 'Experience authentic Rwandan culture' },
    { name: 'Boat Rides', desc: 'Explore the lake and nearby islands' },
    { name: 'Hiking Trails', desc: 'Scenic mountain trails with panoramic views' }
  ];

  const handleWhatsApp = () => {
    const message = "Hello! I'm interested in booking a room at Choice Lounge. Can you help me with availability and pricing?";
    const phoneNumber = '+250796359524';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleVirtualTour = () => {
    navigate('/gallery');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-screen w-full">
                  <ProgressiveImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
                      <div className="mb-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                          <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                            Choice
                          </span>
                          <br />
                          <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                            Lounge
                          </span>
                        </h1>
                        
                        <h2 className="text-2xl md:text-4xl font-light mb-4 opacity-95">
                          {image.title}
                        </h2>
                        <p className="text-lg md:text-xl opacity-85 mb-8 max-w-3xl mx-auto leading-relaxed">
                          {image.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button 
                          size="lg" 
                          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-2xl w-full sm:w-auto"
                          onClick={() => navigate('/rooms')}
                        >
                          Book a Room
                          <Calendar className="ml-2 h-5 w-5" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                          onClick={handleVirtualTour}
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Take a Virtual Tour
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroImages.map((_, i) => (
                      <button
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        onClick={() => setCurrentSlide(i)}
                      />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Choice Lounge</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Choice Lounge is a modern accommodation spot located in Nyamyumba/Brasserie, Rubavu District – just steps from the shores of Lake Kivu. Whether you're a traveler, a couple, or a group, we offer elegant rooms, beautiful views, and personalized service that makes every stay memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/lovable-uploads/5b76a523-b1af-46f2-a831-44df082391b7.png', alt: 'Interior View' },
              { src: '/lovable-uploads/6e31e932-b01f-4f3a-9167-88a8cd1165d3.png', alt: 'Garden Area' },
              { src: '/lovable-uploads/fbc2b307-30a5-49a6-a399-a00ee778e0f4.png', alt: 'Lake View' }
            ].map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl aspect-[4/3]">
                <ProgressiveImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience comfort and convenience with our carefully curated services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  <div className={`mx-auto w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms & Rates Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Rooms & Rates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our selection of comfortable rooms, each designed for your perfect stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProgressiveImage
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white">{room.price}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">{room.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => navigate('/rooms')}
                    >
                      View More
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/rooms')}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Guests Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read authentic reviews from guests who experienced Choice Lounge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <div className="flex text-yellow-500 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the Area Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore the Area</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the beauty and culture of Lake Kivu region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((attraction, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <MapIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{attraction.name}</h3>
                  <p className="text-muted-foreground text-sm">{attraction.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Choice Lounge</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Watch our full tour of Choice Lounge and see why guests love staying here!
          </p>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted group cursor-pointer" onClick={handleVirtualTour}>
            <ProgressiveImage
              src="/lovable-uploads/3aeadc2f-a09c-47c0-94ab-86198e1ec8ab.png"
              alt="Choice Lounge Video Tour"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-primary ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now / Contact Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Book Your Stay?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Contact us today to reserve your perfect getaway at Choice Lounge
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm" onClick={() => window.open('tel:+250796359524')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Phone</h3>
                <p className="text-muted-foreground">+250 796 359 524</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm" onClick={() => window.open('mailto:info@choicelounge.rw')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Email</h3>
                <p className="text-muted-foreground">info@choicelounge.rw</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm" onClick={handleWhatsApp}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">WhatsApp</h3>
                <p className="text-muted-foreground">Instant Support</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold"
              onClick={() => navigate('/rooms')}
            >
              Book Your Stay
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
              onClick={() => navigate('/contact')}
            >
              Get Directions
              <MapPin className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Google Map Embed */}
          <div className="mt-12 aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7745678!2d29.3394!3d-1.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNDAnNDQuMCJTIDI5wrAyMCcyMS44IkU!5e0!3m2!1sen!2srw!4v1635789012345!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Choice Lounge Location"
            />
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <Button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse"
        size="sm"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">Contact via WhatsApp</span>
      </Button>
    </div>
  );
};

export default Index;
