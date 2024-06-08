import React from "react";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Verify() {
  const location = useLocation();
  const { yourValue } = location.state || {};
  console.log("Hi" + yourValue);
  const [formData, setFormData] = useState({});
  //const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    /*
    const res = await fetch("/api/user/signin", {
      //toverify otp
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.status == 201) {
      if (data.isverified) {
        navigate("/map");
      } else {
        navigate("/verify", { state: { email: yourValue } });
      }
    }*/
    //console.log("Hi" + yourValue);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold text-gray-900 my-7">
        Enter OTP
      </h1>
      <p>{yourValue}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          placeholder="enter OTP"
          id="otp"
          required
          onChange={handleChange}
        />
        <button className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Submit OTP
        </button>
      </form>
    </div>
  );
}
