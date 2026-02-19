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
    meetingDate: "", // New
    meetingTime: "10:00 AM", // New (Default start time)
    meetingPlatform: "Google Meet", // New
  },

  // Actions
  openModal: () => set({ isOpen: true, step: 1 }),
  closeModal: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),

  // Update specific form fields
  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Reset form
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
        meetingDate: "",
        meetingTime: "10:00 AM",
        meetingPlatform: "Google Meet",
      },
    }),
}));

export default useModalStore;
