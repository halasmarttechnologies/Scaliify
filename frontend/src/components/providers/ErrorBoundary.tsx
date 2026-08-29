"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="w-full max-w-lg mx-auto my-12 p-8 rounded-2xl bg-white border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            The tool couldn&apos;t load. Please refresh the page to try again.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-dark hover:bg-brand-dark/90 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
