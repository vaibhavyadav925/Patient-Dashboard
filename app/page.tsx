import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Clock, ArrowRight, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-5 rounded-3xl"></div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 gradient-bg rounded-2xl shadow-xl">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Jarurat Care
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-10 text-pretty max-w-3xl mx-auto leading-relaxed">
              Professional patient records management system designed for healthcare providers.
              <span className="text-primary font-medium"> Secure, efficient, and user-friendly</span> patient data
              management.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="gradient-bg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/patients" className="flex items-center gap-2">
                  View Patients
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8 py-4 border-2 hover:bg-muted/50 bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span>5-Star Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-success" />
                <span>Trusted by 1000+ Providers</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything you need for patient care
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to streamline your healthcare practice and improve patient outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Users className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Comprehensive patient records with intuitive search, filtering, and organization capabilities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-success/10 rounded-2xl group-hover:bg-success group-hover:text-white transition-all duration-300">
                    <Shield className="w-8 h-8 text-success group-hover:text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Enterprise-grade security with HIPAA-compliant measures to protect sensitive patient information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-warning/10 rounded-2xl group-hover:bg-warning group-hover:text-white transition-all duration-300">
                    <Clock className="w-8 h-8 text-warning group-hover:text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Instant synchronization and updates across all devices and team members in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-destructive/10 rounded-2xl group-hover:bg-destructive group-hover:text-white transition-all duration-300">
                    <Heart className="w-8 h-8 text-destructive group-hover:text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">Patient Care Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Streamlined workflows that let you focus on what matters most - providing excellent patient care.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20">
          <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 lg:p-16 text-center text-white">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to transform your practice?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of healthcare providers who trust Jarurat Care for their patient management needs.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/patients" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
        </section>
      </main>
    </div>
  )
}
