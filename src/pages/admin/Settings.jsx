import { useState, useEffect } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import contactService from "../../services/contactService.js";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Loader from "../../components/common/Loader.jsx";

export function Settings() {
  const [settings, setSettings] = useState({
    storeName: "",
    supportEmail: "",
    phone: "",
    address: "",
    currency: "USD",
    taxRate: 8,
    freeShippingThreshold: 500,
    flatShippingRate: 25,
    operatingHours: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const res = await contactService.getSettings();
        if (res?.data) setSettings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      await contactService.updateSettings(settings);
      setMessage("Atelier configuration and fiscal parameters updated successfully.");
    } catch (err) {
      alert("Failed to update settings: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loader fullScreen text="Loading boutique parameters..." />;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Store & Fiscal Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Customize contact details, currency, taxation rates, and shipping policies.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="space-y-4">
          <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Store Identity & Contact Coordinates
          </h3>

          <Input
            label="Boutique Enterprise Name"
            name="storeName"
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Concierge Email"
              name="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              required
            />
            <Input
              label="Advisory Telephone"
              name="phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              required
            />
          </div>

          <Input
            label="Maison Physical Coordinates"
            name="address"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            required
          />

          <Input
            label="Operating Hours"
            name="operatingHours"
            value={settings.operatingHours}
            onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Taxation & Logistics Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Sales Tax Rate (%)"
              name="taxRate"
              type="number"
              min="0"
              max="50"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
              required
            />
            <Input
              label="Complimentary Shipping ($)"
              name="freeShippingThreshold"
              type="number"
              min="0"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
              required
            />
            <Input
              label="Standard Shipping Fee ($)"
              name="flatShippingRate"
              type="number"
              min="0"
              value={settings.flatShippingRate}
              onChange={(e) => setSettings({ ...settings, flatShippingRate: Number(e.target.value) })}
              required
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            icon={Save}
          >
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
