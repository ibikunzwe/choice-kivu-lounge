
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Utensils, 
  Dumbbell, 
  Waves, 
  Shirt, 
  Phone,
  Clock,
  MapPin,
  Users,
  Calendar,
  Shield,
  Headphones
} from 'lucide-react';

const Services = () => {
  const hotelServices = [
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Free Wi-Fi",
      description: "High-speed internet access throughout the hotel",
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
      title: "Room Service",
      description: "24/7 in-room dining service",
      included: false,
      price: "À la carte pricing"
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Restaurant",
      description: "Fine dining experience with local and international cuisine",
      included: false,
      price: "Menu pricing"
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

  const additionalServices = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Event Spaces",
      description: "Professional meeting rooms and event venues for conferences, weddings, and special occasions",
      features: ["Audio/Visual Equipment", "Catering Services", "Event Planning", "Flexible Layouts"],
      pricing: "Starting from $200/day"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Tour Packages",
      description: "Curated local experiences and sightseeing tours",
      features: ["City Tours", "Cultural Experiences", "Adventure Activities", "Transportation"],
      pricing: "From $50/person"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Airport Transfer",
      description: "Comfortable and reliable airport pickup and drop-off service",
      features: ["Professional Drivers", "Luxury Vehicles", "Flight Monitoring", "24/7 Availability"],
      pricing: "$35 one-way"
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
    { service: "Restaurant", hours: "6:00 AM - 11:00 PM" },
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
          <h1 className="text-4xl font-bold tracking-tight">Hotel Services & Amenities</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience our comprehensive range of services designed to make your stay 
            comfortable, convenient, and memorable.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Core Hotel Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Core Hotel Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential services and amenities available to all our guests
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelServices.map((service, index) => (
              <Card key={index} className="relative">
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

        {/* Additional Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium services to enhance your stay experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="h-full">
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
                    <h4 className="font-semibold mb-2">Features:</h4>
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
              Operating hours for all our services and facilities
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {operatingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
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
          <h2 className="text-2xl font-bold">Need Additional Services?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our concierge team is available to help you with special requests, 
            local recommendations, and custom service arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Call Concierge
            </Button>
            <Button variant="outline" size="lg">
              <Headphones className="mr-2 h-4 w-4" />
              Chat with Us
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Concierge available: 7:00 AM - 11:00 PM daily
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
