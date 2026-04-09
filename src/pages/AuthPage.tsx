import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthMode = "login" | "register" | "forgot" | "otp";

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  const handleEmailRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for verification link!");
      setMode("login");
    }
    setLoading(false);
  };

  const handlePhoneSendOtp = async () => {
    setLoading(true);
    const formattedPhone = phone.startsWith("+") ? phone : `+251${phone}`;
    const { error } = mode === "register"
      ? await supabase.auth.signUp({ phone: formattedPhone, password: otp || "temp-pass-123", options: { data: { display_name: displayName } } })
      : await supabase.auth.signInWithOtp({ phone: formattedPhone });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("OTP sent to your phone!");
      setMode("otp");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const formattedPhone = phone.startsWith("+") ? phone : `+251${phone}`;
    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    });
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent to your email!");
      setMode("login");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "otp") return handleVerifyOtp();
    if (mode === "forgot") return handleForgotPassword();
    if (authMethod === "phone") return handlePhoneSendOtp();
    if (mode === "login") return handleEmailLogin();
    return handleEmailRegister();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/15 rounded-full blur-[120px]" />
      <div className="fixed bottom-1/4 left-1/3 w-48 h-48 bg-accent/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-gradient-primary">ebet</h1>
          <p className="text-sm text-muted-foreground mt-2 font-body">
            {mode === "login" ? "Welcome back" : mode === "register" ? "Create your account" : mode === "forgot" ? "Reset your password" : "Enter verification code"}
          </p>
        </div>

        {/* Auth method toggle (login/register only) */}
        {(mode === "login" || mode === "register") && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setAuthMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-heading transition-all ${
                authMethod === "email" ? "bg-primary/20 border border-primary text-primary" : "bg-secondary/50 border border-glass-border text-muted-foreground"
              }`}
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button
              onClick={() => setAuthMethod("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-heading transition-all ${
                authMethod === "phone" ? "bg-primary/20 border border-primary text-primary" : "bg-secondary/50 border border-glass-border text-muted-foreground"
              }`}
            >
              <Phone className="w-4 h-4" /> Phone
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div key={`${mode}-${authMethod}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              {mode === "otp" && (
                <>
                  <button type="button" onClick={() => setMode("login")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <div>
                    <label className="text-xs text-muted-foreground font-body mb-1 block">Verification Code</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 text-sm font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors tracking-[0.5em] text-center"
                    />
                  </div>
                </>
              )}

              {mode === "forgot" && (
                <>
                  <button type="button" onClick={() => setMode("login")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <div>
                    <label className="text-xs text-muted-foreground font-body mb-1 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 text-sm font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </>
              )}

              {(mode === "login" || mode === "register") && (
                <>
                  {mode === "register" && (
                    <div>
                      <label className="text-xs text-muted-foreground font-body mb-1 block">Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 text-sm font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  )}

                  {authMethod === "email" ? (
                    <>
                      <div>
                        <label className="text-xs text-muted-foreground font-body mb-1 block">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 text-sm font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground font-body mb-1 block">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 pr-10 text-sm font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="text-xs text-muted-foreground font-body mb-1 block">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="bg-secondary/50 border border-glass-border rounded-lg px-3 py-3 text-sm font-heading text-muted-foreground">+251</div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="91 234 5678"
                          className="flex-1 bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 text-sm font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-bold py-3 rounded-lg hover:opacity-90 transition-opacity glow-primary disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "otp" ? "Verify" : mode === "forgot" ? "Send Reset Link" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-2">
          {mode === "login" && (
            <>
              <button onClick={() => setMode("forgot")} className="text-xs text-muted-foreground hover:text-primary transition-colors block mx-auto">
                Forgot password?
              </button>
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-primary hover:underline font-semibold">Sign Up</button>
              </p>
            </>
          )}
          {mode === "register" && (
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-primary hover:underline font-semibold">Sign In</button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
