
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';

const magazines = [
  {
    name: "Tech Weekly",
    quote: "Revolutionary fitness platform",
    iconColor: "text-blue-500"
  },
  {
    name: "Fitness Today",
    quote: "Best trainer platform of 2025",
    iconColor: "text-green-500"
  },
  {
    name: "Digital Trends",
    quote: "Leading the future of fitness",
    iconColor: "text-purple-500"
  }
];

const MagazineFeatures = () => {
  return (
    <Card className="card-shadow overflow-hidden hover:shadow-lg transition-all">
      <div className="h-1 w-full bg-gradient-to-r from-trainer-purple to-trainer-light-purple"></div>
      <CardContent className="p-6">
        <h2 className="font-semibold text-lg mb-4">Featured In</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {magazines.map((magazine, index) => (
            <div 
              key={magazine.name}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`p-2 rounded-full ${magazine.iconColor} bg-white shadow-sm`}>
                <FileText className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-sm">{magazine.name}</h3>
                <p className="text-xs text-muted-foreground">{magazine.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MagazineFeatures;
