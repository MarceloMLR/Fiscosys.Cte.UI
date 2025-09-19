import React, { useState, useEffect } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import ErrorDetailsModal from './ErrorDetailsModal';
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
// Tipagem para os dados de resumo
interface Summary {
    id: string;
    cnpj: string;
    data: string;
    status: string;
    totalArquivos: number;
    processados: number;
    erros: number;
    horarioInicio: string | null;
    horarioFim: string | null;
}

// Dados de exemplo (Mock Data)
const mockSummaries: { items: Summary[] } = {
    items: [
        { id: "06321409001320_2025-09-15", cnpj: "06.321.409/0013-20", data: "2025-09-15", status: "Finalizado com Erros", totalArquivos: 1807, processados: 1801, erros: 6, horarioInicio: "16:03:53", horarioFim: "16:36:00" },
        { id: "18976884000180_2025-09-15", cnpj: "18.976.884/0001-80", data: "2025-09-15", status: "Finalizado", totalArquivos: 500, processados: 500, erros: 0, horarioInicio: "14:01:10", horarioFim: "14:15:22" },
        { id: "24217653000276_2025-09-14", cnpj: "24.217.653/0002-76", data: "2025-09-14", status: "Carregando", totalArquivos: 2000, processados: 850, erros: 0, horarioInicio: "09:30:00", horarioFim: null },
    ]
};

 function StatusIndicator({ status }: { status: string }) {
  if (status?.includes("Erro")) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
        <XCircle className="h-4 w-4" /> Finalizado com Erros
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

export default function SummariesTable() {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setSummaries(mockSummaries.items);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleShowErrors = (summary: Summary) => {
        setSelectedSummary(summary);
        setIsModalOpen(true);
    };
    


    return (
        <>
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl">Histórico de Cargas</CardTitle>
                    <CardDescription>Acompanhe o estado de processamento dos seus ficheiros CT-e.</CardDescription>
                </CardHeader>
                <CardContent>
                     {/* --- ÁREA DE FILTROS REFATORADA --- */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow w-full">
                            <Input placeholder="Filtrar por CNPJ..." />
                            <Input type="date" />
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Filtrar por Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="carregando">Carregando</SelectItem>
                                    <SelectItem value="finalizado">Finalizado</SelectItem>
                                    <SelectItem value="erro">Finalizado com Erros</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full sm:w-auto">
                           <Button size="sm" className=' cursor-pointer bg-[#0072CE] hover:bg-[#001A72] w-full'>
                                <Filter className="h-4 w-4 mr-2" />
                                Pesquisar
                            </Button>
                        </div>
                        </div>
                    
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">CNPJ</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Data</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Início</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Fim</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Status</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Total</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Processados</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Erros</TableHead>
                                    <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={9} className="text-center h-24 text-muted-foreground">Carregando dados...</TableCell></TableRow>
                                ) : (
                                    summaries.map((summary) => (
                                        <TableRow key={summary.id}>
                                            <TableCell className="font-medium">{summary.cnpj}</TableCell>
                                            <TableCell className="text-muted-foreground">{summary.data}</TableCell>
                                            <TableCell className="text-muted-foreground">{summary.horarioInicio || '---'}</TableCell>
                                            <TableCell className="text-muted-foreground">{summary.horarioFim || '---'}</TableCell>
                                            <TableCell>
                                               <StatusIndicator status={summary.status} />                                               
                                            </TableCell>
                                            <TableCell>{summary.totalArquivos}</TableCell>
                                            <TableCell className="text-green-600 dark:text-green-400">{summary.processados}</TableCell>
                                            <TableCell className="text-red-600 dark:text-red-400">{summary.erros}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" disabled={summary.erros === 0} onClick={() => handleShowErrors(summary)}>
                                                    Detalhes
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                        A mostrar <strong>1-10</strong> de <strong>32</strong> resultados
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button className=' cursor-pointer bg-[#0072CE] hover:bg-[#001A72]' variant="default" size="sm"><ChevronLeft className="h-4 w-4" />Anterior</Button>
                        <Button className='cursor-pointer bg-[#0072CE] hover:bg-[#001A72]' variant="default" size="sm">Próximo <ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </CardFooter>
            </Card>

            <ErrorDetailsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                summary={selectedSummary}
            />
        </>
    );
}

