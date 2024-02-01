import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Parallax } from "react-scroll-parallax";

export default function HomePage() {
  const images = [
    'https://legendofvelda.files.wordpress.com/2013/05/cooking-background-without-cookbook.jpg', // Example URL for "Red"
    'https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Example URL for "Blue"
    
  ];

  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [hiddenImageIndex, setHiddenImageIndex] = useState(0);
  const [isTopImageVisible, setIsTopImageVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the hidden (bottom) image
      const nextIndex = (hiddenImageIndex + 1) % images.length;
      setHiddenImageIndex(nextIndex);

      // Fade out the top image
      setIsTopImageVisible(false);

      setTimeout(() => {
        // Change the top image and fade it back in
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
      transition: 'opacity 1s ease-in-out'
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
          <p>HIIIIIIIIIIIIIIIIII</p>
        </section>
      </div>
    </>
  );
}
