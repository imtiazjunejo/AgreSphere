const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-8">
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;