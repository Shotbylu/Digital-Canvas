"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  popia: z.string().refine(val => val === "on", {
    message: "You must accept the POPIA consent to proceed.",
  }),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  
  const parsed = contactFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the errors and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would send an email or save to a database here.
  console.log("Form submitted successfully:", parsed.data);

  return { success: true, message: "Thanks for connecting. I'll review your inquiry shortly." };
}
