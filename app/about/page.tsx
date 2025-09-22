import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">About Jarurat Care</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Empowering healthcare providers with modern, secure, and efficient patient management solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-primary" />
                <CardTitle>Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                To revolutionize healthcare administration by providing intuitive, secure, and comprehensive patient
                record management systems that enable healthcare providers to focus on what they do best - caring for
                patients.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-primary" />
                <CardTitle>Our Team</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                A dedicated team of healthcare professionals, software engineers, and security experts working together
                to create solutions that meet the real-world needs of medical practices.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-primary" />
              <CardTitle>Why Choose Jarurat Care?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Security First</h4>
              <p className="text-muted-foreground">
                Built with enterprise-grade security measures and HIPAA compliance at its core.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">User-Friendly Design</h4>
              <p className="text-muted-foreground">
                Intuitive interface designed by healthcare professionals for healthcare professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Scalable Solution</h4>
              <p className="text-muted-foreground">
                From small clinics to large hospital systems, our platform grows with your needs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">24/7 Support</h4>
              <p className="text-muted-foreground">
                Round-the-clock technical support to ensure your practice runs smoothly.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
