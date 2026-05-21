"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  role: z.enum(["customer", "provider"], {
    message: "Select Customer or Provider.",
  }),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FieldErrors {
  name?: string[];
  email?: string[];
  role?: string[];
  message?: string[];
}

export default function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", role: undefined, message: "" },
  });

  const roleValue = watch("role");

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) {
          // Server-side field validation — surface per-field
          const fe = json.fieldErrors as FieldErrors;
          if (fe.name || fe.email || fe.role || fe.message) {
            // We rely on the client zod errors first; surface server field
            // errors as a toast since RHF doesn't automatically merge them
            toast.error("Please check the highlighted fields.");
            return;
          }
        }
        setServerError(json.error ?? "Something went wrong. Try again later.");
        return;
      }

      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="cf-name"
          data-slot="input"
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
          placeholder="Your name"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
        />
        {errors.name && (
          <p id="cf-name-err" className="mt-1 text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="cf-email"
          data-slot="input"
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
        />
        {errors.email && (
          <p id="cf-email-err" className="mt-1 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Role — segmented control */}
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-ink">
          I am a…
        </legend>
        <div className="flex gap-2">
          {(["customer", "provider"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setValue("role", r, { shouldValidate: true })}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft ${
                roleValue === r
                  ? "bg-primary text-primary-foreground"
                  : "border border-hairline text-body hover:text-ink"
              }`}
            >
              {r === "customer" ? "Customer" : "Provider"}
            </button>
          ))}
        </div>
        {errors.role && (
          <p className="mt-1 text-xs text-destructive">{errors.role.message}</p>
        )}
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          data-slot="textarea"
          className="flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
          placeholder="Tell us how we can help..."
          rows={4}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <p className="rounded-card border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Send Message
      </button>
    </form>
  );
}