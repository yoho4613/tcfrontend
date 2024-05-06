type Post = {
  id: string;
  title: string;
  content: string;
  description: string;
  image: string;
  createdAt: string;
  authorId: string;
  author: User;
};

type User = {
  id: string;
  username: string;
  email: string;
};
