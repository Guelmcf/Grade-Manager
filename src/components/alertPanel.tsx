import type { Student } from "../types";
import { studentsAboveClassAverage, studentsBelowAttendance } from "../utils/calculations";
import { FiAlertTriangle } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";

interface AlertPanelProps {
    students: Student[]
}

export function AlertPanel(props: AlertPanelProps) {

    const { students } = props
    const aboveAverage = studentsAboveClassAverage(students)
    const belowAttendance = studentsBelowAttendance(students, 75)

    return (
        <div className="w-175 h-70 bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center ">
            <div>
                <h2 className="font-bold text-lg flex items-center gap-2"><FaRegThumbsUp className="text-green-500 text-lg"/> Alunos acima da média da turma:</h2>
                {aboveAverage.length === 0 ? (
                    <p>Nenhum aluno acima da média.</p>
                ) : (
                    <ul className="font-medium">
                        {aboveAverage.map(student => (
                            <li key={student.id}>
                                <span className="text-green-500 mr-2">●</span>
                                {student.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-15">
                <h2 className="font-bold text-lg flex items-center gap-2"><FiAlertTriangle className="text-yellow-500 text-lg"/> Alunos com baixa frequência:</h2>
                {belowAttendance.length === 0 ? (
                    <p>Nenhum aluno com baixa frequência.</p>
                ) : (
                    <ul className="font-medium">
                        {belowAttendance.map(student => (
                            <li key={student.id}>
                                <span className="text-red-500 mr-2">●</span>
                                {student.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}