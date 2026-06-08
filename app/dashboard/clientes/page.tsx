"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import BackButton from "@/app/components/BackButton";

interface Cliente {
  id: string;
  nome?: string;
  username: string;
  whatsapp?: string;
  email?: string;
  status: string;
  plano?: string;
  expiraEm?: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] =
  useState(false);
  const [modalEditar, setModalEditar] =
  useState(false);
  const [clienteEditando, setClienteEditando] =
  useState<Cliente | null>(null);
  const [filtro, setFiltro] =
  useState("TODOS");
  const [menuRenovacao, setMenuRenovacao] =
    useState<string | null>(null);
  const menuRef =
    useRef<HTMLDivElement>(null);
  const [nome, setNome] = useState("");
  const [username, setUsername] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [whatsapp, setWhatsapp] =
    useState("");
  const [plano, setPlano] =
    useState("30 Dias");
  const [dias, setDias] = useState(30);
  
  useEffect(() => {
    carregarClientes();
  }, []);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuRenovacao(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function carregarClientes() {
    try {
      const res = await fetch(
        "/api/clientes"
      );

      const data = await res.json();

      setClientes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function criarCliente() {
    try {
      const res = await fetch(
        "/api/clientes/criar",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            nome,
            username,
            password,
            whatsapp,
            plano,
            dias,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert(
        "Cliente criado com sucesso!"
      );

      setModalAberto(false);

      setNome("");
      setUsername("");
      setPassword("");
      setWhatsapp("");

      carregarClientes();
    } catch (error) {
      console.error(error);
    }
  }

  async function bloquearCliente(
    id: string
  ) {
    await fetch(
      "/api/clientes/bloquear",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    carregarClientes();
  }

  async function desbloquearCliente(
    id: string
  ) {
    await fetch(
      "/api/clientes/desbloquear",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    carregarClientes();
  }

  async function salvarEdicao() {
  if (!clienteEditando) return;

  try {
    const res = await fetch(
      "/api/clientes/editar",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: clienteEditando.id,
          nome,
          username,
          password,
          whatsapp,
          plano,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert(
      "Cliente atualizado com sucesso!"
    );

    setModalEditar(false);

    carregarClientes();
  } catch (error) {
    console.error(error);

    alert(
      "Erro ao atualizar cliente"
    );
  }
}
  async function excluirCliente(
    id: string
  ) {
    const confirmar = confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) return;

    await fetch(
      "/api/clientes/excluir",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    carregarClientes();
  }

  async function renovarCliente(
    id: string,
    dias: number
  ) {
    const confirmar = confirm(
      `Renovar mais ${dias} dias?`
    );

    if (!confirmar) return;

    await fetch(
      "/api/clientes/renovar",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
          dias,
        }),
      }
    );

    setMenuRenovacao(null);

    carregarClientes();
  }

  function abrirWhatsapp(cliente: Cliente) {
    const data =
      cliente.expiraEm
        ? new Date(
            cliente.expiraEm
          ).toLocaleDateString("pt-BR")
        : "Sem validade";

    const mensagem = `Olá ${
      cliente.nome || cliente.username
    }! 👋

Seu acesso ao Gerador DiowPlay🚀 está ativo.

📅 Plano: ${
      cliente.plano || "Não informado"
    }

📆 Expira em: ${data}

Qualquer dúvida estou à disposição.`;

    const numero = (
      cliente.whatsapp || ""
    ).replace(/\D/g, "");

    window.open(
      `https://wa.me/55${numero}?text=${encodeURIComponent(
        mensagem
      )}`,
      "_blank"
    );
  }

  const clientesFiltrados =
    clientes.filter((cliente) =>
      `${cliente.nome || ""} ${
        cliente.username
      }`
        .toLowerCase()
        .includes(busca.toLowerCase())
    );

  const totalClientes =
    clientes.length;

  const totalAtivos =
    clientes.filter(
      (c) => c.status === "ATIVO"
    ).length;

  const totalBloqueados =
    clientes.filter(
      (c) => c.status === "BLOQUEADO"
    ).length;

const hoje = new Date();

hoje.setHours(0, 0, 0, 0);

const vencemHoje = clientes.filter((c) => {
  if (!c.expiraEm) return false;

  const data = new Date(c.expiraEm);

  data.setHours(0, 0, 0, 0);

  return data.getTime() === hoje.getTime();
}).length;

const vencem7Dias = clientes.filter((c) => {
  if (!c.expiraEm) return false;

  const data = new Date(c.expiraEm);

  data.setHours(0, 0, 0, 0);

  const diff =
    (data.getTime() - hoje.getTime()) /
    (1000 * 60 * 60 * 24);

  return diff > 0 && diff <= 7;
}).length;

const expirados = clientes.filter((c) => {
  if (!c.expiraEm) return false;

  const data = new Date(c.expiraEm);

  data.setHours(0, 0, 0, 0);

  return data.getTime() < hoje.getTime();
}).length;

  return (
    <div className="p-6">
      
      <BackButton />

      <h1 className="text-3xl font-bold text-white mb-6">
        👥 Clientes
      </h1>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            Total Clientes
          </p>

          <h2 className="text-3xl font-bold text-white">
            {totalClientes}
          </h2>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            Ativos
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            {totalAtivos}
          </h2>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            Bloqueados
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            {totalBloqueados}
          </h2>
        </div>
      <div className="bg-[#111827] p-4 rounded-xl">
  <p className="text-gray-400 text-sm">
    ⏰ Vencem Hoje
  </p>

  <h2 className="text-3xl font-bold text-orange-500">
    {vencemHoje}
  </h2>
</div>

<div className="bg-[#111827] p-4 rounded-xl">
  <p className="text-gray-400 text-sm">
    ⚠️ Vencem em 7 Dias
  </p>

  <h2 className="text-3xl font-bold text-yellow-500">
    {vencem7Dias}
  </h2>
</div>

<div className="bg-[#111827] p-4 rounded-xl">
  <p className="text-gray-400 text-sm">
    ❌ Expirados
  </p>

  <h2 className="text-3xl font-bold text-red-700">
    {expirados}
  </h2>
</div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        </div>
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
          className="flex-1 bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-white"
        />

        <button
          onClick={() =>
            setModalAberto(true)
          }
          className="px-5 py-3 bg-[#0066FF] rounded-xl text-white"
        >
          ➕ Novo Cliente
        </button>
      </div>

      <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937]">
        {loading ? (
          <p className="text-gray-400">
            Carregando...
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="py-3">Nome</th>
                <th>Usuário</th>
                <th>WhatsApp</th>
                <th>Status</th>
                <th>Plano</th>
                <th>Expira em</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="border-b border-gray-800"
                >
                  <td className="py-3">
                    {cliente.nome || "-"}
                  </td>

                  <td>{cliente.username}</td>

                  <td>
                    {cliente.whatsapp ? (
                      <a
                        href={`https://wa.me/55${cliente.whatsapp.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300"
                      >
                        📱 {cliente.whatsapp}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        cliente.status === "ATIVO"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {cliente.status}
                    </span>
                  </td>

                  <td>{cliente.plano || "-"}</td>

                  <td>
                    {cliente.expiraEm
                      ? new Date(
                          cliente.expiraEm
                        ).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </td>

                  <td>
                    <div
                      className="flex gap-2 relative"
                      ref={menuRef}
                    >
                      <div className="relative">
                        <button
                          onClick={() =>
                            setMenuRenovacao(
                              menuRenovacao ===
                                cliente.id
                                ? null
                                : cliente.id
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white"
                          title="Renovar"
                        >
                          🔄
                        </button>

                        {menuRenovacao ===
                          cliente.id && (
                          <div className="absolute top-10 left-0 z-50 bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-xl min-w-[140px]">

                            {[30, 60, 90, 180, 365].map(
                              (dias) => (
                                <button
                                  key={dias}
                                  onClick={() =>
                                    renovarCliente(
                                      cliente.id,
                                      dias
                                    )
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-[#1f2937] text-white"
                                >
                                  {dias} Dias
                                </button>
                              )
                            )}

                          </div>
                        )}
                      </div>

                      {cliente.status ===
                      "ATIVO" ? (
                        <button
                          onClick={() =>
                            bloquearCliente(
                              cliente.id
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-red-600 text-white"
                          title="Bloquear"
                        >
                          🔒
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            desbloquearCliente(
                              cliente.id
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-green-600 text-white"
                          title="Desbloquear"
                        >
                          🔓
                        </button>
                      )}

       <button
  onClick={() => {
    setClienteEditando(cliente);

    setNome(
      cliente.nome || ""
    );

    setUsername(
      cliente.username
    );

    setWhatsapp(
      cliente.whatsapp || ""
    );

    setPlano(
      cliente.plano || "30 Dias"
    );

    setPassword("");

    setModalEditar(true);
  }}
  className="px-3 py-1 rounded-lg bg-yellow-600 text-white"
  title="Editar Cliente"
>
  ✏️
</button>

                      <button
  onClick={() =>
    abrirWhatsapp(
      cliente
    )
  }
  className="px-3 py-1 rounded-lg bg-green-700 text-white"
  title="Mensagem WhatsApp"
>
  💬
</button>

                      <button
                        onClick={() =>
                          excluirCliente(
                            cliente.id
                          )
                        }
                        className="px-3 py-1 rounded-lg bg-gray-700 text-white"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111827] w-full max-w-md rounded-2xl p-6 border border-[#1f2937]">
            <h2 className="text-2xl font-bold text-white mb-4">
              ➕ Novo Cliente
            </h2>

            <div className="space-y-3">

              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="text"
                placeholder="WhatsApp"
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(e.target.value)
                }
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />

              <select
                value={plano}
                onChange={(e) =>
                  setPlano(e.target.value)
                }
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
              >
                <option>30 Dias</option>
                <option>60 Dias</option>
                <option>90 Dias</option>
                <option>180 Dias</option>
                <option>365 Dias</option>
              </select>

              <input
                type="number"
                value={dias}
                onChange={(e) =>
                  setDias(Number(e.target.value))
                }
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setModalAberto(false)
                  }
                  className="flex-1 py-3 rounded-xl bg-gray-700 text-white"
                >
                  Cancelar
                </button>

                <button
                  onClick={criarCliente}
                  className="flex-1 py-3 rounded-xl bg-[#0066FF] text-white"
                >
                  Criar Cliente
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      {modalEditar && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-[#111827] w-full max-w-md rounded-2xl p-6 border border-[#1f2937]">

      <h2 className="text-2xl font-bold text-white mb-4">
        ✏️ Editar Cliente
      </h2>

      <div className="space-y-3">

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="password"
          placeholder="Nova senha (opcional)"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={(e) =>
            setWhatsapp(e.target.value)
          }
          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
        />

        <select
          value={plano}
          onChange={(e) =>
            setPlano(e.target.value)
          }
          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-3 text-white"
        >
          <option>30 Dias</option>
          <option>60 Dias</option>
          <option>90 Dias</option>
          <option>180 Dias</option>
          <option>365 Dias</option>
        </select>

        <div className="flex gap-3">

          <button
            onClick={() =>
              setModalEditar(false)
            }
            className="flex-1 py-3 rounded-xl bg-gray-700 text-white"
          >
            Cancelar
          </button>

         <button
  onClick={salvarEdicao}
  className="flex-1 py-3 rounded-xl bg-yellow-600 text-white"
>
  Salvar
</button>

        </div>

      </div>

    </div>
  </div>
)}
    </div>
  );
}