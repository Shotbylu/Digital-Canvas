'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
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

function SubmitButton() {
  return (
    <Button
      type="submit"
      className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors mt-4"
    >
      SEND MESSAGE
    </Button>
  );
}

export function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: ContactFormState = { success: false, message: '' };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  if (state.success && formRef.current) {
    toast({
        title: 'Success!',
        description: state.message,
    });
    formRef.current?.reset();
  } else if (state.message && state.errors) {
    const errorMessages = Object.values(state.errors).flat().join(' ');
    toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessages || state.message,
    });
  }


  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white">
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
            <form ref={formRef} action={formAction} className="space-y-6">
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
                 {state.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
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
                 {state.errors?.email && <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>}
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
                 {state.errors?.message && <p className="text-sm text-red-500 mt-1">{state.errors.message[0]}</p>}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox id="popia" name="popia" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="popia"
                    className="text-xs text-gray-400 leading-tight"
                    >
                    I consent to having this website store my submitted information for
                    the purpose of responding to my inquiry, in accordance with the{' '}
                    <span className="underline">POPI Act</span>.
                    </label>
                    {state.errors?.popia && <p className="text-sm text-red-500">{state.errors.popia[0]}</p>}
                </div>
              </div>
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
