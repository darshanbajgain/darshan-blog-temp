'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success(data.message || 'Successfully subscribed to the newsletter!');
      setEmail('');
      setFirstName('');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-cardBackground border border-borderColor rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Subscribe to my newsletter</h3>
      <p className="text-textPrimary/70 mb-4">
        Get the latest posts and updates delivered directly to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="First Name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-buttons text-textSecondary"
          disabled={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
