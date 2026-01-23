"use client";

import posthog from 'posthog-js';

declare global {
  interface Window {
    mdq?: any[][];
  }
}

interface GetStartedButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GetStartedButton({ className, children = "Get Started" }: GetStartedButtonProps) {
  const handleGetStarted = () => {
    if (typeof window !== 'undefined') {
      window.mdq = window.mdq || [];
      window.mdq.push(["track", "haha"]);
    }

    // PostHog event tracking
    posthog.capture('get_started_clicked', {
      button_text: typeof children === 'string' ? children : 'Get Started',
    });
  };

  return (
    <button onClick={handleGetStarted} className={className}>
      {children}
    </button>
  );
}

