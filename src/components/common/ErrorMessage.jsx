import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button.jsx";

export function ErrorMessage({ message = "Unable to complete request", onRetry, details }) {
  return (
    <div className="rounded-sm border border-rose-200 bg-rose-50/70 p-6 my-4 text-center max-w-lg mx-auto">
      <div className="flex justify-center mb-3 text-rose-500">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h4 className="text-sm font-semibold text-rose-900 tracking-wide mb-1">
        Communication Error
      </h4>
      <p className="text-xs text-rose-700 leading-relaxed mb-4">{message}</p>

      {details && Array.isArray(details) && details.length > 0 && (
        <ul className="text-xs text-left bg-white/70 p-3 rounded mb-4 text-rose-600 list-disc list-inside">
          {details.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}

      {onRetry && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            icon={RefreshCw}
            className="border-rose-300 text-rose-900 hover:bg-rose-100 hover:border-rose-400"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
