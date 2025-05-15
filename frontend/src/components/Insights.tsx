import { useState, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchInsightCategory } from "@/reducers/insights/category/insightscategorySlice";
import { fetchInsights } from "@/reducers/insights/insightsSlice";
import { SkeletonCards } from "./SkeletonCard";
import { useRouter } from "next/navigation";
const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "interview":
      return "#075AA8";
    case "case study":
      return "#899DA8";
    default:
      return "#000000"; // Default color if needed
  }
};

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { insightsCategory, loading, error } = useAppSelector(
    (state) => state.insightsCategory
  );
  const {
    insights,
    loading: insightsLoading,
    error: insightsError,
  } = useAppSelector((state) => state.insights);

  useEffect(() => {
    dispatch(fetchInsightCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchInsights(selectedCategory));
    }
  }, [selectedCategory, dispatch]);
  console.log("insights", insights);
  return (
    <div className="">
      <div>
        <h1 className="text-3xl text-center proxima-bold -mt-3">
          Quid AI <span className="text-[#425BFF] ">Insights</span>
        </h1>
      </div>

      <div className="p-1">
        {/* Categories Section */}
        <div className="mb-3 pb-2 flex justify-center gap-1 overflow-x-auto hide-scrollbar">
          {insightsCategory.map((insight) => (
            <button
              key={insight.id}
              className={`px-2 rounded-full text-center proxima-bold text-xs transition-all backdrop-blur-md flex-shrink-0 ${
                selectedCategory === insight.id
                  ? "bg-[#425BFF] text-white"
                  : "bg-white/30"
              }`}
              onClick={() => setSelectedCategory(insight.id)}
            >
              {insight.title}
            </button>
          ))}
        </div>

        {/* Cards Section */}
        <div className="w-full">
          <div className="relative">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div className="flex ml-4 gap-4 min-w-max px-1 pb-4">
                {insightsLoading ? (
                  <SkeletonCards />
                ) : insightsError ? (
                  <p className="text-red-500 h-56">Error: {insightsError}</p>
                ) : insights.length === 0 ? (
                  // <Card className="bg-gray-800 flex-shrink-0 w-60 h-56 ">
                  //   <div className="h-3/5 bg-gray-700 rounded-t-lg"></div>
                  //   <div className="h-2/5 flex flex-col justify-between p-4">
                  //     <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  //     <div className="h-6 bg-gray-700 rounded w-full"></div>
                  //   </div>
                  // </Card>
                  <div className="w-60 h-56 text-center">
                    <h1>No Data available</h1>
                  </div>
                ) : (
                  insights.map((insight) => (
                    <Card
                    onClick={() => router.push(`insights/${insight.category}/${insight.id}`)}
                      key={insight.id}
                      className="hover:shadow-md bg-gray-800  transition flex-shrink-0 w-60 h-56"
                    >
                      <div className="relative h-3/5">
                        <img
                          src={insight.featured_image || "/insight.jpg"}
                          alt={insight.title}
                          className="w-full h-full object-fill rounded-t-lg"
                        />
                      </div>

                      <div className="h-2/5 flex  flex-col justify-between p-4">
                        <CardDescription className="text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#425BFF] h-2 w-2 rounded-full"></div>
                            <div className="text-slate-400 proxima-bold">
                              14 Feb 2025
                            </div>
                          </div>
                        </CardDescription>
                        <CardTitle className="text-sm text-start text-white proxima-FAQ">
                          {insight.title}
                        </CardTitle>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
