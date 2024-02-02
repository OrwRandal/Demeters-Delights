import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Parallax } from "react-scroll-parallax";

export default function HomePage() {
  const images = [
    'https://legendofvelda.files.wordpress.com/2013/05/cooking-background-without-cookbook.jpg',
    'https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://media.istockphoto.com/id/1165263525/photo/pizza-cooking-ingredients-and-empty-space-for-recipe.jpg?s=2048x2048&w=is&k=20&c=GY2MLY8dpIGTwoCzk1v09WtahPe2fpYS85gO9WD69VU=',
    'https://files.oaiusercontent.com/file-0WFYZdipiACVA01SOypMd5yo?se=2024-02-02T00%3A56%3A25Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3De71a1d5b-cfac-4860-8481-2b614dcb9268.webp&sig=gvEuklckJtNlwaTthO5NIFG1s3Q0UT2gI7mmNQX3hLU%3D'
  ];

  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [hiddenImageIndex, setHiddenImageIndex] = useState(0);
  const [isTopImageVisible, setIsTopImageVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (hiddenImageIndex + 1) % images.length;
      setHiddenImageIndex(nextIndex);
      setIsTopImageVisible(false);

      setTimeout(() => {
        setVisibleImageIndex(nextIndex);
        setIsTopImageVisible(true);
      }, 1000); // Transition time
    }, 4000); // Interval time

    return () => clearInterval(interval);
  }, [hiddenImageIndex, images.length]);

  function getBackgroundStyle(imageUrl, isVisible) {
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 1s ease-in-out',
      animation: 'panImage 100s linear infinite alternate', // Added animation
      // className: 'backgroundImage' // Ensure this class is applied
    };
  }

  return (
    <>
      <Parallax speed={-150}>
        <div style={{ position: 'relative' }}>
          <div style={getBackgroundStyle(images[hiddenImageIndex], true)}></div>
          <div style={getBackgroundStyle(images[visibleImageIndex], isTopImageVisible)}></div>
          <Parallax speed={20}>
            <figure id='logo'>
              <img src={logo} alt="" />
            </figure>
            <div className="scroll-downs">
              <div className="mousey">
                <div className="scroller"></div>
              </div>
            </div>
          </Parallax>
        </div>
      </Parallax>
      <div id='landing-main'>
        <section id='landing-sec-1'>
          <div id='sec-1-text' className="has-text-white">
            <h1 className="is-size-1 has-text-bold">Demter's <br /> Delights</h1>
            <p className="my-4">
              Demeter's Delights is a celebration of culinary abundance, a place where seasoned gourmets and budding chefs alike can discover a world of recipes that sing with the freshness of nature's bounty. Inspired by the goddess of harvest, our site offers a medley of dishes that range from hearty, time-honored classics to innovative, modern fusions, each designed to delight the senses and elevate the everyday meal into a divine feast.</p>
            <div className="control">
              <input className="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <div id='sec-1-image'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z" /></svg>
          </div>
        </section>
      </div>
    </>
  );
}
