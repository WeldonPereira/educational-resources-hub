import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import { api } from "../api/client";
import { updateResource } from "../services/resourceService";
import { generateDescription } from "../services/aiService";

export default function EditResourcePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "PDF",
    description: "",
    url: "",
    tagsInput: "",
  });

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await api.get(`/resources/${id}`);
        const data = response.data;

        setForm({
          title: data.title,
          type: data.type,
          description: data.description || "",
          url: data.url,
          tagsInput: data.tags?.map((t: any) => t.name).join(", ") || "",
        });
      } catch (err) {
        toast.error("Recurso não encontrado.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResource();
  }, [id, navigate]);

  const handleAIAutoFill = async () => {
    if (!form.title) return toast.warning("Título necessário");
    setIsGenerating(true);
    try {
      const res = await generateDescription(form.title, form.type);
      setForm((prev) => ({ ...prev, description: res.description }));
      toast.success("Campos atualizados pela IA.");
    } catch (err) {
      toast.error("Falha na IA.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title: form.title,
      type: form.type,
      description: form.description,
      url: form.url,
      tags: form.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };

    try {
      await updateResource(Number(id), payload);
      toast.success("Alterações salvas!");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao atualizar.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <MainLayout>
        <div className="flex justify-center py-20">
          <p className="text-slate-400 animate-bounce font-bold">
            Buscando dados no servidor...
          </p>
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400"
          >
            ←
          </button>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Editar Material <span className="text-indigo-500">#{id}</span>
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">
                Título do Recurso
              </label>
              <input
                required
                className="w-full bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">
                Formato
              </label>
              <select
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold text-slate-700 dark:text-slate-200"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="PDF">📑 PDF</option>
                <option value="VIDEO">🎥 Vídeo</option>
                <option value="LINK">🔗 Link</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">
              Endereço (URL)
            </label>
            <input
              required
              type="url"
              className="w-full bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">
              Tags (Vírgula para separar)
            </label>
            <input
              className="w-full bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="ex: Design, UI, Frontend"
              value={form.tagsInput}
              onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Resumo do Conteúdo
              </label>
              <button
                type="button"
                onClick={handleAIAutoFill}
                disabled={isGenerating}
                className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition disabled:opacity-50"
              >
                {isGenerating ? "Refazendo..." : "✨ IA: Sugerir Novo Resumo"}
              </button>
            </div>
            <textarea
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-600 dark:text-slate-300 leading-relaxed"
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 px-8 py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Descartar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-2 bg-slate-900 dark:bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-black dark:hover:bg-indigo-700 transition shadow-xl shadow-slate-200 dark:shadow-none disabled:opacity-50"
            >
              {isSaving ? "Salvando Alterações..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}