import PageContainer from "../../components/layout/PageContainer.jsx";

export function ShippingPolicy() {
  return (
    <PageContainer size="narrow">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Transit Protocols
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900">
          Shipping & Logistics Policy
        </h1>
      </div>

      <div className="bg-white p-8 border border-slate-200 rounded-sm shadow-subtle space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">Complimentary White-Glove Transit</h3>
          <p>
            Orders exceeding $500 receive complimentary express armored delivery. Standard consignments below $500 are assessed a flat $25 logistics and insurance fee.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">Transit Timelines</h3>
          <p>
            Domestic US shipments are dispatched within 24 hours of clearance and delivered within 2–3 business days. International dispatches are cleared through priority diplomatic air freight and arrive within 3–5 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-editorial text-base font-semibold text-slate-900">Signature Requirements</h3>
          <p>
            All consignments require the physical signature of the adult recipient upon handover. Packages cannot be left unattended at entrances or post boxes.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}

export default ShippingPolicy;
