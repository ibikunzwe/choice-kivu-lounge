
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Award, Heart, Target, Eye } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "General Manager",
      description: "15+ years in hospitality management",
      image: "/placeholder.svg"
    },
    {
      name: "Sarah Johnson",
      role: "Guest Relations Manager",
      description: "Specialist in customer experience",
      image: "/placeholder.svg"
    },
    {
      name: "Michael Brown",
      role: "Operations Director",
      description: "Expert in hotel operations and efficiency",
      image: "/placeholder.svg"
    },
    {
      name: "Emma Davis",
      role: "Head of Housekeeping",
      description: "Ensuring the highest standards of cleanliness",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Hospitality",
      description: "We treat every guest as family, providing warm and personalized service"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Community",
      description: "We're committed to supporting our local community and environment"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">About Hotel Booking</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            For over two decades, we have been providing exceptional hospitality and 
            creating memorable experiences for guests from around the world.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Our Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2000, Hotel Booking began as a small family-owned establishment 
                with a vision to provide guests with more than just accommodation – we wanted 
                to create a home away from home.
              </p>
              <p>
                Over the years, we've grown and evolved, but our core values remain unchanged. 
                We believe that hospitality is an art, and every guest deserves to feel valued, 
                comfortable, and cared for throughout their stay.
              </p>
              <p>
                Today, we're proud to be a leading destination hotel, known for our exceptional 
                service, beautiful accommodations, and commitment to sustainable tourism practices.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/src/assets/reception-interior.jpg"
              alt="Hotel reception"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </section>

        {/* Location */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Prime Location</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategically located with easy access to major attractions, 
              business districts, and transportation hubs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Address</h4>
                  <p className="text-muted-foreground">
                    123 Hospitality Avenue<br />
                    City Center, State 12345<br />
                    Country
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Nearby Attractions</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• City Museum (0.5 km)</li>
                    <li>• Central Park (0.8 km)</li>
                    <li>• Shopping District (1.2 km)</li>
                    <li>• Business Center (2.0 km)</li>
                    <li>• Airport (15 km)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Integration</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide exceptional hospitality experiences that exceed our guests' 
                expectations while contributing positively to our community and environment. 
                We strive to create lasting memories through personalized service and 
                attention to detail.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the preferred choice for travelers seeking authentic, memorable, 
                and sustainable hospitality experiences. We envision a future where 
                our hotel serves as a model for responsible tourism and exceptional 
                guest service.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as an organization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team of hospitality professionals is committed to 
              making your stay exceptional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Rooms & Suites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Guests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
