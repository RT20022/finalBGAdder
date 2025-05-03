// app/dashboard/page.tsx
'use client';

import React from "react";

interface BlogData {
  noOfBlogs: number;
  allBlogArray: string[];
}

// Mock data function (Replace with real fetch if not using static export)
async function GetData(): Promise<BlogData> {
  // Sample dummy data (Replace this logic if using server features)
  const noOfBlogs = 3;
  const allBlogArray = ["blog1.md", "blog2.md", "blog3.md"];

  return {
    noOfBlogs,
    allBlogArray,
  };
}

export default function Page() {
  const [data, setData] = React.useState<BlogData>({
    noOfBlogs: 0,
    allBlogArray: [],
  });

  React.useEffect(() => {
    GetData().then(setData);
  }, []);

  return (
    <>
      <div className="flex">
        <div className="text-2xl p-5 border-violet-700 border-4 text-center">
          <h2>Connected Repo : 1</h2>
        </div>
        <div className="text-2xl p-5 border-4 text-center ml-5">
          <h2>No of Blogs Added : {data.noOfBlogs}</h2>
        </div>
      </div>

      <div className="text-2xl p-5 border-4 text-center ml-5">
        <h2>Blogs Name :- </h2>
        {data.allBlogArray.map((val, key) => (
          <h3 key={key}>{val}</h3>
        ))}
      </div>
    </>
  );
}
