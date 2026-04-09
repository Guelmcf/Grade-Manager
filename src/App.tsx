import './App.css'
import { useStudent } from './hooks/useStudent';
import StudentForm from './components/studentsForms';
import { StudentTable } from './components/studentsTable';


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
  <div>
      <StudentForm
        students={students}
        editingStudentId={editingStudentId}
        addStudent={addStudent}
        updateStudent={updateStudent}
        cancelEdit={cancelEdit}
      />
      <StudentTable
        students={students}
        editingStudentId={editingStudentId}
        editStudent={editStudent}
        removeStudent={removeStudent}
      />
  </div>
)
}

