import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/instagram");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging log

        // Adjust the logic here based on the actual data structure
        if (data && Array.isArray(data.items)) {
          console.log("Data.items is an array:", data.items);
          setPosts(data.items);
        } else {
          console.error("Unexpected data structure:", data);
          throw new Error("Unexpected data structure");
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid">
      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="">
            <div className="">
              {post.media_type === "IMAGE" && (
                <img
                  src={post.media_url}
                  alt={post.caption}
                  className=""
                />
              )}
              {post.media_type === "VIDEO" && (
                <video className="" loop autoPlay muted>
                  <source src={post.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
