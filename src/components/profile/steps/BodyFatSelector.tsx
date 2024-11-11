import React, { useState, useRef, useEffect } from 'react';
import { Percent } from 'lucide-react';

interface BodyFatSelectorProps {
  gender: string;
  selectedValue: number;
  onChange: (value: number) => void;
}

const maleBodyFatRanges = [
  { range: '1-4%', avg: 2.5, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/1-4.jpg' },
  { range: '5-7%', avg: 6, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/5-7.jpg' },
  { range: '8-10%', avg: 9, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/8-10.jpg' },
  { range: '11-12%', avg: 11.5, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/11-12.jpg' },
  { range: '13-15%', avg: 14, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/13-15.jpg' },
  { range: '16-19%', avg: 17.5, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/16-19.jpg' },
  { range: '20-24%', avg: 22, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/20-24.jpg' },
  { range: '25-30%', avg: 27.5, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/25-30.jpg' },
  { range: '35-40%', avg: 37.5, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/man/35-40.jpg' }
];

const femaleBodyFatRanges = [
  { range: '12%', avg: 12, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/main/woman/12.jpg?raw=true' },
  { range: '15%', avg: 15, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/15.jpg' },
  { range: '20%', avg: 20, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/20.jpg' },
  { range: '25%', avg: 25, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/25.jpg' },
  { range: '30%', avg: 30, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/30.jpg' },
  { range: '35%', avg: 35, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/35.jpg' },
  { range: '40%', avg: 40, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/40.jpg' },
  { range: '45%', avg: 45, image: 'https://raw.githubusercontent.com/LaCouette/bodyfat-pictures/refs/heads/main/woman/45.jpg' }
];

export function BodyFatSelector({ gender, selectedValue, onChange }: BodyFatSelectorProps) {
  const ranges = gender === 'female' ? femaleBodyFatRanges : maleBodyFatRanges;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Different swipe thresholds for touch and mouse
  const minSwipeDistance = isTouchDevice ? 50 : 25;

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const handleSelect = (index: number) => {
    if (!isDragging) {
      setCurrentIndex(index);
      onChange(ranges[index].avg);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < ranges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      onChange(ranges[currentIndex + 1].avg);
    }

    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      onChange(ranges[currentIndex - 1].avg);
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isTouchDevice) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || isTouchDevice) return;
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging && !isTouchDevice) {
      handleTouchEnd();
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Percent className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <label className="block font-bold text-gray-900">Estimate Your Body Fat</label>
          <p className="text-sm text-gray-600 mt-1">
            {isTouchDevice ? 'Swipe' : 'Click and drag'} or click images to select your match
          </p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[350px] sm:h-[400px] w-full max-w-full overflow-hidden select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {ranges.map((item, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            const isActive = index === currentIndex;
            
            const dragDistance = touchEnd && touchStart ? touchEnd - touchStart : 0;
            const dragInfluence = isDragging ? dragDistance * (isTouchDevice ? 0.5 : 0.8) : 0;
            
            if (absOffset > 2) return null;

            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let opacity = 1;
            let scale = 1;

            if (offset < 0) {
              translateX = -120 - (absOffset - 1) * 60 + dragInfluence;
              translateZ = -100 * absOffset;
              rotateY = 45;
              opacity = 1 - absOffset * 0.4;
              scale = 1 - absOffset * 0.2;
            } else if (offset > 0) {
              translateX = 120 + (absOffset - 1) * 60 + dragInfluence;
              translateZ = -100 * absOffset;
              rotateY = -45;
              opacity = 1 - absOffset * 0.4;
              scale = 1 - absOffset * 0.2;
            } else {
              translateX = dragInfluence;
              translateZ = 0;
              scale = 1;
            }

            return (
              <div
                key={item.range}
                onClick={() => handleSelect(index)}
                className="absolute transition-all duration-300 ease-out"
                style={{
                  transform: `
                    translateX(${translateX}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  zIndex: 10 - absOffset,
                  opacity: opacity > 0 ? opacity : 0,
                }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={`Body fat ${item.range}`}
                    className={`w-[200px] sm:w-[250px] h-[280px] sm:h-[350px] object-cover rounded-lg shadow-xl
                      ${isActive ? 'ring-4 ring-blue-500' : ''}
                      ${selectedValue === item.avg ? 'ring-4 ring-green-500' : ''}`}
                    draggable="false"
                  />
                  <div className={`absolute inset-0 rounded-lg transition-all ${
                    isActive ? 'bg-black/0' : 'bg-black/20'
                  }`} />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm sm:text-lg font-bold">
                      {item.range}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-200 h-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / ranges.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <strong>Note:</strong> Body fat percentage is an estimate and may vary based on factors like muscle distribution and body type.
      </div>
    </div>
  );
}