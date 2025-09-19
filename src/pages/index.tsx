import React from 'react';
import Header from '@/components/dashboard/Header';
import SummariesTable from '@/components/dashboard/SummariesTable';

export default function DashboardPage() {
    // TODO: A lógica de autenticação e os dados do utilizador virão de um Context aqui.
    const userName = "Marcelo Ribeiro";
    const handleLogout = () => alert("A terminar sessão...");

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userName={userName} onLogout={handleLogout} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SummariesTable />
            </main>
        </div>
    );
}

