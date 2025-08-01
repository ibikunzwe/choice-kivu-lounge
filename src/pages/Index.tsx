
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
  Bath
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
      alt: 'Choice Lounge Area Overview',
      title: 'Modern Comfort',
      subtitle: 'Experience luxury in every detail'
    },
    {
      src: '/lovable-uploads/94a5a83c-e851-4ad2-9f13-03a961e676fb.png',
      alt: 'Lake Kivu Balcony View',
      title: 'Stunning Views',
      subtitle: 'Breathtaking Lake Kivu panoramas'
    },
    {
      src: '/lovable-uploads/59fc69b5-7037-47f2-b683-1a341ff3108a.png',
      alt: 'Reception Desk',
      title: 'Warm Welcome',
      subtitle: '24/7 hospitality at your service'
    },
    {
      src: '/lovable-uploads/3b651f93-4f0e-4417-ba7a-39c66ad3afb8.png',
      alt: 'Exterior Wide View',
      title: 'Premium Location',
      subtitle: 'Your home away from home'
    }
  ];

  const features = [
    { icon: <Wifi className="h-5 w-5" />, title: 'Free Wi-Fi', desc: 'High-speed internet' },
    { icon: <Coffee className="h-5 w-5" />, title: 'Beverage Service', desc: 'Premium drinks' },
    { icon: <Car className="h-5 w-5" />, title: 'Free Parking', desc: 'Secure parking' },
    { icon: <Bath className="h-5 w-5" />, title: 'Private Bath', desc: 'Modern amenities' }
  ];

  const handleWhatsApp = () => {
    const message = "Hello! I'm interested in booking a room at Choice Lounge. Can you help me with availability and pricing?";
    const phoneNumber = '+250788123456';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Carousel */}
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
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Hero Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl mx-auto">
                      {/* Choice Lounge Brand */}
                      <div className="mb-8 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                          <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                            Choice
                          </span>
                          <br />
                          <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                            Lounge
                          </span>
                        </h1>
                        
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <Badge variant="outline" className="bg-white/20 border-white/30 text-white backdrop-blur-sm">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Premium Stay
                          </Badge>
                          <Badge variant="outline" className="bg-white/20 border-white/30 text-white backdrop-blur-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            Lake Kivu Views
                          </Badge>
                        </div>
                        
                        <p className="text-xl md:text-2xl font-light mb-2 opacity-90">
                          {image.title}
                        </p>
                        <p className="text-base md:text-lg opacity-75 mb-8">
                          {image.subtitle}
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button 
                          size="lg" 
                          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-2xl w-full sm:w-auto"
                          onClick={() => navigate('/rooms')}
                        >
                          Book Your Stay
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                          onClick={handleWhatsApp}
                        >
                          <MessageCircle className="mr-2 h-5 w-5" />
                          WhatsApp Us
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Slide Indicators */}
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of comfort, convenience, and hospitality at Choice Lounge
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait - secure your perfect room today. All our prices are negotiable, and we're here to help you find the best deal.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm" onClick={() => navigate('/rooms')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <ChevronRight className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Browse Rooms</h3>
                <p className="text-muted-foreground">Explore our comfortable accommodations</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm" onClick={handleWhatsApp}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">WhatsApp Chat</h3>
                <p className="text-muted-foreground">Get instant support and pricing</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm" onClick={() => navigate('/contact')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Call Direct</h3>
                <p className="text-muted-foreground">Speak with our booking team</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-12 px-4 bg-background border-t">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Choice Lounge</h3>
            <p className="text-muted-foreground">Your premium accommodation experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">Lake Kivu, Rwanda</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Phone className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">+250 788 123 456</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Mail className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">info@choicelounge.rw</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
