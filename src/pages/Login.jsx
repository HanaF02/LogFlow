import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

// Yup schema — define all the rules for each field
// Formik will automatically run this on every submit and on every field change
const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { login } = useAuth(); // get login function from global auth context
  const navigate = useNavigate(); // lets us redirect after successful login
  const [serverError, setServerError] = useState(null); // errors that come back from the backend

  const formik = useFormik({
    initialValues: { email: "", password: "" }, // starting values for each field

    validationSchema: schema, // attach the Yup schema — Formik runs this automatically

    onSubmit: async (values, { setSubmitting }) => {
      // values = { email, password } — whatever the user typed
      // setSubmitting = Formik's built-in way to control the loading state
      setServerError(null);
      try {
        await login(values); // call backend via AuthContext
        navigate("/applications"); // redirect on success
      } catch (err) {
        // err.response.data.message is what your backend sends back
        setServerError(err.response?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false); // re-enable the submit button
      }
    },
  });

  // helper that returns the right border color based on whether the field
  // has been touched (user clicked into it) and has a validation error
  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400" // red border if touched + error
        : "border-slate-200" // normal border otherwise
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-violet-600">LogFlow</h1>
          <p className="text-slate-500 mt-1 text-sm">Sign in to your account</p>
        </div>

        {/* Server error — only shows when backend returns an error */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {serverError}
          </div>
        )}

        {/* formik.handleSubmit runs Yup validation first, then calls onSubmit if valid */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              // getFieldProps gives value, onChange, onBlur all in one spread
              // onBlur is what marks the field as "touched" when user leaves it
              {...formik.getFieldProps("email")}
              className={inputClass("email")}
              placeholder="you@example.com"
            />
            {/* only show error after user has interacted with this field */}
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
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting} // true while onSubmit is running
            className="hoverable w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
