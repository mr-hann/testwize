import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Users,
  BarChart3,
  Shield,
  Smartphone,
  Clock,
  FileText,
  Zap,
  Star,
  Quote,
  Check,
  X,
  Menu,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      icon: CheckCircle,
      title: "Seamless Online Testing",
      description: "Objective testing made simple for students with an intuitive interface",
    },
    {
      icon: Users,
      title: "Smart Teacher Dashboard",
      description: "Easy-to-use dashboard for creating and managing tests",
    },
    {
      icon: Zap,
      title: "Automatic Grading",
      description: "Instant feedback and automatic scoring for objective questions",
    },
    {
      icon: FileText,
      title: "Question Bank & File Upload",
      description: "Create tests manually or upload documents to auto-extract questions",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Monitor class performance with comprehensive analytics",
    },
    {
      icon: Shield,
      title: "Secure & Mobile-Friendly",
      description: "Secure cloud storage with responsive design for all devices",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "High School Teacher",
      school: "Lincoln High School",
      content: "This platform has revolutionized how I conduct tests. The automatic grading saves me hours every week!",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "University Professor",
      school: "State University",
      content: "The analytics feature helps me understand which topics my students struggle with most. Invaluable insights!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Middle School Teacher",
      school: "Riverside Academy",
      content: "My students love the mobile-friendly interface. No more technical issues during tests!",
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: "Free Starter",
      price: "₦0",
      period: "forever",
      description: "Perfect for trying out TestWise",
      features: [
        "1 test creation",
        "Up to 10 questions per test",
        "Basic dashboard access",
        "Manual question entry",
        "Share test link",
        "Basic student results",
      ],
      limitations: ["No file upload", "No advanced analytics", "No question bank", "No result exports"],
      buttonText: "Start Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "₦1,500",
      period: "per month",
      description: "Everything you need for professional testing",
      features: [
        "Unlimited test creation",
        "Unlimited questions",
        "Advanced analytics dashboard",
        "Question bank management",
        "File upload & auto-extraction",
        "Export student results",
        "Priority support",
        "Mobile-optimized tests",
      ],
      limitations: [],
      buttonText: "Subscribe Now",
      popular: true,
    },
    {
      name: "Annual Pro",
      price: "₦7,200",
      period: "per year",
      description: "Save 40% with annual billing",
      originalPrice: "₦18,000",
      features: [
        "Everything in Professional",
        "40% cost savings",
        "Priority feature requests",
        "Extended support",
        "Early access to new features",
      ],
      limitations: [],
      buttonText: "Save 40%",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Image src="/images/testwise-logo.png" alt="TestWise Logo" width={40} height={40} className="rounded" />
            <span className="font-bold text-xl text-gray-900">TestWise</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link href="/auth/register">
              <Button size="sm">Start Free Trial</Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4">Modern Computer-Based Testing Platform</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Transform Your Testing <span className="text-blue-600">Experience Today</span>
          </h1>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Empower educators with intelligent testing tools. Start with one free test, then scale up as you grow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg">
                <Users className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">Login to Dashboard</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">✨ No credit card required • Create your first test in minutes</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-10">Powerful Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card key={i} className="shadow hover:shadow-lg transition">
                  <CardHeader className="flex flex-col items-center">
                    <div className="bg-blue-100 rounded p-2 mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-10">What Teachers Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="shadow hover:shadow-lg transition">
                <CardHeader className="flex flex-col items-center">
                  <div className="flex space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-600" />
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="italic text-gray-700">"{testimonial.content}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.school}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-10">Simple Pricing</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? "border-blue-600 shadow-xl" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center space-y-2 pb-4">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex justify-center items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-xs line-through text-gray-500">Originally {plan.originalPrice}</div>
                  )}
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-1">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="w-4 h-4 mr-2 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  {plan.limitations.length > 0 && (
                    <ul className="mt-2 text-xs text-gray-500">
                      {plan.limitations.map((l, idx) => (
                        <li key={idx} className="flex items-center">
                          <X className="w-3 h-3 mr-1" /> {l}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href="/auth/register">
                    <Button className="w-full mt-4">{plan.buttonText}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
     <footer className="bg-gray-900 text-white py-12 px-4">
  <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4">
    {/* Brand / About */}
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <Image
          src="/images/testwise-logo.png"
          alt="TestWise Logo"
          width={32}
          height={32}
          className="rounded"
        />
        <span className="font-bold text-xl">TestWise</span>
      </div>
      <p className="text-gray-400 text-sm">
        TestWise empowers teachers across Nigeria to deliver secure, simple,
        and smart online assessments, saving time and boosting student
        performance.
      </p>
    </div>
    {/* Quick Links */}
    <div>
      <h4 className="font-semibold text-white mb-2">Quick Links</h4>
      <ul className="space-y-1 text-sm">
        <li>
          <Link href="#features" className="hover:text-blue-400">
            Features
          </Link>
        </li>
        <li>
          <Link href="#pricing" className="hover:text-blue-400">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="#testimonials" className="hover:text-blue-400">
            Testimonials
          </Link>
        </li>
        <li>
          <Link href="/auth/login" className="hover:text-blue-400">
            Login
          </Link>
        </li>
        <li>
          <Link href="/auth/register" className="hover:text-blue-400">
            Register
          </Link>
        </li>
      </ul>
    </div>
    {/* Contact */}
    <div>
      <h4 className="font-semibold text-white mb-2">Contact</h4>
      <ul className="space-y-1 text-sm text-gray-400">
        <li>Lagos, Nigeria</li>
        <li>Phone: +234 812 345 6789</li>
        <li>Email: support@testwise.ng</li>
      </ul>
    </div>
    {/* Social */}
    <div>
      <h4 className="font-semibold text-white mb-2">Follow Us</h4>
      <div className="flex space-x-4">
        <a href="https://facebook.com/testwise" target="_blank" rel="noopener noreferrer">
          <svg className="w-5 h-5 fill-current hover:text-blue-400" viewBox="0 0 24 24">
            <path
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"
            />
          </svg>
        </a>
        <a href="https://twitter.com/testwise" target="_blank" rel="noopener noreferrer">
          <svg className="w-5 h-5 fill-current hover:text-blue-400" viewBox="0 0 24 24">
            <path
              d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 001.84-2.31 8.36 8.36 0 01-2.65 1A4.15 4.15 0 0015.5 4c-2.28 0-4.13 1.85-4.13 4.13 0 .32.04.64.1.94A11.75 11.75 0 013 5.16a4.13 4.13 0 001.28 5.5c-.7 0-1.38-.22-1.97-.54v.05c0 2.02 1.44 3.72 3.35 4.1a4.2 4.2 0 01-1.96.07 4.15 4.15 0 003.87 2.87A8.34 8.34 0 013 19.54 11.74 11.74 0 009.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.29 8.29 0 0022.46 6z"
            />
          </svg>
        </a>
        <a href="https://instagram.com/testwise" target="_blank" rel="noopener noreferrer">
          <svg className="w-5 h-5 fill-current hover:text-blue-400" viewBox="0 0 24 24">
            <path
              d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
    &copy; {new Date().getFullYear()} TestWise by Modern Tech NG. All rights reserved.
  </div>
</footer>

    </div>
  )
}
