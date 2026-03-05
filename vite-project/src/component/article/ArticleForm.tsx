import { useState } from "react";
import { useArticleStore } from "../../useArticleStore";
import ArticleImage from "../ArticleImage";

const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition";
const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block";

export default function ArticleForm({ article, onClose }: any) {
    const { createArticle, updateArticle } = useArticleStore();

    const [form, setForm] = useState({
        title: article?.title || "",
        description: article?.description || "",
        image: article?.image || "",
        introduction: article?.introduction || "",
        sections: article?.sections || []
    });

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSectionChange = (index: number, field: string, value: string) => {
        const newSections = [...form.sections];
        newSections[index][field] = value;
        setForm({ ...form, sections: newSections });
    };

    const addSection = () => setForm({ ...form, sections: [...form.sections, { title: "", text: "" }] });

    const removeSection = (index: number) =>
        setForm({ ...form, sections: form.sections.filter((_: any, i: number) => i !== index) });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (article) { await updateArticle(article.id, form); }
        else { await createArticle(form); }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 flex-shrink-0">
                <div>
                    <h2 className="text-white font-semibold text-lg">
                        {article ? "Modifier l'article" : "Nouvel article"}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                        {article ? "Modifiez les champs puis enregistrez" : "Remplissez les informations de l'article"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

                {/* Infos principales */}
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Titre</label>
                        <input name="title" placeholder="Titre de l'article" value={form.title} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <input name="description" placeholder="Courte description" value={form.description} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Image (URL ou code SVG)</label>
                        <textarea
                            name="image"
                            placeholder="https://... ou <svg xmlns=...>...</svg>"
                            value={form.image}
                            onChange={handleChange}
                            rows={3}
                            className={inputClass}
                        />
                    </div>
                    {form.image && (
                        <div className="rounded-xl overflow-hidden h-40 bg-white/5 flex items-center justify-center p-2">
                            <ArticleImage
                                image={form.image}
                                alt="preview"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    )}
                    <div>
                        <label className={labelClass}>Introduction</label>
                        <textarea
                            name="introduction"
                            placeholder="Paragraphe d'introduction..."
                            value={form.introduction}
                            onChange={handleChange}
                            rows={4}
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Sections */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Sections ({form.sections.length})
                        </span>
                    </div>

                    <div className="space-y-3">
                        {form.sections.map((section: any, index: number) => (
                            <div key={index} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-semibold text-gray-500">Section {index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSection(index)}
                                        className="text-xs text-gray-600 hover:text-red-400 transition"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        placeholder="Titre de la section"
                                        value={section.title}
                                        onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                                        className={inputClass}
                                    />
                                    <textarea
                                        placeholder="Contenu de la section..."
                                        value={section.text}
                                        onChange={(e) => handleSectionChange(index, "text", e.target.value)}
                                        rows={4}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addSection}
                        className="mt-3 w-full border border-dashed border-white/10 hover:border-violet-500/50 text-gray-500 hover:text-violet-400 rounded-xl py-3 text-sm font-medium transition"
                    >
                        + Ajouter une section
                    </button>
                </div>

            </div>

            {/* Footer */}
            <div className="flex gap-3 px-8 py-5 border-t border-white/5 flex-shrink-0">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 py-2.5 rounded-lg text-sm font-medium transition"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-lg text-sm font-medium transition"
                >
                    {article ? "Enregistrer" : "Créer l'article"}
                </button>
            </div>

        </form>
    );
}
