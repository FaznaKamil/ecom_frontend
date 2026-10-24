import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { User, Mail, Lock, CheckCircle2 } from "lucide-react";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export function AccountOverview() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      await updateProfile(formData);
      setMessage("Your client profile details have been updated successfully.");
      setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
    } catch (err) {
      setError(err.message || "Failed to update profile details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-subtle space-y-6">
      <div>
        <h2 className="font-editorial text-xl font-medium text-slate-900">
          Personal Dossier
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Maintain your personal particulars and security credentials.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          icon={User}
          required
        />

        <Input
          label="Email Coordinate"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={Mail}
          required
        />

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-700">
            Security & Password Update (Optional)
          </p>

          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Required only to set a new password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            icon={Lock}
          />

          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="At least 6 characters"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            icon={Lock}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="uppercase tracking-widest text-xs font-semibold px-6 py-2.5"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default AccountOverview;
