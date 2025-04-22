import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, Users, Calendar, ChartLine, CheckCircle, Shield, Gift, Star, Play, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation - Updated with blur effect */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-trainer-purple" />
          <span className="font-bold text-xl">TrainerHub</span>
        </div>
        <Link to="/dashboard">
          <Button variant="ghost">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </nav>

      {/* Hero Section - Enhanced with gradients and animations */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-trainer-purple to-trainer-dark-purple animate-fade-in">
              Transform Your Training Business
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
              The all-in-one platform for personal trainers to manage clients, schedule sessions, and track progress with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Link to="/dashboard">
                <Button size="lg" className="bg-trainer-purple hover:bg-trainer-dark-purple w-full sm:w-auto">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">See TrainerHub in Action</h2>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <img
                src="https://images.unsplash.com/photo-1542766788-a2f588f447ee"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-trainer-purple hover:bg-white/90 rounded-full w-16 h-16 p-0"
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Redesigned with hover effects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-trainer-purple mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Client Management</h3>
                <p className="text-muted-foreground">
                  Organize client information, track progress, and manage relationships effortlessly.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <Dumbbell className="h-12 w-12 text-trainer-purple mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Workout Builder</h3>
                <p className="text-muted-foreground">
                  Create and customize workout plans with our intuitive drag-and-drop interface.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <Calendar className="h-12 w-12 text-trainer-purple mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-muted-foreground">
                  Manage your calendar, automate bookings, and reduce scheduling conflicts.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <ChartLine className="h-12 w-12 text-trainer-purple mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize client progress with detailed analytics and beautiful charts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section - With modern layout */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose TrainerHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-trainer-purple shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground">Automate repetitive tasks and focus on what matters - your clients.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-trainer-purple shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Grow Your Business</h3>
                <p className="text-muted-foreground">Scale your training business with powerful management tools.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Gift className="h-6 w-6 text-trainer-purple shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Delight Clients</h3>
                <p className="text-muted-foreground">Provide a premium experience with professional features.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                </div>
                <MessageCircle className="h-8 w-8 text-trainer-purple mb-4" />
                <p className="text-lg mb-4">"TrainerHub transformed how I manage my fitness business. The scheduling and progress tracking features are game-changers!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-trainer-purple/10 flex items-center justify-center">
                    <span className="text-trainer-purple font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Personal Trainer, NYC</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                </div>
                <MessageCircle className="h-8 w-8 text-trainer-purple mb-4" />
                <p className="text-lg mb-4">"The workout builder is intuitive and saves me hours of planning time. My clients love the progress tracking!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-trainer-purple/10 flex items-center justify-center">
                    <span className="text-trainer-purple font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mike Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Fitness Coach, LA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                  <Star className="h-5 w-5 fill-trainer-purple text-trainer-purple" />
                </div>
                <MessageCircle className="h-8 w-8 text-trainer-purple mb-4" />
                <p className="text-lg mb-4">"Since using TrainerHub, I've doubled my client base. The automated scheduling is a massive time-saver!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-trainer-purple/10 flex items-center justify-center">
                    <span className="text-trainer-purple font-semibold">EW</span>
                  </div>
                  <div>
                    <p className="font-semibold">Emma Wilson</p>
                    <p className="text-sm text-muted-foreground">Health Coach, Chicago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section - New section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-6 w-6 fill-trainer-purple text-trainer-purple" />
            <Star className="h-6 w-6 fill-trainer-purple text-trainer-purple" />
            <Star className="h-6 w-6 fill-trainer-purple text-trainer-purple" />
            <Star className="h-6 w-6 fill-trainer-purple text-trainer-purple" />
            <Star className="h-6 w-6 fill-trainer-purple text-trainer-purple" />
          </div>
          <p className="text-2xl font-medium mb-4">"TrainerHub transformed how I manage my fitness business"</p>
          <p className="text-muted-foreground mb-2">Sarah Johnson</p>
          <p className="text-sm text-muted-foreground">Personal Trainer, NYC</p>
        </div>
      </section>

      {/* CTA Section - Enhanced with gradient background */}
      <section className="py-20 bg-trainer-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Training Business?</h2>
          <p className="text-xl mb-8 text-purple-100">Join thousands of trainers who are growing their business with TrainerHub.</p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="hover:bg-white hover:text-trainer-purple">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
