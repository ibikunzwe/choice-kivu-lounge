import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, MapPin, Phone, Wifi, Car, Coffee, Waves, Users, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
const heroImage = "/images/exterior-wide-view.png";
const roomImage = "/images/building-exterior-stairs.png";
const gardenImage = "/images/buildings-complex.png";

const Home = () => {
  const features = [
    { icon: Waves, title: "Lake Kivu View", description: "Breathtaking panoramic views of the stunning Lake Kivu" },
    { icon: Wifi, title: "Modern Amenities", description: "Air conditioning, Wi-Fi, and private bathrooms in every room" },
    { icon: Coffee, title: "Room Service", description: "Meals and drinks delivered to your room 24/7" },
    { icon: Users, title: "Event Hosting", description: "Perfect venue for private events, retreats, and business stays" },
    { icon: Shield, title: "24/7 Security", description: "Round-the-clock reception and security for your peace of mind" },
    { icon: Car, title: "Great Location", description: "Walking distance to Lake Kivu and close to Rubavu town" },
  ];

  const testimonials = [
    {
      name: "Umukozi Wacu",
      rating: 5,
      comment: "An absolutely stunning place with incredible lake views. The staff was exceptional and the rooms were pristine.",
      location: "Gisenyi, Brasserie"
    },
    {
      name: "Umukozi wa KABIRI",
      rating: 5,
      comment: "Perfect for a romantic getaway. The sunset views from our balcony were unforgettable. Highly recommended!",
      location: "Gisenyi, Brasserie"
    },
    {
      name: "Umukozi wa GATATU",
      rating: 5,
      comment: "The garden area is beautiful and so peaceful. Great for relaxation and photography. Will definitely return!",
      location: "Rubavu, Nyamyumba"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="The best and Affordable accommodation Near Brasserie" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Experience Comfort,<br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Elegance & Nature
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              by Lake Kivu
            </p>
            <p className="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto">
              A modern, welcoming lounge and guesthouse just steps away from the shores of Lake Kivu. 
              Discover comfort, cleanliness, and convenience in nature's embrace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="hero-gradient shadow-glow text-lg px-8 py-6 rounded-xl">
                Book Your Stay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <Link to="/rooms">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Choice Lounge?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience luxury and comfort with our premium amenities and breathtaking location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant smooth-transition border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow smooth-transition">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Modern Rooms & Apartments
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our fully equipped rooms and apartments feature air conditioning, Wi-Fi, and private bathrooms. 
                Each space is designed for comfort and elegance, with stunning views of Lake Kivu.
              </p>
              <ul className="space-y-3">
                {[
                  "Lake Kivu panoramic views",
                  "Private balconies",
                  "Daily housekeeping",
                  "Modern furnishings",
                  "Air conditioning & Wi-Fi"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="hero-gradient shadow-glow">
                <Link to="/rooms">
                  Explore Our Rooms
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={roomImage} 
                alt="Modern luxury room with Lake Kivu view" 
                className="rounded-2xl shadow-elegant"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src={gardenImage} 
                alt="Beautiful garden lounge area" 
                className="rounded-2xl shadow-elegant"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Lush Garden Lounge
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Relax in our beautifully landscaped gardens with outdoor seating areas perfect for 
                unwinding, photography, or hosting small gatherings while enjoying the serene Lake Kivu atmosphere.
              </p>
              <ul className="space-y-3">
                {[
                  "Landscaped tropical gardens",
                  "Outdoor seating areas",
                  "Perfect for photography",
                  "Small event hosting",
                  "Peaceful Lake Kivu views"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/gallery">
                  View Gallery
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect Location</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Located in Nyamyumba, Rubavu District, just steps away from Lake Kivu's shores and close to all local attractions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center shadow-soft border-0">
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Lake Kivu Access</h3>
                <p className="text-muted-foreground">Walking distance to the beautiful Lake Kivu shores</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft border-0">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Rubavu Town</h3>
                <p className="text-muted-foreground">Close to town center and local attractions</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft border-0">
              <CardContent className="p-8">
                <Waves className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Boat Tours</h3>
                <p className="text-muted-foreground">Easy access to Lake Kivu boat tour services</p>
              </CardContent>
            </Card>
          </div>

          <Button asChild size="lg" className="hero-gradient shadow-glow">
            <Link to="/contact">
              Get Directions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
            <p className="text-xl text-muted-foreground">Read reviews from our satisfied guests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-elegant border-0">
                <CardContent className="p-8">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Lake Kivu Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your stay at Choice Lounge and discover the perfect blend of comfort, elegance, and nature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Book Your Room
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              asChild
            >
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;