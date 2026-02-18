import React, { useState, useEffect } from "react";
import {
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useModalStore from "../store/useModalStore";
import { supabase } from "../lib/supabaseClient";

const GetStartedModal = () => {
  // Access state and actions from the global store
  const {
    isOpen,
    closeModal,
    step,
    setStep,
    formData,
    updateFormData,
    resetForm,
  } = useModalStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // OTP State
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Timer State (120 seconds = 2 minutes)
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);

    // Clear error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // --- Validation Logic ---

  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    const phone = formData.phone.trim();
    // Regex: Matches BD numbers +88017..., 88017..., 017...
    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!bdPhoneRegex.test(phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Invalid BD number. Format: 017xxxxxxxx";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.companyName.trim())
      errors.companyName = "Company name is required";
    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- API Handlers ---

  const sendOtp = async () => {
    setIsSendingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      // Safety Check: Ensure response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "System Error: API route not found. Please check backend files.",
        );
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      // Success: Show OTP Input and Start Timer
      setShowOtpInput(true);
      setTimeLeft(120);

      console.log("OTP Sent via Backend");
    } catch (error) {
      console.error(error);
      setFieldErrors((prev) => ({ ...prev, phone: error.message }));
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setIsVerifyingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, code: otp }),
      });

      // Safety Check: Ensure response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("System Error: API route not found.");
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Verification failed");

      // Success: Move to Next Step & Clear OTP State
      setShowOtpInput(false);
      setStep(2);
      setOtp("");
      setTimeLeft(0);
    } catch (error) {
      setOtpError(error.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // --- UI Actions ---

  const handleNext = () => {
    if (validateStep1()) {
      sendOtp();
    }
  };

  const handleResendOtp = () => {
    setOtp("");
    setOtpError("");
    sendOtp();
  };

  const handleBackToPhone = () => {
    setShowOtpInput(false);
    setOtp("");
    setOtpError("");
    setTimeLeft(0);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Final Submission to Supabase 'leads' table
      const { error } = await supabase.from("leads").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          company_size: formData.companySize,
          job_title: formData.jobTitle,
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);

      // Close modal after delay
      setTimeout(() => {
        resetForm();
        setIsSuccess(false);
        setFieldErrors({});
        setShowOtpInput(false);
        setTimeLeft(0);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => `
    w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 
    focus:outline-none focus:ring-1 transition-all
    ${
      fieldErrors[fieldName]
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
        : "border-white/10 focus:border-[#2EC866] focus:ring-[#2EC866]"
    }
  `;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
      >
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-[#2EC866] blur-[20px] opacity-50" />

        {!isSuccess && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {isSuccess ? (
          // Success State
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-16 h-16 bg-[#2EC866]/20 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-[#2EC866]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">You're all set!</h3>
            <p className="text-slate-400">
              Thanks for signing up. We'll be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            {step === 1 && !showOtpInput && (
              // Step 1: Personal Information
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#2EC866] text-black text-xs font-bold px-2 py-0.5 rounded">
                      Step 1/2
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Personal Info
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Tell us a bit about yourself to get started.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={getInputClass("fullName")}
                      placeholder="e.g. Ruman Sardar"
                    />
                    {fieldErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={getInputClass("email")}
                      placeholder="e.g. ruman@gmail.com"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Phone Number (BD) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={getInputClass("phone")}
                      placeholder="01712345678"
                    />
                    {fieldErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={isSendingOtp}
                  className="w-full mt-2 bg-[#2EC866] hover:bg-[#25a955] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[#2EC866]/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Sending OTP...
                    </>
                  ) : (
                    "Verify Number & Next"
                  )}
                </button>
              </div>
            )}

            {step === 1 && showOtpInput && (
              // Step 1.5: OTP Verification
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <button
                    onClick={handleBackToPhone}
                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#2EC866] text-black text-xs font-bold px-2 py-0.5 rounded">
                        Verify
                      </span>
                      <h3 className="text-2xl font-bold text-white">
                        Enter OTP
                      </h3>
                    </div>
                    {/* Timer Display */}
                    <div
                      className={`flex items-center gap-1.5 font-mono text-sm ${timeLeft < 30 ? "text-red-500" : "text-[#2EC866]"}`}
                    >
                      <Clock size={16} />
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    We've sent a 4-digit code to{" "}
                    <span className="text-white font-mono">
                      {formData.phone}
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={timeLeft === 0 || isVerifyingOtp}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-slate-600 focus:outline-none focus:ring-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${otpError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#2EC866]"}`}
                      placeholder="0000"
                    />
                    {otpError && (
                      <p className="text-red-500 text-xs mt-2 text-center flex items-center justify-center gap-1 font-bold">
                        <ShieldAlert size={12} /> {otpError}
                      </p>
                    )}
                    {timeLeft === 0 && (
                      <p className="text-red-500 text-xs mt-2 text-center font-medium">
                        Code expired. Please request a new one.
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-center text-slate-500">
                    {timeLeft === 0 ? (
                      <button
                        onClick={handleResendOtp}
                        className="text-[#2EC866] hover:underline font-bold text-sm"
                      >
                        Resend Code
                      </button>
                    ) : (
                      <span>
                        Didn't receive code?{" "}
                        <span className="opacity-50">Wait for timer</span>
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={
                    timeLeft === 0 || isVerifyingOtp || otp.length !== 4
                  }
                  className="w-full mt-2 bg-[#2EC866] hover:bg-[#25a955] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[#2EC866]/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Verifying...
                    </>
                  ) : (
                    "Confirm & Continue"
                  )}
                </button>
              </div>
            )}

            {step === 2 && (
              // Step 2: Business Information
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-white/10 text-white text-xs font-bold px-2 py-0.5 rounded">
                      Step 2/2
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Business Info
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Help us tailor the experience for your company.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={getInputClass("companyName")}
                      placeholder="e.g. Presswayy"
                    />
                    {fieldErrors.companyName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {fieldErrors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Business Type
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EC866] focus:ring-1 focus:ring-[#2EC866] transition-all appearance-none"
                    >
                      <option className="bg-[#0A0A0A]">Service</option>
                      <option className="bg-[#0A0A0A]">Ecommerce</option>
                      
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={getInputClass("jobTitle")}
                      placeholder="e.g. Product Manager"
                    />
                    {fieldErrors.jobTitle && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {fieldErrors.jobTitle}
                      </p>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                    {errorMessage}
                  </p>
                )}

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="w-1/3 bg-transparent border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-2/3 bg-[#2EC866] hover:bg-[#25a955] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[#2EC866]/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Processing...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GetStartedModal;
