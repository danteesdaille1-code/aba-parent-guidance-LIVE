'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import DropdownMenu from '@/components/ui/DropdownMenu';

export default function Navigation() {
  return (
    <nav className="bg-warm-surface dark:bg-dark-surface shadow-md no-print border-b border-warm-border dark:border-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">
            ABA Parent Guidance
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/assessment">
              <Button
                size="sm"
                className="bg-gradient-pastel hover:opacity-90 text-white font-semibold px-4"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/assessment" className="text-textDark dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors font-medium">
              Assessment
            </Link>
            <Link href="/goals" className="text-textDark dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors font-medium">
              Goals
            </Link>
            <Link href="/learn" className="text-textDark dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors font-medium">
              Learn
            </Link>
            <DropdownMenu
              label="Resources"
              items={[
                { label: 'Replacement Toys', href: '/resources/toys' },
                { label: 'Activity Suggestions', href: '/resources/activities' }
              ]}
            />
            <Link href="/bip" className="text-textDark dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors font-medium">
              BIP
            </Link>
            <Link href="/about" className="text-textDark dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors font-medium">
              About
            </Link>
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
