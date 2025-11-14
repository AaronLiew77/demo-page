"use client";

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
  };

  return (
    <button onClick={handleGetStarted} className={className}>
      {children}
    </button>
  );
}

