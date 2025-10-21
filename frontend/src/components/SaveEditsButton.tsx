/**
 * Reusable save button component
 * - Executes provided onClickFunction when clicked
 * - Optional styling variants and simple loading state
 */
import type { SaveEditsButtonProps } from '../../../shared-types/ComponentPropTypes';

export default function SaveEditsButton({
    onClickFunction,
    color = 'red',
    isLoading = false,
    label = 'Save',
    disabled = false,
}: SaveEditsButtonProps) {
    const base = 'text-white px-4 py-2 rounded transition-colors';
    const colorClass =
        color === 'gray'
            ? 'bg-gray-600 hover:bg-gray-700'
            : color === 'dark-red'
            ? 'bg-red-800 hover:bg-red-900'
            : 'bg-red-600 hover:bg-red-700';
    const stateClass = disabled || isLoading ? ' opacity-60 cursor-not-allowed' : '';

    return (
        <button
            onClick={onClickFunction}
            className={`${base} ${colorClass}${stateClass}`}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Saving…' : label}
        </button>
    );
}