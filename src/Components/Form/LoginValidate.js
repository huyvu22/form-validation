import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class LoginValidate extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: "",
        password: "",
      },
      errors: {
        emailError: {
          required: "",
          format: "",
        },
        passwordError: {
          required: "",
          strength: "",
        },
      },
    };
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword = (password) => {
    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pass.test(password);
  };

  resetLogin = () => {
    this.setState({
      form: {
        email: "",
        password: "",
      },
      errors: {
        emailError: {
          required: "",
          format: "",
        },
        passwordError: {
          required: "",
          strength: "",
        },
      },
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    const errors = {
      emailError: {
        required: "Bắt buộc phải nhập",
        format: "Email không đúng định dạng",
      },
      passwordError: {
        required: "Bắt buộc phải nhập",
        strength: "Mật khẩu yếu",
      },
    };

    this.setState({
      errors: errors,
    });

    const { email, password } = this.state.form;

    let isValiPassword = this.validatePassword(password);
    let isValiEmail = this.validateEmail(email);

    if (isValiEmail && isValiPassword) {
      toast.success("Login success");
      this.resetLogin()
      return;
    }

    if (!isValiEmail && !isValiPassword) {
      toast.error("Please choose a Email and Password");
      return;
    }

    if (!isValiEmail) {
      toast.error("Please choose a Email");
      return;
    }

    if (!isValiPassword) {
      toast.error("Please choose a Password");
      return;
    }

  };

  handleChangeValue = (e) => {
    const data = { ...this.state.form };
    data[e.target.name] = e.target.value;
    this.setState({
      form: data,
    });

  };

  render() {
    const { email, password } = this.state.form;
    const { emailError, passwordError } = this.state.errors;
    return (
      <>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-7">
              <h2>Login</h2>
              <form onSubmit={(e) => this.handleSubmitForm(e)}>
                <div className="mb-3">
                  <label htmlFor="lbl_email">Email</label>
                  <input
                    type="text"
                    id="lbl_email"
                    value={email}
                    className={`form-control ${(emailError.required && !email) || (!this.validateEmail(email) && email) ? "is-invalid" : ''}`}
                    placeholder="Email..."
                    name="email"
                    onChange={(e) => this.handleChangeValue(e)}
                  />
                  {!email && emailError.required && (
                    <div className="invalid-feedback">
                      {emailError.required}
                    </div>
                  )}

                  {email && !this.validateEmail(email) &&
                    <div className="invalid-feedback">
                      {emailError.format}
                    </div>
                  }
                </div>

                <div className="mb-3">
                  <label htmlFor="lbl_password">Password</label>
                  <input
                    type="text"
                    id="lbl_password"
                    value={password}
                    className={`form-control ${(passwordError.required && !password) || (!this.validatePassword(password) && password) ? "is-invalid" : ''}`}
                    placeholder="Password..."
                    name="password"
                    onChange={(e) => this.handleChangeValue(e)}
                  />
                  {!password && passwordError.required && (
                    <div className="invalid-feedback">
                      {passwordError.required}
                    </div>
                  )}

                  {password && !this.validatePassword(password) &&

                    <div className="invalid-feedback">
                      {passwordError.strength}
                    </div>
                  }
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}

export default LoginValidate;
