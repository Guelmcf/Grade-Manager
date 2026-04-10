import { useState, useEffect } from "react";
import type { Student, StudentFormData } from "../types";
import { parseStudentFormData } from "../utils/calculations";

export function useStudent() {
//States:
const [students, setStudents] = useState<Student[]>(() => {
  const stored = localStorage.getItem("students");
  if (!stored) return [];
  try {
    return JSON.parse(stored) as Student[];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);
const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

//Actions:

function addStudent(formData: StudentFormData) {
  const { numericGrades, average } = parseStudentFormData(formData.formGrades);

  const newStudent: Student = {
    id: crypto.randomUUID(),
    name: formData.name,
    attendance: parseFloat(formData.formAttendance),
    grades: numericGrades, // Usando o que veio do helper
    average: average       // Adicionando a média
  };
  setStudents(prevStudents => [...prevStudents, newStudent]);
}


function removeStudent(id: string) {
  setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
}

function updateStudent(id: string, formData: StudentFormData) {
  const { numericGrades, average } = parseStudentFormData(formData.formGrades);

  const updatedStudent: Student = {
    id: id, 
    name: formData.name,
    attendance: parseFloat(formData.formAttendance),
    grades: numericGrades, // Usando o que veio do helper
    average: average       // Adicionando a média
  };

  setStudents(prev => prev.map(student => 
    student.id === id ? updatedStudent : student
  ));
}

function editStudent(id: string) {
  setEditingStudentId(id);
}

function cancelEdit() {
  setEditingStudentId(null);
}

return { students, editingStudentId, addStudent, removeStudent, updateStudent, editStudent, cancelEdit };
}
