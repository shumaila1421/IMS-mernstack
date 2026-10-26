import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700"
    >
      <ArrowLeft size={18} />
      Back to Dashboard
    </button>
  );
}
