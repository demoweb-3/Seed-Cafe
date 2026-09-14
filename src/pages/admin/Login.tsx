import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const { signIn, signUp, session } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fn = mode === 'login' ? signIn : signUp;
    const { error: err } = await fn(email, password);

    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      navigate('/admin', { replace: true });
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <span className="font-serif text-2xl tracking-tighter text-ink-800">Seed</span>
            <span className="font-serif text-sm tracking-[0.3em] uppercase text-botanical-500 mt-0.5">Café</span>
          </div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-ink-400">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="font-serif text-2xl text-ink-800 mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-sm text-ink-400 mb-6">
            {mode === 'login' ? 'Sign in to manage Seed Café.' : 'Sign up to manage Seed Café.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400 transition-colors"
                  placeholder="admin@seedcafe.lk"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
              }}
              className="text-sm text-botanical-600 hover:text-botanical-700 transition-colors"
            >
              {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-600 transition-colors">
            <ArrowLeft size={14} />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
