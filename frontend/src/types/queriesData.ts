export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  image?: string;
}

export interface UserPostsData {
  getUserPosts: Post[];
}
