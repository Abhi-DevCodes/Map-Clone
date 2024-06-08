import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.status == 201) {
      if (data.isverified) {
        const showToastMessage = () => {
          toast.success("Login Successful!", {
            position: "bottom-center",
            autoClose: 2000,
            pauseOnHover: true,
          });
        };
        showToastMessage();
        navigate("/map");
      } else {
        navigate("/verify");
      }
    }

    if (res.status == 404) {
      const showToastMessage = () => {
        toast.warning("User not registered", {
          position: "bottom-center",
          autoClose: 2000,
          pauseOnHover: true,
        });
      };
      showToastMessage();
    } else if (res.status == 401) {
      const showToastMessage = () => {
        toast.warning("Invalid Password", {
          position: "bottom-center",
          autoClose: 2000,
          pauseOnHover: true,
        });
      };
      showToastMessage();
    } else {
      {
        const showToastMessage = () => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 2000,
            pauseOnHover: true,
          });
        };
        showToastMessage();
      }
    }

    //console.log(data);
  };

  return (
    <div>
      <Header />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold text-gray-900 my-7">
          Sign In
        </h1>
        <form
          id="signinform"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="email"
            placeholder="enter email"
            id="email"
            required
            onChange={handleChange}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="password"
            placeholder="enter password"
            id="password"
            required
            onChange={handleChange}
          />
          <button className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign In
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Not registered yet?</p>
          <Link to="/signUp">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
