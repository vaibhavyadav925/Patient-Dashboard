"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { PatientCard } from "@/components/patient-card"
import { PatientDetailsModal } from "@/components/patient-details-modal"
import { AddPatientModal } from "@/components/add-patient-modal"
import { PatientGridSkeleton } from "@/components/loading-skeleton"
import { ErrorState } from "@/components/error-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePatients } from "@/hooks/use-patients"
import type { Patient } from "@/lib/types"
import { Search, Plus, Filter, Users, Activity, AlertTriangle } from "lucide-react"

export default function PatientsPage() {
  const { patients, loading, error, addPatient } = usePatients()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsDetailsModalOpen(true)
  }

  const handleAddPatient = (newPatientData: Omit<Patient, "id">) => {
    addPatient(newPatientData)
  }

  const stats = {
    total: patients.length,
    active: patients.filter((p) => p.status === "active").length,
    critical: patients.filter((p) => p.status === "critical").length,
    inactive: patients.filter((p) => p.status === "inactive").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-2xl gradient-bg p-8 mb-8 text-white">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Patient Records</h1>
                <p className="text-blue-100 text-lg">Comprehensive patient management system</p>
              </div>
              <Button
                className="mt-6 sm:mt-0 bg-white text-primary hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsAddModalOpen(true)}
                disabled={loading}
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Patient
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {!loading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Activity className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.critical}</p>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.inactive}</p>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base border-border/50 focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 h-12 border-border/50">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Patients</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Summary */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredPatients.length}</span> of{" "}
                  <span className="font-medium text-foreground">{patients.length}</span> patients
                </p>
              </div>
            </div>
          </>
        )}

        {/* Content */}
        {loading && <PatientGridSkeleton />}

        {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {!loading && !error && (
          <>
            {filteredPatients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPatients.map((patient, index) => (
                  <div key={patient.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <PatientCard patient={patient} onViewDetails={handleViewDetails} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-card rounded-2xl p-12 border border-border/50 shadow-sm max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No patients found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search criteria or add a new patient</p>
                  <Button onClick={() => setIsAddModalOpen(true)} className="gradient-bg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Patient
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Patient Details Modal */}
      <PatientDetailsModal patient={selectedPatient} open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen} />

      {/* Add Patient Modal */}
      <AddPatientModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddPatient={handleAddPatient} />
    </div>
  )
}
