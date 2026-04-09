import type { Student, StudentFormData } from '../types';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
interface StudentFormProps {
  students: Student[]
  editingStudentId: string | null
  addStudent: (data: StudentFormData) => void
  updateStudent: (id: string, data: StudentFormData) => void
  cancelEdit: () => void
}

export default function StudentForms(props: StudentFormProps) {

const { students, editingStudentId, addStudent, updateStudent, cancelEdit } = props
const [formData, setFormData] = useState<StudentFormData>({
  name: '',
  formAttendance: '',
  formGrades: ['', '', '', '', '']
})

useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  if (editingStudentId) {
    const student = students.find(s => s.id === editingStudentId)
    if (student) {
      setFormData({
        name: student.name,
        formAttendance: String(student.attendance),
        formGrades: student.grades.map(String) as [string,string,string,string,string]
      })
    }
  } else {
    setFormData({ name: '', formAttendance: '', formGrades: ['','','','',''] })
  }
}, [editingStudentId, students])

  return (
    <div className="pt-4 flex flex-col items-center justify-center gap-4">
      <div className="w-350 bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center" >
      <h1 className="text-xl font-bold mb-2 flex items-center gap-2"><FaPlus className="text-2xl mr-2"/> Adicionar Aluno</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (editingStudentId) {
          updateStudent(editingStudentId, formData)
        } else {
          addStudent(formData)
        }

        setFormData({
          name: '',
          formAttendance: '',
          formGrades: ['', '', '', '', '']
        })
      }}
      className="flex flex-col gap-2 w-full max-w-sm"
      >

        <label htmlFor="name">Nome do Aluno:</label>
        <input type="text" id="name" name="name" 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="grade">Notas por disciplina (0-10):</label>
        <div className="flex flex-row gap-2">
          {formData.formGrades.map((grade, index) => (
            <input
            type="number"
              key={index}
              value={grade}
              onChange={(e) => {
                const newGrades = [...formData.formGrades]
                newGrades[index] = e.target.value
                setFormData({ ...formData, formGrades: newGrades as [string,string,string,string,string] })
              }}
              className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <label htmlFor="attendance">Frequência(%):</label>
        <input type="number" id="frequencia" name="attendance" value={formData.formAttendance} onChange={(e) => setFormData({ ...formData, formAttendance: e.target.value })} className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit"
        className="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:scale-105 hover:bg-blue-600 hover:transition hover:duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >{editingStudentId ? 'Atualizar Estudante' : 'Adicionar Estudante'}</button>
        {editingStudentId && <button type="button" onClick={cancelEdit} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Cancelar</button>}
      </form>
      </div>
    </div>
  )
}