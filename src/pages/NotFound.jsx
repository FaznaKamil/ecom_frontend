import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import Button from "../components/common/Button.jsx";
import PageContainer from "../components/layout/PageContainer.jsx";

export function NotFound() {
  return (
    <PageContainer size="narrow">
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-16 space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <Compass className="w-8 h-8 stroke-[1.2]" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-400">
            Error 404 • Coordinate Not Found
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-slate-900 mt-2">
            The Requested Creation Does Not Exist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-3 leading-relaxed">
            The page or piece you are seeking may have been de-listed or relocated within our archives.
          </p>
        </div>

        <Link to="/">
          <Button variant="primary" size="md" icon={ArrowLeft}>
            Return to Boutique
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
}

export default NotFound;
