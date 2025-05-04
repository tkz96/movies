export default function SearchHeader({ query, setQuery, sortBy, setSortBy, handleSearch, favoritesCount }) {
    return (
        <div className="mb-8">

            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Search
                </button>
            </form>
            <div className="flex items-center gap-2">
                <p>Sort by: </p>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                    <option value="title">Title</option>
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className="flex justify-end">
                <span className="bg-gray-200 px-4 py-2 rounded-lg">
                    Favorites: {favoritesCount}
                </span>
            </div>
        </div>
    );
}