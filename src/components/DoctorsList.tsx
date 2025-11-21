// DoctorsList.tsx
import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { getDoctorSpecialities, requestConsultation } from '../services/api';

const DoctorsList: React.FC = () => {
  const { language } = useLanguage();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        console.log("Fetching doctors..."); // Debug log
        const data = await getDoctorSpecialities();
        console.log("Doctors data:", data); // Debug log
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  const connectDoctor = async (id: string) => {
    setConnecting(id);
    try {
      const result = await requestConsultation(id);
      alert("Connected with doctor! Consultation ID: " + result.consultationId);
    } catch (err) {
      alert("Failed to connect");
    }
    setConnecting(null);
  };

  const renderIcon = (iconName: keyof typeof LucideIcons) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="h-7 w-7 text-brand-primary" /> : null;
  };

  console.log("DoctorsList rendering, loading:", loading, "error:", error, "doctors:", doctors);

  return (
    <section id="doctors-list" className="py-20 px-6 bg-brand-light min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-brand-secondary">
        {language === "en" ? "Connect with a Doctor" : "डॉक्टर से जुड़ें"}
      </h2>

      {loading && <p className="text-center text-lg">Loading...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && doctors.length === 0 && (
        <p className="text-center text-gray-500">No doctors available</p>
      )}

      {!loading && !error && doctors.length > 0 && (
        <div className="max-w-3xl mx-auto space-y-4">
          {doctors.map((doc: any, index: number) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-full">
                  {renderIcon(doc.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {language === "en" ? doc.name : doc.name_hi || doc.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "en" ? doc.description : doc.description_hi || doc.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => connectDoctor(doc.id)}
                disabled={connecting !== null}
                className="bg-brand-primary text-white px-4 py-2 rounded-full font-semibold disabled:bg-gray-300"
              >
                {connecting === doc.id
                  ? (language === "en" ? "Connecting..." : "कनेक्ट हो रहा है…")
                  : (language === "en" ? "Connect Now" : "अभी जुड़ें")}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorsList;