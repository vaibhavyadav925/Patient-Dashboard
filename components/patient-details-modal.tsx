"use client"

import type { Patient } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, MapPin, Calendar, Heart, AlertTriangle, Contact, FileText, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatientDetailsModalProps {
  patient: Patient | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PatientDetailsModal({ patient, open, onOpenChange }: PatientDetailsModalProps) {
  if (!patient) return null

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{patient.name}</DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={cn(getStatusColor(patient.status))}>{patient.status}</Badge>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Basic Information
              </h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Age: {patient.age} years old</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Blood Type: {patient.bloodType}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Contact className="w-5 h-5 mr-2 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Emergency Contact
              </h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{patient.emergencyContact.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            {/* Medical History */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Medical History
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                {patient.medicalHistory.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medicalHistory.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{condition}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No medical history recorded</p>
                )}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                Allergies
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                {patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No known allergies</p>
                )}
              </div>
            </div>

            {/* Visit Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Visit Information
              </h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Last Visit</p>
                  <p className="text-sm text-muted-foreground">{formatDate(patient.lastVisit)}</p>
                </div>
                {patient.nextAppointment && (
                  <div>
                    <p className="text-sm font-medium">Next Appointment</p>
                    <p className="text-sm text-primary">{formatDate(patient.nextAppointment)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Schedule Appointment</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
