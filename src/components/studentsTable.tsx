import type { Student } from '../types';
import { IoPerson } from "react-icons/io5";
import { calculateAverage } from '../utils/calculations';

interface StudentTableProps {
    students: Student[]
    editingStudentId: string | null
    editStudent: (id: string) => void
    removeStudent: (id: string) => void
}

export function StudentTable(props: StudentTableProps) {

const { students, editingStudentId, editStudent, removeStudent } = props

    return (
        <div className="mb-4 pt-4 flex flex-col items-center justify-center gap-4">
            <div className="w-350 h-full bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold mb-2 flex items-center gap-2"><IoPerson />Lista de Alunos</h1>
            <table className="w-250">
                <thead className="bg-gray-300 p-2">
                    <tr>
                        <th>Nome</th>
                        <th>Notas</th>
                        <th>Media</th>
                        <th>Frequência</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className="w-250 text-center">
                    {students.map((student) => {
                        const studentAvg = calculateAverage(student.grades);
                        return (
                        <tr key={student.id}
                        className={student.id === editingStudentId? "bg-gray-300": "bg-transparent"}>
                            <td>{student.name}</td>
                            <td>
                            {student.grades.map((grade, index) => (
                                <span key={index} className={`font-bold gap-5 ${grade < 6 ? 'text-red-500' : grade < 7 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {grade.toFixed(1)}{index < 4 ? ',  ' : ''}
                                </span>
                            ))}
                            </td>
                            <td>
                                <span className={`font-bold ${studentAvg < 6 ? 'text-red-500' : studentAvg < 7 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {studentAvg.toFixed(2)}
                                </span>
                            </td>
                            <td className={`font-bold ${student.attendance < 75 ? 'text-red-500' : 'text-green-500'}`}>
                                {student.attendance}%
                            </td>
                            <td>
                                <button onClick={() => editStudent(student.id)} 
                                    className='bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 mt-2'
                                    >Editar</button>
                                <button onClick={() => removeStudent(student.id)} 
                                className='bg-red-500 text-white py-2 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>Remover</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>                
            </div>
        </div>
    )
}
