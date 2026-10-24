import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import Button from "./Button.jsx";

export function EmptyState({
  title = "No Items Found",
  description = "We couldn't find any products matching your selected criteria.",
  actionText = "Explore Collection",
  actionLink = "/shop",
  actionOnClick,
  icon: Icon = PackageOpen,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-5">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>

      <h3 className="font-editorial text-2xl font-medium text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        {description}
      </p>

      {actionOnClick ? (
        <Button onClick={actionOnClick} variant="primary">
          {actionText}
        </Button>
      ) : actionLink ? (
        <Link to={actionLink}>
          <Button variant="primary">{actionText}</Button>
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
