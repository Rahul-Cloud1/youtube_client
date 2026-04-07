const filters = ["All", "Music", "Gaming", "News", "Sports", "Learning", "Podcasts"];

const FilterButtons = ({ setCategory }) => {
  return (
    <div className="filters">
      {filters.map((item) => (
        <button key={item} onClick={() => setCategory(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;