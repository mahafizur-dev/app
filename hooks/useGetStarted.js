import { useState, useEffect } from "react";
import useModalStore from "../store/useModalStore";
import { supabase } from "../lib/supabaseClient";

export const useGetStarted = () => {
  const {
    isOpen,
    closeModal,
    step,
    setStep,
    formData,
    updateFormData,
    resetForm,
  } = useModalStore();

  // Local UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // OTP States
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Generic Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Special Handler for Date to block Fridays
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    if (!dateValue) return;

    // Create date object (Treat YYYY-MM-DD as UTC)
    const day = new Date(dateValue).getUTCDay();

    // Check if Friday (5)
    if (day === 5) {
      setFieldErrors((prev) => ({
        ...prev,
        meetingDate: "Fridays are closed. Please select another day.",
      }));
      updateFormData("meetingDate", ""); // Clear invalid value
    } else {
      updateFormData("meetingDate", dateValue);
      if (fieldErrors.meetingDate)
        setFieldErrors((prev) => ({ ...prev, meetingDate: "" }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email address";

    const phone = formData.phone.trim();
    // Regex matches +8801..., 8801..., 01...
    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (!phone) errors.phone = "Phone number is required";
    else if (!bdPhoneRegex.test(phone.replace(/[\s-]/g, "")))
      errors.phone = "Invalid BD number";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errors = {};
    if (!formData.companyName.trim())
      errors.companyName = "Company name is required";
    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!formData.meetingDate) errors.meetingDate = "Please select a date";
    if (!formData.meetingTime) errors.meetingTime = "Please select a time";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // API Actions
  const sendOtp = async () => {
    setIsSendingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("System Error: API route not found.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setShowOtpInput(true);
      setTimeLeft(120);
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

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("System Error: API route not found.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

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

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Insert Data into Supabase
      const { error } = await supabase.from("leads").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          company_size: formData.companySize,
          job_title: formData.jobTitle,
          meeting_date: formData.meetingDate,
          meeting_time: formData.meetingTime,
          meeting_platform: formData.meetingPlatform,
        },
      ]);

      if (error) throw error;

      // 2. Send Confirmation Email (Non-blocking)
      fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          meetingDate: formData.meetingDate,
          meetingTime: formData.meetingTime,
          meetingPlatform: formData.meetingPlatform,
        }),
      }).catch((err) => console.error("Email sending failed:", err));

      // 3. Show Success UI
      setIsSuccess(true);
      setTimeout(() => {
        resetForm();
        setIsSuccess(false);
        setFieldErrors({});
        setShowOtpInput(false);
        setTimeLeft(0);
        closeModal();
      }, 4000); // Updated to 4 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper Actions
  const handleNext = () => {
    if (validateStep1()) sendOtp();
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

  return {
    // State
    isOpen,
    step,
    formData,
    isSubmitting,
    isSuccess,
    errorMessage,
    fieldErrors,
    showOtpInput,
    otp,
    otpError,
    isSendingOtp,
    isVerifyingOtp,
    timeLeft,
    // Actions
    closeModal,
    handleChange,
    handleDateChange,
    setOtp,
    formatTime,
    handleNext,
    handleResendOtp,
    handleBackToPhone,
    verifyOtp,
    handleBack,
    handleSubmit,
  };
};
