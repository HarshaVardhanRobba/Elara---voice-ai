"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeView() {
  return (
    <main className="relative overflow-hidden bg-[#050b08] text-white">

      {/* Neon Glow Layers */}
      <div className="absolute -top-60 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[200px] pointer-events-none" />
      <div className="absolute top-[40%] -right-40 h-[700px] w-[700px] rounded-full bg-lime-400/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-green-500/10 blur-[160px] pointer-events-none" />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center bg-gradient-to-b from-[#061a14] via-[#071f18] to-[#050b08]">
        <div className="max-w-5xl space-y-10">

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent">
              Meetings that think.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl text-emerald-200/70 max-w-2xl mx-auto"
          >
            Real-time AI agents that join your calls, understand context,
            and generate structured summaries automatically.
          </motion.p>

          <div className="flex justify-center gap-6 pt-6">

            <Link
              href="/sign-up"
              className="rounded-xl bg-emerald-400 px-8 py-4 text-black font-semibold shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-emerald-300 transition"
            >
              Get Started
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-emerald-400/30 px-8 py-4 font-medium text-emerald-200 hover:bg-emerald-500/10 transition"
            >
              View Demo
            </Link>

          </div>
        </div>
      </section>

      {/* LIVE PREVIEW */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-20">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-emerald-300">
              Real-time AI participation
            </h2>
            <p className="text-emerald-200/60 max-w-2xl mx-auto">
              Elara joins your call, listens, understands context,
              and responds instantly using streaming GPT models.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-400/20 bg-[#0b1a14] p-10 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <div className="aspect-video bg-[#07140f] rounded-2xl flex items-center justify-center text-emerald-300/50 text-lg border border-emerald-400/10">
              AI Live Call Preview
            </div>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-6 bg-[#06130f]">
        <div className="max-w-5xl mx-auto space-y-20">

          <h2 className="text-4xl sm:text-5xl font-semibold text-center text-emerald-300">
            How it works
          </h2>

          {[
            "Create a meeting with your AI agent",
            "Agent joins your call in real-time",
            "Transcript processed & summarized automatically",
            "Continue conversation post-call with full memory"
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-emerald-400/10 bg-[#0b1a14] p-10 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
            >
              <p className="text-xl font-medium text-emerald-200">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURE BLOCKS */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-40">

          <FeatureBlock
            title="Durable event orchestration"
            description="Inngest ensures transcript processing never fails, even during infrastructure outages."
          />

          <FeatureBlock
            title="Persistent memory"
            description="Meeting summaries and chat history remain context-aware across sessions."
          />

          <FeatureBlock
            title="Multi-tenant isolation"
            description="Secure user-level isolation with strict session-based filtering."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-t from-[#061a14] to-transparent">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-emerald-300">
            Start building intelligent meetings
          </h2>

          <Link
            href="/sign-up"
            className="inline-block rounded-2xl bg-emerald-400 px-10 py-5 text-lg text-black font-semibold shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:bg-emerald-300 transition"
          >
            Launch Elara
          </Link>
        </div>
      </section>

    </main>
  );
}

function FeatureBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-16 items-center"
    >
      <div className="aspect-square rounded-3xl bg-[#0b1a14] border border-emerald-400/10 shadow-[0_0_35px_rgba(16,185,129,0.15)]" />

      <div className="space-y-6">
        <h3 className="text-3xl sm:text-4xl font-semibold text-emerald-300">
          {title}
        </h3>
        <p className="text-lg text-emerald-200/70">
          {description}
        </p>
      </div>
    </motion.div>
  );
}