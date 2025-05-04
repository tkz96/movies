export default function RottenTomatoesRating({ value }) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
        <img 
          src="/assets/logos/rotten-tomatoes.svg" 
          className="h-8 mr-3" 
          alt="Rotten Tomatoes" 
        />
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#fa320a] h-2 rounded-full" 
              style={{ width: `${parseInt(value)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{value}</p>
        </div>
      </div>
    );
  }