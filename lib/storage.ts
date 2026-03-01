import { AssessmentResponses, AssessmentResult } from '@/types/assessment';

// Check if we're in a browser environment (for Next.js SSR compatibility)
const isBrowser = typeof window !== 'undefined';

/**
 * Save assessment responses to localStorage
 */
export function saveAssessment(responses: AssessmentResponses): void {
  if (isBrowser) {
    localStorage.setItem('assessmentResponses', JSON.stringify(responses));
    localStorage.setItem('assessmentDate', new Date().toISOString());
  }
}

/**
 * Load assessment responses from localStorage
 */
export function loadAssessment(): AssessmentResponses | null {
  if (isBrowser) {
    const stored = localStorage.getItem('assessmentResponses');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}

/**
 * Get the date when assessment was last completed
 */
export function getAssessmentDate(): string | null {
  if (isBrowser) {
    return localStorage.getItem('assessmentDate');
  }
  return null;
}

/**
 * Clear assessment data from localStorage
 */
export function clearAssessment(): void {
  if (isBrowser) {
    localStorage.removeItem('assessmentResponses');
    localStorage.removeItem('assessmentDate');
  }
}

/**
 * Check if an assessment has been completed
 */
export function hasCompletedAssessment(): boolean {
  if (isBrowser) {
    const responses = localStorage.getItem('assessmentResponses');
    return responses !== null;
  }
  return false;
}

/**
 * Save BIP data to localStorage
 */
export function saveBIP(bipData: any): void {
  if (isBrowser) {
    localStorage.setItem('bipData', JSON.stringify(bipData));
    localStorage.setItem('bipDate', new Date().toISOString());
  }
}

/**
 * Load BIP data from localStorage
 */
export function loadBIP(): any | null {
  if (isBrowser) {
    const stored = localStorage.getItem('bipData');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}
