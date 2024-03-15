import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Parallax } from "react-scroll-parallax";
import drawn_symbols from "../assets/drawn_symbols.png";
import Loading from "../components/Loading";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function HomePage() {
  const images = [
    'https://static.vecteezy.com/system/resources/previews/025/480/753/large_2x/vegetables-set-and-spices-for-cooking-on-dark-background-ai-generated-free-photo.jpg',
    'https://cdn.myportfolio.com/5064b24d9e6330f732b844b01563cccf/2c54446cae918b36a8017525_rw_1200.jpg?h=39da43dc769587f72e06d0a570f612f1',
    drawn_symbols
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Function to open the modal with the selected meal's data
  const openModalWithMeal = (meal) => {
    setSelectedMeal(meal);
    setIsModalActive(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalActive(false);
    setSelectedMeal(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsLoading(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchTerm}`)
        .then(response => response.json())
        .then(data => {
          setResults(data);
          setIsLoading(false);
          console.log(data)
        })
        .catch(error => {
          setIsLoading(false);
          console.error('Error fetching data: ', error)
        });
    } else {
      setResults([]);
      setIsLoading(false)
    }
  }, [debouncedSearchTerm]);

  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [hiddenImageIndex, setHiddenImageIndex] = useState(0);
  const [isTopImageVisible, setIsTopImageVisible] = useState(true);
  const [inspoMeal, setInspoMeal] = useState()

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

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(data => {
        setInspoMeal(data['meals'][0])
        console.log(data['meals'][0])
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, [])

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
      animation: 'panImage 100s linear infinite alternate'
    };
  }

  return (
    <>
      <Parallax speed={-150}>
        <div style={{ position: 'relative' }}>
          <div style={getBackgroundStyle(images[hiddenImageIndex], true)}></div>
          <div style={getBackgroundStyle(images[visibleImageIndex], isTopImageVisible)}></div>
          {/* <Parallax speed={20}> */}
          <figure id='logo'>
            <img src={logo} alt="" />
          </figure>
          <div className="scroll-downs">
            <div className="mousey">
              <div className="scroller"></div>
            </div>
          </div>
          {/* </Parallax> */}
        </div>
      </Parallax>
      <div id='landing-main'>
        <section id='landing-sec-1'>
          <div id='sec-1-text' className="has-text-white">
            <h1 className="is-size-1 has-text-bold">Demter's <br /> Delights</h1>
            <p className="my-4">
              Demeter's Delights is a celebration of culinary abundance, a place where seasoned gourmets and budding chefs alike can discover a world of recipes that sing with the freshness of nature's bounty. Inspired by the goddess of harvest, our site offers a medley of dishes that range from hearty, time-honored classics to innovative, modern fusions, each designed to delight the senses and elevate the everyday meal into a divine feast.</p>
            <div className="control">
              <input className="input" type="text" placeholder="Search..." onChange={handleSearchChange} />
            </div>
          </div>
          <div id='sec-1-image'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z" /></svg>
          </div>
        </section>
        <section id='landing-sec-2' className="has-text-white mt-3">
          {debouncedSearchTerm && !isLoading ? <h1 className="is-size-2 has-text-bold">Results: </h1> : <></>}
          {isLoading ? <Loading /> : <div className="card-list">
            {debouncedSearchTerm && results['meals'] && results['meals'] !== null ? results['meals'].map(result => {
              return (
                <div
                  className='card'
                  style={{ backgroundImage: `url(${result['strMealThumb']})` }}
                  onClick={() => openModalWithMeal(result)}
                >
                  <h1 className='is-size-4 has-text-weight-bold'>{result['strMeal']}</h1>
                  {result["strYoutube"] && <a href={result["strYoutube"]} target="_blank"  onClick={(e) => e.stopPropagation()}>
                    <div className="play-button">
                      <div className="play-icon"></div>
                    </div>
                  </a>}
                </div>
              );
            }) : debouncedSearchTerm ? <p className="my-6">No Results Found</p> : <></>}
          </div>}
        </section>


        <div id='recepe-modal' className={`modal ${isModalActive ? 'is-active' : ''}`}>
          <div className="modal-background" style={{ backgroundColor: 'rgba(43,43,43,.85)' }} onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head" style={{ backgroundColor: 'black', borderBottom: 'black' }}>
              {selectedMeal && <h1 className="modal-card-title has-text-white has-text-weight-bold" style={{maxWidth: '100%'}}>{selectedMeal.strMeal}</h1>}
              <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            {selectedMeal && <section class="modal-card-body" style={{ backgroundColor: 'black', borderRadius: '0 0 10px 10px' }}>
              <h1 className="is-size-5 has-text-white has-text-weight-bold">Ingredient Checklist <span className="is-size-6">(clickable)</span></h1>
              <ul className="ml-5">
                {
                  Object.keys(selectedMeal)
                    .filter(key => key.startsWith('strIngredient') && selectedMeal[key])
                    .map((ingredientKey, index) => {
                      const measureKey = `strMeasure${ingredientKey.slice(13)}`;
                      const ingredient = selectedMeal[ingredientKey];
                      const measure = selectedMeal[measureKey] || '';
                      const checkboxId = `ingredient-${index}`;

                      return (
                        <li key={checkboxId} className="checkbox-wrapper-11">
                          <input id={checkboxId} type="checkbox" name="ingredient" value={index} />
                          <label htmlFor={checkboxId} className="is-size-6" style={{ lineHeight: 1 }}>{`${ingredient} - ${measure}`}</label>
                        </li>
                      );
                    })
                }
              </ul>
              <hr className='hr' />
              <h1 className="is-size-5 mt-5 has-text-white has-text-weight-bold">Instructions</h1>
              <p className="has-text-white ml-5 mt-1 is-size-6">{selectedMeal["strInstructions"]}</p>
            </section>}
          </div>
        </div>

        {/* <section id='landing-sec-3' className="has-text-white is-size-2">
          <h1 className="is-size-2 my-2">Meal Of Inspiration</h1>
          {inspoMeal && <div id='inspo-sec'>
            <figure>
              <img src={`${inspoMeal['strMealThumb']}`} width='400' height='400' id='inspoImg'></img>
            </figure>
            <div>
              <h1 className="is-size-">{inspoMeal['strMeal']}</h1>
              <p className="is-size-3">Ingredient Check List</p>
              <ul>
                {
                  Object.keys(inspoMeal)
                    .filter(key => key.startsWith('strIngredient') && inspoMeal[key])
                    .map((ingredientKey, index) => {
                      const measureKey = `strMeasure${ingredientKey.slice(13)}`;
                      const ingredient = inspoMeal[ingredientKey];
                      const measure = inspoMeal[measureKey] || '';
                      const checkboxId = `ingredient-${index}`;

                      return (
                        <div className="checkbox-wrapper-11" key={checkboxId}> 
                          <input id={checkboxId} type="checkbox" name="ingredient" value={index} />
                          <label htmlFor={checkboxId} className="is-size-4">{`${ingredient} - ${measure}`}</label>
                        </div>
                      );
                    })
                }
              </ul>
            </div>
          </div>}
        </section> */}
      </div>
    </>
  );
}
