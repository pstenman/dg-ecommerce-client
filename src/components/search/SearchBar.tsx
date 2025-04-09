import { useSearch } from "../../hooks/useSearch";
import "../../styles/layout/searchDropDownStyles.css"
import { isProductInDB } from "../../utilis/search/isProductInDB";
import { linkProductAndDBProduct } from "../../utilis/search/linkProductAndDBProduct";

export const SearchBar = () => {
  const { searchText, items, error, handleSearch, handleInputChange } = useSearch();


  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {searchText && items && (
        <div className="dropdown">
            {items.slice(0,5).map((item) => {
                const isInDB = isProductInDB(item.link);
                return (
                <div key={item.link} className="dropdown-item">
                    <section>
                    {item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail.length > 0 ? (
                  <img src={item.pagemap.cse_thumbnail[0].src} alt="no image" />
                ) : item.pagemap.cse_image && item.pagemap.cse_image.length > 0 ? (
                  <img src={item.pagemap.cse_image[0].src} alt="no image" />
                ) : (
                  <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo_Image_Available.jpg&psig=AOvVaw2aFaZYGNVTnVj9V-g7YplG&ust=1744219902140000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPD06u37yIwDFQAAAAAdAAAAABAE" alt="default image" /> // Optional fallback image
                )}
                    </section>
                    <section>
                    <a 
                    href={isInDB ? linkProductAndDBProduct.find((dbItem) => dbItem.externalLink === item.link)?.internalLink : "#"} 
                    target={isInDB ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                    className={isInDB ? "dropdown-item-link" : "dropdown-item-link disabled"}
                    aria-disabled={!isInDB}
                    >
                        {item.title}
                    </a>
                    </section>
                </div>
                )
            })}
        </div>
        )}
    </div>
  );
};
