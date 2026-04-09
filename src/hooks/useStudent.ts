import { useState } from "react";
import type { Student, StudentFormData } from "../types";

export function useStudent() {
//States:
const [students, setStudents] = useState<Student[]>([]);
const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

//Actions:

function addStudent(formData: StudentFormData) {
  const newStudent: Student = {
    id: crypto.randomUUID(),
    name: formData.name,
    attendance: parseFloat(formData.formAttendance),
    grades: formData.formGrades.map(grade => parseFloat(grade)) as [number, number, number, number, number]
  };
  setStudents(prevStudents => [...prevStudents, newStudent]);
}

function removeStudent(id: string) {
  setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
}

function updateStudent(id: string, formData: StudentFormData) {
  const updatedStudent: Student = {
    id: id, 
    name: formData.name,
    attendance: parseFloat(formData.formAttendance),
    grades: formData.formGrades.map(grade => parseFloat(grade)) as [number, number, number, number, number]
  }

  setStudents(prev => prev.map(student => 
    student.id === id ? updatedStudent : student
  ))
}

function editStudent(id: string) {
  setEditingStudentId(id);
}

function cancelEdit() {
  setEditingStudentId(null);
}

return { students, editingStudentId, addStudent, removeStudent, updateStudent, editStudent, cancelEdit };
}
