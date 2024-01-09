'use client';

import { useState, useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { Post } from '@/types/customTypes'

const MyProfile = () => {
  const router = useRouter()
  const {data:session} = useSession();

  const [posts, setPosts ] = useState([])

  const handleEdit = (post:Post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post:Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        console.log("Deleting post with ID:", post._id);
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((item: Post) => item._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
        
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }
    
    if(session?.user?.id) fetchPosts();
  }, [session?.user.id])

  return (
    <Profile 
      name="My"
      desc={`Welcome to your personalized profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile