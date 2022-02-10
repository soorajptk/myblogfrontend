import React, { useEffect, useState } from "react";
import "./ViewBlog.css";
import { AiFillDelete, AiFillEdit, AiOutlineCamera } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../loading/Loading";
function ViewBlog() {
  const { postId } = useParams();
  const [singleData, setSingleData] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [singlePostImage, setSinglePostImage] = useState({ blogImg: "" });
  const [formValues, setFormValues] = useState({ title: "", desc: "" });
  const [ImgLink, setImgLink] = useState("");
  const [loading,setloading]=useState(false)

  const handleImgUpload = async (e) => {
    setSinglePostImage({ blogImg: URL.createObjectURL(e.target.files[0]) });
    try {
      const data = new FormData();
      data.append("image", e.target.files[0]);
      const uploadImg = await axios({
        method: "post",
        url: "https://myblog-1997.herokuapp.com/api/blog/upload",
        data,
      });
      setImgLink(uploadImg);
    } catch (error) {}
  };

  useEffect(() => {
    setloading(true)
    const FetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `https://myblog-1997.herokuapp.com/api/blog/${postId}`,
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        setSingleData(res.data);
        setFormValues({ title: res.data.blog.title, desc: res.data.blog.desc });
        setSinglePostImage({ blogImg: res.data.blog.blogImg });
     setloading(false)
      } catch (error) {
     setloading(false)

        console.log(error);
      }
    };
    FetchData();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    try {
      const res = await axios({
        method: "patch",
        url: `https://myblog-1997.herokuapp.com/api/blog/${postId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: {
          ...formValues,
          blogImg: `${
            ImgLink
              ? `https://myblog-1997.herokuapp.com/${ImgLink.data.image}`
              : singlePostImage.blogImg
          } `,
        },
      });
      res && window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemovePost = async () => {
    try {
    const res=  await axios({
        method: "DELETE",
        url: `https://myblog-1997.herokuapp.com/api/blog/${postId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      res && window.location.replace("/");
    } catch (error) {}
  };
if(loading){
  return <Loading/>
}
  return (
    <section className="viewBlogContainer">
      <form onSubmit={handleSubmit}>
        <div className="ImgSection">
          {updateMode && (
            <>
              <label className="imgIcon" htmlFor="blogImage">
                <AiOutlineCamera
                  style={{ backgroundColor: "white", borderRadius: "3px" }}
                />
              </label>
              <input
                style={{ display: "none" }}
                onChange={handleImgUpload}
                type="file"
                name=""
                id="blogImage"
              />
            </>
          )}
          <img
            className="viewBlogImg"
            src={singlePostImage && singlePostImage.blogImg}
            alt={singleData && singleData.blog.title}
          />
        </div>
        <div className="viewBlogBody">
          <div className="viewBlogHeader">
            {updateMode ? (
              <input
                autoFocus={true}
                value={formValues && formValues.title}
                onChange={handleChange}
                className="updateModeTitle"
                type="text"
                name="title"
                id=""
              />
            ) : (
              <>
                <h1 className="viewBlogHeading">
                  {singleData && singleData.blog.title}
                </h1>
                {singleData && singleData.role === "admin" && (
                  <div className="viewBlogBtn">
                    <button>
                      <AiFillEdit
                        onClick={() => setUpdateMode(true)}
                        className="edit"
                      />
                    </button>
                    <button>
                      <AiFillDelete
                        onClick={handleRemovePost}
                        className="delete"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="viewBlogAuthor">
            <h3>
              <span style={{ color: "lightgreen" }}>Author:</span>
              {singleData && singleData.blog.user}
            </h3>
            <p style={{ fontSize: "12px" }}>
              <span style={{ fontSize: "16px" }}>posted:</span>{" "}
              {new Date(singleData && singleData.blog.updatedAt).toDateString()}
            </p>
          </div>
          <div className="viewBlogDesc">
            {updateMode ? (
              <textarea
                className="updateModeTextarea"
                name="desc"
                value={formValues && formValues.desc}
                onChange={handleChange}
              ></textarea>
            ) : (
              <p className="Blogdesc">{singleData && singleData.blog.desc}</p>
            )}
          </div>
          {updateMode && (
            <button type="submit" className="updateModeBtn">
              publish
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ViewBlog;
