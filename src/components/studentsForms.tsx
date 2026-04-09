import type { Student, StudentFormData } from '../types';
import { useState } from 'react';
import { useEffect } from 'react';
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
}, [editingStudentId])

  return (
    <div>
      <h1>Adicionar Aluno</h1>
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
      }}>

        <label htmlFor="name">Nome do Aluno:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <label htmlFor="grade">Notas por disciplina:</label>
        {formData.formGrades.map((grade, index) => (
            <input
                key={index}
                value={grade}
                onChange={(e) => {
                const newGrades = [...formData.formGrades]
                newGrades[index] = e.target.value
                setFormData({ ...formData, formGrades: newGrades as [string,string,string,string,string] })
                }}
            />
            ))}
        <label htmlFor="attendance">Frequência(%):</label>
        <input type="number" id="frequencia" name="attendance" value={formData.formAttendance} onChange={(e) => setFormData({ ...formData, formAttendance: e.target.value })} />
        <button type="submit">{editingStudentId ? 'Atualizar Estudante' : 'Adicionar Estudante'}</button>
        {editingStudentId && <button type="button" onClick={cancelEdit}>Cancelar</button>}
      </form>
    </div>
  )
}