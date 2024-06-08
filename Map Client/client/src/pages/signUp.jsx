import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    //add and update ids and data into JSOn file called formData
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //fetch data to server and handle responses
    e.preventDefault();
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    //const data = await res.json();
    if (res.status == 201) {
      const showToastMessage = () => {
        toast.success("Registration Successful!", {
          position: "bottom-center",
          autoClose: 2000,
          pauseOnHover: true,
        });
      };
      showToastMessage();
      navigate("/verify");
    } else if (res.status == 401) {
      const showToastMessage = () => {
        toast.warning("Already Registered. Please login.", {
          position: "bottom-center",
          autoClose: 2000,
          pauseOnHover: true,
        });
      };
      showToastMessage();
    } else if (res.status == 400) {
      const showToastMessage = () => {
        toast.warning("password and confirm password must be same.", {
          position: "bottom-center",
          autoClose: 2000,
          pauseOnHover: true,
        });
      };
      showToastMessage();
    } else {
      const showToastMessage = () => {
        toast.error("Something went wrong", {
          position: "bottom-center",
          autoClose: 2000,
          pauseOnHover: true,
        });
      };
      showToastMessage();
    }
    //console.log(data);
  };
  //console.log(formData);
  return (
    <div>
      <Header />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold text-gray-900 my-7">
          Sign Up
        </h1>
        <form
          id="signupform"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="text"
            placeholder="username"
            id="username"
            required
            onChange={handleChange}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="email"
            placeholder="email id"
            id="email"
            required
            onChange={handleChange}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="password"
            placeholder="enter password"
            id="pass"
            required
            onChange={handleChange}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="password"
            placeholder="confirm password"
            id="cnfpass"
            required
            onChange={handleChange}
          />
          <button className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/signIn">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
