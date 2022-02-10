import React,{useState,useEffect} from 'react';
import './Home.css'
import BlogList from '../../components/blogList/BlogList'
import axios from 'axios'
import Loading from '../../components/loading/Loading'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setloading]=useState(false)

  useEffect(() => {
  setloading(true)
    const FetchData = async() => {
      try {

        const res=await axios({
          method:'get',
          url:'https://myblog-1997.herokuapp.com/api/blog',
          headers:{Authorization:`Bearer ${localStorage.getItem('jwt')}`}
        })
        setBlogs(res.data)
        setloading(false)
      } catch (error) {
        console.log(error)
        setloading(false)
      }
    }
    FetchData()
  }, []);

  if(loading){
    return <Loading/>
  }

  return (
      <>
      
      <BlogList blogs={blogs}/>
      </>
  )
};

export default Home;
