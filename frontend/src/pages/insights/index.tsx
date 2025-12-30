import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchInsightCategory } from "@/reducers/insights/category/insightscategorySlice";
import { fetchInsights } from "@/reducers/insights/insightsSlice";
import { SkeletonCards } from "@/components/SkeletonCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, Handshake, ArrowRight, Share2, Lightbulb } from "lucide-react";

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
  console.log("insights category", insightsCategory);
  return (
    <div className="flex flex-col w-full items-center">
      <div className="absolute top-0 right-0 flex justify-center">
        <img
          src="/Icons/Spiral.png"
          alt="Spiral Background"
          className="w-full h-full"
        />
      </div>
      <div className="mt-14 text-center mb-10">
        <h2 className="text-3xl">
          <span className="proxima-bold">
            AI <span className="text-[#425BFF]">Insights</span>
          </span>
        </h2>
        <div>
          <span className="block">
            From strategy to implementation, we provide
          </span>
          <span className="block mt-1">
            access to the brightest AI talents worldwide.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* First row */}
        <div className="grid grid-cols-1 gap-3 ">
          <Card
            onClick={() => router.push(`insights/${insightsCategory[0].id}`)}
            className="relative cursor-pointer  bg-gradient-to-br border-none from-[#7C2BD3]  to-[#075AA8] text-white h-[170px] w-[160px] overflow-hidden"
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/554e/c14b/77d60e160046e44beff4d7387d8ad26d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QldYa7bBlo6Idjp0~5X7vLAYkXd-Lqc2cx38iBbPSR6eKsNlgUX5toO1vRCCiH9gjMtL0wzYCi4ClzSAM-~NO46VYLKe2kmEqCG9OB~BnoGUdSa2mXFy3LXifJ8FQdmVn2qYICmv-UpZy0VUU88Ee8XQ-j21uYK1dsqt9WH4QStkK8e3i70J6ed~lLQUrh4-xrmvYLyLRX3ySOaVGa6DCjG~a5Gfm4ROd1TLK-f72EBYSnJ4Tq25pjV2rdOqablHHwJinBs4n7rC7-KcAF9zmkMcAcyF13p0IdyQMh72RxNJ7AIWmxvf2AQKBjm5QHGpEZQ~1ceETuucTZgcKP-D4g__"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
            />
            <CardHeader className="py-2 px-4 flex justify-between items-start h-full  relative z-10">
              <HelpCircle className="w-6 h-6" />

              <div className="flex flex-col text-start space-y-2">
                <CardTitle className="proxima-large underline">
                  {insightsCategory[0]?.title}
                </CardTitle>
                <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small text-sm ">
                  <span className="block">
                    Discover exclusive profiles of top AI talents
                  </span>

                  <ArrowRight className="w-5 h-5" />
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Be Part - Bottom left card */}
          <Card
            onClick={() => router.push(`insights/${insightsCategory[1].id}`)}
            className="relative cursor-pointer bg-gradient-to-tr border-none h-[200px] w-[160px] from-[#7C2BD3]  to-[#075AA8] text-white  overflow-hidden"
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/8c77/bfd4/1fa2e49054a0cdc072595be2eba624b6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TENEczB~iihSWP020yEhIlqJ8hP4elnOsox~inlPJWC7SNANBJdu2SMtKrEXCa5lTNkyx~ItBfdOo3ggZn71bAIeiMwSECzMoMKa2WBD4mAONfT2SLdIeHDeJ~KeBykWFtvaBsrDxIqBMALPVgjc-IqGl-H8a2Z6jtTu5vGKRT49pkSPUxMdR4wpq6F8HWbQpcvjIXZ2QxBUIINzvudZFRrknsSjHg9eWFfl9cVlsHjTj~iF6ySjEJevudESem37B4n1zTke8oVJFL6ZaT~8TG-kN3jm1DzJkd8tiSFTN9JX0gu~PcgZWRMoxWv1QVLmne8Z9A8-5WePNmWa9hr-tg__"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
            />
            <CardHeader className="p-4  flex justify-between items-start mb-2 h-full relative">
              <Handshake className="w-8 h-8" />

              <div className="flex flex-col text-start space-y-2">
                <CardTitle className="proxima-large underline">
                  {insightsCategory[1]?.title}
                </CardTitle>
                <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small text-sm ">
                  <span className="block">
                    Join the largest global AI community.
                  </span>

                  <ArrowRight className="w-5 h-5" />
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Second column */}
        <div className="grid grid-cols-1 gap-2">
          {/* Services - Tall card on the right */}
          <Card
            onClick={() => router.push(`insights/${insightsCategory[2].id}`)}
            className="relative cursor-pointer  bg-gradient-to-bl border-none from-[#7C2BD3]  to-[#075AA8] text-white h-[200px] w-[160px] overflow-hidden"
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/9a7f/fa42/3a369877c33cbbee232854f73042f342?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dCpTD~E1qQgicG521cGkdc8ihfWxyDH1~fYEMFQfBmJNt-brTJkLmNwZGVxOXaOFozVwR4Dww~3F8dEpJN8pVjOBRgK~AqRdR9pUAdkUKO8lrB1Y8NL4NgOCWfjkN5jc84C1a0zZbAToCn5RTDbDD-jBwJbHJ2IwLcJQ4OgRoSLBuREYtbu-rqbkQ0TGrE8EL6j459xNgxaqw9HyBoIwAYv~9qZCyUrNuYcca8wOo1HJLfcaMa8pKNovlRy9mPjwWFCklXa4VWZVgsS2ay02cJVsQQT5fdUcjgUgcINgMHusBpgaCY11rfjm4o~ke-pXZpi79i4a2-2tsuzYqb0cPQ__"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
            />
            <CardHeader className="p-4 flex justify-between items-start h-full relative z-10">
              <Share2 className="w-7 h-7" />
              <div className="flex flex-col text-start space-y-2">
                <CardTitle className="proxima-large underline">
                  {insightsCategory[2]?.title}
                </CardTitle>
                <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small text-sm mt-2">
                  <span className="block">
                    Consulting, project support,training, & more.
                  </span>

                  <ArrowRight className="w-5 h-5" />
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* AI Insights - Bottom right card */}
          <Card
            onClick={() => router.push(`insights/${insightsCategory[3].id}`)}
            className="relative cursor-pointer bg-gradient-to-tl border-none from-[#7C2BD3]  to-[#075AA8] text-white h-[170px] w-[160px] overflow-hidden"
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/7605/8c37/a4eedc62e1a4f19e8ee83c0859d1faaf?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k16Upgn0sNwdZFFjtr6AQXn4Ow8J18APuvcbO-7Kn8TS7bFlnhk1O4PqQ0Yzb0lHvIDdQ-P7gEhTSoIiDoj14mAaEC~-HDtk3SQ3L273SymjVW7FSrWZHAajMiTv0n-He8zulMriVvHKig100zhUhFFirJtK5L5~rGGPQonjOTrjSPdosVFGLzu9tobJS2w-G~Azq4TI5h-KxnDf-F9I75P~bZtmmR-fBYGiSWZWTMx3uizwKfjoQyj3pL-AgfAzrHsuPBRNmiKiQhG-MUUE0B9uaAZDEnn-9chDMf5v9Y2W0bY0vedKHqYGZAxXBU3rbIU0bdMaKEJNh~f0Ot35aQ__"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
            />
            <CardHeader className="py-2 px-3 flex justify-between items-start h-full relative z-10">
              <Lightbulb className="w-7 h-7" />

              <div className="flex flex-col text-start space-y-2">
                <CardTitle className="proxima-large underline">
                  {insightsCategory[3]?.title}
                </CardTitle>
                <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small">
                  <span className="block">
                    Knowledge, Interviews,Q&A, Videos.
                  </span>

                  <ArrowRight className="w-5 h-5" />
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insights;
