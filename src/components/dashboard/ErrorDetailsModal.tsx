import React from 'react';
import { FileJson, FileCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// --- TIPAGEM ---
interface ProcessingError {
  id: string;
  timestamp: string;
  errorMessage: string;
}

// O tipo Summary precisa de ser exportado para ser usado noutros ficheiros
export interface Summary {
  id: string;
  cnpj: string;
  data: string;
  // Adicione outros campos se necessário
}

interface ErrorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: Summary | null;
}

// --- DADOS DE EXEMPLO (MOCK DATA) ---
const mockErrors: ProcessingError[] = [
  {
    id: 'err1',
    timestamp: '2025-09-15T16:33:42Z',
    errorMessage:
      "Erro ao submeter o DFe. Status: BadRequest. Detalhes: 'Codigo' não pode ser nulo.",
  },
  {
    id: 'err2',
    timestamp: '2025-09-15T16:34:10Z',
    errorMessage:
      'Erro da Avalara: Ocorreu um erro de validação fiscal para o item X.',
  },
];

// --- COMPONENTE ---
export default function ErrorDetailsModal({
  isOpen,
  onClose,
  summary,
}: ErrorDetailsModalProps) {
  if (!isOpen) return null;

  // TODO: Fazer a chamada à API para buscar os erros reais aqui
  const errors = mockErrors;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl text-black">
            Detalhes dos Erros
          </DialogTitle>
          <DialogDescription>
            Erros encontrados para o CNPJ {summary?.cnpj} no dia {summary?.data}.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <Table>
            <TableHeader className='text-center'>
              <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Data/Hora</TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Mensagem</TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-center">Downloads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-black'>
              {errors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {new Date(error.timestamp).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="whitespace-normal text-sm">
                    {error.errorMessage}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <div className="flex justify-end space-x-2">
                        {/* Botão de Download do XML */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="bg-green-500 text-white hover:bg-green-600 gap-1" variant="default" size="sm" asChild >
                              <a href={`/api/errors/${error.id}/xml`}>
                                <FileCode className="h-4 w-4" />
                                XML
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Baixar XML Original</TooltipContent>
                        </Tooltip>

                        {/* Botão de Download do JSON */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                             <Button variant="outline" size="sm" asChild className="bg-gray-500 text-white hover:bg-gray-600 hover:text-white gap-1">
                              <a href={`/api/errors/${error.id}/json`}>
                                <FileJson className="h-4 w-4" />
                                JSON
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Baixar JSON Enviado</TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}