import PageContainer from "../../components/layout/PageContainer.jsx";

export function PrivacyPolicy() {
  return (
    <PageContainer size="narrow">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Legal Protocol
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-1">Effective October 2026</p>
      </div>

      <div className="bg-white p-8 border border-slate-200 rounded-sm shadow-subtle space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">1. Client Data Custody</h3>
          <p>
            ClickLanka is committed to preserving the confidentiality of client information. We collect information necessary to fulfill orders, verify authenticity, and provide support services.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">2. Information Collection</h3>
          <p>
            When registering an account or executing a purchase, we collect name, email address, physical delivery coordinates, and order preferences. Passwords are cryptographically salted and hashed using bcrypt.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">3. Non-Disclosure & Security</h3>
          <p>
            We never monetize, sell, or license client information to third-party advertisers. All network transmissions are secured via TLS 1.3 encryption.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}

export default PrivacyPolicy;
