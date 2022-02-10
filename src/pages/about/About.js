import React from 'react';
import './About.css'
const About = () => {
  return <div className='AboutOuter'>
      <article className='AboutContainer'>
        <div>
          <h1 className='Aboutheading'>About</h1>
          <hr />
        </div>
        <img className='AboutImg' src="https://tse1.mm.bing.net/th?id=OIP.FfAADx-PFjHks6JVTP0mNgHaE7&pid=Api" alt="" />
      <div className='AboutFooter'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, fuga suscipit sunt, eligendi non quidem similique enim tempora doloribus qui laudantium dolore! Quos ipsum rem mollitia quasi officia aut molestiae quaerat exercitationem voluptatum! Et explicabo, minima voluptas sint quam nihil blanditiis distinctio corrupti sit maiores qui veritatis deleniti, perspiciatis aliquam.</p>
      </div>
      </article>
  </div>;
};

export default About;
