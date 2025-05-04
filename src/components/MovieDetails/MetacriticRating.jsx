export default function MetacriticRating({ value }) {
    if (!value) return null;
    const getColor = (score) => {
        const num = parseInt(score);
        if (num >= 60) return 'bg-green-600';
        if (num >= 40) return 'bg-yellow-500';
        return 'bg-red-600';
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center">
            <img
                src="/assets/logos/metacritic.svg"
                className="h-8 mr-3"
                alt="Metacritic"
            />
            <div className={`${getColor(value)} text-white px-3 py-1 rounded-full font-bold`}>
                {value.split('/')[0]}
            </div>
        </div>
    );
}