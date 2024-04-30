import React, { useEffect, useState } from "react";

const BoardPage = () => {
  const url = "http://localhost:8000/api/v1/board/post/getAllPosts";
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    const res = await fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res;
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    console.log(res);
    return res;
  };

  useEffect(() => {
    getAllPosts().then((res) => setPosts(res));
  }, []);

  return (
    <div>
      <div className="p-4">
        <h1 className="text-4xl mb-4">Capsule Board</h1>
        {posts?.map((post, index) => (
          <a
            href={`/board/post/${post.id}`}
            key={index}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl mb-2">{post.title}</h2>
            <p className="text-gray-700 text-base">{post.content}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
