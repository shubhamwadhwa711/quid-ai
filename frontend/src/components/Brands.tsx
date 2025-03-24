import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompanies } from "@/reducers/company/companySlice";
import { fetchCompanyCategory } from "@/reducers/company/category/companycategorySlice";
import { Button } from "./ui/button";

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
      <div className="relative  border mx-4  h-52 -mt-4 rounded-xl">
        {/* Title */}
        <h1 className="absolute proxima-regular -top-5 left-1/2 -translate-x-1/2 text-nowrap px-2 py-2 bg-gradient-to-r from-[#08081b] to-[#0F0F30] text-white z-10">
          WORKED WITH TOP BRANDS
        </h1>

        {/* Categories */}
        <div className="my-6 mx-2 pb-2 flex   gap-1 overflow-x-scroll hide-scrollbar">
          {companyCategory.map((category) => (
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
          ))}
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center p-2">
              <img
                src={company.logo}
                alt={`${company.name}`}
                className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
