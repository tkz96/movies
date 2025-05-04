import ImdbRating from './ImdbRating';
import RottenTomatoesRating from './RottenTomatoesRating';
import MetacriticRating from './MetacriticRating';

export default function RatingsContainer({ ratings, imdbVotes }) {
    const findRating = (source) => ratings.find(r => r.Source === source);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ImdbRating
                rating={parseFloat(findRating('Internet Movie Database')?.Value.split('/')[0])}
                votes={imdbVotes}
            />

            <RottenTomatoesRating
                value={findRating('Rotten Tomatoes')?.Value}
            />

            <MetacriticRating
                value={findRating('Metacritic')?.Value}
            />
        </div>
    );
}