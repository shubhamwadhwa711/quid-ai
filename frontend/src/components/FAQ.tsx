import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchFAQ } from "@/reducers/faq/faqSlice";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const faq = [
  {
    id: 1,
    question: "What is the process tp hire an AI expert",
    answer:
      "Discover realiable professionals by exploring their portfolios and immersing yourself in the feedback shared on their profiles",
  },
  {
    id: 2,
    question: "How can I pay to the AI Experts?",
    answer: "",
  },
  {
    id: 3,
    question: "What is the process to hire an expert?",
    answer: "",
  },
];
const FAQ = () => {
  const dispatch = useAppDispatch();
  const { FAQ, loading, error } = useAppSelector((state) => state.FAQ);
  const router = useRouter();
  useEffect(() => {
    dispatch(fetchFAQ());
  }, [dispatch]);

  console.log("FAQ", FAQ);
  return (
    <div className="px-2 ">
      <div className="-mt-10 ">
        <h1 className="text-3xl text-center proxima-bold mb-2">
          Have any <span className="text-[#425BFF]">Questions</span>
        </h1>
        <p className=" text-base text-center proxima-FAQ  mb-4">
          Read our FAQs if you have queries
        </p>
        <Separator orientation="horizontal" />
      </div>

      <Accordion type="single" collapsible className="w-full ">
        {FAQ.map((item) => (
          <AccordionItem
            key={item.id}
            className="border-b last:border-b-0 border-gray-700"
            value={`item-${item.id}`}
          >
            <AccordionTrigger className="  hover:no-underline">
              <span className=" proxima-bold w-full">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="proxima-FAQ">
              <span>{item.answer}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col justify-center items-center">
        <Button onClick={() => router.push("/insights")} className="bg-gradient-to-r px-6 py-6 mt-4 proxima-large rounded-full from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]">
          <div className="flex justify-center gap-2  items-center">
            <span className="proxima-bold text-white text-lg">
              All Questions & Answers
            </span>
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7H17M17 7L11 1M17 7L11 13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default FAQ;
