import { SkeletonCard, SkeletonCards } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchInsights } from "@/reducers/insights/insightsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { BookOpenIcon, ImageIcon } from "lucide-react";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function InsightsPage() {
  const { cid } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    insights,
    loading: insightsloading,
    error: insightsError,
  } = useAppSelector((state) => state.insights);

  console.log("id", cid);

  useEffect(() => {
    if (cid) {
      dispatch(fetchInsights(cid));
    }
  }, [dispatch, cid]);

  console.log("insights", insights);
  return (
    <div className="text-white">
      <Head>
        <title>Insights</title>
      </Head>

      <div className="mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Insights section - full width */}
        <div className="w-full mt-10">
          {/* Header outside of Card */}
          <div className="mb-4 text-center">
            <h2 className="text-3xl proxima-regular text-white font-semibold">
               <span className="text-[#425BFF] ">QuidAI Insights</span>
            </h2>
            <p className="text-base text-white/70">
             Glance at our AI Insights
            </p>
          </div>

          {/* Loading state outside of Card */}
          {insightsloading ? (
            <div className="flex flex-wrap gap-4">
              <SkeletonCards count={3} />
            </div>
          ) : insightsError ? (
            <div className="p-4">
              <p className="text-red-400">Failed to load insights</p>
            </div>
          ) : (
            <div className="pb-12">
              {insights.map((insight) => (
              <div className="grid grid-cols-1 mt-4">
                <Card
                  onClick={() =>
                    router.push(`${insight.category}/${insight.id}`)
                  }
                  key={insight.id}
                  className="hover:shadow-md bg-gray-800  transition flex-shrink-0 w-full h-56"
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
                          {insight.created_at.slice(0, 10)}
                        </div>
                      </div>
                    </CardDescription>
                    <CardTitle className="text-sm text-start text-white proxima-FAQ">
                      {insight.title}
                    </CardTitle>
                  </div>
                </Card>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
