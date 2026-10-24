import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer.jsx";

export function FAQ() {
  const faqs = [
    {
      q: "How does ClickLanka verify the authenticity of timepieces and creations?",
      a: "Every timepiece, leather good, and fragrance flacon is sourced directly from certified manufacture ateliers. Timepieces undergo optical, chronometric, and case-integrity testing under master watchmakers before being issued a digital certificate of authenticity.",
    },
    {
      q: "What payment methods are supported for checkout?",
      a: "For our current portfolio release, we support two streamlined payment options: Cash on Delivery (COD) for eligible domestic destinations, and Sandbox Test Card simulation for instant digital order authorization. Additional payment rails can be integrated seamlessly.",
    },
    {
      q: "What are your transit times and shipping guarantees?",
      a: "Orders over $500 qualify for complimentary insured white-glove express delivery. Domestic US shipments typically arrive within 2–3 business days. Consignments are packaged in temperature-stable, tamper-evident presentation boxes with signature required upon delivery.",
    },
    {
      q: "What is the policy for returns and exchanges?",
      a: "We offer a 30-day return window for items in unworn, original condition with the security seal intact. To initiate a return, contact our Concierge desk or navigate to your Account Orders panel for a prepaid insured return manifest.",
    },
    {
      q: "Can I commission custom dial engraving or bespoke leather sizing?",
      a: "Yes. Our bespoke commission desk accommodates custom monograms, caseback engravings, and personalized leather straps. Please submit an inquiry via our Concierge Contact form with your desired specifications.",
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <PageContainer size="narrow">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Knowledge Base
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-slate-900">
          Frequently Answered
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Insights regarding authentication, transit, care, and client services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-sm bg-white overflow-hidden shadow-subtle"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                  openIdx === idx ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default FAQ;
