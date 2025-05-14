import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompanies } from "@/reducers/company/companySlice";
import { fetchCompanyCategory } from "@/reducers/company/category/companycategorySlice";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
const Brands = () => {
  const dispatch = useAppDispatch();

  const { companies, loading, error } = useAppSelector(
    (state) => state.company
  );
  const {
    companyCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useAppSelector((state) => state.companyCategory);

  // Set selectedCategory when categories are available
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCompanyCategory());
  }, [dispatch]);

  useEffect(() => {
    // Set the first category as selected when categories are loaded
    if (companyCategory.length > 0 && selectedCategory === null) {
      setSelectedCategory(companyCategory[0].id);
    }
  }, [companyCategory, selectedCategory]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchCompanies(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  return (
    <div className="">
      <div className="relative  border mx-4  min-h-52 h-auto -mt-4 rounded-xl">
        {/* Title */}
        <h1 className="absolute proxima-regular -top-5 left-1/2 -translate-x-1/2 text-nowrap px-2 py-2 bg-gradient-to-r from-[#08081b] to-[#0F0F30] text-white z-10">
          WORKED WITH TOP BRANDS
        </h1>

        {/* Categories */}
        <div className="my-3 mx-2 pb-2 flex gap-1 overflow-x-scroll hide-scrollbar">
          {companyCategory.map((category, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.125 * index }}
            >
              <Button
                key={category.id}
                variant="none"
                onClick={() => setSelectedCategory(category.id)}
                className={`py-2 w-auto h-4 proxima-bold rounded-full text-xs transition-all backdrop-blur-md ${
                  selectedCategory === category.id
                    ? "bg-[#425BFF] text-white"
                    : "bg-gradient-to-tr bg-white/30"
                }`}
              >
                {category.title}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Logos Grid */}

        <div className="grid grid-cols-3 md:grid-cols-4 overflow-y-hidden">
          <AnimatePresence mode="wait">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center  justify-center p-2"
              >
                {company.logo ? (<img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />) : (
                  <span className="text-gray-300 font-bold">{company.name.slice(0,15)}</span>
                )}
                
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Brands;
