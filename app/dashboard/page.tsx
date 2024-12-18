import DiabetesPredictionForm from '../../components/diabetes-prediction-form';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import bg from '../../matt-c-bRjpGjwmae8-unsplash.jpg';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 -z-10"
      />

      <div className="relative min-h-screen bg-black/50 flex">
        {/* Compact Sidebar */}
        <div className="w-20 bg-black shadow-md flex flex-col items-center py-4 space-y-6">
          
          <Link href="/dashboard/history">
            <button className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
              H
            </button>
          </Link>
          <button className=" scale-150">
            <UserButton  />
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-8 py-8">
          <div className="max-w-2xl mx-auto bg-white/80 p-8 shadow-md rounded-md backdrop-blur-md">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
              Predict Diabetes
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Enter your health metrics below to get a diabetes risk assessment.
            </p>
            <DiabetesPredictionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
