import { useState } from 'react';

const Giffy = () => {
  const [searchItem, setSearchItem] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=U5oTb4iIB71RhG9a9kRkQzDMKWrcDOhv&q=${searchItem}`;

  const handleSetSearchItem = () => {
    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleMouseHover = (e, url) => {
    e.target.src = url;
  };

  const handleMouseLeave = (e, url) => {
    e.target.src = url;
  };

  return (
    <>
      <div className="search-bar">
        <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="search-button" placeholder="Search for GIF" />
        <button onClick={handleSetSearchItem} className="search-button">
          Search
        </button>
      </div>
      <div className="data">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : data.length ? (
          data.map((item) => {
            return (
              <div
                className="element"
                key={item.id}
                onMouseOver={(e) => handleMouseHover(e, item.images.fixed_width.url)}
                onMouseLeave={(e) => handleMouseLeave(e, item.images.fixed_width_still.url)}
              >
                <img className="gif-img" width={item.images.fixed_height_still.width} src={item.images.fixed_height_still.url} alt={item.images.alt_text} />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Giffy;
