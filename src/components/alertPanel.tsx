import type { Student } from "../types";
import { studentsAboveClassAverage, studentsBelowAttendance } from "../utils/calculations";

interface AlertPanelProps {
    students: Student[]
}

export function AlertPanel(props: AlertPanelProps) {

    const { students } = props
    const aboveAverage = studentsAboveClassAverage(students)
    const belowAttendance = studentsBelowAttendance(students, 75)

    return (
        <div>
            <h1>Alertas</h1>
            <div>
                <h2>Alunos acima da média da turma:</h2>
                {aboveAverage.length === 0 ? (
                    <p>Nenhum aluno acima da média.</p>
                ) : (
                    <ul>
                        {aboveAverage.map(student => (
                            <li key={student.id}>{student.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h2>Alunos com baixa frequência:</h2>
                {belowAttendance.length === 0 ? (
                    <p>Nenhum aluno com baixa frequência.</p>
                ) : (
                    <ul>
                        {belowAttendance.map(student => (
                            <li key={student.id}>{student.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}