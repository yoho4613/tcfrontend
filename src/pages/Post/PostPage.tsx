import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../config/api.ts";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPostById("/board/post/getPostById", id).then((res) => {
        setPost(res);
        setIsLoading(false);
      });
    }
  }, []);

  console.log(post);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="p-4">
        <h1 className="font-extrabold text-2xl">{post?.title}</h1>
        <p>{post?.content}</p>
        <p>{post?.description}</p>
      </div>
    </div>
  );
};

export default PostPage;
