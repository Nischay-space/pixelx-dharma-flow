
import React, { useEffect, useRef } from 'react';

interface PixelVisualizationProps {
  isActive?: boolean;
}

const PixelVisualization: React.FC<PixelVisualizationProps> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const pixelSize = 8;
    const colors = [
      '#9b87f5', // dharma-purple
      '#E5DEFF', // dharma-light-purple
      '#FDE1D3', // dharma-peach
      '#F2FCE2', // dharma-green
      '#FEF7CD'  // dharma-yellow
    ];
    
    // Create lotus flower pattern
    const drawLotus = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 4;
      
      // Draw center
      drawPixelCircle(centerX, centerY, radius / 3, colors[0]);
      
      // Draw petals
      const petalCount = 8;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = radius * (0.6 + Math.sin(Date.now() * 0.001 + i) * 0.1);
        
        drawPixelCircle(x, y, size / 1.5, colors[i % colors.length]);
      }
      
      if (isActive) {
        // Draw ripple
        const rippleRadius = (Math.sin(Date.now() * 0.001) * 0.5 + 0.5) * radius * 1.8;
        drawPixelCircle(centerX, centerY, rippleRadius, colors[2], true);
      }
    };
    
    const drawPixelCircle = (x: number, y: number, radius: number, color: string, isOutline = false) => {
      const startX = Math.floor(x - radius);
      const startY = Math.floor(y - radius);
      const endX = Math.ceil(x + radius);
      const endY = Math.ceil(y + radius);
      
      for (let py = startY; py <= endY; py += pixelSize) {
        for (let px = startX; px <= endX; px += pixelSize) {
          const dx = px + pixelSize / 2 - x;
          const dy = py + pixelSize / 2 - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (isOutline) {
            if (Math.abs(distance - radius) < pixelSize * 1.5) {
              ctx.fillStyle = color;
              ctx.globalAlpha = 0.5;
              ctx.fillRect(px, py, pixelSize, pixelSize);
            }
          } else if (distance <= radius) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.8;
            ctx.fillRect(px, py, pixelSize, pixelSize);
          }
        }
      }
      
      ctx.globalAlpha = 1.0;
    };
    
    const animate = () => {
      drawLotus();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);
  
  return (
    <div className="w-full relative rounded-lg overflow-hidden" style={{ height: '300px' }}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full bg-dharma-dark/5"
      />
    </div>
  );
};

export default PixelVisualization;
