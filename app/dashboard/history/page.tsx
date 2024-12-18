import { PredictionHistoryList } from "../../../components/prediction-history-list";
import Image from "next/image";
import bg from "../../../matt-c-bRjpGjwmae8-unsplash.jpg";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HistoryPage() {
  return (
    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-3xl font-bold mb-6">Prediction History</h1>
    //   <PredictionHistoryList />
    // </div>

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
          <Link href="/dashboard">
            <button className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
              D
            </button>
          </Link>
          <div>
            <button className=" scale-150">
            <UserButton  />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-8 py-8">
          <div className="container rounded-md bg-white mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Prediction History</h1>
            <PredictionHistoryList />
          </div>
        </div>
      </div>
    </div>
  );
}
