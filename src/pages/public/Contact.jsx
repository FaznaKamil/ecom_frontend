import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import contactService from "../../services/contactService.js";
import ContactForm from "../../components/forms/ContactForm.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";

export function Contact() {
  const [settings, setSettings] = useState({
    storeName: "ClickLanka (Sample Storefront)",
    supportEmail: "support@clicklanka.com",
    phone: "+94 (11) 234-LUXE / +94 (77) 123-4567 (Sample Configurable Desk)",
    address: "100 Galle Road, Kollupitiya, Colombo 03, Sri Lanka (Sample Headquarters)",
    operatingHours: "Monday – Saturday: 9:00 AM – 8:00 PM IST",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await contactService.getSettings();
        if (res?.data) {
          setSettings(res.data);
        }
      } catch {
        // Fallback to sample data
      }
    }
    loadSettings();
  }, []);

  return (
    <PageContainer>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Private Client Advisory
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-slate-900">
          Concierge Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Reach our horological specialists, bespoke commission desk, and client services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information & Sample Note */}
        <div className="space-y-8 lg:border-r lg:border-slate-200 lg:pr-8">
          <div>
            <h3 className="font-editorial text-xl font-medium text-slate-900 mb-4">
              Atelier Information
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our concierge advisors assist with bespoke orders, sizing verifications, and private appointments.
            </p>
          </div>

          <div className="space-y-5 text-xs text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Maison Headquarters</p>
                <p className="text-slate-500">{settings.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Electronic Correspondence</p>
                <p className="text-slate-500">{settings.supportEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Telephone Inquiries</p>
                <p className="text-slate-500">{settings.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Business Hours</p>
                <p className="text-slate-500">{settings.operatingHours}</p>
              </div>
            </div>
          </div>

          {/* Configurable Sample Data Notice */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-700 block mb-1">
              Note on Store Configuration:
            </span>
            The contact details above are sample identifiers. Store administrators may modify contact addresses, telephone numbers, and operating schedules directly in the Admin Settings panel.
          </div>
        </div>

        {/* Functional Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-card">
            <h3 className="font-editorial text-xl font-medium text-slate-900 mb-2">
              Dispatch an Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the form below and an advisor from our New York atelier will review your transmission.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Contact;
