import { useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
type Insight = {
  id: number;
  title: string;
  type: string;
  image: string;
};

type InsightsData = {
  [key: string]: Insight[];
};
const insightsCategories = ["All", "Insights", "Interviews", "Videos", "Q&A"];
const insightsData: InsightsData = {
  All: [
    {
      id: 1,
      title: "What Does a Customer Support Agent Do",
      type: "INTERVIEW",
      image:
        "https://s3-alpha-sig.figma.com/img/c169/7acc/96c3d4829363b34e57c09e49ebee16b1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RYmXSmMgokBJOtZesudU-rjPMV-13tJ51DRu6QHX-llH~me-yWyLf7CbVm0CzXqTsIXT4vtsQDEmQFl1xN~rrL43hf3nzHfaUgW-BwDsKAiWyJWhdXOAR3Fc2czLAdQMfWNjrvnF7DP2znq-gJZ0gSS-mty8e4k1WRMokq18bmixgknq6-frLk-0mBK0WxEhi6fFHCPXnTmKZhoqmtuRBizdhCWK8BMIIwD-ZT7oZ74PbOo3uo00Ownqit3gk1BqQLFLOD~lwjsTtspt14P4qIOicauBkfq8Fx5cw5y~TGFyaRHweUPJTVha6Sj1kEGyaHX~9g5rasbKpQ2bCTjXJA__",
    },
    {
      id: 2,
      title: "Getting work done has never been easier",
      type: "CASE STUDY",
      image:
        "https://s3-alpha-sig.figma.com/img/eeab/5fbd/9abbccd9c8c0247a3eaca614d16f590b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GxJLmPlRyHsKZUZm6LhnuMTTYP7opTogesYOvLhv7JJLM6iwPH-MVthhAUjhtD4yh0Mq-lKzQk38t3cL8WxON~FAJBIdKsk8aCvETo9QFe-8StZr5TL44cB3gxM3ae07XogupliwC9D4E51zMcMv~rK3NpDqmfpy38cOD6iWiirHFpg2vr2oq2d9SRynh8zUPvg7vt~G7S70aigZwYCjjrhzD~UYs130mlaU0~kt4MapmSFLPIjdAGVIzdbsa8yKKbtt3xPlprpoTTswTkdI6y2I5rLnJV1YWtK8A24BN6v9H7mdNCsULbFYc4M3mA~eoqvOr2-g-EOwrZrNNZbhjw__",
    },
    {
      id: 3,
      title: "Getting work done has never been easier",
      type: "CASE STUDY",
      image:
        "https://s3-alpha-sig.figma.com/img/eeab/5fbd/9abbccd9c8c0247a3eaca614d16f590b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GxJLmPlRyHsKZUZm6LhnuMTTYP7opTogesYOvLhv7JJLM6iwPH-MVthhAUjhtD4yh0Mq-lKzQk38t3cL8WxON~FAJBIdKsk8aCvETo9QFe-8StZr5TL44cB3gxM3ae07XogupliwC9D4E51zMcMv~rK3NpDqmfpy38cOD6iWiirHFpg2vr2oq2d9SRynh8zUPvg7vt~G7S70aigZwYCjjrhzD~UYs130mlaU0~kt4MapmSFLPIjdAGVIzdbsa8yKKbtt3xPlprpoTTswTkdI6y2I5rLnJV1YWtK8A24BN6v9H7mdNCsULbFYc4M3mA~eoqvOr2-g-EOwrZrNNZbhjw__",
    },
    // { id: 3, title: "Tech Innovations", type: "Videos" },
    // { id: 4, title: "Startup Q&A", type: "Q&A" },
  ],
  Insights: [
    { id: 1, title: "Market Trends 2024", type: "Insights", image: "" },
  ],
  Interviews: [
    { id: 1, title: "Exclusive CEO Interview", type: "Interviews", image: "" },
  ],
  Videos: [{ id: 1, title: "Tech Innovations", type: "Videos", image: "" }],
  "Q&A": [{ id: 1, title: "Startup Q&A", type: "Q&A", image: "" }],
};

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
  const [selectedInsights, setSelectedInsights] = useState("All");

  return (
    <div>
      <div>
        <h1 className="text-4xl font-semibold">
          Quid AI <span className="text-[#425BFF] ">Insights</span>
        </h1>
      </div>

      <div className="p-4 space-y-8">
        {/* Categories Section */}
        <div className="mb-4 pb-2 flex gap-4 overflow-x-auto hide-scrollbar">
          {insightsCategories.map((insights) => (
            <button
              key={insights}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md flex-shrink-0 ${
                selectedInsights === insights
                  ? "bg-[#425BFF] text-white"
                  : "bg-white/30"
              }`}
              onClick={() => setSelectedInsights(insights)}
            >
              {insights}
            </button>
          ))}
        </div>

        {/* Cards Section */}
        <div className="w-full">
          <div className="relative">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div className="flex gap-4 min-w-max px-1 pb-4">
                {insightsData[selectedInsights].map((insight) => (
                  <Card
                    key={insight.id}
                    className="hover:shadow-md bg-gray-800 transition flex-shrink-0 w-60 h-56"
                  >
                    <div className="relative h-3/5">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-fill rounded-t-lg"
                      />
                      <div
                        className="absolute top-2 left-2 text-white text-sm px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: getTypeColor(insight.type),
                        }}
                      >
                        {insight.type}
                      </div>
                    </div>

                    <div className="h-2/5 flex flex-col justify-between p-4">
                      <CardDescription className="text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#425BFF] h-2 w-2 rounded-full"></div>
                          <div className="text-slate-400">14 Feb 2025</div>
                        </div>
                      </CardDescription>
                      <CardTitle className="text-lg text-white font-semibold truncate">
                        {insight.title}
                      </CardTitle>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
