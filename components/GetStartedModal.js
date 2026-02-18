import React, { useState } from "react";
import { X, Loader2, CheckCircle } from "lucide-react";
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Insert data into Supabase 'leads' table
      // Columns match the SQL table definition
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

      // Show success state
      setIsSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        resetForm();
        setIsSuccess(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {step === 1 ? (
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
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#2EC866] focus:ring-1 focus:ring-[#2EC866] transition-all"
                      placeholder="e.g. Ruman Sardar"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#2EC866] focus:ring-1 focus:ring-[#2EC866] transition-all"
                      placeholder="e.g. ruman@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#2EC866] focus:ring-1 focus:ring-[#2EC866] transition-all"
                      placeholder="+880-123-456789"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full mt-2 bg-[#2EC866] hover:bg-[#25a955] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[#2EC866]/20"
                >
                  Next Step
                </button>
              </div>
            ) : (
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
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#2EC866] focus:ring-1 focus:ring-[#2EC866] transition-all"
                      placeholder="e.g. Acme Inc."
                    />
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
                      <option className="bg-[#0A0A0A]">SaaS</option>
                      <option className="bg-[#0A0A0A]">Startup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#2EC866] focus:ring-1 focus:ring-[#2EC866] transition-all"
                      placeholder="e.g. Product Manager"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm font-medium">
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
