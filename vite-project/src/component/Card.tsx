import { Link } from "react-router-dom";
import { JSX } from "react";
import ArticleImage from "./ArticleImage";

type Article = {
    id: number;
    title: string;
    description: string;
    image: string;
};

type Props = {
    article: Article;
    featured?: boolean;
};

function Card({ article, featured = false }: Props): JSX.Element {
    if (featured) {
        return (
            <Link
                to={`/article/${article.id}`}
                className="group relative rounded-3xl overflow-hidden flex flex-col justify-end bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[420px]"
            >
                <div className="absolute inset-0">
                    <ArticleImage
                        image={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 p-8">
                    <span className="inline-block text-xs font-semibold bg-violet-500/80 text-white px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                        À la une
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-violet-200 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-gray-300 text-base line-clamp-2 mb-5">
                        {article.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-violet-600 hover:bg-violet-500 px-5 py-2.5 rounded-xl transition-colors">
                        Lire l'article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <Link
            to={`/article/${article.id}`}
            className="group bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl border border-gray-100 hover:border-violet-200 transition-all duration-300"
        >
            <div className="relative overflow-hidden h-44 bg-gray-100">
                <ArticleImage
                    image={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-violet-700 transition-colors">
                    {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                    {article.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-violet-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Lire l'article
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}

export default Card;
