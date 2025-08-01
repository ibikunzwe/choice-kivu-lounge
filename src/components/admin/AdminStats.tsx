
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Hotel, Calendar, DollarSign, Users, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Stats {
  totalRooms: number;
  availableRooms: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  todayCheckIns: number;
  todayCheckOuts: number;
}

export const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    todayCheckIns: 0,
    todayCheckOuts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch room stats
      const { data: rooms } = await supabase
        .from('rooms')
        .select('is_available');
      
      // Fetch booking stats
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status, total_cost, check_in, check_out');

      const today = new Date().toISOString().split('T')[0];
      
      const totalRooms = rooms?.length || 0;
      const availableRooms = rooms?.filter(room => room.is_available).length || 0;
      const totalBookings = bookings?.length || 0;
      const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
      const confirmedBookings = bookings?.filter(b => b.status === 'confirmed').length || 0;
      const totalRevenue = bookings?.reduce((sum, b) => sum + (Number(b.total_cost) || 0), 0) || 0;
      const todayCheckIns = bookings?.filter(b => 
        b.check_in?.split('T')[0] === today && b.status === 'confirmed'
      ).length || 0;
      const todayCheckOuts = bookings?.filter(b => 
        b.check_out?.split('T')[0] === today && b.status === 'confirmed'
      ).length || 0;

      setStats({
        totalRooms,
        availableRooms,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
        todayCheckIns,
        todayCheckOuts,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: <Hotel className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      suffix: '',
    },
    {
      title: 'Available Rooms',
      value: stats.availableRooms,
      icon: <Hotel className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      suffix: '',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      suffix: '',
    },
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      suffix: '$',
      prefix: true,
    },
  ];

  const quickStats = [
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      badge: 'warning',
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      badge: 'success',
    },
    {
      title: "Today's Check-ins",
      value: stats.todayCheckIns,
      badge: 'info',
    },
    {
      title: "Today's Check-outs",
      value: stats.todayCheckOuts,
      badge: 'info',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">
                    {stat.prefix && stat.suffix}
                    {stat.value.toLocaleString()}
                    {!stat.prefix && stat.suffix}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
                <Badge 
                  variant={stat.badge === 'warning' ? 'destructive' : 
                          stat.badge === 'success' ? 'default' : 'secondary'}
                  className="ml-2"
                >
                  {stat.value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-green-700">Check-ins</h4>
              <p className="text-2xl font-bold text-green-600">{stats.todayCheckIns}</p>
              <p className="text-sm text-muted-foreground">Guests arriving today</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-orange-700">Check-outs</h4>
              <p className="text-2xl font-bold text-orange-600">{stats.todayCheckOuts}</p>
              <p className="text-sm text-muted-foreground">Guests departing today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
