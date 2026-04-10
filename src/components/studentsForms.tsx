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
const [errors, setErrors] = useState<Record<string, string>>({})

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

  function validateForm() {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }
    if (!formData.formAttendance.trim()) {
      newErrors.formAttendance = 'Frequência é obrigatória'
    } else {
      const attendance = Number(formData.formAttendance)
      if (isNaN(attendance) || attendance < 0 || attendance > 100) {
        newErrors.formAttendance = 'Frequência deve ser um número entre 0 e 100'
      }
    }
    formData.formGrades.forEach((grade, index) => {
      if (!grade.trim()) {
        newErrors[`formGrades-${index}`] = 'Nota é obrigatória'
      } else {
        const gradeValue = Number(grade)
        if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
          newErrors[`formGrades-${index}`] = 'Nota deve ser um número entre 0 e 10'
        }
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="pt-4 flex flex-col items-center justify-center gap-4">
      <div className="w-350 bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center" >
      <h1 className="text-xl font-bold mb-2 flex items-center gap-2"><FaPlus className="text-2xl mr-2"/> Adicionar Aluno</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!validateForm()) {
          return
        }
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
        placeholder='ex: Marcos' 
        className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label htmlFor="grade">Notas por disciplina (0-10):</label>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2">
            {formData.formGrades.map((grade, index) => (
              <div key={index} className="flex flex-col">
                <input
                  type="number"
                  value={grade}
                  placeholder={`D${index + 1}`}
                  onChange={(e) => {
                    const newGrades = [...formData.formGrades]
                    newGrades[index] = e.target.value
                    setFormData({ ...formData, formGrades: newGrades as [string,string,string,string,string] })
                  }}
                  min={0}
                  max={10}
                  step={0.1}
                  className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`formGrades-${index}`] && (
                  <p className="text-red-500 text-xs">{errors[`formGrades-${index}`]}</p>
                )}
              </div>
            ))}
          </div>

        </div>
        <label htmlFor="attendance">Frequência(%):</label>
        <input type="number" id="frequencia" name="attendance" 
        value={formData.formAttendance} onChange={(e) => setFormData({ ...formData, formAttendance: e.target.value })} 
        className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        min={0}
        max={100}
        step={1}
        placeholder='Ex: 85'
        />
        {errors.formAttendance && <p className="text-red-500 text-sm">{errors.formAttendance}</p>}
        <button type="submit"
        className="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:scale-105 hover:bg-blue-600 hover:transition hover:duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >{editingStudentId ? 'Atualizar Estudante' : 'Adicionar Estudante'}</button>
        {editingStudentId && <button type="button" onClick={cancelEdit} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Cancelar</button>}
      </form>
      </div>
    </div>
  )
}