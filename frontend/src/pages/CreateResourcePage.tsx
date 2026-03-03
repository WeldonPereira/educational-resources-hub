import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import { generateDescription } from "../services/aiService";
import { createResource } from "../services/resourceService";

export default function CreateResourcePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "PDF",
    description: "",
    url: "",
    tagsInput: "",
  });

  const handleAIAutoFill = async () => {
    if (!form.title)
      return toast.warning("Digite um título para a IA trabalhar.");
    setIsGenerating(true);
    try {
      const res = await generateDescription(form.title, form.type);

      setForm((prev) => ({
        ...prev,
        description: res.description,
        tagsInput: res.tags ? res.tags.join(", ") : prev.tagsInput,
      }));
      toast.success("Descrição e tags geradas!");
    } catch (err) {
      toast.error("Erro ao conectar com a IA.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      type: form.type,
      description: form.description || null,
      url: form.url,
      tags: form.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };

    try {
      await createResource(payload);
      toast.success("Material criado com sucesso!");
      navigate("/");
    } catch (err: any) {
      toast.error("Erro ao salvar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Novo Material
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Título
              </label>
              <input
                required
                className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition"
                placeholder="Ex: Arquitetura de Sistemas"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Tipo
              </label>
              <select
                className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-3 bg-white border outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="PDF">PDF</option>
                <option value="VIDEO">Vídeo</option>
                <option value="LINK">Link</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              URL (Inicie com http:// ou https://)
            </label>
            <input
              required
              type="url"
              className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition"
              placeholder="https://exemplo.com/material"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Tags (separadas por vírgula)
            </label>
            <input
              className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition"
              placeholder="python, fastapi, backend"
              value={form.tagsInput}
              onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Descrição
              </label>
              <button
                type="button"
                onClick={handleAIAutoFill}
                disabled={isGenerating}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                {isGenerating
                  ? "Gerando descrição profissional..."
                  : "✨ Gerar descrição profissional"}
              </button>
            </div>
            <textarea
              className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition text-slate-600"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-2 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 dark:shadow-none disabled:opacity-50"
            >
              {loading ? "Salvando no Banco..." : "Confirmar e Salvar"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}