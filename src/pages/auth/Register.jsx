import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm.jsx";

export function Register() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-editorial text-2xl font-medium text-slate-900">
          Join ClickLanka
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Create an account to track orders and receive exclusive promotional offers.
        </p>
      </div>

      <RegisterForm />

      <div className="text-center pt-2 text-xs text-slate-500">
        Already hold a client profile?{" "}
        <Link to="/login" className="font-semibold text-navy-900 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
