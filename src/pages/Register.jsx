import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

// Yup schema — all three fields with their rules
// .matches() takes a regex and an error message
const schema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Letters, numbers and underscores only")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const { register } = useAuth(); // get register function from global auth context
  const navigate = useNavigate(); // redirect after successful registration
  const [serverError, setServerError] = useState(null); // errors coming back from the backend

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" }, // all three fields start empty

    validationSchema: schema, // Formik runs this automatically before every submit

    onSubmit: async (values, { setSubmitting }) => {
      // values = { username, email, password }
      setServerError(null);
      try {
        await register(values); // call backend via AuthContext
        navigate("/applications"); // redirect on success
      } catch (err) {
        // show whatever error message the backend returned
        setServerError(err.response?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false); // re-enable button whether it succeeded or failed
      }
    },
  });

  // reusable helper — returns red border if field has been touched and has an error
  // otherwise returns normal border
  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400"
        : "border-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-violet-600">LogFlow</h1>
          <p className="text-slate-500 mt-1 text-sm">Create your account</p>
        </div>

        {/* Server error — only visible when backend returns an error message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {serverError}
          </div>
        )}

        {/* formik.handleSubmit validates first, then calls onSubmit if everything passes */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              // getFieldProps spreads value, onChange, onBlur onto the input
              {...formik.getFieldProps("username")}
              className={inputClass("username")}
              placeholder="yourname"
            />
            {/* touched = user clicked into and out of this field at least once */}
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
              className={inputClass("email")}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              className={inputClass("password")}
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
            {/* hint shown below password field regardless of validation state */}
            <p className="text-xs text-slate-400 mt-1">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting} // prevents double submit while request is in flight
            className="hoverable w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {formik.isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
