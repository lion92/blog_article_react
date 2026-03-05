import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../useAuthStore.ts";

const MAX_ATTEMPTS = 5;

function Login() {
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();

    const remaining = MAX_ATTEMPTS - attempts;
    const locked = remaining <= 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (locked) return;

        const success = login(password);
        if (success) {
            navigate("/admin/articles");
        } else {
            setAttempts((a) => a + 1);
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/20 mb-4">
                        <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-white font-bold text-2xl">Admin Panel</h1>
                    <p className="text-gray-500 text-sm mt-1">Connectez-vous pour accéder au tableau de bord</p>
                </div>

                {/* Card */}
                <div className="bg-[#161b27] border border-white/5 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={locked}
                                autoFocus
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 disabled:opacity-40 transition"
                            />
                        </div>

                        {/* Feedback */}
                        {attempts > 0 && !locked && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-400 text-sm">
                                    Mot de passe incorrect — {remaining} tentative{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""}
                                </p>
                            </div>
                        )}

                        {locked && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                <p className="text-red-400 text-sm font-medium">
                                    Accès bloqué après {MAX_ATTEMPTS} tentatives. Rechargez la page pour réessayer.
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={locked}
                            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-semibold transition"
                        >
                            Se connecter
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;
