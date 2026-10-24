import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import contactService from "../../services/contactService.js";
import { isValidEmail } from "../../utils/validators.js";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await contactService.submitMessage(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setErrorMessage(err.message || "Failed to deliver message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-8 text-center max-w-md mx-auto space-y-3">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-editorial text-xl font-medium text-emerald-950">
          Inquiry Received
        </h4>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Thank you for reaching out to ClickLanka Client Support. Our team will review your inquiry and respond within 24 business hours.
        </p>
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={() => setIsSuccess(false)}>
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name"
          name="name"
          placeholder="Lord Sterling"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="client@prestige.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        placeholder="Inquiry regarding bespoke horology commission..."
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Please describe your inquiry, bespoke sizing requests, or client service questions..."
          value={formData.message}
          onChange={handleChange}
          className={`w-full rounded-sm border bg-white p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 ${
            errors.message
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500"
              : "border-slate-200 focus:border-navy-900 focus:ring-navy-900"
          }`}
        />
        {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full uppercase tracking-widest text-xs font-semibold py-3"
        isLoading={isLoading}
        icon={Send}
        iconPosition="right"
      >
        Submit Concierge Inquiry
      </Button>
    </form>
  );
}

export default ContactForm;
