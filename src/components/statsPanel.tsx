import type { Student } from '../types';
import { calculateAverage, calculateClassAverage } from '../utils/calculations';
interface StatsPanelProps {
    students: Student[]
}

export function StatsPanel(props: StatsPanelProps) {

    const { students } = props

    return (
        <div>
            <div>
            {students.length === 0 ? (
            <p>Nenhum aluno cadastrado.</p>
            ) : (
            <>
                <p>Total de alunos: {students.length}</p>
                <p>Média da turma por disciplina: {students.length > 0 ? students[0].grades.map((_, index) => calculateClassAverage(students, index).toFixed(2)).join(', ') : 'N/A'}</p>
                <p>Média geral da turma: {calculateAverage(students.map(s => calculateAverage(s.grades))).toFixed(2)}</p>

            </>
            )}
 
            </div>
        </div>
    )
}