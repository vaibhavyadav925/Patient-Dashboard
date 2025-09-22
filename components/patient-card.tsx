"use client"

import type { Patient } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Calendar, AlertCircle, User, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatientCardProps {
  patient: Patient
  onViewDetails: (patient: Patient) => void
}

export function PatientCard({ patient, onViewDetails }: PatientCardProps) {
  const getStatusConfig = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return {
          className: "status-active",
          icon: <User className="w-3 h-3" />,
          label: "Active",
        }
      case "critical":
        return {
          className: "status-critical",
          icon: <AlertCircle className="w-3 h-3" />,
          label: "Critical",
        }
      case "inactive":
        return {
          className: "status-inactive",
          icon: <Clock className="w-3 h-3" />,
          label: "Inactive",
        }
      default:
        return {
          className: "status-inactive",
          icon: <User className="w-3 h-3" />,
          label: "Unknown",
        }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const statusConfig = getStatusConfig(patient.status)

  return (
    <Card className="card-hover animate-fade-in group border-0 shadow-sm bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {patient.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{patient.age} years old</p>
          </div>
          <Badge
            className={cn("flex items-center gap-1.5 px-3 py-1 text-xs font-medium border", statusConfig.className)}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm group/item">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-medium">{patient.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-sm group/item">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 text-secondary group-hover/item:bg-secondary group-hover/item:text-secondary-foreground transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <span className="truncate font-medium">{patient.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm group/item">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground group-hover/item:bg-foreground group-hover/item:text-background transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="truncate">{patient.address}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last visit:</span>
              <span className="font-medium text-foreground">{formatDate(patient.lastVisit)}</span>
            </div>

            {patient.nextAppointment && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Next appointment:</span>
                <span className="font-medium text-primary">{formatDate(patient.nextAppointment)}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => onViewDetails(patient)}
          className="w-full mt-6 gradient-bg hover:opacity-90 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          size="lg"
        >
          View Patient Details
        </Button>
      </CardContent>
    </Card>
  )
}
