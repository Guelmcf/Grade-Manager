import './App.css'
import { useStudent } from './hooks/useStudent';
import StudentForm from './components/studentsForms';


export default function App() {

const {
  students,
  editingStudentId,
  addStudent,
  updateStudent,
  cancelEdit
} = useStudent()


return (
  <StudentForm
    students={students}
    editingStudentId={editingStudentId}
    addStudent={addStudent}
    updateStudent={updateStudent}
    cancelEdit={cancelEdit}
  />
)
}

