import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { isValidEmail, isValidPassword } from "../../utils/validators.js";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/account");
    } catch (err) {
      setGeneralError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {generalError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
          {generalError}
        </div>
      )}

      <Input
        label="Full Name"
        name="name"
        placeholder="Lady Eleanor Vance"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        icon={User}
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="eleanor@domain.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={Mail}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="At least 6 characters"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        icon={Lock}
        required
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Repeat password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        icon={Lock}
        required
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full uppercase tracking-widest text-xs font-semibold py-3"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Create ClickLanka Account
        </Button>
      </div>

      <p className="text-[11px] text-center text-slate-400">
        By creating an account, you agree to our Terms of Service & Privacy Policy.
      </p>
    </form>
  );
}

export default RegisterForm;
