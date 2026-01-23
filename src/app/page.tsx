'use client'

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import ImageGallery from "./components/ImageGallery";
import GetStartedButton from "./components/GetStartedButton";
import ConfirmationPopup from "./components/ConfirmationPopup";
import MixpanelInitializer from "./components/MixpanelInitializer";
import posthog from 'posthog-js';
import { useEffect } from 'react';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: PageProps) {
  const isV3 = searchParams?.page === 'v3';

  // Track page view on mount
  useEffect(() => {
    posthog.capture('$pageview', {
      page_version: isV3 ? 'v3' : 'v1',
      page_name: 'home',
      tracking_source: 'client-side'
    });
  }, [isV3]);

  // Event handlers
  const handleStartFreeTrial = () => {
    posthog.capture('button_clicked', {
      button_name: 'Start Free Trial',
      page_version: isV3 ? 'v3' : 'v1',
      location: 'hero_section',
      tracking_source: 'client-side'
    });
  };

  const handleWatchDemo = () => {
    posthog.capture('button_clicked', {
      button_name: 'Watch Demo',
      page_version: isV3 ? 'v3' : 'v1',
      location: 'hero_section',
      tracking_source: 'client-side'
    });
  };

  const handleContactSales = () => {
    posthog.capture('button_clicked', {
      button_name: 'Contact Sales',
      page_version: isV3 ? 'v3' : 'v1',
      location: 'pricing_section',
      tracking_source: 'client-side'
    });
  };

  const handleNavLinkClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
      page_version: isV3 ? 'v3' : 'v1',
      tracking_source: 'client-side'
    });
  };

  // V3 Layout - Dark theme with different structure
  if (isV3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
        <MixpanelInitializer />
        <ConfirmationPopup />
        {/* Navigation */}
        <nav className="px-6 py-6 border-b border-gray-700">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              SaaSify V3
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="" className="text-gray-300 hover:text-purple-400 transition-colors" onClick={() => handleNavLinkClick('Check this out')}>Check this out</a>
              <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors" onClick={() => handleNavLinkClick('Pricing')}>Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors" onClick={() => handleNavLinkClick('About')}>About</a>
            </div>
            <div className="flex space-x-4">
              <Link href="/v2" className="text-gray-300 hover:text-purple-400 transition-colors">
                V2
              </Link>
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                V1
              </Link>
              <GetStartedButton className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg" />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="px-6 py-24">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Build Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse"> SaaS</span>
              <span className="block text-4xl md:text-6xl mt-4">Faster Than Ever</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform that helps you launch, scale, and grow your SaaS business with powerful tools and analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={handleStartFreeTrial} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-2xl transform hover:scale-105">
                Start Free Trial
              </button>
              <button onClick={handleWatchDemo} className="border-2 border-purple-500 text-purple-400 px-10 py-5 rounded-xl text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 bg-gray-900/50">
          <ImageGallery />
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-white mb-20">
              Everything You Need to Succeed
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-gray-300">Deploy your SaaS in minutes, not months. Our platform handles the complexity so you can focus on your product.</p>
              </div>
              <div className="text-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Analytics Dashboard</h3>
                <p className="text-gray-300">Track your growth with comprehensive analytics and insights that help you make data-driven decisions.</p>
              </div>
              <div className="text-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Secure & Reliable</h3>
                <p className="text-gray-300">Enterprise-grade security and 99.9% uptime guarantee to keep your business running smoothly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 py-24 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-20">
              Simple, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-gray-800/50 p-10 rounded-2xl border border-gray-700 shadow-xl">
                <h3 className="text-3xl font-bold text-white mb-6">Starter</h3>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">$29<span className="text-2xl text-gray-400">/mo</span></div>
                <ul className="text-left space-y-4 mb-10">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-6 h-6 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Up to 1,000 users
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-6 h-6 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Basic analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-6 h-6 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Email support
                  </li>
                </ul>
                <GetStartedButton className="w-full bg-gray-700 text-white py-4 rounded-xl font-semibold hover:bg-gray-600 transition-all" />
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-10 rounded-2xl border-2 border-purple-500 relative shadow-2xl transform scale-105">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Pro</h3>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">$99<span className="text-2xl text-gray-300">/mo</span></div>
                <ul className="text-left space-y-4 mb-10">
                  <li className="flex items-center text-gray-200">
                    <svg className="w-6 h-6 text-pink-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Up to 10,000 users
                  </li>
                  <li className="flex items-center text-gray-200">
                    <svg className="w-6 h-6 text-pink-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-200">
                    <svg className="w-6 h-6 text-pink-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <GetStartedButton className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg" />
              </div>
              <div className="bg-gray-800/50 p-10 rounded-2xl border border-gray-700 shadow-xl">
                <h3 className="text-3xl font-bold text-white mb-6">Enterprise</h3>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">$299<span className="text-2xl text-gray-400">/mo</span></div>
                <ul className="text-left space-y-4 mb-10">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-6 h-6 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited users
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-6 h-6 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-6 h-6 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    24/7 phone support
                  </li>
                </ul>
                <button onClick={handleContactSales} className="w-full bg-gray-700 text-white py-4 rounded-xl font-semibold hover:bg-gray-600 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-16 bg-black border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">SaaSify V3</div>
            <p className="text-gray-400 mb-10">Building the future of SaaS, one startup at a time.</p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  // Original Layout
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
      {/* <MixpanelInitializer /> */}
      <ConfirmationPopup />
      {/* Navigation */}
      <nav className="px-6 py-4">
      
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            SaaSify
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="https://aaronliew.vercel.app/" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={() => handleNavLinkClick('Check this out')}>Check this out</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={() => handleNavLinkClick('Pricing')}>Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={() => handleNavLinkClick('About')}>About</a>
          </div>
          <div className="flex space-x-4">
            <Link href="/v2" className="text-gray-600 hover:text-indigo-600 transition-colors">
              V2
            </Link>
            <GetStartedButton className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2FMicrosoft_Teams_image_7_08183417ec.png&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fkinesis_tablet_208a22e8f7.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fwhite_van_coming_arund_corner_2e0dbbfa47.jpeg&w=1920&q=75" alt="SaaSify" width={1920} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2FAdobe_Stock_49661077_1_ea2304ffcf.jpeg&w=1920&q=75" alt="SaaSify" width={1920} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fenergy_enterprise_bb35bfd9d2.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2F8561f5e826ee27f492d4c0fa008aadc7_ebe83c0c71.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2FAdobe_Stock_55328545_fd82b06c89.jpeg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fbusiness_insurance_f9cf38298e.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <Image src="https://d2e8in8hqyll4p.cloudfront.net/_next/image/?url=https%3A%2F%2Fcms-radius-com-bucket.s3.eu-west-2.amazonaws.com%2Fcyber_insurance_295c22d40b.jpg&w=1080&q=75" alt="SaaSify" width={1080} height={500} />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Build Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> SaaS</span>
            <br />
            Faster Than Ever
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The all-in-one platform that helps you launch, scale, and grow your SaaS business with powerful tools and analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleStartFreeTrial} className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
              Start Free Trial
            </button>
            <button onClick={handleWatchDemo} className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-50">
        <ImageGallery />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Deploy your SaaS in minutes, not months. Our platform handles the complexity so you can focus on your product.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Track your growth with comprehensive analytics and insights that help you make data-driven decisions.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security and 99.9% uptime guarantee to keep your business running smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$29<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 1,000 users
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email support
                </li>
              </ul>
              <GetStartedButton className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors" />
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg border-2 border-indigo-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$99<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 10,000 users
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <GetStartedButton className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors" />
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$299<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited users
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 phone support
                </li>
              </ul>
              <button onClick={handleContactSales} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-indigo-400 mb-4">SaaSify</div>
          <p className="text-gray-400 mb-8">Building the future of SaaS, one startup at a time.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
