'use client'

import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import GetStartedButton from "./components/GetStartedButton";
import ConfirmationPopup from "./components/ConfirmationPopup";
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

// 3-color palette: white, black, cyan (Tailwind cyan-500)

declare global {
  interface Window {
    mida?: {
      uuid: () => Promise<string>;
    };
  }
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Home />
    </Suspense>
  );
}

function Home() {
  const searchParams = useSearchParams();
  const isV3 = searchParams?.get('page') === 'v3';
  const [midaUuid, setMidaUuid] = useState<string | null>(null);

  useEffect(() => {
    if (window.mida?.uuid) {
      window.mida.uuid()
        .then(uuid => setMidaUuid(uuid))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    captureWithUuid('$pageview', {
      page_version: isV3 ? 'v3' : 'v1',
      page_name: 'home',
      tracking_source: 'client-side'
    });
  }, [isV3]);

  const captureWithUuid = (eventName: string, properties: Record<string, unknown>) => {
    if (midaUuid) {
      posthog.capture(eventName, { ...properties, mida_uuid: midaUuid });
      return;
    }
    if (window.mida?.uuid) {
      window.mida.uuid()
        .then(uuid => {
          setMidaUuid(uuid);
          posthog.capture(eventName, { ...properties, mida_uuid: uuid });
        })
        .catch(() => posthog.capture(eventName, properties));
    } else {
      posthog.capture(eventName, properties);
    }
  };

  const handleStartFreeTrial = () => {
    captureWithUuid('button_clicked', {
      button_name: 'Start Free Trial',
      page_version: isV3 ? 'v3' : 'v1',
      location: 'hero_section',
      tracking_source: 'client-side'
    });
  };

  const handleWatchDemo = () => {
    captureWithUuid('button_clicked', {
      button_name: 'Watch Demo',
      page_version: isV3 ? 'v3' : 'v1',
      location: 'hero_section',
      tracking_source: 'client-side'
    });
  };

  const handleContactSales = () => {
    captureWithUuid('button_clicked', {
      button_name: 'Contact Sales',
      page_version: isV3 ? 'v3' : 'v1',
      location: 'pricing_section',
      tracking_source: 'client-side'
    });
  };

  const handleNavLinkClick = (linkName: string) => {
    captureWithUuid('nav_link_clicked', {
      link_name: linkName,
      page_version: isV3 ? 'v3' : 'v1',
      tracking_source: 'client-side'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="mida-track"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.mdq = window.mdq || [];
            window.mdq.push(["track", "*"]);
          `
        }}
      />
      {/* <ConfirmationPopup /> */}

      {/* Nav */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-black tracking-tight">Mida.so</a>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-black/70 hover:text-black transition-colors text-sm font-medium" onClick={() => handleNavLinkClick('Features')}>Features</a>
            <a href="#pricing" className="text-black/70 hover:text-black transition-colors text-sm font-medium" onClick={() => handleNavLinkClick('Pricing')}>Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            {isV3 ? (
              <Link href="/" className="text-black/60 hover:text-black text-sm font-medium transition-colors">V1</Link>
            ) : (
              <Link href="/?page=v3" className="text-black/60 hover:text-black text-sm font-medium transition-colors">V3</Link>
            )}
            <GetStartedButton className="px-5 py-2.5 rounded-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition-all hover:shadow-lg hover:shadow-cyan-500/25" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="px-6 py-28 md:py-36">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-[1.1] tracking-tight">
            A/B Testing
            <br />
            <span className="text-cyan-500">That Converts</span>
          </h1>
          <p className="text-xl text-black/70 mb-14 max-w-2xl mx-auto leading-relaxed">
            Run experiments, track conversions, and optimize your site with Mida. No code required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartFreeTrial}
              className="px-8 py-4 rounded-xl text-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition-all hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5"
            >
              Start Free Trial
            </button>
            <button
              onClick={handleWatchDemo}
              className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-all hover:-translate-y-0.5"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </main>

      {/* A/B Demo Visual */}
      <section className="px-6 py-20 bg-black/[0.03]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-black text-center mb-4">See it in action</h2>
          <p className="text-black/60 text-center text-sm mb-12">Compare variants side by side</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white border-2 border-black/10 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-black/20 transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-sm font-semibold text-black mb-6">Variation A</div>
              <div className="h-36 bg-black/[0.06] rounded-xl mb-4" />
              <div className="h-4 bg-black/20 rounded-lg w-3/4 mb-3" />
              <div className="h-4 bg-black/10 rounded-lg w-1/2" />
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-cyan-500 text-white text-xs font-bold shadow-lg">VS</div>
              <div className="bg-white border-2 border-cyan-500 rounded-2xl p-8 shadow-lg shadow-cyan-500/10 hover:shadow-xl hover:shadow-cyan-500/15 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-sm font-semibold text-cyan-500 mb-6">Variation B</div>
                <div className="h-36 bg-black/[0.06] rounded-xl mb-4" />
                <div className="h-4 bg-black/20 rounded-lg w-3/4 mb-3" />
                <div className="h-4 bg-black/10 rounded-lg w-1/2" />
              </div>
            </div>
          </div>
          <p className="text-center text-black/50 mt-8 text-sm font-medium">Pick a winner. Deploy in one click.</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-4">Built for conversion</h2>
          <p className="text-black/60 text-center mb-16 text-sm">Everything you need to run winning experiments</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-black/5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-cyan-500/15">
                <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Visual Editor</h3>
              <p className="text-black/70 text-sm leading-relaxed">Create variants without touching code. Click, edit, publish.</p>
            </div>
            <div className="text-center p-8 rounded-2xl border border-black/5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-cyan-500/15">
                <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Real-time Stats</h3>
              <p className="text-black/70 text-sm leading-relaxed">See which variant wins. Statistical significance built in.</p>
            </div>
            <div className="text-center p-8 rounded-2xl border border-black/5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-cyan-500/15">
                <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">One-Click Deploy</h3>
              <p className="text-black/70 text-sm leading-relaxed">Ship the winner to 100% of traffic. No dev handoff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 bg-black/[0.03]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Simple pricing</h2>
          <p className="text-black/60 mb-16 text-sm">Choose the plan that fits your traffic</p>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-all flex flex-col">
              <h3 className="text-xl font-bold text-black mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6 text-cyan-500">$29<span className="text-lg text-black/50 font-normal">/mo</span></div>
              <ul className="text-left space-y-3 mb-8 text-black/70 text-sm flex-1">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Up to 10K pageviews
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  5 active experiments
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Email support
                </li>
              </ul>
              <GetStartedButton className="w-full py-3.5 rounded-xl font-semibold border-2 border-black/20 text-black hover:bg-black/5 hover:border-black/30 transition-all" />
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-cyan-500 relative shadow-lg shadow-cyan-500/10 hover:shadow-xl hover:shadow-cyan-500/15 hover:-translate-y-1 transition-all flex flex-col md:scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-cyan-500 shadow-md">Popular</div>
              <h3 className="text-xl font-bold text-black mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6 text-cyan-500">$99<span className="text-lg text-black/50 font-normal">/mo</span></div>
              <ul className="text-left space-y-3 mb-8 text-black/70 text-sm flex-1">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Up to 100K pageviews
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Unlimited experiments
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Priority support
                </li>
              </ul>
              <GetStartedButton className="w-full py-3.5 rounded-xl font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition-all hover:shadow-lg hover:shadow-cyan-500/25" />
            </div>
            <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-all flex flex-col">
              <h3 className="text-xl font-bold text-black mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6 text-cyan-500">Custom</div>
              <ul className="text-left space-y-3 mb-8 text-black/70 text-sm flex-1">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Unlimited pageviews
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Custom integrations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Dedicated support
                </li>
              </ul>
              <button onClick={handleContactSales} className="w-full py-3.5 rounded-xl font-semibold border-2 border-black/20 text-black hover:bg-black/5 hover:border-black/30 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-14 border-t border-black/10">
        <div className="max-w-5xl mx-auto text-center">
          <a href="/" className="text-lg font-bold text-black tracking-tight">Mida.so</a>
          <p className="text-black/50 text-sm mt-2">A/B testing and conversion optimization</p>
        </div>
      </footer>
    </div>
  );
}
