import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  value: number;
  isPlayable: boolean;
  isHidden: boolean;
  onClick: () => void;
  layoutId?: string;
}

export const Card: React.FC<CardProps> = ({ value, isPlayable, isHidden, onClick, layoutId }) => {
  return (
    <motion.div
      layoutId={layoutId}
      whileHover={isPlayable ? { scale: 1.1, y: -10 } : {}}
      className={`relative w-24 h-36 rounded-xl shadow-lg cursor-pointer 
        ${isPlayable ? 'bg-white hover:bg-blue-50' : 'bg-gray-200'}
        ${isHidden ? 'bg-gradient-to-br from-blue-400 to-blue-600' : ''}`}
      onClick={isPlayable ? onClick : undefined}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {!isHidden ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">{value}</span>
          </div>
          <div className="absolute top-2 left-2">
            <span className="text-sm text-gray-600">{value}</span>
          </div>
          <div className="absolute bottom-2 right-2 rotate-180">
            <span className="text-sm text-gray-600">{value}</span>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">?</span>
        </div>
      )}
    </motion.div>
  );
};