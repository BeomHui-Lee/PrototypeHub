'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

type ScrollAnimationProps = {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * 스크롤 애니메이션 컴포넌트
 * 뷰포트에 요소가 나타날 때 애니메이션 효과를 적용합니다.
 */
export const ScrollAnimation = ({
  children,
  variants = defaultVariants,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
  once = true,
}: ScrollAnimationProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 스태거 효과가 있는 컨테이너 애니메이션 컴포넌트
 * 자식 요소들에 순차적으로 애니메이션을 적용합니다.
 */
export const StaggerContainer = ({
  children,
  className = '',
  delay = 0.1,
  staggerChildren = 0.1,
  once = true,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  threshold?: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 아이템 애니메이션 컴포넌트
 * StaggerContainer의 자식 요소로 사용됩니다.
 */
export const StaggerItem = ({
  children,
  className = '',
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) => {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * 커스텀 배경 애니메이션 컴포넌트
 * 반응형 배경 효과를 만듭니다.
 */
export const AnimatedBackground = ({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="absolute left-0 top-0 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {children}
    </div>
  );
};
