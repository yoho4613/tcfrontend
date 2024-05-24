type Post = {
  id: string;
  title: string;
  content: string;
  description: string;
  image: string[];
  category: string;
  createdAt: string;
  authorId: string;
  author: User;
  views: number;
};

// type User = {
//   id: string;
//   username: string;
//   email: string;
// };

type User = {
  id: string;
  username: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

type Capsule = {
  price: bigint;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
  capsuleImage: string;
  revealed: boolean;
};
