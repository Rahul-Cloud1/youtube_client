const filters = ["All", "Music", "Gaming", "News", "Sports", "Learning", "Podcasts"];

const FilterButtons = ({ setCategory }) => {
  return (
    <div className="categories">
      {filters.map((item) => (
        <button
          key={item}
          className="categoryBtn"
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;