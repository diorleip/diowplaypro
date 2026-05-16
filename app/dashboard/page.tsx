"use client";

import Link from "next/link";
import {
  Home,
  Settings,
  Image,
  Trophy,
  Send,
  Users,
  MessageCircle,
  Crown,
  PlayCircle,
  Globe,
  CalendarDays,
  LogOut,
  Activity,
  ClipboardList,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },

  {
    title: "Chamar suporte",
    href: "https://wa.me/5547992027636",
    icon: MessageCircle,
  },

  // NOVO
  {
    title: "Guia futebol",
    href: "/dashboard/guia-futebol",
    icon: ClipboardList,
  },

  {
    title: "Gerar esporte",
    href: "/dashboard/esportes",
    icon: Trophy,
  },

  {
    title: "Gerar Vods",
    href: "/dashboard/video",
    icon: PlayCircle,
  },

  {
    title: "Gerar banner",
    href: "/dashboard/banner",
    icon: Image,
  },

  {
    title: "Gerar Divulgação",
    href: "/dashboard/divulgacao",
    icon: Send,
  },

  {
    title: "Link de indicação",
    href: "/dashboard/indicacao",
    icon: Globe,
  },

  {
    title: "Revendas",
    href: "/dashboard/revendas",
    icon: Crown,
  },

  {
    title: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
  },

  {
    title: "Configurações",
    href: "/dashboard/config",
    icon: Settings,
  },
];

const dashboardCards = [
  {
    title: "Gerador de banner",
    subtitle:
      "gere banners de filmes e series automaticamente",
    href: "/dashboard/banner",
    color: "bg-cyan-500",
    icon: Image,
  },

  {
    title: "Gerar video",
    subtitle:
      "gere vídeos de filmes e série automaticamente",
    href: "/dashboard/video",
    color: "bg-purple-500",
    icon: PlayCircle,
  },

  {
    title: "Gerar divulgação",
    subtitle:
      "gere vídeos de divulgação",
    href: "/dashboard/divulgacao",
    color: "bg-orange-500",
    icon: Send,
  },

  {
    title: "Gerar esporte",
    subtitle:
      "Gere sua artes de esporte automaticamente",
    href: "/dashboard/esportes",
    color: "bg-green-500",
    icon: Trophy,
  },

  {
    title: "Chamar suporte",
    subtitle: "Fale com seu master",
    href: "https://wa.me/5547992027636",
    color: "bg-emerald-500",
    icon: MessageCircle,
  },

  {
    title: "Configuração",
    subtitle:
      "cadastre sua logo e contato",
    href: "/dashboard/config",
    color: "bg-blue-500",
    icon: Settings,
  },

  {
    title: "Canal telegram",
    subtitle: "entrar",
    href: "https://t.me/+uslLfs3-3mM4ODAx",
    color: "bg-sky-500",
    icon: Send,
  },

  {
    title: "Sair",
    subtitle: "deslogar",
    href: "/",
    color: "bg-red-500",
    icon: LogOut,
  },
];

export default function DashboardPage() {
  // DATA LOGIN
  let createdAt =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "diow_created_at"
        )
      : null;

  // CRIAR DATA
  if (
    typeof window !== "undefined" &&
    !createdAt
  ) {
    createdAt = new Date().toISOString();

    localStorage.setItem(
      "diow_created_at",
      createdAt
    );
  }

  // EXPIRAÇÃO
  const createdDate = new Date(
    createdAt || new Date()
  );

  const expirationDate = new Date(
    createdDate
  );

  expirationDate.setDate(
    expirationDate.getDate() + 30
  );

  const today = new Date();

  const diffTime =
    expirationDate.getTime() -
    today.getTime();

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  let statusColor =
    "bg-green-500/20 text-green-400";

  if (diffDays <= 5) {
    statusColor =
      "bg-yellow-500/20 text-yellow-400";
  }

  if (diffDays <= 2) {
    statusColor =
      "bg-red-500/20 text-red-400";
  }

  // STATUS SERVIDOR
  const serverOnline = true;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-cyan-400/10 bg-[#050b1a]">
        {/* LOGO */}
        <div className="flex items-center gap-3 border-b border-cyan-400/10 p-4">
          <img
            src="/logo.png"
            alt="Diow Play"
            className="w-10"
          />

          <div>
            <h1 className="text-base font-bold">
              Diow{" "}
              <span className="text-cyan-400">
                Play
              </span>
            </h1>

            <p className="text-[11px] text-zinc-400">
              Painel Administrativo
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition-all hover:bg-cyan-500/10 hover:text-white"
                >
                  <Icon
                    size={17}
                    className="text-cyan-400"
                  />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <section className="ml-[240px] p-5">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between border-b border-cyan-400/10 pb-5">
          <div>
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <p className="mt-1 text-xs text-zinc-400">
              Painel Administrativo Diow Play
            </p>
          </div>

          {/* VENCIMENTO */}
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold ${statusColor}`}
          >
            <CalendarDays size={16} />

            <span>
              Vence em {diffDays} dias
            </span>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-[#0b1228] p-5 transition-all hover:border-cyan-400/30 hover:bg-[#111a35]"
              >
                {/* ÍCONE */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon
                    size={24}
                    className="text-white"
                  />
                </div>

                {/* TÍTULO */}
                <h2 className="text-xl font-bold">
                  {item.title}
                </h2>

                {/* TEXTO */}
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {item.subtitle}
                </p>
              </Link>
            );
          })}
        </div>

        {/* STATUS SERVIDOR */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1228] p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                serverOnline
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              <Activity
                size={24}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Status do servidor
              </h2>

              <p
                className={`mt-1 text-xs font-semibold ${
                  serverOnline
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {serverOnline
                  ? "Todos os sistemas operando normalmente"
                  : "Detectamos problemas no servidor"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}