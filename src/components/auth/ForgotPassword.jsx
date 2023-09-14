import "./Login.css";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <>
      <main>
        <section>
          <div className="container-side-space  m-login">
            <div className="signup-form ptb-5">
              <div className="heading text-center pb-4">
                <h3 className="border-0">Reset your password? </h3>
                <p>
                  We'll send you a message / email to help you reset your
                  password.
                </p>
              </div>

              <div className="col-lg-6 col-md-8 col-sm-12 m-auto bg-gary">
                <div className="form-layer-bg">
                  <form action="#">
                    <div className="form-group">
                      <label htmlFor="email">Type Your Email :</label>
                      <input
                        type="email"
                        className="form-control-login"
                        id="email"
                      />
                    </div>

                    <div className="text-center pt-2">
                      <p className="login-text pt-1">
                        <Link className="ancher-text" to="/admin">
                          Back to Login...
                        </Link>
                      </p>
                      <br />
                      <button type="submit" className="btn btn-theme">
                        Continue{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotPasswordForm;
