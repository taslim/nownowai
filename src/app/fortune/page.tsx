"use client";

import React, { useState, useEffect } from "react";
import { Share2, Heart, Clock } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import {
  decryptFortune,
  getFortuneForUser,
  shareFortune,
  getCookie,
  setCookie,
  removeCookie,
} from "~/lib/fortune/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-playfair",
});

type CookieState = "ready" | "cracking" | "revealed";

const WholeCookie = () => (
  <svg viewBox="0 0 300 150" className="h-full w-full">
    <defs>
      <filter id="shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="cookieGradient" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#F5DEB3" />
        <stop offset="100%" stopColor="#D4A574" />
      </radialGradient>
    </defs>

    {/* Cookie body with gradient */}
    <path
      d="M45 75 Q75 30 150 30 Q225 30 255 75 Q225 120 150 120 Q75 120 45 75"
      fill="url(#cookieGradient)"
      filter="url(#shadow)"
    />

    {/* Subtle highlight */}
    <ellipse cx="150" cy="55" rx="80" ry="20" fill="white" opacity="0.15" />

    {/* Texture dots */}
    <circle cx="90" cy="67" r="2" fill="#8B7355" opacity="0.4" />
    <circle cx="210" cy="67" r="2" fill="#8B7355" opacity="0.4" />
    <circle cx="112" cy="95" r="2" fill="#8B7355" opacity="0.4" />
    <circle cx="187" cy="95" r="2" fill="#8B7355" opacity="0.4" />
    <circle cx="150" cy="80" r="1.5" fill="#8B7355" opacity="0.3" />
    <circle cx="130" cy="70" r="1.5" fill="#8B7355" opacity="0.3" />
    <circle cx="170" cy="85" r="1.5" fill="#8B7355" opacity="0.3" />
  </svg>
);

const CrackingCookie = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    <div className="relative aspect-[2/1] w-full">
      {/* Left half */}
      <div className="animate-slide-left-half absolute inset-0">
        <svg viewBox="0 0 300 150" className="h-full w-full">
          <defs>
            <filter id="shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cookieGradient" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#F5DEB3" />
              <stop offset="100%" stopColor="#D4A574" />
            </radialGradient>
          </defs>

          {/* Left portion of cookie */}
          <path
            d="M45 75 Q75 30 150 30 L150 75 L150 120 Q75 120 45 75"
            fill="url(#cookieGradient)"
            filter="url(#shadow)"
          />
          <ellipse
            cx="100"
            cy="55"
            rx="40"
            ry="15"
            fill="white"
            opacity="0.15"
          />
          <circle cx="90" cy="67" r="2" fill="#8B7355" opacity="0.4" />
          <circle cx="112" cy="95" r="2" fill="#8B7355" opacity="0.4" />
          <circle cx="100" cy="80" r="1.5" fill="#8B7355" opacity="0.3" />
        </svg>
      </div>

      {/* Right half */}
      <div className="animate-slide-right-half absolute inset-0">
        <svg viewBox="0 0 300 150" className="h-full w-full">
          <defs>
            <filter id="shadow2">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cookieGradient2" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#F5DEB3" />
              <stop offset="100%" stopColor="#D4A574" />
            </radialGradient>
          </defs>

          {/* Right portion of cookie */}
          <path
            d="M150 30 Q225 30 255 75 Q225 120 150 120 L150 75 L150 30"
            fill="url(#cookieGradient2)"
            filter="url(#shadow2)"
          />
          <ellipse
            cx="200"
            cy="55"
            rx="40"
            ry="15"
            fill="white"
            opacity="0.15"
          />
          <circle cx="210" cy="67" r="2" fill="#8B7355" opacity="0.4" />
          <circle cx="187" cy="95" r="2" fill="#8B7355" opacity="0.4" />
          <circle cx="200" cy="80" r="1.5" fill="#8B7355" opacity="0.3" />
        </svg>
      </div>

      {/* Paper slip emerging from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="paper-slip overflow-hidden rounded-sm border border-stone-200/50 bg-gradient-to-b from-amber-50 to-stone-50 shadow-xl">
          <div
            className="h-full w-full opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='20' height='20' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default function FortuneCookiePage() {
  const [cookieState, setCookieState] = useState<CookieState>("ready");
  const [fortune, setFortune] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Check for existing fortune on mount
  useEffect(() => {
    const lastCracked =
      getCookie("lastCracked") ?? localStorage.getItem("lastCracked");
    const today = new Date().toDateString();

    if (lastCracked === today) {
      const savedFortune =
        getCookie("currentFortune") ?? localStorage.getItem("currentFortune");
      if (savedFortune) {
        setFortune(decryptFortune(savedFortune));
        setCookieState("revealed");
      }
    } else {
      // Clear fortune if it's a new day
      removeCookie("currentFortune");
      removeCookie("lastCracked");
      localStorage.removeItem("currentFortune");
      localStorage.removeItem("lastCracked");
    }
  }, []);

  // Countdown timer - syncing with external system (midnight)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const breakCookie = () => {
    const lastCracked =
      getCookie("lastCracked") ?? localStorage.getItem("lastCracked");
    const today = new Date().toDateString();

    // Check both storage methods - only one fortune per day
    if (lastCracked === today) {
      return;
    }

    setCookieState("cracking");
    setTimeout(() => {
      const todaysFortune = getFortuneForUser();
      const decryptedFortune = decryptFortune(todaysFortune);
      setCookieState("revealed");
      setFortune(decryptedFortune);

      // Store in both cookie and localStorage for redundancy
      setCookie("lastCracked", today, 1);
      setCookie("currentFortune", todaysFortune, 1);
      localStorage.setItem("lastCracked", today);
      localStorage.setItem("currentFortune", todaysFortune);
    }, 1400);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-4">
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4A574 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          opacity: 0.8,
        }}
      />

      {/* Timer - top right corner */}
      {cookieState === "revealed" && (
        <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm text-stone-500 shadow-sm backdrop-blur-sm">
          <Clock className="h-4 w-4" />
          <span className="font-light">{timeRemaining}</span>
        </div>
      )}

      {/* Main content */}
      <div className="flex w-full max-w-2xl flex-col items-center">
        {/* Header */}
        <div className="mb-12 text-center transition-all duration-500">
          {cookieState === "ready" && (
            <>
              <h1 className="mb-3 text-5xl font-light tracking-tight text-stone-800">
                Fortune Keeper
              </h1>
              <p className="text-lg font-light text-stone-500">
                Your daily fortune awaits
              </p>
            </>
          )}
          {cookieState === "cracking" && (
            <h2 className="animate-pulse text-3xl font-light text-stone-700">
              Opening...
            </h2>
          )}
          {cookieState === "revealed" && (
            <h2 className="text-3xl font-light text-stone-700">
              Today&apos;s Fortune
            </h2>
          )}
        </div>

        {/* Cookie container */}
        <div className="relative w-full max-w-md">
          {/* Ready state */}
          {cookieState === "ready" && (
            <div
              className={`cursor-pointer transition-all duration-300 ${
                isHovering ? "scale-105" : "scale-100"
              }`}
              onClick={breakCookie}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="aspect-[2/1] w-full p-8">
                <WholeCookie />
              </div>
              <p className="mt-4 text-center text-sm font-light text-stone-400">
                Click to open
              </p>
            </div>
          )}

          {/* Cracking state */}
          {cookieState === "cracking" && (
            <div className="aspect-[2/1] w-full p-8">
              <CrackingCookie />
            </div>
          )}

          {/* Revealed state */}
          {cookieState === "revealed" && (
            <div className="animate-fade-in-up">
              {/* Paper slip */}
              <div className="relative mx-auto max-w-lg rounded-lg border border-stone-200/50 bg-gradient-to-b from-amber-50 to-stone-50 p-8 shadow-2xl backdrop-blur-sm">
                {/* Subtle paper texture */}
                <div
                  className="absolute inset-0 rounded-lg opacity-[0.02]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Fortune text */}
                <p
                  className={`relative text-center text-xl leading-relaxed text-stone-700 italic ${playfair.className}`}
                >
                  &ldquo;{fortune}&rdquo;
                </p>
              </div>

              {/* Action buttons - outside the paper */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="group flex items-center gap-2 rounded-full border border-stone-200/50 bg-white/60 px-5 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md"
                  title={isSaved ? "Unlike" : "Like"}
                >
                  <Heart
                    className={`h-5 w-5 transition-all duration-300 ${
                      isSaved
                        ? "scale-110 fill-rose-400 text-rose-400"
                        : "text-stone-400 group-hover:scale-110 group-hover:text-rose-400"
                    }`}
                  />
                  <span className="text-sm font-light text-stone-600">
                    {isSaved ? "Liked" : "Like"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    void shareFortune(fortune);
                  }}
                  className="group flex items-center gap-2 rounded-full border border-stone-200/50 bg-white/60 px-5 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md"
                  title="Share"
                >
                  <Share2 className="h-5 w-5 text-stone-400 transition-colors duration-300 group-hover:text-stone-600" />
                  <span className="text-sm font-light text-stone-600">
                    Share
                  </span>
                </button>
              </div>

              {/* Subtle hint */}
              <p className="mt-6 text-center text-sm font-light text-stone-400">
                Come back tomorrow for a new fortune
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .paper-slip {
          width: 2px;
          max-height: 0px;
          opacity: 0;
          animation: paperEmerge 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s
            forwards;
        }

        @keyframes slideLeftHalf {
          to {
            transform: translateX(-35px);
          }
        }

        @keyframes slideRightHalf {
          to {
            transform: translateX(35px);
          }
        }

        @keyframes paperEmerge {
          0% {
            opacity: 0;
            width: 2px;
            max-height: 0px;
          }
          40% {
            opacity: 1;
            width: 3px;
            max-height: 100px;
          }
          100% {
            opacity: 1;
            width: 200px;
            max-height: 100px;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-slide-left-half) {
          animation: slideLeftHalf 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        :global(.animate-slide-right-half) {
          animation: slideRightHalf 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        :global(.animate-fade-in-up) {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
