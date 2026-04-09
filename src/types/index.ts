export interface StudentFormData {
  name: string
  formAttendance: string
  formGrades: [
    string, 
    string, 
    string, 
    string, 
    string
  ]
}
export interface Student {
  id: string
  name: string
  attendance: number
  grades: [
    number, 
    number, 
    number, 
    number, 
    number
  ]
}