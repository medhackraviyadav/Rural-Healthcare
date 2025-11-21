// InstantCheckups.tsx
import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { getCheckups } from '../services/api';

const InstantCheckups: React.FC = () => {
  const { language } = useLanguage();
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCheckups = async () => {
      try {
        console.log("Fetching checkups..."); // Debug log
        const data = await getCheckups();
        console.log("Checkups data:", data); // Debug log
        setCheckups(data);
      } catch (err) {
        console.error("Error fetching checkups:", err);
        setError("Failed to load checkups");
      } finally {
        setLoading(false);
      }
    };
    loadCheckups();
  }, []);

  const renderIcon = (iconName: keyof typeof LucideIcons) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="h-7 w-7 text-brand-primary" /> : null;
  };

  // Debug render
  console.log("InstantCheckups rendering, loading:", loading, "error:", error, "checkups:", checkups);

  return (
    <section className="py-20 px-6 bg-brand-light min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-brand-secondary">
        {language === "en" ? "Instant Checkups" : "तुरंत जांच"}
      </h2>

      {loading && <p className="text-center text-lg">Loading...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && checkups.length === 0 && (
        <p className="text-center text-gray-500">No checkups available</p>
      )}

      {!loading && !error && checkups.length > 0 && (
        <div className="max-w-3xl mx-auto space-y-4">
          {checkups.map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
            >
              <div className="bg-brand-primary/10 p-3 rounded-full">
                {renderIcon(item.icon)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {language === "en" ? item.name : item.name_hi || item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600">
                    {language === "en" ? item.description : item.description_hi || item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default InstantCheckups;