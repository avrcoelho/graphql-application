export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  image?: string;
  image_url?: string;
}

export interface UserPostsData {
  getUserPosts: Post[];
}

export interface GetPostsData {
  getPost: Post[];
}
