import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import companyReducer from "../reducers/company/companySlice"; // Import company reducer
import companyCategoryReducer from "../reducers/company/category/companycategorySlice"; // Import company category reducer
import FAQReducer from "@/reducers/faq/faqSlice";
import InsightCategoryReducer from "@/reducers/insights/category/insightscategorySlice";
import InsightsReducer from "@/reducers/insights/insightsSlice";
export const store = configureStore({
  reducer: {
    company: companyReducer,
    companyCategory: companyCategoryReducer,
    FAQ: FAQReducer,
    insights: InsightsReducer,
    insightsCategory: InsightCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
