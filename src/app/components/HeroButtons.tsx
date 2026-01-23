"use client";

import posthog from 'posthog-js';

interface HeroButtonProps {
  variant: 'primary' | 'secondary';
  eventName: string;
  eventProperties?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}

export function HeroButton({ variant, eventName, eventProperties = {}, className, children }: HeroButtonProps) {
  const handleClick = () => {
    posthog.capture(eventName, {
      button_text: typeof children === 'string' ? children : eventName,
      ...eventProperties,
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

export function StartFreeTrialButton({ className }: { className?: string }) {
  return (
    <HeroButton
      variant="primary"
      eventName="start_free_trial_clicked"
      className={className}
    >
      Start Free Trial
    </HeroButton>
  );
}

export function WatchDemoButton({ className }: { className?: string }) {
  return (
    <HeroButton
      variant="secondary"
      eventName="watch_demo_clicked"
      className={className}
    >
      Watch Demo
    </HeroButton>
  );
}

export function ContactSalesButton({ className }: { className?: string }) {
  const handleClick = () => {
    posthog.capture('contact_sales_clicked', {
      button_text: 'Contact Sales',
      pricing_tier: 'enterprise',
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      Contact Sales
    </button>
  );
}
