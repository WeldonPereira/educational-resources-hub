import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { getResources, deleteResource } from "../services/resourceService";
import type { Resource } from "../types/resource";
import MainLayout from "../layouts/MainLayout";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const navigate = useNavigate();

  // Estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getResources(currentPage, pageSize);
      setResources(response.data);
      setTotal(response.total);
    } catch (err) {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number, title: string) => {
    setSelectedResource({ id, title });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedResource) return;

    try {
      await deleteResource(selectedResource.id);
      toast.info("Recurso removido com sucesso.");
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      toast.error("Não foi possível excluir o recurso.");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Biblioteca
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {total}{" "}
            {total === 1 ? "recurso catalogado" : "recursos catalogados"} no
            MySQL.
          </p>
        </div>
        <button
          onClick={() => navigate("/create")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 dark:shadow-none"
        >
          + Novo Material
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center w-16">
                  ID
                </th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Material
                </th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Tipo
                </th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden lg:table-cell">
                  Tags
                </th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {resources.map((res) => (
                <tr
                  key={res.id}
                  className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors"
                >
                  <td className="px-6 py-5 text-center text-slate-400 dark:text-slate-600 font-mono text-sm">
                    #{res.id}
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {res.title}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 truncate max-w-xs italic">
                      {res.url}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg tracking-tight uppercase ${
                        res.type === "VIDEO"
                          ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
                          : res.type === "PDF"
                            ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                            : "bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {res.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="flex gap-1.5 flex-wrap max-w-50">
                      {res.tags.length > 0 ? (
                        res.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-bold"
                          >
                            {tag.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-300 dark:text-slate-600">
                          Sem tags
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-4">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        🔗
                      </a>
                      <button
                        onClick={() => navigate(`/edit/${res.id}`)}
                        className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => openDeleteModal(res.id, res.title)}
                        className="text-sm font-bold text-rose-600 hover:text-rose-800 dark:hover:text-rose-400"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl w-full"
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800"
            >
             
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Tem certeza disso?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                Você está prestes a excluir o recurso{" "}
                <span className="font-bold text-slate-900 dark:text-slate-200">
                  "{selectedResource?.title}"
                </span>
                . Esta ação não pode ser desfeita.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-95"
                >
                  Excluir Agora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </MainLayout>
  );
}
