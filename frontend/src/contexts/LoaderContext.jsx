import { createContext, useEffect, useId, useMemo, useState } from 'react'
import Loader from '../components/Loader.jsx'

const LoaderContext = createContext(null)

function LoaderProvider({ children }) {
    const [activeLoaders, setActiveLoaders] = useState([])

    function showLoader(id, nextMessage = 'Caricamento in corso...') {
        setActiveLoaders((currentLoaders) => {
            const existingLoader = currentLoaders.find((loader) => loader.id === id)

            if (existingLoader) {
                return currentLoaders.map((loader) => (
                    loader.id === id ? { ...loader, message: nextMessage } : loader
                ))
            }

            return [...currentLoaders, { id, message: nextMessage }]
        })
    }

    function hideLoader(id) {
        setActiveLoaders((currentLoaders) => (
            currentLoaders.filter((loader) => loader.id !== id)
        ))
    }

    const isVisible = activeLoaders.length > 0
    const message = isVisible
        ? activeLoaders[activeLoaders.length - 1].message
        : 'Caricamento in corso...'

    const value = useMemo(() => ({
        isVisible,
        message,
        showLoader,
        hideLoader,
    }), [isVisible, message])

    return (
        <LoaderContext.Provider value={value}>
            {children}
            {isVisible && <Loader message={message} fullScreen />}
        </LoaderContext.Provider>
    )
}

function useLoader() {
    const context = useContext(LoaderContext)

    if (!context) {
        throw new Error('useLoader deve essere usato dentro LoaderProvider')
    }

    return context
}

function usePageLoader(isLoading, message = 'Caricamento in corso...') {
    const { showLoader, hideLoader } = useLoader()
    const loaderId = useId()

    useEffect(() => {
        if (isLoading) {
            showLoader(loaderId, message)
        } else {
            hideLoader(loaderId)
        }

        return () => {
            hideLoader(loaderId)
        }
    }, [hideLoader, isLoading, loaderId, message, showLoader])
}

export { LoaderProvider, useLoader, usePageLoader }
