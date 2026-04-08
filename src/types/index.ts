export interface StudentFormData {
  name: string
  FormAttendance: string
  Formgrades: [
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