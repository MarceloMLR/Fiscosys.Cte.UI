// Novo componente simples para Status
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function StatusIndicator({ status }: { status: string }) {
  if (status?.includes("Erro")) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
        <XCircle className="h-4 w-4" /> Erro
      </span>
    );
  }
  if (status === "Finalizado") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle2 className="h-4 w-4" /> Finalizado
      </span>
    );
  }
  if (status === "Carregando") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse">
        <Loader2 className="h-4 w-4 animate-spin" /> Carregando
      </span>
    );
  }
  return <span className="text-muted-foreground">{status}</span>;
}
