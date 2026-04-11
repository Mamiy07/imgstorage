"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

const HighlightedHeroCode = () => (
  <span>
    curl -X <span className="text-[#2563EB]">POST</span>{" "}
    <span className="text-[#E5E5E5]/90">
      https://imgstorage1.vercel.app/api/v1/upload
    </span>{" "}
    \ <br />
    {"  "}-H{" "}
    <span className="text-[#E5E5E5]/90">"x-api-key: tdrive_your_key_here"</span>{" "}
    \ <br />
    {"  "}-F <span className="text-[#E5E5E5]/90">"image=@photo.jpg"</span>
    <br />
    <br />
    <span className="text-[#E5E5E5]/35">// Response</span>
    <br />
    {"{"}
    <br />
    <span className="text-[#E5E5E5]/60"> "success"</span>:{" "}
    <span className="text-[#2563EB]">true</span>,<br />
    <span className="text-[#E5E5E5]/60"> "url"</span>:{" "}
    <span className="text-[#E5E5E5]/90">
      "https://imgstorage1.vercel.app/i/abc123"
    </span>
    ,<br />
    <span className="text-[#E5E5E5]/60"> "id"</span>:{" "}
    <span className="text-[#E5E5E5]/90">"abc123"</span>
    <br />
    {"}"}
  </span>
);

const HighlightedJSON = () => (
  <span>
    <span className="text-[#E5E5E5]/35">// Response</span>
    <br />
    {"{"}
    <br />
    <span className="text-[#E5E5E5]/60"> "success"</span>:{" "}
    <span className="text-[#2563EB]">true</span>,<br />
    <span className="text-[#E5E5E5]/60"> "url"</span>:{" "}
    <span className="text-[#E5E5E5]/90">
      "https://imgstorage1.vercel.app/i/abc123"
    </span>
    ,<br />
    <span className="text-[#E5E5E5]/60"> "id"</span>:{" "}
    <span className="text-[#E5E5E5]/90">"abc123"</span>
    <br />
    {"}"}
  </span>
);

const HighlightedJS = () => (
  <span>
    <span className="text-[#2563EB]">const</span> uploadImage ={" "}
    <span className="text-[#2563EB]">async</span> (file) ={">"} {"{"}
    <br />
    {"  "}
    <span className="text-[#2563EB]">const</span> formData ={" "}
    <span className="text-[#2563EB]">new</span> FormData();
    <br />
    {"  "}formData.append(<span className="text-[#E5E5E5]/90">'image'</span>,
    file);
    <br />
    <br />
    {"  "}
    <span className="text-[#2563EB]">const</span> res ={" "}
    <span className="text-[#2563EB]">await</span> fetch(
    <span className="text-[#E5E5E5]/90">
      'https://imgstorage1.vercel.app/api/v1/upload'
    </span>
    , {"{"}
    <br />
    {"    "}method: <span className="text-[#E5E5E5]/90">'POST'</span>,<br />
    {"    "}headers: {"{"}
    <br />
    {"      "}
    <span className="text-[#E5E5E5]/90">'x-api-key'</span>:{" "}
    <span className="text-[#E5E5E5]/90">'tdrive_your_api_key'</span>
    <br />
    {"    }"},<br />
    {"    "}body: formData
    <br />
    {"  }"});
    <br />
    <br />
    {"  "}
    <span className="text-[#2563EB]">return</span>{" "}
    <span className="text-[#2563EB]">await</span> res.json();
    <br />
    {"}"}
  </span>
);

const HighlightedPython = () => (
  <span>
    <span className="text-[#2563EB]">import</span> requests
    <br />
    <br />
    <span className="text-[#2563EB]">def</span> upload_image(file_path):
    <br />
    {"    "}
    <span className="text-[#2563EB]">with</span> open(file_path,{" "}
    <span className="text-[#E5E5E5]/90">'rb'</span>){" "}
    <span className="text-[#2563EB]">as</span> f:
    <br />
    {"        "}files = {"{"}
    <span className="text-[#E5E5E5]/90">'image'</span>: f{"}"}
    <br />
    {"        "}headers = {"{"}
    <span className="text-[#E5E5E5]/90">'x-api-key'</span>:{" "}
    <span className="text-[#E5E5E5]/90">'tdrive_your_api_key'</span>
    {"}"}
    <br />
    <br />
    {"        "}res = requests.post(
    <br />
    {"            "}
    <span className="text-[#E5E5E5]/90">
      'https://imgstorage1.vercel.app/api/v1/upload'
    </span>
    ,<br />
    {"            "}headers=headers,
    <br />
    {"            "}files=files
    <br />
    {"        "})<br />
    <br />
    {"        "}
    <span className="text-[#2563EB]">return</span> res.json()
  </span>
);

const HighlightedCurl = () => (
  <span>
    curl -X <span className="text-[#2563EB]">POST</span>{" "}
    <span className="text-[#E5E5E5]/90">
      https://imgstorage1.vercel.app/api/v1/upload
    </span>{" "}
    \ <br />
    {"  "}-H{" "}
    <span className="text-[#E5E5E5]/90">"x-api-key: tdrive_your_api_key"</span>{" "}
    \ <br />
    {"  "}-F <span className="text-[#E5E5E5]/90">"image=@photo.jpg"</span>
  </span>
);

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("javascript");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = new Set(prev);
              next.add(entry.target.id);
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "Is it really free?",
      answer:
        "Yes. By utilizing Telegram's infrastructure for storage, we avoid traditional cloud storage costs and pass those savings entirely to developers.",
    },
    {
      question: "How is this free? What's the catch?",
      answer:
        "There is no catch. ImgStorage acts as a thin API layer over Telegram's robust messaging API, which offers free and unlimited file storage. Operating costs for our routing layer are minimal.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support standard web image formats including WebP, JPEG, PNG, and GIF.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "We enforce a strict 4MB limit per file, mirroring Telegram's bot limits for fast and efficient infrastructure usage.",
    },
    {
      question: "Can I use this in production?",
      answer:
        "Yes. We maintain a reliable cache and API distribution layer, but please understand we act as an intermediary infrastructure.",
    },
    {
      question: "How do I get my API key?",
      answer:
        "Sign up via the dashboard using GitHub or your email. You can instantly generate multiple API keys without providing payment details.",
    },
  ];

  const features = [
    {
      title: "Simple REST API",
      desc: "One endpoint to upload. One URL to serve. No complex SDKs or configurations required.",
    },
    {
      title: "Free Forever",
      desc: "Zero storage limits, zero bandwidth fees, and no credit card required at any stage.",
    },
    {
      title: "Instant CDN",
      desc: "Images are served globally through high-speed edge networks and infrastructure.",
    },
    {
      title: "CORS Enabled",
      desc: "Upload and display images directly from any frontend framework with no proxy setup.",
    },
    {
      title: "API Key Auth",
      desc: "Enterprise-grade secure authentication. Provisions multiple scoped keys per account.",
    },
    {
      title: "Open Source",
      desc: "Clone the repo and deploy it to your own server, or use our fully managed hosted version.",
    },
  ];

  return (
    <div
      className={`min-h-screen text-[1.05rem] selection:bg-[#2563EB]/30 selection:text-[#E5E5E5] ${inter.className}`}
      style={{ backgroundColor: "#0A0A0A", color: "#E5E5E5" }}
    >
      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite ease-out;
        }
        @keyframes slowHeroGlow {
          0% { opacity: 0.06; }
          50% { opacity: 0.12; }
          100% { opacity: 0.06; }
        }
        .animate-slow-glow {
          animation: slowHeroGlow 4s infinite ease-in-out;
        }
        .mono-font {
          font-family: ${mono.style.fontFamily}, monospace;
        }
        h2 { font-weight: 700 !important; }
      `}</style>

      {/* 1. NAVBAR */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-[#0A0A0A]/85 backdrop-blur-[12px] border-b border-[#E5E5E5]/10" : "bg-transparent border-b border-transparent"}`}
      >
        <nav className="px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-[#E5E5E5]">
              ImgStorage
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#E5E5E5]/80">
            <Link
              href="#docs"
              className="hover:text-[#E5E5E5] transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/Mamiy07/imgstorage"
              className="hover:text-[#E5E5E5] transition-colors duration-200"
            >
              GitHub
            </Link>
            <span className="text-[#E5E5E5]/40 opacity-70 cursor-not-allowed">
              Free Forever
            </span>
          </div>
          {/* ANIMATION 1: CTA Button Transition */}
          <Link
            href="/login"
            className="bg-[#2563EB] text-[#E5E5E5] px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[#2563EB]/90 transition-colors duration-200 border border-[#2563EB]"
          >
            Get API Key &rarr;
          </Link>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      {/* Ambient animated glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2563EB] rounded-full blur-[120px] pointer-events-none -z-10 animate-slow-glow"></div>

      <section className="max-w-[1200px] mx-auto px-6 pt-[120px] pb-[100px] flex flex-col md:flex-row items-center gap-16 relative">
        <div className="flex-1 w-full text-left">
          <div className="inline-flex items-center gap-2 border border-[#E5E5E5]/20 border-l-[3px] border-l-[#2563EB] rounded-full px-4 py-1.5 text-xs font-medium text-[#E5E5E5]/80 mb-8 bg-[#E5E5E5]/5">
            <span className="text-[#2563EB]">⚡</span> Powered by Telegram
            Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] text-[#E5E5E5] mb-6 leading-[1.1]">
            Image Storage API <br /> for Developers
          </h1>
          <p className="text-lg md:text-xl text-[#E5E5E5]/70 max-w-xl mb-10 leading-[1.8] font-light">
            Upload, store and serve images with a single API call. <br />
            Free forever. No limits. No credit card.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <Link
              href="/login"
              className="bg-[#2563EB] text-[#E5E5E5] px-8 py-3.5 rounded-md font-medium hover:bg-[#2563EB]/90 transition-colors duration-200 border border-[#2563EB]"
            >
              Get Started Free &rarr;
            </Link>
            <Link
              href="#docs"
              className="bg-transparent text-[#E5E5E5] px-8 py-3.5 rounded-md font-medium border border-[#E5E5E5]/30 hover:border-[#E5E5E5]/60 transition-colors duration-200"
            >
              View Docs
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E5E5E5]/10 mono-font text-xs text-[#E5E5E5]/50">
            <div>500+ Developers</div>
            <div className="w-px h-4 bg-[#E5E5E5]/20"></div>
            <div>2M+ Images Served</div>
            <div className="w-px h-4 bg-[#E5E5E5]/20"></div>
            <div>99.9% Uptime</div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg">
          <div className="border border-[#E5E5E5]/10 border-l-[3px] border-l-[#2563EB]/30 rounded-lg p-6 bg-[#0A0A0A] shadow-[0_0_40px_-10px_rgba(229,229,229,0.05)] relative overflow-hidden">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#E5E5E5]/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#E5E5E5]/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#E5E5E5]/20"></div>
            </div>
            <p className="text-[#E5E5E5]/50 text-xs mb-3 mono-font">
              POST /api/v1/upload
            </p>
            <pre className="text-sm mono-font text-[#E5E5E5] overflow-x-auto whitespace-pre-wrap leading-[1.6]">
              <HighlightedHeroCode />
            </pre>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-[1200px] mx-auto px-6 py-[100px] border-t border-[#E5E5E5]/10">
        <div className="mb-16">
          <h2 className="text-3xl tracking-tight mb-4 text-[#E5E5E5]">
            How it works
          </h2>
          <p className="text-[#E5E5E5]/60 text-lg leading-[1.8]">
            Three explicit steps without marketing fluff.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="bg-[#0A0A0A] relative z-10 pr-6">
            <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 border-2 border-[#2563EB]/30 flex items-center justify-center text-xl font-bold mb-4 text-[#E5E5E5]">
              1
            </div>
            <div className="hidden md:block w-16 h-px bg-[#E5E5E5]/10 mb-6"></div>
            <h3 className="text-xl font-semibold mb-3">Sign up autonomously</h3>
            <p className="text-[#E5E5E5]/60 leading-[1.8] font-light">
              Register using GitHub. Our system instantly provisions a secure
              API key bounded to your profile. No manual approval.
            </p>
          </div>

          <div className="bg-[#0A0A0A] relative z-10 pr-6">
            <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 border-2 border-[#2563EB]/30 flex items-center justify-center text-xl font-bold mb-4 text-[#E5E5E5]">
              2
            </div>
            <div className="hidden md:block w-16 h-px bg-[#E5E5E5]/10 mb-6"></div>
            <h3 className="text-xl font-semibold mb-3">Upload your assets</h3>
            <p className="text-[#E5E5E5]/60 leading-[1.8] font-light">
              Execute a POST request attaching your image. The API handles
              compression mapping automatically on insertion.
            </p>
          </div>

          <div className="bg-[#0A0A0A] relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#2563EB] border-2 border-[#2563EB] flex items-center justify-center text-xl font-bold mb-4 text-[#E5E5E5]">
              3
            </div>
            <div className="hidden md:block w-16 h-px bg-[#E5E5E5]/10 mb-6"></div>
            <h3 className="text-xl font-semibold mb-3">Implement the URL</h3>
            <p className="text-[#E5E5E5]/60 leading-[1.8] font-light">
              Consume the returned strict HTTPS URL. Asset delivery is
              automatically configured with proper caching layers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CODE EXAMPLES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[100px] border-t border-[#E5E5E5]/10">
        <h2 className="text-3xl tracking-tight mb-16 text-[#E5E5E5]">
          Code Examples
        </h2>
        <div className="border border-[#E5E5E5]/10 border-l-[3px] border-l-[#2563EB]/30 rounded-lg overflow-hidden flex flex-col md:flex-row bg-[#0A0A0A]">
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E5E5E5]/10 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            {["javascript", "python", "curl"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-left rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === tab ? "bg-[#E5E5E5]/10 text-[#E5E5E5]" : "text-[#E5E5E5]/50 hover:bg-[#E5E5E5]/5"}`}
              >
                {tab === "javascript"
                  ? "JavaScript"
                  : tab === "python"
                    ? "Python"
                    : "cURL"}
              </button>
            ))}
          </div>
          <div className="flex-1 p-6 overflow-x-auto">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#E5E5E5]/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#E5E5E5]/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#E5E5E5]/20"></div>
            </div>
            <pre className="text-sm mono-font text-[#E5E5E5] leading-[1.6]">
              {activeTab === "javascript" && <HighlightedJS />}
              {activeTab === "python" && <HighlightedPython />}
              {activeTab === "curl" && <HighlightedCurl />}
            </pre>
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]/10">
              <p className="text-[#E5E5E5]/50 text-xs mb-3 mono-font">
                Response Payload
              </p>
              <pre className="text-sm mono-font text-[#E5E5E5] leading-[1.6]">
                <HighlightedJSON />
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES GRID */}
      <section className="max-w-[1200px] mx-auto px-6 py-[100px] border-t border-[#E5E5E5]/10">
        <h2 className="text-3xl tracking-tight mb-16 text-[#E5E5E5]">
          Features & Limitations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              id={`feature-${i}`}
              className={`group animate-on-scroll border border-[#E5E5E5]/10 hover:border-[#2563EB]/40 p-8 rounded-lg bg-transparent hover:bg-[#2563EB]/[0.03] duration-200 transition-all ${visibleItems.has(`feature-${i}`) ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#E5E5E5] flex items-center justify-between">
                {feature.title}
                <div className="w-6 h-6 rounded-full bg-[#E5E5E5]/10 group-hover:bg-[#2563EB]/20 border border-[#E5E5E5]/20 transition-colors duration-200 flex items-center justify-center"></div>
              </h3>
              <p className="text-[#E5E5E5]/60 leading-[1.8] font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. API REFERENCE PREVIEW */}
      <section
        id="docs"
        className="max-w-[1200px] mx-auto px-6 py-[100px] border-t border-[#E5E5E5]/10 flex flex-col md:flex-row gap-16"
      >
        <div className="flex-1 md:sticky md:top-[100px] self-start">
          <h2 className="text-3xl tracking-tight mb-6 text-[#E5E5E5]">
            Transparent Documentation
          </h2>
          <p className="text-[#E5E5E5]/60 text-lg mb-8 max-w-md leading-[1.8]">
            Our API surface is intentionally restricted to primary functions.
            Zero excessive wrappers.
          </p>
          <button
            onClick={() => setShowDocs(!showDocs)}
            className="text-[#2563EB] font-medium hover:underline inline-flex items-center gap-1 focus:outline-none"
          >
            {showDocs ? "Hide detailed schemas" : "View detailed schemas"}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showDocs ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {!showDocs ? (
            <>
              <div className="border border-[#E5E5E5]/10 rounded-lg p-5 flex items-center gap-4 bg-[#0A0A0A]">
                <span className="bg-[#2563EB]/10 text-[#2563EB] px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#2563EB]/30">
                  POST
                </span>
                <span className="mono-font text-[#E5E5E5]/90 text-sm">
                  /api/v1/upload
                </span>
                <span className="ml-auto text-[#E5E5E5]/50 text-sm hidden sm:inline">
                  Upload an image
                </span>
              </div>
              <div className="border border-[#E5E5E5]/10 rounded-lg p-5 flex items-center gap-4 bg-[#0A0A0A]">
                <span className="bg-[#E5E5E5]/10 text-[#E5E5E5] px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#E5E5E5]/30">
                  GET
                </span>
                <span className="mono-font text-[#E5E5E5]/90 text-sm">
                  /api/v1/images
                </span>
                <span className="ml-auto text-[#E5E5E5]/50 text-sm hidden sm:inline">
                  List your images
                </span>
              </div>
              <div className="border border-[#E5E5E5]/10 rounded-lg p-5 flex items-center gap-4 bg-[#0A0A0A]">
                <span className="bg-[#E5E5E5]/5 text-[#E5E5E5]/60 px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#E5E5E5]/10">
                  DEL
                </span>
                <span className="mono-font text-[#E5E5E5]/90 text-sm">
                  /api/v1/images/:id
                </span>
                <span className="ml-auto text-[#E5E5E5]/50 text-sm hidden sm:inline">
                  Delete an image
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border border-[#E5E5E5]/10 rounded-lg p-6 bg-[#0A0A0A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#2563EB]/10 text-[#2563EB] px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#2563EB]/30">
                    POST
                  </span>
                  <span className="mono-font text-[#E5E5E5]/90 text-sm">
                    /api/v1/upload
                  </span>
                </div>
                <p className="text-[#E5E5E5]/60 text-sm mb-4 leading-[1.8] font-light">
                  Upload an image. Returns a permanent URL.
                </p>
                <div className="bg-[#E5E5E5]/5 border border-[#E5E5E5]/10 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[13px] mono-font text-[#E5E5E5]/90 leading-[1.6]">
                    {`// Using fetch
const form = new FormData()
form.append('image', file)

const res = await fetch('https://imgstorage1.vercel.app/api/v1/upload', {
  method: 'POST',
  headers: { 'x-api-key': 'your_api_key' },
  body: form
})

const data = await res.json()
// { success: true, url: 'https://imgstorage1.vercel.app/i/abc123', id: 'abc123' }`}
                  </pre>
                </div>
              </div>

              <div className="border border-[#E5E5E5]/10 rounded-lg p-6 bg-[#0A0A0A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#E5E5E5]/10 text-[#E5E5E5] px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#E5E5E5]/30">
                    GET
                  </span>
                  <span className="mono-font text-[#E5E5E5]/90 text-sm">
                    /api/v1/images
                  </span>
                </div>
                <p className="text-[#E5E5E5]/60 text-sm mb-4 leading-[1.8] font-light">
                  List all uploaded images for your API key.
                </p>
                <div className="bg-[#E5E5E5]/5 border border-[#E5E5E5]/10 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[13px] mono-font text-[#E5E5E5]/90 leading-[1.6]">
                    {`const res = await fetch('https://imgstorage1.vercel.app/api/v1/images', {
  headers: { 'x-api-key': 'your_api_key' }
})

const data = await res.json()
// { success: true, count: 5, images: [...] }`}
                  </pre>
                </div>
              </div>

              <div className="border border-[#E5E5E5]/10 rounded-lg p-6 bg-[#0A0A0A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#E5E5E5]/5 text-[#E5E5E5]/60 px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#E5E5E5]/10">
                    DEL
                  </span>
                  <span className="mono-font text-[#E5E5E5]/90 text-sm">
                    /api/v1/images/:id
                  </span>
                </div>
                <p className="text-[#E5E5E5]/60 text-sm mb-4 leading-[1.8] font-light">
                  Delete an image by its ID.
                </p>
                <div className="bg-[#E5E5E5]/5 border border-[#E5E5E5]/10 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[13px] mono-font text-[#E5E5E5]/90 leading-[1.6]">
                    {`const res = await fetch('https://imgstorage1.vercel.app/api/v1/images/abc123', {
  method: 'DELETE',
  headers: { 'x-api-key': 'your_api_key' }
})

// { success: true }`}
                  </pre>
                </div>
              </div>

              <div className="border border-[#E5E5E5]/10 rounded-lg p-6 bg-[#0A0A0A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#E5E5E5]/10 text-[#E5E5E5] px-2 py-1 rounded text-xs mono-font font-bold tracking-widest min-w-[60px] text-center border border-[#E5E5E5]/30">
                    GET
                  </span>
                  <span className="mono-font text-[#E5E5E5]/90 text-sm">
                    /i/:id
                  </span>
                </div>
                <p className="text-[#E5E5E5]/60 text-sm mb-4 leading-[1.8] font-light">
                  Serve an image directly. Use this URL anywhere.
                </p>
                <div className="bg-[#E5E5E5]/5 border border-[#E5E5E5]/10 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[13px] mono-font text-[#E5E5E5]/90 leading-[1.6]">
                    {`<img src="https://imgstorage1.vercel.app/i/abc123" height="400" width="400" alt="..." />

// Works in any framework, any language
// Cached for 1 year via Cache-Control`}
                  </pre>
                </div>
              </div>

              <div className="border border-[#2563EB]/20 rounded-lg p-6 bg-[#2563EB]/5 mt-2 transition-all">
                <h3 className="font-semibold text-[#E5E5E5] mb-3">
                  System Limits
                </h3>
                <ul className="text-sm text-[#E5E5E5]/70 space-y-2 list-disc pl-4 marker:text-[#2563EB]">
                  <li>Max file size: 10MB per image</li>
                  <li>Allowed types: JPG, PNG, GIF, WebP</li>
                  <li>
                    Storage: Unlimited{" "}
                    <span className="text-[#2563EB] text-[10px] px-1.5 py-0.5 rounded bg-[#2563EB]/10 ml-2 uppercase tracking-wide font-bold mono-font border border-[#2563EB]/20">
                      Powered by Telegram
                    </span>
                  </li>
                  <li>Requests: Unlimited</li>
                  <li>Price: Free forever</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. FOUNDER STORY / SOCIAL PROOF SKELETON */}
      <section className="max-w-[1200px] mx-auto px-6 py-[100px] border-t border-[#E5E5E5]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl tracking-tight mb-6 text-[#E5E5E5]">
              Builder's Note
            </h2>
            <p className="text-[#E5E5E5]/70 text-lg mb-6 leading-[1.8] font-light">
              "I routinely found myself setting up complex AWS S3 distributions
              just to host simple assets for hobby software. I realized the
              Telegram Bot API ecosystem provided highly stable infrastructure
              that could be repurposed as a robust CDN."
            </p>
            <p className="text-[#E5E5E5]/70 text-lg leading-[1.8] font-light">
              "ImgStorage is structured exactly how I build my own utilities:
              zero graphical configuration layers, strict API token boundaries,
              and high reliability."
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-[#E5E5E5]/10 pt-8">
              <div className="w-12 h-12 rounded-full bg-[#E5E5E5]/10 border border-[#E5E5E5]/20"></div>
              <div>
                <p className="font-semibold text-[#E5E5E5]">
                  [PLACEHOLDER] Maintainer
                </p>
                <p className="text-[#E5E5E5]/50 text-sm mono-font">
                  Principal Developer
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#E5E5E5]/10 rounded-lg p-8 bg-[#0A0A0A]">
            <h3 className="text-sm font-semibold tracking-wide text-[#E5E5E5]/50 uppercase mb-8 flex relative">
              <span className="absolute -left-4 text-[#2563EB]">●</span> Early
              Pilot Feedback
            </h3>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3 opacity-60">
                <div className="h-3 w-full bg-[#E5E5E5]/10 rounded"></div>
                <div className="h-3 w-4/5 bg-[#E5E5E5]/10 rounded"></div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-6 h-6 rounded-full bg-[#E5E5E5]/10"></div>
                  <div className="h-2 w-24 bg-[#E5E5E5]/10 rounded"></div>
                </div>
              </div>

              <div className="flex flex-col gap-3 opacity-60">
                <div className="h-3 w-11/12 bg-[#E5E5E5]/10 rounded"></div>
                <div className="h-3 w-3/4 bg-[#E5E5E5]/10 rounded"></div>
                <div className="h-3 w-5/6 bg-[#E5E5E5]/10 rounded"></div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-6 h-6 rounded-full bg-[#E5E5E5]/10"></div>
                  <div className="h-2 w-32 bg-[#E5E5E5]/10 rounded"></div>
                </div>
              </div>
              <p className="text-xs text-[#E5E5E5]/40 mt-4 italic mono-font">
                [PLACEHOLDER] Actively evaluating beta telemetry. Testimonials
                will be sourced upon verifying performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="max-w-[800px] mx-auto px-6 py-[100px] border-t border-[#E5E5E5]/10">
        <h2 className="text-3xl tracking-tight mb-12 text-center text-[#E5E5E5]">
          FAQ
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-[#E5E5E5]/10 rounded-lg overflow-hidden bg-[#0A0A0A]"
              >
                <button
                  className={`w-full text-left px-6 py-5 font-semibold flex justify-between items-center focus:outline-none transition-colors duration-200 ${isOpen ? "text-[#E5E5E5]" : "text-[#E5E5E5]/80"}`}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  {faq.question}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#2563EB]" : "text-[#E5E5E5]/50"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-5 text-[#E5E5E5]/60 font-light leading-[1.8]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 py-[140px] text-center border-t border-[#E5E5E5]/10">
        <h2 className="text-4xl md:text-5xl tracking-tight mb-6 text-[#E5E5E5] font-bold">
          Start storing images in minutes
        </h2>
        <p className="text-lg text-[#E5E5E5]/60 mb-10 font-light max-w-lg mx-auto leading-[1.8]">
          Skip the payment details context switch. Generate an API token and
          evaluate the routing logic presently.
        </p>
        <Link
          href="/login"
          className="animate-pulse-glow bg-[#2563EB] text-[#E5E5E5] px-10 py-4 rounded-md text-lg font-medium hover:bg-[#2563EB]/90 transition-colors duration-200 inline-block border border-[#2563EB]"
        >
          Get your free API key &rarr;
        </Link>
        <p className="mt-6 text-sm text-[#E5E5E5]/40 mono-font">
          Takes less than 60 seconds · Free forever
        </p>
      </section>

      {/* 10. FOOTER */}
      <footer className="border-t border-[#E5E5E5]/10">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-[#E5E5E5]">
              ImgStorage
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-[#E5E5E5]/60">
            <Link
              href="#docs"
              className="hover:text-[#E5E5E5] transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="#api"
              className="hover:text-[#E5E5E5] transition-colors duration-200"
            >
              API Reference
            </Link>
            <Link
              href="https://github.com/Mamiy07/imgstorage"
              className="hover:text-[#E5E5E5] transition-colors duration-200"
            >
              GitHub
            </Link>
            <Link
              href="#status"
              className="hover:text-[#E5E5E5] transition-colors duration-200"
            >
              Status
            </Link>
          </div>

          <div className="text-xs text-[#E5E5E5]/40 text-center md:text-right flex flex-col gap-2 tracking-tighter">
            <p className="mono-font text-[#E5E5E5]/30">
              Built with Next.js · Prisma · NeonDB · Telegram
            </p>
            <p>&copy; {new Date().getFullYear()} MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
