import { fetchBlogs } from "@/reducers/blogs/BlogSlice";
import { fetchInsights } from "@/reducers/insights/insightsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import CustomEditor from "@/components/custom-editor";
import LazyClientEditor from "@/components/lazy-client-editor";
export default function BlogPage() {
  const { cid, iid } = useParams();
  const dispatch = useAppDispatch();
  const {
    blogs,
    loading: blogsloading,
    error: blogsError,
  } = useAppSelector((state) => state.Blogs);
  const {
    insights,
    loading: insightsloading,
    error: insightsError,
  } = useAppSelector((state) => state.insights);

  console.log("id", cid);
  console.log("iid", iid);
  useEffect(() => {
    dispatch(fetchBlogs({ cid, iid }));
  }, []);

  console.log("inisghts", insights);
  console.log("INSIDE BlogPage");
  return (
    <div className="  text-white">
      <Head>
        <title>{blogs.title}</title>
      </Head>
      <header className="w-full  shadow  flex justify-between items-center"></header>
      <main className="max-w-md mx-auto p-10  shadow-lg rounded-lg py-20">
        <h2 className="text-3xl  proxima-regukar mb-2 text-[#425BFF]">
          {blogs.title}
        </h2>
        <p className="text-gray-600  text-sm mb-4">
          {blogs.created_at.substring(0, 10)}
        </p>
        {/* <img src={blogs.featured_image} className="w-full " alt="" /> */}
        <div
          className=" proxima-bold"
          dangerouslySetInnerHTML={{ __html: blogs.text }}
        ></div>
        <div className="w-full max-w-md" dangerouslySetInnerHTML={{ __html: blogs.embed }} />

        {/* <LazyClientEditor initialData={blogs.text} /> */}
      </main>
    </div>
  );
}
