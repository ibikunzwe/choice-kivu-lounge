
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      details: [
        "123 Hospitality Avenue",
        "City Center, State 12345",
        "Country"
      ]
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Numbers",
      details: [
        "Reception: +1 (555) 123-4567",
        "Reservations: +1 (555) 123-4568",
        "Events: +1 (555) 123-4569"
      ]
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: [
        "info@hotelbooking.com",
        "reservations@hotelbooking.com",
        "events@hotelbooking.com"
      ]
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      details: [
        "Front Desk: 24/7",
        "Reservations: 7 AM - 11 PM",
        "Events: 9 AM - 6 PM"
      ]
    }
  ];

  const departments = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "General Inquiries",
      description: "Questions about our hotel, services, and facilities",
      email: "info@hotelbooking.com",
      phone: "+1 (555) 123-4567"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Reservations",
      description: "Room bookings, availability, and reservation changes",
      email: "reservations@hotelbooking.com",
      phone: "+1 (555) 123-4568"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Events & Meetings",
      description: "Corporate events, conferences, and special occasions",
      email: "events@hotelbooking.com",
      phone: "+1 (555) 123-4569"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're here to help! Get in touch with us for any questions, 
            reservations, or special requests.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Quick Contact Info */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-2 p-3 rounded-full bg-primary/10 text-primary w-fit">
                  {info.icon}
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Main Content Grid */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="reservation">Reservation</SelectItem>
                          <SelectItem value="event">Event Planning</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="compliment">Compliment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Departments & Map */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Departments</h2>
              <p className="text-muted-foreground">
                Reach out to the right department for faster assistance.
              </p>
            </div>
            
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {dept.icon}
                      </div>
                      <CardTitle className="text-lg">{dept.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span>{dept.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Find Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">
                      123 Hospitality Avenue<br />
                      City Center, State 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our hotel and services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are your check-in/check-out times?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Check-in is at 3:00 PM and check-out is at 11:00 AM. 
                  Early check-in and late check-out may be available upon request.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer airport transfers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we provide airport transfer services for $35 one-way. 
                  Please contact us at least 24 hours in advance to arrange.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is parking available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer complimentary secure parking for all hotel guests. 
                  Valet parking is also available upon request.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is your cancellation policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Free cancellation up to 24 hours before check-in. 
                  Cancellations within 24 hours may incur a one-night charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
