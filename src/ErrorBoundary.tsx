import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

// Minimal error boundary to prevent a blank white screen and surface errors to the user.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error?.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to console so we surface the root cause during development.
    console.error("Unhandled error caught by ErrorBoundary", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            color: "#f2f5ff",
            background: "radial-gradient(circle at top, #1f2937, #0b1120 60%)",
            minHeight: "100vh",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <h1 style={{ marginTop: 0 }}>Something went wrong.</h1>
          <p style={{ opacity: 0.8 }}>
            The app hit an error and stopped rendering. Check the browser console for details.
          </p>
          {this.state.message ? (
            <pre
              style={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "1rem",
                color: "#fbbf24",
                whiteSpace: "pre-wrap",
              }}
            >
              {this.state.message}
            </pre>
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}
