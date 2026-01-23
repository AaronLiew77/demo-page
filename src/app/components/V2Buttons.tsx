"use client";

import posthog from 'posthog-js';

interface V2ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function UpgradeButton({ className }: V2ButtonProps) {
  const handleClick = () => {
    posthog.capture('upgrade_clicked', {
      page: 'v2',
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      Upgrade
    </button>
  );
}

export function LaunchV2BetaButton({ className }: V2ButtonProps) {
  const handleClick = () => {
    posthog.capture('launch_v2_beta_clicked', {
      location: 'hero',
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      Launch V2 Beta
    </button>
  );
}

export function ViewFeaturesButton({ className }: V2ButtonProps) {
  const handleClick = () => {
    posthog.capture('view_features_clicked', {
      page: 'v2',
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      View Features
    </button>
  );
}

export function StartV2BetaTrialButton({ className }: V2ButtonProps) {
  const handleClick = () => {
    posthog.capture('start_v2_beta_trial_clicked', {
      location: 'cta_section',
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      Start V2 Beta Trial
    </button>
  );
}

export function ScheduleDemoButton({ className }: V2ButtonProps) {
  const handleClick = () => {
    posthog.capture('schedule_demo_clicked', {
      page: 'v2',
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      Schedule Demo
    </button>
  );
}
