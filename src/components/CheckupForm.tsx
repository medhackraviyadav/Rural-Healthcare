// CheckupForm.tsx
import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'framer-motion';

interface CheckupFormProps {
  checkup: {
    id: string;
    name: string;
    name_hi: string;
  };
  onBack: () => void;
}

const CheckupForm: React.FC<CheckupFormProps> = ({ checkup, onBack }) => {
  const { language } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const t = {
    en: {
      title: `Patient Details for ${checkup.name}`,
      name: "Full Name",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      symptoms: "Symptoms (optional)",
      btn: "Submit",
      back: "Back"
    },
    hi: {
      title: `${checkup.name_hi} के लिए मरीज विवरण`,
      name: "पूरा नाम",
      age: "आयु",
      gender: "लिंग",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      symptoms: "लक्षण (वैकल्पिक)",
      btn: "सबमिट करें",
      back: "वापस जाएं"
    }
  }[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto"
    >
      <button className="mb-4 text-brand-primary underline" onClick={onBack}>
        ← {t.back}
      </button>

      <h3 className="text-2xl mb-6 font-bold text-brand-secondary">{t.title}</h3>

      <form className="space-y-4">
        <input
          name="name"
          placeholder={t.name}
          className="border p-3 rounded w-full"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder={t.age}
          type="number"
          className="border p-3 rounded w-full"
          value={form.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-3 rounded w-full"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">{t.gender}</option>
          <option value="male">{t.male}</option>
          <option value="female">{t.female}</option>
          <option value="other">{t.other}</option>
        </select>

        <textarea
          name="symptoms"
          placeholder={t.symptoms}
          className="border p-3 rounded w-full"
          value={form.symptoms}
          onChange={handleChange}
        />

        <button className="bg-brand-primary text-white px-6 py-3 rounded w-full font-semibold hover:bg-opacity-90">
          {t.btn}
        </button>
      </form>
    </motion.div>
  );
};

export default CheckupForm;
