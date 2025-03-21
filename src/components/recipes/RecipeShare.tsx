import React, { useState } from 'react';
import { ShareIcon, Copy, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface RecipeShareProps {
  recipeTitle: string;
  recipeId: string;
}

const RecipeShare: React.FC<RecipeShareProps> = ({ recipeTitle, recipeId }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState(`Check out this delicious recipe for ${recipeTitle}!`);
  
  const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };
  
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${message} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const handleSMSShare = () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    // In a real app, this would send an SMS via backend
    toast.success(`Recipe shared via SMS to ${phoneNumber}`);
    setPhoneNumber('');
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Recipe</DialogTitle>
          <DialogDescription>
            Share this delicious recipe with friends and family.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="link">Copy Link</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                value={shareUrl} 
                readOnly 
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="whatsapp" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-message">Customize your message</Label>
              <Input 
                id="whatsapp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button onClick={handleWhatsAppShare} className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Share via WhatsApp
            </Button>
          </TabsContent>
          
          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input 
                id="phone-number"
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-message">Message</Label>
              <Input 
                id="sms-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button onClick={handleSMSShare} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send SMS
            </Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4 sm:justify-start">
          <DialogTrigger asChild>
            <Button variant="secondary">Close</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeShare;
