import { Link, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useDarkMode } from "../hooks/useDarkMode";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();
  const isActive = (path: string) => location.pathname === path;

  return (
    /* AJUSTE: Adicionado dark:bg-slate-950 e dark:text-slate-100 para cobrir a tela toda */
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 dark:border-slate-800 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="flex items-center gap-2 font-black text-xl tracking-tighter text-indigo-600 dark:text-indigo-400"
            >
              EduHub
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-bold transition-colors ${
                  isActive("/")
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Biblioteca
              </Link>
              <Link
                to="/create"
                className={`text-sm font-bold transition-colors ${
                  isActive("/create")
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 dark:hover:text-white hover:text-slate-900"
                }`}
              >
                Novo Material
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              type="button"
              aria-label="Alternar tema"
              title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
              className="group relative p-2.5 rounded-xl  transition-all duration-200
               flex items-center justify-center cursor-pointer"
            >
              <i
                className={`bi ${isDark ? "bi-sun-fill text-amber-400" : "bi-moon-stars-fill text-indigo-600"} 
                  text-lg transition-transform duration-300 group-hover:scale-110`}
              />
            </button>

            <div className="relative group cursor-pointer">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full 
                     bg-linear-to-tr from-indigo-600 via-purple-600 to-pink-500 
                     text-[11px] font-bold text-white uppercase tracking-wider
                     shadow-lg shadow-indigo-500/20 border-2 border-white dark:border-slate-900
                     transition-transform duration-200 group-hover:scale-105"
              >
                AD
              </span>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <PageTransition key={location.pathname}>{children}</PageTransition>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center">
        Ambiente de Desenvolvimento • Educational Resources Hub
      </footer>
    </div>
  );
}
