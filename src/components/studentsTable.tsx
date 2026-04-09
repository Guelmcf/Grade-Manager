import type { Student } from '../types';

interface StudentTableProps {
    students: Student[]
    editingStudentId: string | null
    editStudent: (id: string) => void
    removeStudent: (id: string) => void
}

export function StudentTable(props: StudentTableProps) {

const { students, editingStudentId, editStudent, removeStudent } = props

    return (
        <div>
            <h1>Lista de Alunos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Frequência</th>
                        <th>Notas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}
                        className={student.id === editingStudentId? "bg-yellow-300": "bg-transparent"}>
                            <td>{student.name}</td>
                            <td>{student.attendance}%</td>
                            <td>{student.grades.join(', ')}</td>
                            <td>
                                <button onClick={() => editStudent(student.id)}>Editar</button>
                                <button onClick={() => removeStudent(student.id)}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
