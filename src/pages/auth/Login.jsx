import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm.jsx";

export function Login() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-editorial text-2xl font-medium text-slate-900">
          Client Authentication
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Sign in to access your personal allocations and order history.
        </p>
      </div>

      <LoginForm />

      <div className="text-center pt-2 text-xs text-slate-500">
        New to ClickLanka?{" "}
        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
