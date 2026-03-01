'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    // Check password against environment variable (client-side for MVP)
    // In production, this should be server-side with proper auth
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <Card>
          <h1 className="text-2xl font-bold text-textDark mb-6 text-center">
            Admin Access
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter the admin password to manage content
          </p>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            error={error}
            placeholder="Enter admin password"
          />
          <div className="mt-6">
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-primary hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textDark mb-4">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage assessment questions and goal library content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/questions">
          <Card hover className="h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-textDark mb-3">
                Edit Questions
              </h2>
              <p className="text-gray-600">
                Manage assessment questions and categories
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/goals">
          <Card hover className="h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-textDark mb-3">
                Edit Goals
              </h2>
              <p className="text-gray-600">
                Manage goal library and teaching procedures
              </p>
            </div>
          </Card>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> In local development, changes are saved to JSON files.
          On Vercel (production), the filesystem is read-only, so you'll need to edit files locally and redeploy.
          Consider migrating to a database for production content management.
        </p>
      </div>
    </div>
  );
}
