export interface Patient {
  id: number
  name: string
  age: number
  email: string
  phone: string
  address: string
  medicalHistory: string[]
  lastVisit: string
  nextAppointment?: string
  status: "active" | "inactive" | "critical"
  bloodType: string
  allergies: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}
