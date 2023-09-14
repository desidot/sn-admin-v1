import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const res = await fetch("https://api.shop.urips.co.in/api/admin/login"
      const res = await fetch(`${APIBASE}admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const mylogins = await res.json();

      if (
        res.status === 200 &&
        mylogins.message === "User logged in successfully."
      ) {
        setError("");
        localStorage.setItem(
          "user",
          JSON.stringify({ token: mylogins._token, user: mylogins.data })
          // JSON.stringify(mylogins)
        );

        navigate("dashboard");
      } else if (res.status === 401) {
        setError("Something went's wrong. Please try again later.");
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section>
      <div className="container-side-space m-login">
        <div className="signup-form ptb-5">
          <div className="heading text-center pb-4">
            <h3 className="border-0">Log In</h3>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-12 m-auto bg-gary">
            <div className="form-layer-bg">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control-login"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    type="password"
                    className="form-control-login"
                    id="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="btn btn-theme"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <p className="login-text pt-1">
                <Link
                  className="ancher-text"
                  to="/admin/adminpanel/forgot-password"
                >
                  Forget Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
