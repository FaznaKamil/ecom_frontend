import { useState, useEffect } from "react";
import contactService from "../../services/contactService.js";
import { formatDateTime } from "../../utils/formatDate.js";
import DataTable from "../../components/admin/DataTable.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";

export function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyNotes, setReplyNotes] = useState("");
  const [status, setStatus] = useState("read");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await contactService.getMessages();
      if (res?.data) setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessageModal = (msg) => {
    setSelectedMessage(msg);
    setStatus(msg.status || "read");
    setReplyNotes(msg.replyNotes || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedMessage) return;
    setIsUpdating(true);

    try {
      await contactService.updateMessageStatus(selectedMessage._id, {
        status,
        replyNotes,
      });
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      alert("Failed to update message: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      header: "Inquirer",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.name}</p>
          <p className="text-[11px] text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Subject & Excerpt",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 line-clamp-1">{row.subject}</p>
          <p className="text-[11px] text-slate-500 line-clamp-1">{row.message}</p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
            row.status === "unread"
              ? "bg-rose-50 text-rose-700"
              : row.status === "replied"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Timestamp",
      render: (row) => <span className="text-slate-500">{formatDateTime(row.createdAt)}</span>,
    },
    {
      header: "Action",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={() => openMessageModal(row)}
          className="text-xs text-blue-600 hover:underline font-semibold"
        >
          Inspect
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Concierge Inquiries
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Inbound client transmissions, bespoke commissions, and advisory communications.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        isLoading={isLoading}
        totalRecords={messages.length}
      />

      {/* Message View Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="Concierge Inquiry Dossier"
      >
        {selectedMessage && (
          <form onSubmit={handleUpdate} className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">From</span>
                <span className="font-semibold text-slate-900">
                  {selectedMessage.name} ({selectedMessage.email})
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Subject</span>
                <span className="font-semibold text-slate-900">{selectedMessage.subject}</span>
              </div>
              <div className="pt-1">
                <p className="text-slate-500 font-semibold mb-1">Message Content:</p>
                <p className="text-slate-800 leading-relaxed bg-white p-3 rounded border border-slate-100">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-700 block mb-1">
                Advisory Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
              >
                <option value="unread">Unread</option>
                <option value="read">Read / In Review</option>
                <option value="replied">Replied via Concierge</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-700">
                Internal Concierge Notes
              </label>
              <textarea
                rows={2}
                placeholder="Log internal follow-up notes or response status..."
                value={replyNotes}
                onChange={(e) => setReplyNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="secondary" size="md" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
              <Button type="submit" variant="primary" size="md" isLoading={isUpdating}>
                Update Inquiry
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default Messages;
