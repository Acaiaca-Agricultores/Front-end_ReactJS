import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/scroll-animations.css';

const ScrollAnimated = ({ 
  children, 
  animationType = 'fade-in', 
  delay = 0, 
  className = '',
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const getAnimationClass = () => {
    const baseClass = `scroll-${animationType}`;
    const delayClass = delay > 0 ? `scroll-delay-${delay}` : '';
    const visibleClass = isVisible ? 'visible' : '';
    
    return [baseClass, delayClass, visibleClass, className]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div 
      ref={ref} 
      className={getAnimationClass()}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollAnimated; 