/* eslint-disable react/prop-types */
// components/FloatingToggleButton.jsx
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'

export default function FloatingToggleButton({ setSidebarOpen }) {
    return (
        <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="fixed md:hidden bottom-4 right-4 p-3 bg-emerald-600 text-white rounded-full shadow-lg z-50"
        >
            <Bars3BottomLeftIcon className="w-6 h-6" />
        </button>
    )
}