import { fetchBlogs } from "@/reducers/blogs/BlogSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect } from "react";
export default function BlogPage() {
  const { cid, iid } = useParams();
  const dispatch = useAppDispatch();
  const {
    blogs,
    loading: blogsloading,
    error: blogsError,
  } = useAppSelector((state) => state.Blogs);

  console.log("id", cid);
  console.log("iid", iid);
  useEffect(() => {
    dispatch(fetchBlogs({ cid, iid }));
  }, []);
  console.log("blogs", blogs);
  return (
    <div className="  text-white">
      <Head>
        <title>{blogs.title}</title>
      </Head>
      <header className="w-full  shadow  flex justify-between items-center"></header>
      <main className="max-w-3xl mx-auto p-10  shadow-lg rounded-lg mt-16">
        <h2 className="text-3xl font-bold mb-2">{blogs.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{blogs.created_at}</p>
        {/* <img src={blogs.featured_image} className="w-full " alt="" /> */}
        <div dangerouslySetInnerHTML={{ __html: blogs.text }}></div>
      </main>
    </div>
  );
}
