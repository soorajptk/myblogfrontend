import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'
const Blog = ({item}) => {
return<Link style={{textDecoration:'none',color:'black'}} to={`/post/${item._id}`}>  
  <article>
      <img className='BlogImg' src={item.blogImg} alt="img" />
    <div className='blog-body'>
      <div className='blogHeader'>
<h2 className='blogHead'>{item.title}</h2>
    <p style={{fontSize:"10px"}}><span style={{fontSize:"16px",color:"green"}}>posted </span>:{new Date(item.updatedAt).toDateString()}</p>

      </div>
         <div className='info'>
    <p className='blogPara'>{item.desc}</p>
    </div>
     </div>
  </article>
  </Link> 

};

export default Blog;
