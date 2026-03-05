import {useEffect, useState} from "react";
import {useArticleStore} from "../../useArticleStore.ts";
import ArticleForm from "../article/ArticleForm.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../useAuthStore.ts";

export default function ArticleManager() {
    const {articles, fetchArticles, deleteArticle} = useArticleStore();
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const [editingArticle, setEditingArticle] = useState<any | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleCreate = () => {
        setEditingArticle(null);
        setShowForm(true);
    };
    const handleEdit = (article: any) => {
        setEditingArticle(article);
        setShowForm(true);
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingArticle(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleDelete = async (id: number) => {
        await deleteArticle(id);
        setDeleteConfirm(null);
    };

    return (
        <div className="min-h-screen flex bg-[#0f1117]">

            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[#161b27] border-r border-white/5 flex flex-col">
                <div className="px-6 py-6 border-b border-white/5">
                    <span className="text-white font-bold text-lg tracking-tight">Admin</span>
                    <span className="text-violet-400 font-bold text-lg tracking-tight"> Panel</span>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    <div className="px-3 py-1.5 mb-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contenu</span>
                    </div>
                    <div
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-violet-600/20 text-violet-300 text-sm font-medium cursor-default">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Articles
                        <span className="ml-auto bg-violet-500/30 text-violet-300 text-xs px-2 py-0.5 rounded-full">
                            {articles.length}
                        </span>
                    </div>
                </nav>

                <div className="px-3 py-4 border-t border-white/5 space-y-1">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 text-sm transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        Voir le blog
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-sm transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* Top bar */}
                <header
                    className="bg-[#161b27] border-b border-white/5 px-8 py-4 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h1 className="text-white font-semibold text-lg">Articles</h1>
                        <p className="text-gray-500 text-sm">{articles.length} article{articles.length !== 1 ? "s" : ""} au
                            total</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        Nouvel article
                    </button>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {articles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                            </div>
                            <p className="text-gray-400 font-medium">Aucun article pour l'instant</p>
                            <p className="text-gray-600 text-sm mt-1">Créez votre premier article</p>
                            <button
                                onClick={handleCreate}
                                className="mt-6 bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                            >
                                + Créer un article
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[#161b27] rounded-2xl border border-white/5 overflow-hidden bg-white-700">
                            {/* Table header */}
                            <div
                                className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 border-b border-white/5">
                                <span
                                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">Image</span>
                                <span
                                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</span>
                                <span
                                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sections</span>
                                <span
                                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</span>
                            </div>

                            {/* Rows */}
                            {articles.map((article: any, index: number) => (
                                <div
                                    key={article.id}
                                    className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition ${index !== articles.length - 1 ? "border-b border-white/5" : ""}`}
                                >
                                    {/* Image */}
                                    <div className="w-24 h-24 flex items-center justify-center rounded-lg overflow-hidden bg-white/5 mx-auto">
                                        {article.image ? (
                                            <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: article.image }} />) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title + desc */}
                                    <div className="min-w-0">
                                        <p className="text-white font-medium text-sm truncate">{article.title}</p>
                                        <p className="text-white text-xs mt-0.5 truncate">{article.description}</p>
                                        <button className="text-white mx-auto underline cursor-pointer"
                                                onClick={e => navigate(`/article/${article.id}`)}>Détail
                                        </button>
                                    </div>

                                    {/* Sections count */}
                                    <div className="flex items-center justify-center">
                                        <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
                                            {article.sections?.length ?? 0} section{(article.sections?.length ?? 0) !== 1 ? "s" : ""}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(article)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                            Modifier
                                        </button>
                                        {deleteConfirm === article.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition"
                                                >
                                                    Confirmer
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium transition"
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(article.id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 text-xs font-medium transition"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                </svg>
                                                Supprimer
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-end"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCloseForm();
                    }}
                >
                    <div className="h-full w-full max-w-2xl bg-[#161b27] border-l border-white/5 overflow-y-auto">
                        <ArticleForm article={editingArticle} onClose={handleCloseForm}/>
                    </div>
                </div>
            )}

        </div>
    );
}
