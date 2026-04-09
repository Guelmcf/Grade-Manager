import type { Student } from '../types';
import { FaClipboardList } from "react-icons/fa";

interface HeaderProps {
    students: Student[]
}

export function Header(props: HeaderProps) {

    const { students } = props

    return (
        <header className="bg-gray-800 text-white p-4  fixed top-0 w-full z-50 shadow-lg">
            <h1 className="text-2xl font-bold flex items-center">
                <FaClipboardList className="mr-3 text-2xl" />
                Gerenciador de Notas e Frequência
            </h1>
            <p className="text-lg text-gray-150">Professor Carlos - <span className="font-bold">{students.length}</span> {students.length === 1 ? 'aluno cadastrado' : 'alunos cadastrados'} </p>
        </header>
    )
}