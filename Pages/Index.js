import { useState } from "react";

export default function Home() {
  const [nicho, setNicho] = useState("");
  const [tipo, setTipo] = useState("");
  const [tom, setTom] = useState("");
  const [duracao, setDuracao] = useState("30");
  const [roteiro, setRoteiro] = useState("");
  const [loading, setLoading] = useState(false);

  const nichos = ["Marketing", "Saúde", "Humor", "Educação"];
  const tipos = ["Educativo", "Curiosidade", "Dica", "Motivacional"];
  const tons = ["Formal", "Informal", "Engraçado", "Direto"];

  async function gerarRoteiro() {
    if (!nicho || !tipo || !tom || !duracao) {
      alert("Por favor, preencha todas as opções!");
      return;
    }

    setLoading(true);
    setRoteiro("");

    try {
      const response = await fetch("/api/gerar-roteiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nicho, tipo, tom, duracao }),
      });
      const data = await response.json();
      setRoteiro(data.roteiro || "Erro ao gerar roteiro.");
    } catch (error) {
      setRoteiro("Erro na comunicação com o servidor.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">🎬 RoteiroFlash</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
        <div>
          <h2 className="font-semibold mb-2">Nicho</h2>
          <div className="flex flex-wrap gap-2">
            {nichos.map((n) => (
              <button
                key={n}
                onClick={() => setNicho(n)}
                className={`px-4 py-2 rounded ${nicho === n ? "bg-blue-600" : "bg-slate-700"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Tipo</h2>
          <div className="flex flex-wrap gap-2">
            {tipos.map((t) => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                className={`px-4 py-2 rounded ${tipo === t ? "bg-blue-600" : "bg-slate-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Tom de voz</h2>
          <div className="flex flex-wrap gap-2">
            {tons.map((t) => (
              <button
                key={t}
                onClick={() => setTom(t)}
                className={`px-4 py-2 rounded ${tom === t ? "bg-blue-600" : "bg-slate-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 max-w-4xl w-full">
        <label className="font-semibold">Duração (segundos):</label>
        <input
          type="number"
          min="5"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          className="px-3 py-1 rounded bg-slate-700 text-white w-24"
        />
      </div>

      <button
        onClick={gerarRoteiro}
        disabled={loading}
        className="mt-6 bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Gerando..." : "🚀 Gerar Roteiro"}
      </button>

      <pre className="mt-8 max-w-4xl w-full whitespace-pre-wrap bg-slate-800 p-6 rounded min-h-[300px]">
        {roteiro || "O roteiro gerado aparecerá aqui..."}
      </pre>
    </main>
  );
}
