import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3005/articles";

/* Types */

interface Section {
    id: number;
    title: string;
    text: string;
}

export interface Article {
    id: number;
    title: string;
    description: string;
    image: string;
    introduction: string;
    sections: Section[];
}

interface ArticleStore {
    articles: Article[];
    article: Article | null;
    loading: boolean;

    fetchArticles: () => Promise<void>;
    fetchArticle: (id: number) => Promise<void>;
    createArticle: (data: Partial<Article>) => Promise<void>;
}

/* Store */

export const useArticleStore = create<ArticleStore>((set) => ({
    articles: [],
    article: null,
    loading: false,

    fetchArticles: async () => {
        set({ loading: true });

        try {
            const res = await axios.get<Article[]>(API_URL);

            set({
                articles: res.data,
                loading: false
            });

        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    fetchArticle: async (id: number) => {
        set({ loading: true });

        try {
            const res = await axios.get<Article>(`${API_URL}/${id}`);

            set({
                article: res.data,
                loading: false
            });

        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    createArticle: async (data: Partial<Article>) => {
        try {
            const res = await axios.post<Article>(API_URL, data);

            set((state) => ({
                articles: [...state.articles, res.data]
            }));

        } catch (error) {
            console.error(error);
        }
    },
    
    updateArticle: async (id: number, data: Partial<Article>) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, data);

            set((state) => ({
                articles: state.articles.map((a) =>
                    a.id === id ? res.data : a
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    },

    deleteArticle: async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);

            set((state) => ({
                articles: state.articles.filter((a) => a.id !== id),
            }));
        } catch (error) {
            console.error(error);
        }
    }
}));