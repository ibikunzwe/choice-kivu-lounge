
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Wine, 
  Dumbbell, 
  Waves, 
  Shirt, 
  Phone,
  Clock,
  MapPin,
  Users,
  Calendar,
  Shield,
  Headphones,
  GlassWater,
  Sparkles
} from 'lucide-react';

const Services = () => {
  const hotelServices = [
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Free Wi-Fi",
      description: "High-speed internet access throughout Choice Lounge",
      included: true,
      price: "Complimentary"
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Parking",
      description: "Secure parking facilities for hotel guests",
      included: true,
      price: "Complimentary"
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Beverage Service",
      description: "Premium coffee, tea, and refreshments delivered to your room",
      included: false,
      price: "À la carte pricing"
    },
    {
      icon: <GlassWater className="h-6 w-6" />,
      title: "Minibar",
      description: "Curated selection of beverages and snacks in every room",
      included: false,
      price: "Per consumption"
    },
    {
      icon: <Shirt className="h-6 w-6" />,
      title: "Laundry Service",
      description: "Professional laundry and dry cleaning services",
      included: false,
      price: "Per item pricing"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Concierge",
      description: "Personal assistance with bookings and recommendations",
      included: true,
      price: "Complimentary"
    }
  ];

  const beverageServices = [
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Premium Coffee & Tea",
      description: "Artisan coffee blends and premium tea selections",
      features: ["Ethiopian Coffee", "English Breakfast Tea", "Herbal Infusions", "Espresso & Cappuccino"],
      pricing: "Starting from $3"
    },
    {
      icon: <GlassWater className="h-6 w-6" />,
      title: "Fresh Juices & Smoothies",
      description: "Locally sourced fruits turned into refreshing beverages",
      features: ["Tropical Fruit Juices", "Green Smoothies", "Fresh Squeezed Orange", "Seasonal Specials"],
      pricing: "From $4"
    },
    {
      icon: <Wine className="h-6 w-6" />,
      title: "Soft Drinks & Water",
      description: "Refreshing beverages to keep you hydrated",
      features: ["Local Spring Water", "International Sodas", "Energy Drinks", "Sparkling Water"],
      pricing: "$2 - $5"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Special Beverage Packages",
      description: "Curated beverage experiences for your stay",
      features: ["Welcome Drink Package", "All-Day Coffee Package", "Healthy Juice Cleanse", "Custom Combinations"],
      pricing: "From $15/day"
    }
  ];

  const businessServices = [
    "High-speed Wi-Fi in all areas",
    "Business center with printing facilities",
    "Meeting rooms with A/V equipment",
    "Video conferencing facilities",
    "Secretarial services",
    "Translation services (on request)"
  ];

  const operatingHours = [
    { service: "Front Desk", hours: "24/7" },
    { service: "Beverage Service", hours: "6:00 AM - 11:00 PM" },
    { service: "Room Service", hours: "24/7" },
    { service: "Business Center", hours: "6:00 AM - 10:00 PM" },
    { service: "Concierge", hours: "7:00 AM - 11:00 PM" },
    { service: "Housekeeping", hours: "8:00 AM - 6:00 PM" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Choice Lounge Services</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience our comprehensive range of services designed to make your stay 
            comfortable, convenient, and memorable. Specializing in premium beverage service.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Core Hotel Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Core Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential services and amenities available to all Choice Lounge guests
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelServices.map((service, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {service.icon}
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    {service.included && (
                      <Badge variant="secondary">Included</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">{service.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Beverage Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Premium Beverage Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our specialty - curated beverage experiences for room occupants
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {beverageServices.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Available Options:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="font-semibold text-primary">{service.pricing}</span>
                    <Badge variant="outline" className="ml-2 text-xs">Negotiable</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Business Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional services for business travelers and corporate events
            </p>
          </div>
          
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Services</h3>
                <ul className="space-y-3">
                  {businessServices.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-muted-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Business Center Features</h3>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Open daily: 6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Located on the ground floor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">24/7 technical support available</span>
                  </div>
                </div>
                <Button className="w-full">Request Business Services</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Operating Hours */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Service Hours</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Operating hours for all Choice Lounge services and facilities
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {operatingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{item.service}</span>
                    <Badge variant="outline">{item.hours}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact for Services */}
        <section className="bg-primary/5 rounded-lg p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold">Need Custom Beverage Service?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our beverage specialists are available to help you with special requests, 
            custom drink combinations, and personalized service arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Call Beverage Service
            </Button>
            <Button variant="outline" size="lg">
              <Headphones className="mr-2 h-4 w-4" />
              Chat with Concierge
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Beverage service available: 6:00 AM - 11:00 PM daily
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
