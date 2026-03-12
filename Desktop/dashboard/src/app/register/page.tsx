"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

const router = useRouter();

const [form, setForm] = useState({
name: "",
email: "",
password: "",
});

const [loading, setLoading] = useState(false);

const handleRegister = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);


const res = await fetch("/api/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

const data = await res.json();
setLoading(false);

if (res.ok) {
  alert("User registered successfully");
  router.push("/login");
} else {
  alert(data.message);
}


};

return ( <div className="flex items-center justify-center min-h-screen bg-gray-100">

```
  <form
    onSubmit={handleRegister}
    className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
  >

    <h2 className="text-2xl font-bold text-center mb-6">
      Create Account
    </h2>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        Name
      </label>

      <input
        type="text"
        placeholder="Enter your name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        Email
      </label>

      <input
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">
        Password
      </label>

      <input
        type="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    >
      {loading ? "Registering..." : "Register"}
    </button>

    <p className="text-sm text-center mt-4">
      Already have an account?{" "}
      <a href="/login" className="text-blue-600 font-medium">
        Login
      </a>
    </p>

  </form>

</div>


);
}
