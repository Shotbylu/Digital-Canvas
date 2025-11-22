
'use client';

import { useState, useEffect, useTransition, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
import { suggestRelevantProjects } from '@/ai/flows/dynamic-project-recommendations';
import { projects } from '@/lib/data';
import { useDebounce } from '@/hooks/use-debounce';
import Link from 'next/link';
import Image from 'next/image';

type Project = (typeof projects)[0];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-foreground text-background py-4 font-bold tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors mt-4"
      disabled={pending}
    >
      {pending ? 'SENDING...' : 'SEND MESSAGE'}
    </Button>
  );
}

export function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: ContactFormState = { success: false, message: '' };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce(message, 500);
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
      setMessage('');
      setRecommendedProjects([]);
    } else if (state.message && state.errors) {
       // Combine all error messages for the toast
      const errorMessages = Object.values(state.errors).flat().join(' ');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessages || state.message,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    if (debouncedMessage.length > 20) {
      setIsAiLoading(true);
      suggestRelevantProjects({
        message: debouncedMessage,
        projects: projects.map(p => ({...p, image: p.image || ""}))
      })
        .then(recommendations => {
            const recommendedIds = recommendations.map(r => r.id);
            const fullProjectDetails = projects.filter(p => recommendedIds.includes(p.id));
            setRecommendedProjects(fullProjectDetails);
        })
        .catch(err => console.error("Error fetching recommendations:", err))
        .finally(() => setIsAiLoading(false));
    } else {
        setRecommendedProjects([]);
    }
  }, [debouncedMessage]);

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
                  className="w-full border-0 border-b border-gray-200 py-3 focus-visible:ring-0 focus:border-primary transition-colors bg-transparent rounded-none"
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
                  className="w-full border-0 border-b border-gray-200 py-3 focus-visible:ring-0 focus:border-primary transition-colors bg-transparent rounded-none"
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
                    <SelectTrigger className="w-full border-0 border-b border-gray-200 py-3 focus:ring-0 focus:border-primary transition-colors bg-transparent rounded-none">
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
                  className="w-full border-0 border-b border-gray-200 py-3 focus-visible:ring-0 focus:border-primary transition-colors bg-transparent rounded-none resize-none"
                  placeholder="Tell me about your project..."
                  onChange={(e) => setMessage(e.target.value)}
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
            
            {(isAiLoading || recommendedProjects.length > 0) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Based on your message, you might be interested in:</h4>
                {isAiLoading && <p className="text-sm text-gray-500">Analyzing your request...</p>}
                <div className="space-y-4">
                  {recommendedProjects.map(project => (
                    <Link href="#work" key={project.id} className="flex items-center gap-4 group p-2 rounded-md hover:bg-gray-100 transition-colors">
                      <Image 
                        src={project.image}
                        alt={project.title}
                        width={80}
                        height={64}
                        className="rounded-md object-cover aspect-[5/4]"
                        data-ai-hint={project.imageHint}
                      />
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{project.title}</p>
                        <p className="text-xs text-gray-500">{project.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
