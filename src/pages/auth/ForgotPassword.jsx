import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react";
import authService from "../../services/authService.js";
import { isValidEmail } from "../../utils/validators.js";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await authService.forgotPassword(email);
      setResult(res);
    } catch (err) {
      setError(err.message || "Failed to initiate password recovery");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-editorial text-2xl font-medium text-slate-900">
          Account Recovery
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter your registered client email to generate a secure recovery authorization token.
        </p>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-4 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-xs font-semibold text-emerald-900">
              Recovery Token Generated
            </p>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              {result.message}
            </p>
          </div>

          {result.resetToken && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-3">
              <p className="text-[11px] text-slate-600 font-medium">
                Development Quick Access Link:
              </p>
              <Link
                to={`/reset-password?token=${result.resetToken}`}
                className="block text-center py-2 px-3 bg-navy-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-navy-950"
              >
                Proceed to Reset Password Now
              </Link>
            </div>
          )}

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs text-slate-500 hover:text-slate-900">
              Return to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
              {error}
            </div>
          )}

          <Input
            label="Client Email"
            name="email"
            type="email"
            placeholder="eleanor@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            icon={Mail}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full uppercase tracking-widest text-xs font-semibold py-3"
            isLoading={isLoading}
            icon={KeyRound}
          >
            Generate Recovery Token
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
