import React, { useState } from 'react';
import { AiOutlineCamera} from "react-icons/ai";
import './Write.css'
import axios from 'axios'

const Write = () => {
const [file,setFile]=useState('')
const [ImgLink,setImgLink]=useState(null)
const [formValues,setFormValues]=useState({title:"",desc:""})

const fun=async(val)=>{
setFile(URL.createObjectURL(val))
try {
  const data = new FormData();
      data.append("image", val);
      const uploadImg = await axios({
        method: "post",
        url: "https://myblog-1997.herokuapp.com/api/blog/upload",
        data,
      });
      setImgLink(uploadImg);
} catch (error) {
  
}
}
const handlechange=(e)=>{
  const {name,value}=e.target
  setFormValues({...formValues,[name]:value})
}

const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    const res=await axios({
      method:'post',
      url:"https://myblog-1997.herokuapp.com/api/blog/create",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data:{...formValues,
       blogImg: `${
            ImgLink
              ? `https://myblog-1997.herokuapp.com/${ImgLink.data.image}`
              : "http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png"
          } `,
      }
    })
   res && window.location.replace('/')
  } catch (error) {
    console.log(error)
    
  }
}
    console.log(ImgLink)

  return <section className='bgImg'>
  <section className='edit-article'>
      <form onSubmit={handleSubmit}>
     <div className='img-form'>
         <img className='SingleBlogImg' src={`${file || "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500001/134557215-no-thumbnail-images-placeholder-for-forums-blogs-and-websites.jpg?ver=6"}`} alt="" />
        <label htmlFor="picture"><AiOutlineCamera className='camera' /></label>
       <input type="file" id='picture' style={{display:'none'}} onChange={(e)=>fun(e.target.files[0])}  />
      </div>
        <div className='title'>
        <input type="text" name='title' value={formValues.title} onChange={handlechange} placeholder='title' />
        </div>
        <div className='textarea'>
            <textarea name="desc"  cols="30" placeholder='write something' value={formValues.desc} onChange={handlechange} rows="10"></textarea>
        </div>
        <div className='btn-collection'>
        <button className='edit-btn' type='submit'>publish</button>
        </div>
        
      </form>
      
  </section>
  </section> 
};

export default Write;
