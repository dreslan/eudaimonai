import React from 'react';
import { dimensionIcons } from '../utils/dimensionIcons';
import { dimensionColors } from '../utils/colors';
import type { Dimension } from '../types';

interface DimensionBadgeProps {
    dimension?: Dimension | string | null;
    className?: string;
    showLabel?: boolean;
}

const DimensionBadge: React.FC<DimensionBadgeProps> = ({ dimension, className = '', showLabel = true }) => {
    if (!dimension) return null;

    const normalizedDimension = dimension.toLowerCase();
    const Icon = dimensionIcons[normalizedDimension] || dimensionIcons.default;
    const theme = dimensionColors[dimension] || dimensionColors.default;
    const baseColor = theme.base;

    // Dynamic Tailwind classes for badges
    // Note: These need to be safelisted or full strings if using JIT, but standard colors usually work if they appear elsewhere.
    // To be safe, I'll use a style object or just standard classes if I can.
    // Since I can't easily rely on dynamic class construction without safelisting in Tailwind config, 
    // I will use a lookup or just inline styles for the specific colors if needed, 
    // but let's try to use the `base` color to pick standard classes.
    
    // However, since I don't want to break the build with missing classes, I'll define a map.
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
        cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
        emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
        violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
        fuchsia: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200',
        rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
        sky: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
        lime: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
        amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    };

    const colorClasses = colorMap[baseColor] || colorMap.gray;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses} ${className}`}>
            <Icon className={`w-3 h-3 ${showLabel ? 'mr-1.5' : ''}`} />
            {showLabel && (dimension.charAt(0).toUpperCase() + dimension.slice(1))}
        </span>
    );
};

export default DimensionBadge;
