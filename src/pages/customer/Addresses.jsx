import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import authService from "../../services/authService.js";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Modal from "../../components/common/Modal.jsx";

export function Addresses() {
  const { user, refreshUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "Residence",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addresses = user?.addresses || [];

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.addAddress(formData);
      await refreshUser();
      setIsModalOpen(false);
      setFormData({
        title: "Residence",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "United States",
        phone: "",
        isDefault: false,
      });
    } catch (err) {
      setError(err.message || "Failed to save address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await authService.deleteAddress(addressId);
      await refreshUser();
    } catch (err) {
      alert("Failed to remove address: " + err.message);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-subtle space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-editorial text-xl font-medium text-slate-900">
            Address Sanctuary
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Registered coordinates for insured white-glove consignment delivery.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          icon={Plus}
        >
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="p-8 border border-dashed border-slate-200 rounded text-center text-xs text-slate-400">
          No addresses currently saved. Add your primary residence or office coordinates.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="border border-slate-200 rounded-sm p-5 relative hover:border-slate-300 transition-colors space-y-2 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-900 uppercase tracking-wider">
                  {addr.title}
                </span>
                <button
                  onClick={() => handleDeleteAddress(addr._id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  aria-label="Delete address"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-slate-800">{addr.street}</p>
              <p className="text-slate-600">
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p className="text-slate-500">{addr.country}</p>
              {addr.phone && <p className="text-slate-400 pt-1">Tel: {addr.phone}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Delivery Coordinates"
      >
        <form onSubmit={handleAddAddress} className="space-y-4">
          {error && <p className="text-xs text-rose-500">{error}</p>}

          <Input
            label="Location Label"
            name="title"
            placeholder="Primary Residence, Penthouse, etc."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Street Address & Apt/Suite"
            name="street"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="State / Province"
              name="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              required
            />
            <Input
              label="Contact Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full uppercase tracking-wider text-xs"
            >
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Addresses;
