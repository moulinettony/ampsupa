import { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
  children?: InstagramPost[]; // To handle carousel posts if children exist
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
        console.log("Fetched data:", data);

        if (Array.isArray(data.items)) {
          setPosts(data.items);
        } else {
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
    <div className="grid grid-cols-3 gap-2">
      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        posts.map((post) => {
          // Check if it's a carousel and display the first media item
          let displayMediaUrl = post.media_url;

          return (
            <div key={post.id} className="relative" style={{ paddingBottom: '100%' }}>
              <div className="absolute inset-0 overflow-hidden">
                {post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM" ? (
                  <img
                    src={displayMediaUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                ) : post.media_type === "VIDEO" ? (
                  <video
                    className="w-full h-full object-cover"
                    loop
                    autoPlay
                    muted
                    playsInline
                  >
                    <source src={displayMediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HomePage;
