import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompanies } from "@/reducers/company/companySlice";
import { fetchCompanyCategory } from "@/reducers/company/category/companycategorySlice";
import { Button } from "./ui/button";

const Brands = () => {
  const [selectedCategory, setSelectedCategory] = useState("Telco");
  const dispatch = useAppDispatch();

  const { companies, loading, error } = useAppSelector(
    (state) => state.company
  );
  const {
    companyCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useAppSelector((state) => state.companyCategory);
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchCompanyCategory());
  }, [dispatch]);
  console.error("error", error);
  console.log("companies", companies);
  console.log("companycategory", companyCategory);
  return (
    <div className="relative border h-[400px] rounded-xl p-4">
      {/* Title */}
      <div className="absolute text-2xl -top-5 left-1/2 -translate-x-1/2 text-nowrap px-4 py-1 bg-white/1 backdrop-blur-md text-white z-10 rounded-md">
        WORKED WITH TOP BRANDS
      </div>

      {/* Categories */}
      <div className="m-4 pb-2 flex gap-4 overflow-x-auto hide-scrollbar">
        {companyCategory.map((category) => (
          <Button
            key={category.id}
            variant="none"
            onClick={() => setSelectedCategory(category.title)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${
              selectedCategory === category.title
                ? "bg-[#425BFF] text-white"
                : "bg-gradient-to-tr bg-white/30"
            }`}
          >
            {category.title}
          </Button>
        ))}
      </div>

      {/* Logos Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8 mt-8 p-4">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center justify-center p-2">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
