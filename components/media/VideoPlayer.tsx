'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  placeholder?: boolean;
}

export default function VideoPlayer({ videoUrl, title, placeholder = true }: VideoPlayerProps) {
  const [showVideo, setShowVideo] = useState(false);

  // For now, show placeholder since we don't have actual videos
  if (placeholder) {
    return (
      <Card className="overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-warm-elevated to-warm-border dark:from-dark-surface dark:to-dark-border flex flex-col items-center justify-center p-8 text-center">
          <div className="text-7xl mb-4">🎥</div>
          <h3 className="text-xl font-bold text-textDark dark:text-dark-text-primary mb-2">
            {title || 'Video Demonstration'}
          </h3>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-2">
            Video coming soon
          </p>
          <p className="text-sm text-gray-500 dark:text-dark-text-muted">
            Placeholder for: {videoUrl}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <video
        controls
        className="w-full aspect-video"
        poster={videoUrl.replace('.mp4', '-poster.jpg')}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {title && (
        <div className="p-4 bg-warm-subtle dark:bg-dark-surface">
          <p className="font-semibold text-textDark dark:text-dark-text-primary">
            {title}
          </p>
        </div>
      )}
    </Card>
  );
}
