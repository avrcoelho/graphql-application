export interface UserPostData {
  getUserPosts: Array<{
    id: string;
    title: string;
    content: string;
    user_id: string;
    image?: string;
  }>;
}
