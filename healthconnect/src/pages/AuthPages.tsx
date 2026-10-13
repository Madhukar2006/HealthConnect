import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Activity, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Sparkles
} from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'register' | 'forgot-password';
}

export const AuthPages: React.FC<AuthPageProps> = ({ mode }) => {
  const { navigate } = useRouter();
  const { loginDemo, loginWithCredentials, registerUser, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // If already authenticated and not forgot-password, provide shortcut to dashboard
  if (isAuthenticated && mode !== 'forgot-password') {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Session Detected</h2>
        <p className="text-xs text-slate-500">You are currently logged into HealthConnect.</p>
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Go to Patient Dashboard
          </button>
          <Link to="/" className="text-xs text-slate-500 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginWithCredentials(email, password);
        if (res.success) {
          toast('Welcome Back', 'Logged in to HealthConnect demo session.', 'success');
          navigate('/dashboard');
        } else {
          setError(res.error || 'Failed to authenticate');
        }
      } else if (mode === 'register') {
        const res = await registerUser(name, email, password);
        if (res.success) {
          toast('Account Created', 'Registered and signed into demo profile.', 'success');
          navigate('/dashboard');
        } else {
          setError(res.error || 'Failed to create account');
        }
      } else if (mode === 'forgot-password') {
        if (!email || !email.includes('@')) {
          setError('Please provide a valid email address.');
          setIsLoading(false);
          return;
        }
        setTimeout(() => {
          setIsLoading(false);
          setResetSuccess(true);
          toast('Reset Simulation Dispatched', 'Demo password reset instructions recorded.', 'info');
        }, 500);
        return;
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: 'patient' | 'doctor') => {
    loginDemo(role);
    toast(
      'Demo Signed In',
      role === 'doctor' ? 'Loaded Dr. Sarah Lin (Cardiologist) session' : 'Loaded Alex Rivera (Patient) session',
      'success'
    );
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span>HealthConnect</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {mode === 'login' && 'Sign in to HealthConnect'}
            {mode === 'register' && 'Create your patient account'}
            {mode === 'forgot-password' && 'Reset your password'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' && 'Access appointments, medical documents, and consultations.'}
            {mode === 'register' && 'Get started with digital specialist care navigation.'}
            {mode === 'forgot-password' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* 1-Click Demo Quick Access (Top Prominence) */}
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant 1-Click Demo Login</span>
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-mono tracking-wider">No Password Required</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo('patient')}
              className="py-2 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-lg border border-blue-200 dark:border-blue-800 shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Demo Patient</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('doctor')}
              className="py-2 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-lg border border-blue-200 dark:border-blue-800 shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>Demo Doctor</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {resetSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recovery Instructions Simulated</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                If an account with {email} exists, password reset guidance will be dispatched in production.
              </p>
              <Link
                to="/login"
                className="inline-block pt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Return to Login →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="e.g. alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {mode !== 'forgot-password' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {mode === 'login' && (
                      <Link to="/forgot-password" className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>
                  {isLoading
                    ? 'Processing...'
                    : mode === 'login'
                    ? 'Sign In'
                    : mode === 'register'
                    ? 'Create Account'
                    : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>
          )}

          {/* Bottom Switcher */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Register for free
                </Link>
              </p>
            )}
            {mode === 'register' && (
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Sign in
                </Link>
              </p>
            )}
            {mode === 'forgot-password' && (
              <p>
                Remembered your credentials?{' '}
                <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Back to Sign In
                </Link>
              </p>
            )}
          </div>

        </div>

        {/* Demo Security Disclaimer */}
        <p className="text-[11px] text-center text-slate-400 leading-tight">
          Demo authentication uses local session simulation. For production deployments with HIPAA compliance and PostgreSQL row-level security, connect Supabase credentials.
        </p>

      </div>
    </div>
  );
};
