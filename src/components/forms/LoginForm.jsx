import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { isValidEmail } from "../../utils/validators.js";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    try {
      const user = await login(formData.email, formData.password);
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setGeneralError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {generalError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
          {generalError}
        </div>
      )}

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="yourname@domain.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={Mail}
        required
      />

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Password <span className="text-rose-500">*</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-xs text-blue-600 hover:text-navy-900 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full uppercase tracking-widest text-xs font-semibold py-3"
        isLoading={isLoading}
        icon={ArrowRight}
        iconPosition="right"
      >
        Sign In
      </Button>

      {/* Demo Credentials Quick-Fill helper */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500 mb-2">Portfolio Demo Accounts:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setFormData({ email: "admin@clicklanka.com", password: "AdminPassword123!" })}
            className="text-[11px] px-2.5 py-1 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-medium rounded transition-colors"
          >
            Fill Admin Credentials
          </button>
          <button
            type="button"
            onClick={() => setFormData({ email: "customer@clicklanka.com", password: "CustomerPassword123!" })}
            className="text-[11px] px-2.5 py-1 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 font-medium rounded transition-colors"
          >
            Fill Customer Credentials
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
