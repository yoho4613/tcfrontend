import React, { useEffect, useState } from "react";
import { getAllPosts } from "../config/api.ts";

const BoardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts("/board/post/getAllPosts").then((res) => setPosts(res));
  }, []);

  return (
    <div>
      <div className="p-2">
        <h1 className="text-4xl mb-4">Capsule Board</h1>
        {posts?.map((post, index) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <a href={`/board/post/${post.id}`} key={index}>
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 text-sm">{post.content}</p>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
