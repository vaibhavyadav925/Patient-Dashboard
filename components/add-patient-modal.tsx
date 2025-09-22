"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/lib/types"
import { X, Plus, Loader2 } from "lucide-react"

interface AddPatientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddPatient: (patient: Omit<Patient, "id">) => void
}

export function AddPatientModal({ open, onOpenChange, onAddPatient }: AddPatientModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    bloodType: "",
    status: "active" as Patient["status"],
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  })

  const [medicalHistory, setMedicalHistory] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [newMedicalCondition, setNewMedicalCondition] = useState("")
  const [newAllergy, setNewAllergy] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addMedicalCondition = () => {
    if (newMedicalCondition.trim()) {
      setMedicalHistory((prev) => [...prev, newMedicalCondition.trim()])
      setNewMedicalCondition("")
    }
  }

  const removeMedicalCondition = (index: number) => {
    setMedicalHistory((prev) => prev.filter((_, i) => i !== index))
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies((prev) => [...prev, newAllergy.trim()])
      setNewAllergy("")
    }
  }

  const removeAllergy = (index: number) => {
    setAllergies((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newPatient: Omit<Patient, "id"> = {
      name: formData.name,
      age: Number.parseInt(formData.age),
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      bloodType: formData.bloodType,
      status: formData.status,
      medicalHistory,
      allergies,
      lastVisit: new Date().toISOString().split("T")[0],
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship,
      },
    }

    onAddPatient(newPatient)
    resetForm()
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      email: "",
      phone: "",
      address: "",
      bloodType: "",
      status: "active",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
    })
    setMedicalHistory([])
    setAllergies([])
    setNewMedicalCondition("")
    setNewAllergy("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type *</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => handleInputChange("bloodType", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Patient["status"]) => handleInputChange("status", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={isSubmitting}
                  required
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Name *</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleInputChange("emergencyContactRelationship", e.target.value)}
                  placeholder="e.g., Spouse, Parent, Sibling"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Medical History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Medical History</h3>

              <div className="flex space-x-2">
                <Input
                  placeholder="Add medical condition"
                  value={newMedicalCondition}
                  onChange={(e) => setNewMedicalCondition(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMedicalCondition())}
                  disabled={isSubmitting}
                />
                <Button type="button" onClick={addMedicalCondition} size="sm" disabled={isSubmitting}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {medicalHistory.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{condition}</span>
                    <button
                      type="button"
                      onClick={() => removeMedicalCondition(index)}
                      className="ml-1 hover:text-destructive"
                      disabled={isSubmitting}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Allergies</h3>

              <div className="flex space-x-2">
                <Input
                  placeholder="Add allergy"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAllergy())}
                  disabled={isSubmitting}
                />
                <Button type="button" onClick={addAllergy} size="sm" disabled={isSubmitting}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="flex items-center space-x-1">
                    <span>{allergy}</span>
                    <button
                      type="button"
                      onClick={() => removeAllergy(index)}
                      className="ml-1 hover:text-destructive-foreground/80"
                      disabled={isSubmitting}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Patient...
                </>
              ) : (
                "Add Patient"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
