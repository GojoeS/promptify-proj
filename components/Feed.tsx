'use client';

import { useState, useEffect, ChangeEvent } from "react";

import PromptCard from "./PromptCard";

// interface Post {
//   _id: string;
//   // Add other properties as needed
// }

interface PromptCardListProps{
  data: Array<any>;
  handleTagClick: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

const PromptCardList:React.FC<PromptCardListProps> = ({data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Array<any>>([]);

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed