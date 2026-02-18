import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  step: 1,
  formData: {
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "1-10 employees",
    jobTitle: "",
  },

  // Actions
  openModal: () => set({ isOpen: true, step: 1 }), // Always reset to step 1 on open
  closeModal: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),

  // Update specific form fields
  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Reset form (optional, for after submission)
  resetForm: () =>
    set({
      step: 1,
      formData: {
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        companySize: "1-10 employees",
        jobTitle: "",
      },
    }),
}));

export default useModalStore;
