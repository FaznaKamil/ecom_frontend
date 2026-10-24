import { Compass, Sparkles, ShieldCheck } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer.jsx";

export function About() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Editorial Header */}
      <section className="bg-gradient-to-r from-navy-950 via-blue-950 to-navy-900 text-white py-20 border-b border-blue-900/40">
        <PageContainer size="narrow">
          <div className="text-center space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-bold">
              The Story of ClickLanka
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight">
              Curated Excellence & <br />
              <span className="italic font-normal text-amber-400">Authentic Heritage</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed pt-2">
              Born with a bold mandate: to connect Sri Lanka and international connoisseurs with verified luxury timepieces, heirloom leather goods, fine Ceylon gems, and premium lifestyle creations.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Philosophy Section */}
      <PageContainer size="narrow">
        <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
          <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-950">
            ClickLanka was founded to elevate modern e-commerce with absolute authenticity and impeccable service. We bridge the gap between world-class international craftsmanship and discerning patrons across Sri Lanka and the globe.
          </p>

          <p>
            From certified Swiss movements to master Tuscan leather tanneries and indigenous Sri Lankan gemstone artisans, every item in our catalog is rigorously verified, cataloged, and backed by our authenticity guarantee.
          </p>
        </div>
      </PageContainer>

      {/* Pillars */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-slate-100 rounded-sm bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-600 text-amber-400 flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-editorial text-lg font-medium text-slate-900">
                Direct Guild Alliances
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We work without middlemen directly with master artisans across Switzerland, Japan, Italy, and France, eliminating speculative markup.
              </p>
            </div>

            <div className="p-6 border border-slate-100 rounded-sm bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-600 text-amber-400 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-editorial text-lg font-medium text-slate-900">
                Verified Provenance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every timepiece and rare flacon undergoes multi-point optical inspection, chronometric calibration, and tamper-sealed serial cataloging.
              </p>
            </div>

            <div className="p-6 border border-slate-100 rounded-sm bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-600 text-amber-400 flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-editorial text-lg font-medium text-slate-900">
                White-Glove Custody
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From our climate-controlled vault in New York to your residence, your consignment travels under insured private custody.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

export default About;
