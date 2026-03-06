"use client";


import { useState, useEffect } from "react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [errorMsg, setErrorMsg] = useState("");

  function updateField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <main className="w-full pt-6">
      {/* HERO IMAGE */}
      <div className="w-full h-[220px] md:h-[300px] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Hero banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <h1
  className={`text-6xl md:text-8xl font-extralight tracking-[-0.02em] mb-14 transition-all duration-700 ease-out ${
    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`}
>
  Just say hello!
</h1>

        <p className="text-sm md:text-base text-gray-800 max-w-2xl mx-auto mb-20 leading-relaxed">
          Want to know more about me, tell me about your project or just to say
          hello? Drop me a line and I&apos;ll get back as soon as possible.
        </p>

        {/* FORM */}
        <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 text-left">
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition bg-transparent"
              placeholder="Your name*"
              required
            />
            <input
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition bg-transparent"
              placeholder="Company name"
            />
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition bg-transparent"
              placeholder="Email*"
              type="email"
              required
            />
            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition bg-transparent"
              placeholder="Phone"
            />
            <textarea
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              className="md:col-span-2 w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition bg-transparent resize-none"
              placeholder="Your request*"
              rows={4}
              required
            />
          </div>

          <div className="mt-20 flex justify-start items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-2xl border border-gray-500 px-12 py-4 text-sm text-gray-800 hover:bg-black hover:text-white hover:border-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Submit request"}
            </button>

            {status === "success" && (
              <span className="text-sm text-black">
                Message sent. Thank you!
              </span>
            )}

            {status === "error" && (
              <span className="text-sm text-red-600">{errorMsg}</span>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
