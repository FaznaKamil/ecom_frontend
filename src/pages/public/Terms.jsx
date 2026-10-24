import PageContainer from "../../components/layout/PageContainer.jsx";

export function Terms() {
  return (
    <PageContainer size="narrow">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Legal Agreement
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900">
          Terms of Purchase & Service
        </h1>
        <p className="text-xs text-slate-400 mt-1">Effective October 2026</p>
      </div>

      <div className="bg-white p-8 border border-slate-200 rounded-sm shadow-subtle space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">1. Acceptance of Terms</h3>
          <p>
            By accessing the ClickLanka platform or placing an order, patrons accept these terms in full. Orders are binding once acknowledged and verified by our automated allocation server.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">2. Authenticity & Warranty</h3>
          <p>
            All creations distributed by ClickLanka are backed by our 100% authenticity guarantee and accompanied by documented serial numbers. Timepieces include a comprehensive 5-year mechanical movement warranty.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">3. Pricing & Allocations</h3>
          <p>
            Prices are displayed in United States Dollars (USD) unless otherwise specified. We reserve the right to decline or cancel orders in the event of demonstrable stock errors or supply constraints.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}

export default Terms;
