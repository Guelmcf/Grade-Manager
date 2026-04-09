import type { Student } from '../types';
import { calculateAverage, calculateClassAverage } from '../utils/calculations';
import { IoStatsChart } from "react-icons/io5";
interface StatsPanelProps {
    students: Student[]
}

export function StatsPanel(props: StatsPanelProps) {

    const { students } = props

    return (
        <div className="w-175 h-70 bg-gray-100 rounded-lg p-4 shadow-lg flex flex-row justify-center items-center" >
            <div>
            {students.length === 0 ? (
            <p>Nenhum aluno cadastrado.</p>
            ) : (
            <>
            <div className='flex flex-col gap-2'>
            <h2 className='flex items-center gap-2 font-bold text-lg'><IoStatsChart /> Estatísticas da turma</h2>
            {students[0].grades.map((_, index) => {
                const avg = calculateClassAverage(students, index)
                return (
                <p key={index}>
                    Disciplina {index + 1}: <span className={`font-bold ${avg < 6 ? 'text-red-500' : avg < 7 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {avg.toFixed(2)}
                    </span>
                </p>
                )
            })}
            <div className="bg-gray-200 p-2 rounded-md mt-4 flex flex-col gap-2">
                <p>Média geral: <span className='font-bold'>{calculateAverage(students.map(s => calculateAverage(s.grades))).toFixed(2)}</span></p>
            </div>

            </div>
            </>
            )}
 
            </div>
        </div>
    )
}