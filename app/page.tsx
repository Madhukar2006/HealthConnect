"use client";

import { useState } from "react";

const services = [
  {
    icon: "🩺",
    title: "Find a Doctor",
    description: "Discover healthcare professionals for your needs.",
  },
  {
    icon: "📅",
    title: "Easy Appointments",
    description: "Plan and manage your appointments in one place.",
  },
  {
    icon: "📋",
    title: "Health Records",
    description: "Keep your medical information organized securely.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              ✚
            </span>
            <span className="text-xl font-bold tracking-tight">
              Health<span className="text-blue-600">Connect</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>

          <a
            href="#services"
            className="hidden rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 md:inline-flex"
          >
            Explore services
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-lg border border-slate-200 px-3 py-2 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 text-sm md:hidden">
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
        )}
      </header>

      <section className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              A simpler healthcare experience
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Your health.
              <br />
              Your care.
              <br />
              <span className="text-blue-600">Connected.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Discover doctors, manage appointments, and keep your health
              information organized with one simple platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#services"
                className="rounded-full bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore healthcare →
              </a>
              <a
                href="#about"
                className="rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-300"
              >
                Learn more
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                ✓
              </span>
              Designed with accessibility and privacy in mind
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-cyan-200/50 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-blue-900/10 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Your health dashboard</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Welcome to better care
                  </h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  🏥
                </span>
              </div>

              <div className="mt-7 rounded-2xl bg-blue-600 p-6 text-white">
                <p className="text-sm text-blue-100">Healthcare, simplified</p>
                <p className="mt-2 text-2xl font-bold">Care starts here.</p>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Explore services and take the next step in organizing your care.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-100 p-4">
                  <span className="text-2xl">👨‍⚕️</span>
                  <p className="mt-3 font-semibold">Doctors</p>
                  <p className="mt-1 text-xs text-slate-500">Explore profiles</p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <span className="text-2xl">🗓️</span>
                  <p className="mt-3 font-semibold">Appointments</p>
                  <p className="mt-1 text-xs text-slate-500">Plan your visits</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Privacy matters
                  </p>
                  <p className="mt-1 text-xs text-emerald-800">
                    Your trust comes first.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Illustrative preview · Not a live medical dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Our services
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Healthcare, all in one place
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            A clear, accessible starting point for managing your healthcare journey.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                {service.icon}
              </span>
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {service.description}
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex font-semibold text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Why HealthConnect
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Better organization for your healthcare journey.
            </h2>
          </div>
          <div className="space-y-5 text-slate-600">
            <p className="leading-8">
              HealthConnect aims to bring essential healthcare tools into a
              clear and approachable digital experience.
            </p>
            <p className="leading-8">
              We are building this platform incrementally, with usability,
              accessibility, and responsible handling of health information
              as core principles.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-blue-600 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            Be part of better healthcare
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
            Follow the project as we build and improve HealthConnect.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubscribed(false);
              }}
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-full border border-white/30 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              Join us
            </button>
          </form>

          {subscribed && (
            <p role="status" className="mt-4 text-sm text-white">
              Thanks for your interest! This demo does not store or send your email.
            </p>
          )}
        </div>
      </section>

      <footer className="border-t border-slate-100 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-bold text-slate-900">
            Health<span className="text-blue-600">Connect</span>
          </p>
          <p className="text-sm text-slate-500">
            An open-source healthcare project built with care.
          </p>
          <a
            href="https://github.com/Madhukar2006/HealthConnect"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </main>
  );
}