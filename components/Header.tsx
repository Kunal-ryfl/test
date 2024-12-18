'use client'

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Diabetes Prediction App
        </Link>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <span>Welcome, {user.firstName}!</span>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/history">History</Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton mode="modal" />
          )}
        </div>
      </nav>
    </header>
  );
}

