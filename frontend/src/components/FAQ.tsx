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
    <div className="w-full  mx-auto py-8 px-4">
      <div className="mb-8 space-y-6">
        <h1 className="text-4xl font-semibold mb-2">
          Have any <span className="text-[#425BFF]">Questions</span>
        </h1>
        <p className="text-gray-300 text-lg mb-4">
          Read our FAQs if you have queries
        </p>
        <Separator orientation="horizontal" className="mb-6" />
      </div>

      <Accordion type="single" collapsible className=" w-full">
        {FAQ.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="text-lg flex items-center justify-between w-full">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
