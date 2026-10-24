import PageContainer from "../../components/layout/PageContainer.jsx";

export function ReturnsPolicy() {
  return (
    <PageContainer size="narrow">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Atelier Guarantee
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900">
          Returns & Exchanges Policy
        </h1>
      </div>

      <div className="bg-white p-8 border border-slate-200 rounded-sm shadow-subtle space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">30-Day Evaluation Period</h3>
          <p>
            We invite patrons to inspect their acquisitions in personal sanctuary for up to 30 days. If a piece does not completely fulfill your expectations, we coordinate complimentary return transit.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">Condition Requirements</h3>
          <p>
            Creations must remain in unworn, mint condition with protective films, tags, security serial bands, and original presentation boxes intact. Bespoke monogrammed commissions cannot be returned.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">Refund Processing</h3>
          <p>
            Upon inspection at our New York atelier, refunds are initiated within 48 business hours to the original form of settlement.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}

export default ReturnsPolicy;
