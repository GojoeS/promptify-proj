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
  
  const sortedData = data.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return(
    <div className="mt-16 prompt_layout">
      {sortedData.map((post) => (
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
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<any[]>([]);

  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    
    fetchPosts();
  }, [])

  const filterPrompts = (searchtext: string | RegExp) => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
  };

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  const handleTagClick = (tagName:any) => {
    setSearchText(tagName);
    console.log(tagName)
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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
      
      { searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
      )}
    </section>
  )
}

export default Feed