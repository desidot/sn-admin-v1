import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { APIBASE } from "../../components/auth/apiConfig";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [showTab, setShowTab] = useState(1);

  const [isWrong, setIsWrong] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpInput, setOtpInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function generateOTP() {
    const digits = "0123456789";
    let otp = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits?.length);
      otp += digits[randomIndex];
    }
    return otp;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem("otp");
    const otpp = generateOTP();
    const payload = { otp: otpp, email: email };
    try {
      await axios.post(`${APIBASE}admin/send-otp-mail`, payload);
      sessionStorage.setItem("otp", JSON.stringify(otpp));
      toast.success("Otp sent successfully");
      setShowTab(2);
    } catch (error) {
      // console.log(error);
      toast.error("Error!");
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const handleInputChange = (event) => {
    const val = event.target.value;
    if (val?.trim() !== "" && val?.length >= 4) {
      setEmail(val);
    } else {
      setEmail(val);
      // Clear searchResults when searchQuery is empty
    }
    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  const handleInput = debounce(handleInputChange, 1000);
  useEffect(() => {
    if (validateEmail(email)) {
      checkUser(email);
    }
  }, [email]);
  const checkUser = async (val) => {
    setIsChecking(true);
    try {
      const res = await axios.get(`${APIBASE}admin/check-email/${val}`);
      setIsChecking(false);
      setIsWrong(false);
      setIsRight(true);
    } catch (error) {
      // console.log(error);
      setIsWrong(true);
      setIsRight(false);
      setIsChecking(false);
    }
  };

  function validateEmail(email) {
    // Get the input value
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Test the input against the pattern
    if (emailPattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (email == "") {
      setIsRight(false);
      setIsWrong(false);
      setIsChecking(false);
    }
  }, [email]);

  const otpChange = (event) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue) && newValue?.length <= 4) {
      setOtpInput(newValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter up to 4 numbers only.");
      setOtpInput(newValue.substring(0, 4));
    }
  };

  const handleVerifyClick = () => {
    const savedOtp = JSON.parse(sessionStorage.getItem("otp"));
    if (otpInput == savedOtp) {
      toast.success("OTP verified");
      setShowTab(3);
    } else {
      toast.error("OTP not verified!");
    }
  };
  const handleResendClick = async () => {
    sessionStorage.removeItem("otp");
    const otpp = generateOTP();
    const payload = { otp: otpp, email: email };
    try {
      await axios.post(`${APIBASE}admin/send-otp-mail`, payload);
      sessionStorage.setItem("otp", JSON.stringify(otpp));
      toast.success("Otp resent successfully");
      setShowTab(2);
    } catch (error) {
      // console.log(error);
      toast.error("Error!");
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    const payload = { password: newPassword, email: email };
    try {
      await axios.put(`${APIBASE}admin/update-password`, payload);
      toast.success("Password updated successfully.");
      navigate("/admin");
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <>
      <main>
        {showTab == 1 && (
          <section>
            <div className="container-side-space  m-login">
              <div className="signup-form ptb-5">
                <div className="col-lg-6 col-md-8 col-sm-12 m-auto bg-gary">
                  <div className="form-layer-bg">
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: "32px",
                        padding: "20px 0px",
                      }}
                    >
                      <h1>Reset Your Password</h1>
                      <p style={{ fontSize: "18px" }}>
                        we'll send you a message to help you reset your
                        password.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control-login"
                          placeholder="Enter Email"
                          id="email"
                          onChange={handleInput}
                        />
                        {isChecking && (
                          <div style={{ marginLeft: "26px" }}>Checking...</div>
                        )}
                        {isWrong && !isChecking && (
                          <div style={{ marginLeft: "26px" }}>
                            {" "}
                            user doesn't exist!
                          </div>
                        )}
                        {!validateEmail(email) && email?.length > 5 && (
                          <label style={{ color: "red", marginLeft: "26px" }}>
                            Invalid email address!
                          </label>
                        )}
                      </div>

                      <div className="text-center pt-2">
                        <br />
                        <button
                          type="submit"
                          disabled={isWrong || !validateEmail(email)}
                          className="btn btn-theme"
                        >
                          Continue{" "}
                        </button>
                      </div>
                    </form>
                    <p className="login-text pt-1">
                      <Link
                        className="anche-text"
                        style={{ textDecoration: "none" }}
                        to="/admin"
                      >
                        Back to Login...
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {showTab == 2 && (
          <section>
            <div className="container-side-space  m-login">
              <div className="signup-form ptb-5">
                <div className="col-lg-6 col-md-8 col-sm-12 m-auto bg-gary">
                  <div className="form-layer-bg">
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "500",

                        padding: "20px 0px",
                      }}
                    >
                      <p className="border-0" style={{ fontSize: "22px" }}>
                        Please enter the One-Time Password to verify your
                        account.{" "}
                      </p>
                      <p>
                        A One-Time Password has been sent to{" "}
                        <span style={{ fontWeight: "600" }}>{email}</span>.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="otp"
                          className="form-control-login"
                          placeholder="Enter Otp"
                          id="email"
                          onChange={(e) => otpChange(e)}
                          value={otpInput}
                        />
                        <div style={{ color: "red" }}>{errorMessage}</div>
                      </div>

                      <div className="text-center pt-2">
                        <br />
                        <button
                          type="submit"
                          className="btn btn-theme"
                          disabled={otpInput?.length < 4}
                          onClick={() => handleVerifyClick()}
                        >
                          Verify{" "}
                        </button>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            cursor: "pointer",
                            color: "skyblue",
                            textDecoration: "underline",
                            fontSize: "17px",
                          }}
                          onClick={() => handleResendClick()}
                        >
                          Resend OTP
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {showTab == 3 && (
          <section>
            <div className="container-side-space  m-login">
              <div className="signup-form ptb-5">
                <div className="col-lg-6 col-md-8 col-sm-12 m-auto bg-gary">
                  <div className="form-layer-bg">
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "500",

                        padding: "20px 0px",
                      }}
                    >
                      <p className="border-0" style={{ fontSize: "20px"}}>
                        OTP has been matched please enter your new password.{" "}
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div
                        className="form-group"
                        style={{
                          width: "100%",
                          fontWeight: "500",

                          padding: "20px 20px",
                        }}
                      >
                        <label style={{marginLeft:"20px"}} htmlFor="email">Enter new password :</label>
                        <input
                          type="password"
                          className="form-control-login"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          id="email"
                        />
                        <div style={{marginLeft:"20px" }}>
                          {newPassword?.length < 6 &&
                            "password should have upte 6 characters"}
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <br />
                        <button
                          type="submit"
                          className="btn btn-theme"
                          onClick={(e) => handleChangePass(e)}
                          disabled={newPassword?.length < 6}
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ForgotPasswordForm;
