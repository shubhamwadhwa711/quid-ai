import { useState, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchInsightCategory } from "@/reducers/insights/category/insightscategorySlice";
import { fetchInsights } from "@/reducers/insights/insightsSlice";

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

  const { insightsCategory, loading, error } = useAppSelector(
    (state) => state.insightsCategory
  );
  const { insights, loading: insightsLoading, error: insightsError } = useAppSelector(
    (state) => state.insights
  );

  useEffect(() => {
    dispatch(fetchInsightCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchInsights(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  return (
    <div className="">
      <div>
        <h1 className="text-3xl proxima-bold -mt-3">
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
              <div className="flex gap-4 min-w-max px-1 pb-4">
                {insightsLoading ? (
                  <p className="text-white proxima-regular">Loading...</p>
                ) : insightsError ? (
                  <p className="text-red-500">Error: {insightsError}</p>
                ) : (
                  insights.map((insight) => (
                    <Card
                      key={insight.id}
                      className="hover:shadow-md bg-gray-800 transition flex-shrink-0 w-60 h-56"
                    >
                      <div className="relative h-3/5">
                        <img
                          src={insight.featured_image}
                          alt={insight.title}
                          className="w-full h-full object-fill rounded-t-lg"
                        />
                        {/* <div
                          className="absolute proxima-large top-2 left-2 text-white text-sm px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: getTypeColor(insight.type),
                          }}
                        >
                          {insight.type}
                        </div> */}
                      </div>

                      <div className="h-2/5 flex flex-col justify-between p-4">
                        <CardDescription className="text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#425BFF] h-2 w-2 rounded-full"></div>
                            <div className="text-slate-400 proxima-medium">
                              14 Feb 2025
                            </div>
                          </div>
                        </CardDescription>
                        <CardTitle className="text-lg text-white proxima-medium truncate">
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
