import type { Student } from '../types';

function calculateAverage(grades: number[]): number {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
}

function calculateClassAverage(students: Student[], disciplineIndex: number): number {
  const grades = students.map(student => student.grades[disciplineIndex]);
  return calculateAverage(grades)
}

function studentsAboveClassAverage(students: Student[]): Student[] {
  const classAverage = calculateAverage(students.map(student => calculateAverage(student.grades)));
  return students.filter(student => calculateAverage(student.grades) > classAverage);
}   

function studentsBelowAttendance(students: Student[], threshold: number): Student[] {
  return students.filter(student => student.attendance < threshold);
}

export { calculateAverage, calculateClassAverage, studentsAboveClassAverage, studentsBelowAttendance };