
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, Users, Calendar, ChartLine } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Streamline Your Personal Training Business
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Manage clients, create workouts, and track progress - all in one place.
            Built for personal trainers who want to focus on what matters most.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-trainer-purple hover:bg-trainer-dark-purple">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Users className="h-12 w-12 text-trainer-purple mb-4" />
            <h3 className="text-xl font-semibold mb-2">Client Management</h3>
            <p className="text-muted-foreground">
              Easily manage your client roster, track their progress, and maintain detailed profiles.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Dumbbell className="h-12 w-12 text-trainer-purple mb-4" />
            <h3 className="text-xl font-semibold mb-2">Workout Builder</h3>
            <p className="text-muted-foreground">
              Create custom workouts with our intuitive drag-and-drop workout builder.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Calendar className="h-12 w-12 text-trainer-purple mb-4" />
            <h3 className="text-xl font-semibold mb-2">Schedule Sessions</h3>
            <p className="text-muted-foreground">
              Manage your schedule efficiently with our integrated calendar system.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ChartLine className="h-12 w-12 text-trainer-purple mb-4" />
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Track and visualize client progress with detailed analytics and reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
