import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Award, Users, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Hospitality Excellence",
      description: "We believe in providing warm, personalized service that makes every guest feel at home while experiencing the beauty of Lake Kivu."
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "We maintain the highest standards of cleanliness, comfort, and luxury in all our accommodations and services."
    },
    {
      icon: Users,
      title: "Guest-Centered Approach",
      description: "Every decision we make is focused on enhancing our guests' experience and creating unforgettable memories."
    },
    {
      icon: Leaf,
      title: "Environmental Harmony",
      description: "We're committed to preserving the natural beauty of Lake Kivu while providing sustainable luxury accommodations."
    }
  ];

  const team = [
    {
      name: "Jean Claude Uwimana",
      role: "General Manager",
      description: "With over 10 years in hospitality, Jean Claude ensures every guest receives exceptional service and experiences the true warmth of Rwandan hospitality.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Grace Mukamana",
      role: "Guest Relations Manager",
      description: "Grace's attention to detail and genuine care for our guests ensures that every stay at Choice Lounge is comfortable and memorable.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const milestones = [
    { year: "2019", event: "Choice Lounge established with a vision to create the perfect lakeside retreat" },
    { year: "2020", event: "Expanded to include fully serviced apartments and enhanced garden areas" },
    { year: "2021", event: "Achieved 95% guest satisfaction rating and became a preferred destination for Lake Kivu visitors" },
    { year: "2022", event: "Introduced 24/7 concierge services and upgraded all rooms with modern amenities" },
    { year: "2023", event: "Recognized as one of the top boutique accommodations in Rubavu District" },
    { year: "2024", event: "Continuing to set new standards for luxury and comfort by Lake Kivu" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Creating unforgettable experiences where comfort meets nature's beauty by the shores of Lake Kivu
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To provide exceptional hospitality experiences that celebrate the natural beauty of Lake Kivu 
                  while offering modern comfort and elegance. We strive to create a sanctuary where guests can 
                  reconnect with nature, find peace, and create lasting memories in one of Rwanda's most 
                  beautiful locations.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be the premier boutique accommodation destination in the Lake Kivu region, recognized 
                  for our commitment to sustainability, exceptional service, and creating transformative 
                  experiences that connect guests with the natural splendor of Rwanda.
                </p>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Lake Kivu scenic view" 
                className="rounded-2xl shadow-elegant w-full h-96 object-cover"
              />
              <div className="absolute inset-0 hero-gradient opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at Choice Lounge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-soft border-0 hover:shadow-elegant smooth-transition">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The dedicated professionals who make your Choice Lounge experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="shadow-elegant border-0 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-105 smooth-transition"
                  />
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a simple vision to becoming a premier lakeside destination
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-glow smooth-transition">
                  <span className="text-white font-bold text-lg">{milestone.year}</span>
                </div>
                <div className="flex-1 pt-4">
                  <Card className="shadow-soft border-0 group-hover:shadow-elegant smooth-transition">
                    <CardContent className="p-6">
                      <p className="text-lg leading-relaxed">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Choice Lounge Experience
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Located in the heart of Nyamyumba, just steps from Lake Kivu's pristine shores, 
                  Choice Lounge represents the perfect harmony between modern luxury and natural beauty. 
                  Our journey began with a simple belief: that exceptional hospitality comes from 
                  genuine care and attention to detail.
                </p>
                <p>
                  Every corner of our property has been thoughtfully designed to showcase the 
                  breathtaking beauty of Lake Kivu while providing the comfort and amenities 
                  today's travelers expect. From our elegantly appointed rooms to our lush garden 
                  spaces, we've created an environment where guests can truly unwind and reconnect.
                </p>
                <p>
                  Whether you're seeking a romantic getaway, a peaceful retreat, or a comfortable 
                  base for exploring the Lake Kivu region, Choice Lounge offers an experience 
                  that will leave you with memories to last a lifetime.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Choice Lounge building" 
                className="rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Our Story Yourself
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the many guests who have made Choice Lounge their preferred Lake Kivu destination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Book Your Stay
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              asChild
            >
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;