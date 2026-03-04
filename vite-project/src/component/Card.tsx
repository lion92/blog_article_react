import { Link } from "react-router-dom";
import { JSX } from "react";

type Article = {
    id: number;
    title: string;
    description: string;
    image: string;
};

type Props = {
    article: Article;
};

function Card({ article }: Props): JSX.Element {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">

            <div className="overflow-hidden h-48">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">
                    {article.description}
                </p>

                <Link
                    to={`/article/${article.id}`}
                    className="inline-flex items-center gap-1 text-violet-600 font-semibold hover:text-violet-800 transition text-sm"
                >
                    Lire l'article →
                </Link>
            </div>

        </div>
    );
}

export default Card;
