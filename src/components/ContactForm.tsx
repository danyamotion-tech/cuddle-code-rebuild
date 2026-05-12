import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type FormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setErrors({});
  };

  const inputClass =
    "bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200 w-full rounded-none";

  return (
    <div>
      {submitted && (
        <p className="text-foreground text-sm mb-6">Thank you! Your message has been sent.</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <p className="text-sm text-foreground mb-4">Name</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-muted-foreground text-xs mb-1 block">
                First Name <span className="text-muted-foreground">(required)</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={inputClass}
              />
              {errors.firstName && <p className="text-destructive text-xs mt-2">{errors.firstName}</p>}
            </div>
            <div>
              <label className="text-muted-foreground text-xs mb-1 block">
                Last Name <span className="text-muted-foreground">(required)</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={inputClass}
              />
              {errors.lastName && <p className="text-destructive text-xs mt-2">{errors.lastName}</p>}
            </div>
          </div>
        </div>
        <div>
          <label className="text-muted-foreground text-xs mb-1 block">
            Email <span className="text-muted-foreground">(required)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass}
          />
          {errors.email && <p className="text-destructive text-xs mt-2">{errors.email}</p>}
        </div>
        <div>
          <label className="text-muted-foreground text-xs mb-1 block">
            Message <span className="text-muted-foreground">(required)</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={`${inputClass} min-h-32 resize-y border`}
          />
          {errors.message && <p className="text-destructive text-xs mt-2">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="border border-foreground text-foreground bg-transparent font-medium px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-200 text-sm tracking-wide"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
