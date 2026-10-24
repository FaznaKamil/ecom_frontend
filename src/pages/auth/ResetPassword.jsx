import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Lock, CheckCircle2, ArrowRight } from "lucide-react";
import authService from "../../services/authService.js";
import { isValidPassword } from "../../utils/validators.js";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("No valid reset authorization token found in URL parameters");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.resetPassword(token, password);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password. Token may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-editorial text-2xl font-medium text-slate-900">
          Set New Password
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Create a secure password for your ClickLanka account.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed font-medium">
            Your client credentials have been updated securely.
          </p>
          <div className="pt-2">
            <Link to="/login">
              <Button variant="primary" size="md" className="w-full">
                Proceed to Sign In
              </Button>
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
            label="New Password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full uppercase tracking-widest text-xs font-semibold py-3"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Update Credentials
          </Button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
