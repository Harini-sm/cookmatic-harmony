
import React, { useState } from 'react';
import { ShareIcon, Copy, MessageSquare, Send, Mail, Facebook, Twitter } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Check out this delicious recipe for ${recipeTitle}!`);
  const [open, setOpen] = useState(false);
  
  const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        toast.error('Failed to copy link');
      });
  };
  
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${message} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
    setOpen(false);
  };
  
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message)}`;
    window.open(facebookUrl, '_blank');
    setOpen(false);
  };
  
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message} ${shareUrl}`)}`;
    window.open(twitterUrl, '_blank');
    setOpen(false);
  };
  
  const handleEmailShare = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(`Recipe: ${recipeTitle}`)}&body=${encodeURIComponent(`${message}\n\n${shareUrl}`)}`;
    window.location.href = mailtoUrl;
    setOpen(false);
  };
  
  const handleSMSShare = () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    // On mobile devices, we can try to use the SMS URI scheme
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(`${message} ${shareUrl}`)}`;
    
    // Try to open the SMS app
    const link = document.createElement('a');
    link.href = smsUrl;
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Recipe shared via SMS to ${phoneNumber}`);
    setPhoneNumber('');
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="direct">Direct Share</TabsTrigger>
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
          
          <TabsContent value="social" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-message">Customize your message</Label>
              <Input 
                id="share-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={handleWhatsAppShare} className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button onClick={handleFacebookShare} className="w-full">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button onClick={handleTwitterShare} className="w-full">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="direct" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-message-direct">Message</Label>
              <Input 
                id="share-message-direct"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="flex mt-1 space-x-2">
                  <Input 
                    id="email"
                    type="email"
                    placeholder="friend@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleEmailShare}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone-number">Phone Number</Label>
                <div className="flex mt-1 space-x-2">
                  <Input 
                    id="phone-number"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSMSShare}>
                    <Send className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                </div>
              </div>
            </div>
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
