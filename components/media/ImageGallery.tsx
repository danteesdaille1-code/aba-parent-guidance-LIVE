'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';

interface ImageGalleryProps {
  images: Array<{
    url: string;
    caption?: string;
    step?: number;
  }>;
  placeholder?: boolean;
}

export default function ImageGallery({ images, placeholder = true }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (placeholder || images.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-surface dark:to-dark-border flex flex-col items-center justify-center p-4 text-center">
              <div className="text-5xl mb-2">📸</div>
              {image.step && (
                <div className="text-sm font-bold text-primary dark:text-primary-light mb-2">
                  Step {image.step}
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-dark-text-muted">
                Image placeholder
              </p>
            </div>
            {image.caption && (
              <div className="p-3 bg-warm-surface dark:bg-dark-card">
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  {image.caption}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.url}
              alt={image.caption || `Step ${image.step || index + 1}`}
              className="w-full aspect-square object-cover"
            />
            {image.caption && (
              <div className="p-3">
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  {image.caption}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setSelectedIndex(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-4xl w-full"
              >
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].caption || `Image ${selectedIndex + 1}`}
                  className="w-full h-auto rounded-lg"
                />
                {images[selectedIndex].caption && (
                  <p className="mt-4 text-center text-white">
                    {images[selectedIndex].caption}
                  </p>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
