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
import { ArrowRight } from "lucide-react";
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

  useEffect(() => {
    dispatch(fetchFAQ());
  }, [dispatch]);

  console.log("FAQ", FAQ);
  return (
    <div className="w-full px-2">
      <div className="space-y-6">
        <h1 className="proxima-ultimate mb-2">
          Have any <span className="text-[#425BFF]">Questions</span>
        </h1>
        <p className="text-gray-300 text-lg proxima-small  mb-4">
          Read our FAQs if you have queries
        </p>
        <Separator orientation="horizontal" className="mb-6" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {FAQ.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="text-left border-b  hover:no-underline">
              <span className="text-lg flex items-center proxima-faq-question justify-between w-full">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-lg proxima-faq-answer">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div>
        <Button className="bg-gradient-to-r px-6 py-6 mt-4 proxima-large rounded-full from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]">
          <div className="flex justify-center gap-2  items-center">
            <span>All Questions & Answers</span>
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default FAQ;
