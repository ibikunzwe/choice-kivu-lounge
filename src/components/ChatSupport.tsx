
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, User, Headphones } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ChatMessage {
  id: string;
  message: string;
  created_at: string;
  user_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  is_from_support: boolean;
}

export const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '' });
  const [isGuestInfoSet, setIsGuestInfoSet] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      scrollToBottom();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('chat-messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages'
          },
          (payload) => {
            const newMessage = payload.new as ChatMessage;
            setMessages(prev => [...prev, newMessage]);
            scrollToBottom();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!user && !isGuestInfoSet) {
      if (!guestInfo.name || !guestInfo.email) {
        toast({
          title: "Information Required",
          description: "Please provide your name and email to start chatting.",
          variant: "destructive",
        });
        return;
      }
      setIsGuestInfoSet(true);
    }

    setLoading(true);
    
    try {
      const messageData = {
        message: newMessage,
        user_id: user?.id || null,
        guest_name: user ? null : guestInfo.name,
        guest_email: user ? null : guestInfo.email,
        is_from_support: false,
      };

      const { error } = await supabase
        .from('chat_messages')
        .insert(messageData);

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Support Chat</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3 space-y-3">
        {!user && !isGuestInfoSet && (
          <div className="space-y-2">
            <Input
              placeholder="Your name"
              value={guestInfo.name}
              onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
            />
            <Input
              placeholder="Your email"
              type="email"
              value={guestInfo.email}
              onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
            />
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.is_from_support ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-2 text-sm ${
                  message.is_from_support
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  {message.is_from_support ? (
                    <Headphones className="h-3 w-3" />
                  ) : (
                    <User className="h-3 w-3" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.is_from_support 
                      ? 'Support' 
                      : message.guest_name || 'You'
                    }
                  </span>
                  <Badge variant="outline" className="text-xs ml-auto">
                    {format(new Date(message.created_at), 'HH:mm')}
                  </Badge>
                </div>
                <p>{message.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
