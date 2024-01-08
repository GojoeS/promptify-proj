export interface Post {
  creator: {
    id?: string | null | undefined ;
    _id: string;
    email: string;
    username: string;
    image: string;
    user?: string | null | undefined ;
    __v: number;
  };
  prompt: string;
  tag: string;
  __v: number;
  _id: string;
}

