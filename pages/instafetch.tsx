// pages/index.tsx
import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/instagram");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid container">
      {posts.map((post) => (
        <div key={post.id}>
          <div className="square-container">
            {post.media_type === "IMAGE" && (
              <img src={post.media_url} alt={post.caption} width="300" />
            )}
            {post.media_type === "VIDEO" && (
              <video width="300" controls>
                <source src={post.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
