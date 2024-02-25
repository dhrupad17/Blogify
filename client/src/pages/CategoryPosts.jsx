import React,{useState,useEffect} from 'react'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryPosts = () => {
   const [posts,setPosts]=useState([])
   const [isLoading,setIsLoading]=useState(false)

   const {category}=useParams()

   useEffect(()=>{
     const fetchPosts=async()=>{
       setIsLoading(true);
       try{
         const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
         setPosts(response?.data)
       }catch(err){
         console.log(err)
       }

       setIsLoading(false)
     }
     fetchPosts();

   },[category])
   return (
    <section className="posts">
       {posts.length>0?<div className='container posts__container'>
       {
           posts.map(({_id:id,thumbnail,category,title,description,creator,createdAt})=><PostItem key={id} postId={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt}/>)
       }
       </div> : <h2 className='center'>No posts Found</h2>}
    </section>
   )
}

export default CategoryPosts
