import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:opacity-80">
            Infoweb - Gerenciador de Tarefas
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tarefas" className="hover:underline">
                  Tarefas
                </Link>
              </li>
              <li>
                <Link href="/tarefas/nova" className="hover:underline">
                  Nova Tarefa
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
