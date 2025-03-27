import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import companyReducer from "../reducers/company/companySlice"; // Import company reducer
import companyCategoryReducer from "../reducers/company/category/companycategorySlice"; // Import company category reducer
import FAQReducer from "@/reducers/faq/faqSlice";
import InsightCategoryReducer from "@/reducers/insights/category/insightscategorySlice";
import InsightsReducer from "@/reducers/insights/insightsSlice";
import SolutionsReducer from "@/reducers/solutions/solutionSlice";
import ProfileReducer from "@/reducers/profile/profileSlice";
import EnquiryReducer from "@/reducers/enquiry/enquirySlice";
import BlogsReducer from "@/reducers/blogs/BlogSlice";
import AcademicsReducer from "@/reducers/filter/academics/academicsSlice";
import ExpertiseReducer from "@/reducers/filter/expertise/expertiseSlice";
import CountryReducer from "@/reducers/filter/country/countrySlice";
import ClientReducer from "@/reducers/filter/client/clientSlice";
import LanguageReducer from "@/reducers/filter/language/languageSlice";
import AvailableToReducer from "@/reducers/filter/availableto/availabletoSlice";
import ProjectReducer from "@/reducers/project/projectSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    companyCategory: companyCategoryReducer,
    FAQ: FAQReducer,
    insights: InsightsReducer,
    insightsCategory: InsightCategoryReducer,
    Solutions: SolutionsReducer,
    Profile: ProfileReducer,
    Enquiry: EnquiryReducer,
    Blogs: BlogsReducer,
    Expertise: ExpertiseReducer,
    Academics: AcademicsReducer,
    Country: CountryReducer,
    Client: ClientReducer,
    Language: LanguageReducer,
    AvailableTo: AvailableToReducer,
    Project: ProjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
