import { useState, useEffect } from "react"
import logo from "../assets/logo.png"

export default function HomePage() {
  const images = ['https://legendofvelda.files.wordpress.com/2013/05/cooking-background-without-cookbook.jpg', 'https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'];

  const [background, setBackground] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBackground(prevBackground => (prevBackground === images.length - 1 ? 0 : prevBackground + 1));
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // const landingMainStyle = {
  //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${images[background]})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   backgroundAttachment: 'fixed',
  //   minHeight: '100vh',
  //   minWidth: '100vw',
  // };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function getBackgroundStyle(scrollY) {
    const baseOpacity = 0.2;
    // Additional opacity based on scroll position (adjust the divisor to control the rate of change)
    const additionalOpacity = Math.min(0.6, scrollY / 500); // This will add up to 0.2 based on scroll

    // Total opacity is the sum of base and additional, but should not exceed 1
    const totalOpacity = Math.min(baseOpacity + additionalOpacity, 1);

    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, ${totalOpacity}), rgba(0, 0, 0, ${totalOpacity})), url(${images[background]})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      minWidth: '100vw',
    };
  }

  return <>
    <div style={getBackgroundStyle(scrollY)}>
      <figure id='logo'>
        <img src={logo} alt="" />
      </figure>
      <div class="scroll-downs">
        <div class="mousey">
          <div class="scroller"></div>
        </div>
      </div>
    </div>
    <div id='landing-main'>
      <section id='landing-sec-1'>
        <p>HIIIIIIIIIIIIIIIIII</p>
      </section>
    </div>
  </>
}
