import { useState } from "react"
import Loader from "../Shared/Loader"

const RefreshButton = () => {
    const [refreshState, setRefreshState] = useState('idle') // idle, refreshing, refreshed

    const handleRefresh = async () => {
        setRefreshState('refreshing')
        try {
            await refetch()
            setRefreshState('refreshed')
            // Reset to idle after 2 seconds
            setTimeout(() => {
                setRefreshState('idle')
            }, 2000)
        } catch (error) {
            setRefreshState('idle')
        }
    }

    const getRefreshButtonContent = () => {
        switch (refreshState) {
            case 'refreshing':
                return {
                    text: 'Refreshing...',
                    icon: 'animate-spin',
                    disabled: true
                }
            case 'refreshed':
                return {
                    text: 'Refreshed',
                    icon: '',
                    disabled: false
                }
            default:
                return {
                    text: 'Refresh',
                    icon: '',
                    disabled: false
                }
        }
    }

    const buttonContent = getRefreshButtonContent()

    const {
        data: bookings = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: async () => {
            const res = await getAdminBookings()
            return res?.data || []
        },
    })

    if (isLoading) return <Loader />
    return (
        <div>
            <button
                onClick={handleRefresh}
                disabled={buttonContent.disabled}
                className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full text-gray-100 bg-blue-950 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${refreshState === 'refreshed' ? 'border-green-300 bg-green-50 text-green-700' : ''
                    }`}
            >
                <svg
                    className={`w-4 h-4 mr-2 ${buttonContent.icon}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {refreshState === 'refreshed' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    )}
                </svg>
                {buttonContent.text}
            </button>
        </div>
    )
}

export default RefreshButton
