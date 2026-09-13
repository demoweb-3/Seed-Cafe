import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('App error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ivory-50 px-5">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-2xl text-ink-800 mb-3">Something went wrong</h1>
            <p className="text-sm text-ink-400 mb-6">
              The page couldn't load. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 text-sm font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
