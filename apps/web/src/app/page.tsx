"use client";
import { api } from "@/trpc/client";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: posts, refetch } = api.getAllPosts.useQuery();
  const addPostMutation = api.addPost.useMutation({
    onSuccess: () => {
      refetch();
      setTitle("");
      setContent("");
    },
  });

  const handleAddPost = () => {
    addPostMutation.mutate({ title, content });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={handleAddPost}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Post
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Posts:</h2>
        {posts?.map((post: { id: string; title: string; content: string }) => (
          <div key={post.id} className="mb-2">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
