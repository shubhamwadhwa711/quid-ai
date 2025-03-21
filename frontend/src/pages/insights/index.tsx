import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchInsightCategory } from "@/reducers/insights/category/insightscategorySlice";
import { fetchInsights } from "@/reducers/insights/insightsSlice";
import { SkeletonCards } from "@/components/SkeletonCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="p-1 ">
      <div>
        <h1 className="text-3xl text-center proxima-bold mt-20 mx-4">
          Quid AI <span className="text-[#425BFF]">Insights</span>
        </h1>
        <div className=" absolute top-0 right-0  flex justify-center">
          <img
            src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
            alt="Spiral Background"
            className="w-full h-full object-fill"
          />
        </div>
        {/* Categories Section */}
        <div className=" pb-2 my-4 flex justify-center gap-2 overflow-x-auto hide-scrollbar">
          {insightsCategory.map((insight) => (
            <button
              key={insight.id}
              className={`
                px-3 py-1 rounded-full text-center proxima-bold text-xs transition-all
                backdrop-blur-md flex-shrink-0
                ${
                  selectedCategory === insight.id
                    ? "bg-[#425BFF] text-white"
                    : "bg-white/30"
                }
              `}
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
                  <div className="w-60 h-56 text-center flex items-center justify-center">
                    <h1>No Data available</h1>
                  </div>
                ) : (
                  insights.map((insight) => (
                    <Card
                      key={insight.id}
                      className="hover:shadow-md bg-gray-800 transition flex-shrink-0 w-60 h-56 cursor-pointer"
                      onClick={() =>
                        router.push(
                          `insights/${insight.category}/${insight.id}`
                        )
                      }
                    >
                      <div className="relative h-3/5">
                        <img
                          src={insight.featured_image}
                          alt={insight.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>

                      <div className="h-2/5 flex flex-col justify-between p-4">
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
