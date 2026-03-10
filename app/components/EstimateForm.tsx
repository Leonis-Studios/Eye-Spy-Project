"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

// ─── TYPES ────────────────────────────────────────────────────────────────────
// FormData defines the shape of our form state object.
// Every field in the form has a corresponding property here.
interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  message: string;
}

// FormErrors mirrors FormData but every value is a string (the error message)
// or undefined (no error). We use Partial<> which makes every property optional —
// so we only need to include fields that actually have errors.
// Partial<Record<keyof FormData, string>> means:
//   keyof FormData = "name" | "phone" | "email" | etc.
//   Record<...> = an object with those keys and string values
//   Partial<...> = all of those keys are optional
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function EstimateForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // ─── FORM STATE ─────────────────────────────────────────────────────────────
  // One useState for all form field values — stored as a single object.
  // This is cleaner than having a separate useState for every field.
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
    message: "",
  });

  // Stores validation error messages per field.
  // Empty object means no errors.
  const [errors, setErrors] = useState<FormErrors>({});

  // Tracks whether the form is currently submitting (to disable the button
  // and show a loading state while waiting for a response).
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracks whether the form was successfully submitted.
  // When true, we replace the form with a success message.
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── INPUT HANDLER ──────────────────────────────────────────────────────────
  // A single handler for ALL input fields — we don't need one per field.
  // e is the change event from the input. e.target gives us the element.
  // name is the input's "name" attribute (matches our FormData keys).
  // value is what the user typed.
  // We use the spread operator (...formData) to copy all existing values,
  // then override just the one field that changed: [name]: value.
  // [name] is a computed property key — it uses the variable as the key name.
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ─── VALIDATION ─────────────────────────────────────────────────────────────
  // Checks all required fields and returns an errors object.
  // If the returned object is empty, the form is valid.
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Regex test for basic email format — looks for x@x.x pattern
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service type";

    return newErrors;
  };

  // ─── SUBMIT HANDLER ─────────────────────────────────────────────────────────
  // e.preventDefault() stops the browser's default form behavior (page reload).
  // Without it, submitting a form would refresh the entire page.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, update state to show them and stop here
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulated API call — replace this with your actual form endpoint.
    // In production this would be a fetch() to a backend, email service
    // like Resend, or a form service like Formspree.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // ─── VARIANTS ────────────────────────────────────────────────────────────────
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Reusable class strings — defined once so we don't repeat them on every input.
  // This is a common pattern when many elements share the same styles.
  const inputClass =
    `w-full bg-[#0a1628] border px-4 py-3 rounded-sm text-white text-sm outline-none transition-colors duration-200 placeholder:text-slate-600` +
    ` focus:border-[#00c8ff]/50`;
  const labelClass = `block text-xs uppercase tracking-widest text-slate-400 mb-2`;

  // ─── SUCCESS STATE ───────────────────────────────────────────────────────────
  // If submitted successfully, replace the entire form with a confirmation message.
  if (isSubmitted) {
    return (
      <section
        id="estimate-form"
        className="relative bg-[#050d1a] py-24 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00c8ff]/15 to-transparent" />
        <div className="max-w-2xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <CheckCircle className="text-[#00c8ff] mb-6" size={48} />
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Request Received!
          </h2>
          <p
            className="text-slate-400 text-lg leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Thanks {formData.name.split(" ")[0]} — we'll review your request and
            reach out within 1 business day to schedule your free estimate.
          </p>
        </div>
      </section>
    );
  }

  // ─── FORM ────────────────────────────────────────────────────────────────────
  return (
    // id="estimate-form" is what the CTA and Hero buttons scroll to
    <section
      id="estimate-form"
      ref={sectionRef}
      className="relative bg-[#050d1a] py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00c8ff]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00c8ff]/15 to-transparent" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,200,255,0.05) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-2xl mx-auto px-6 md:px-16"
      >
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <p
            className="text-[#00c8ff] text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            No Obligation
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Get a Free Estimate
          </h2>
          <p
            className="text-slate-400 text-lg max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Fill out the form below and we'll get back to you within 1 business
            day.
          </p>
        </div>

        {/* Form element — onSubmit calls our handler.
            noValidate disables the browser's built-in validation popups
            since we're handling validation ourselves. */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Two column row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className={labelClass}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name" // must match FormData key for handleChange to work
                type="text"
                value={formData.name} // controlled input — value comes from state
                onChange={handleChange}
                placeholder="John Smith"
                className={`${inputClass} ${errors.name ? "border-red-500/50" : "border-white/5"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {/* Conditional error message — only renders if errors.name exists */}
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone field */}
            <div>
              <label
                htmlFor="phone"
                className={labelClass}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className={`${inputClass} ${errors.phone ? "border-red-500/50" : "border-white/5"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className={labelClass}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`${inputClass} ${errors.email ? "border-red-500/50" : "border-white/5"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Address field */}
          <div>
            <label
              htmlFor="address"
              className={labelClass}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Property Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, State"
              className={`${inputClass} ${errors.address ? "border-red-500/50" : "border-white/5"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.address && (
              <p className="text-red-400 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Service type — a <select> dropdown instead of a text input.
              Works identically with handleChange since it also fires onChange
              and has a name attribute matching our FormData key. */}
          <div>
            <label
              htmlFor="serviceType"
              className={labelClass}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Service Type
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`${inputClass} ${errors.serviceType ? "border-red-500/50" : "border-white/5"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <option value="" disabled>
                Select a service...
              </option>
              <option value="cameras">CCTV & Camera Systems</option>
              <option value="alarms">Alarm Systems</option>
              <option value="access">Access Control</option>
              <option value="monitoring">24/7 Monitoring</option>
              <option value="consultation">Security Consultation</option>
              <option value="other">Other / Not Sure</option>
            </select>
            {errors.serviceType && (
              <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>
            )}
          </div>

          {/* Message — optional, uses <textarea> instead of <input> */}
          <div>
            <label
              htmlFor="message"
              className={labelClass}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Additional Details{" "}
              <span className="text-slate-600 normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your property, any specific concerns, or questions..."
              rows={4}
              className={`${inputClass} border-white/5 resize-none`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Submit button — disabled while submitting to prevent double submission.
              Shows different text based on isSubmitting state. */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-center gap-3 bg-[#00c8ff] text-[#050d1a] font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {isSubmitting ? (
              // Loading state — simple animated dots
              <span className="flex items-center gap-2">
                Submitting
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full bg-[#050d1a] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </span>
            ) : (
              <>
                Request Free Estimate
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </>
            )}
          </button>

          <p
            className="text-slate-600 text-xs text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            No spam. No commitment. We'll contact you to schedule a convenient
            time.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
