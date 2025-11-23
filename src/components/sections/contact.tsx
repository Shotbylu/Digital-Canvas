'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Extend Window interface for EmailJS
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (
        serviceID: string,
        templateID: string,
        templateParams: Record<string, string>,
        publicKey: string
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-accent text-accent-foreground py-4 font-bold tracking-widest hover:bg-accent/90 transition-colors mt-4 disabled:opacity-50"
    >
      {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
    </Button>
  );
}

export function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [emailJSLoaded, setEmailJSLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Load EmailJS script
  useEffect(() => {
    if (window.emailjs) {
      setEmailJSLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;

    script.onload = () => {
      window.emailjs.init('M6P-QvPnvJyyNU6fn');
      setEmailJSLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load EmailJS');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load email service. Please try again later.',
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [toast]);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string[]> = {};
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const popia = formData.get('popia');

    if (!name || name.trim().length < 2) {
      newErrors.name = ['Please enter your full name'];
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = ['Please enter a valid email address'];
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = ['Message must be at least 10 characters'];
    }

    if (!popia) {
      newErrors.popia = ['You must consent to the POPI Act terms'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailJSLoaded) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Email service not loaded. Please refresh and try again.',
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      const errorMessages = Object.values(errors).flat().join(' ');
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: errorMessages || 'Please check the form for errors.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceID = 'service_bx7vrfe';
      const templateID = 'template_gcdk229';
      const publicKey = 'M6P-QvPnvJyyNU6fn';

      const templateParams = {
        from_name: formData.get('name') as string,
        from_email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        to_name: 'Lsibisi',
      };

      await window.emailjs.send(serviceID, templateID, templateParams, publicKey);

      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully.',
      });

      formRef.current?.reset();
      setErrors({});
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-light mb-6">
              Available for{' '}
              <span className="text-primary font-serif italic">
                remote collaboration
              </span>
              .
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Based in Johannesburg. Open to freelance work and consulting.
              Whether you need a paid media audit or a custom machine learning
              model for your data, let&apos;s discuss.
            </p>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center border border-zinc-700">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Location
                  </div>
                  <div className="font-medium">Johannesburg, South Africa</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center border border-zinc-700">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Email
                  </div>
                  <a href="mailto:lsibisi@icloud.com" className="font-medium hover:text-primary transition-colors">lsibisi@icloud.com</a>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a
                href="#"
                className="p-3 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded-sm"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded-sm"
                aria-label="Instagram Profile"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-sm text-gray-900">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-0 border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors bg-transparent rounded-none"
                  placeholder="Your Full Name"
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>}
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border-0 border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors bg-transparent rounded-none"
                  placeholder="name@company.co.za"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>}
              </div>
              <div>
                <Label
                  htmlFor="subject"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Subject
                </Label>
                <Select name="subject" defaultValue="General Inquiry">
                  <SelectTrigger className="w-full border-0 border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors bg-transparent rounded-none">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    <SelectItem value="Paid Media Audit">Paid Media Audit</SelectItem>
                    <SelectItem value="Data Science Project">Data Science Project</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full border-0 border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors bg-transparent rounded-none resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message[0]}</p>}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="popia"
                  name="popia"
                  required
                  aria-required="true"
                  className="mt-1 border-primary focus-visible:ring-2 focus-visible:ring-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="popia"
                    className="text-xs text-gray-400 leading-tight"
                  >
                    I consent to having this website store my submitted information for
                    the purpose of responding to my inquiry, in accordance with the{' '}
                    <span className="underline">POPI Act</span>.
                  </label>
                  {errors.popia && <p className="text-sm text-red-500">{errors.popia[0]}</p>}
                </div>
              </div>
              <SubmitButton isSubmitting={isSubmitting} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
