import './App.css'
import { useStudent } from './hooks/useStudent';
import StudentForm from './components/studentsForms';
import { StudentTable } from './components/studentsTable';
import { StatsPanel } from './components/statsPanel';
import { AlertPanel } from './components/alertPanel';
import { Header } from './components/header';
import { Footer } from './components/footer';

import { HiOutlineEmojiSad } from "react-icons/hi";

export default function App() {

const {
  students,
  editingStudentId,
  addStudent,
  updateStudent,
  cancelEdit,
  removeStudent,
  editStudent
} = useStudent()

return (
  <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-start pt-24">
      <Header 
      students={students}
      />
      <main className="flex-1 flex flex-col items-center gap-4 p-4">
        <StudentForm
        students={students}
        editingStudentId={editingStudentId}
        addStudent={addStudent}
        updateStudent={updateStudent}
        cancelEdit={cancelEdit}
      />
      {students.length > 0 ? (
      <div className="w-full flex flex-col items-center gap-4 px-4">
        <StudentTable
        students={students}
        editingStudentId={editingStudentId}
        editStudent={editStudent}
        removeStudent={removeStudent}
      />
      <div className="w-full flex flex-row items-center justify-center gap-4 mb-4">
      <StatsPanel 
        students={students}      
      />
      <AlertPanel
        students={students}
      />
      </div>
      </div>
      ) : (
      <p className="text-gray-600 mt-4 flex flex-col items-center text-center">
        <HiOutlineEmojiSad className="text-[75px] mb-5" />
        Nenhum aluno cadastrado! Use o formulário acima para adicionar alunos.
      </p>
      )}
      </main>
      <Footer />
  </div>
)
}

