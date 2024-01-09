'use client';

import { useState, useEffect } from 'react'
import { useSearchParams  } from 'next/navigation';

import Profile from '@components/Profile'
import { Post } from '@/types/customTypes'

interface otherProfileProps{
  params: any;
}

const otherProfile:React.FC<otherProfileProps> = ( {params}) => {

  const searchParams = useSearchParams()
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts ] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    }
    
    if(params?.id) fetchPosts();
  }, [params?.id])

  return (
    <Profile 
      name={`${userName}'s`}
      desc={`Welcome to your personalized profile page`}
      data={userPosts}
    />
  )
}

export default otherProfile