import { createContext, useContext, useMemo, useState } from 'react'
import Loader from '../components/Loader.jsx'

const LoaderContext = createContext(null)

function LoaderProvider({ children }) {
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('Caricamento in corso...')

    function showLoader(nextMessage = 'Caricamento in corso...') {
        setMessage(nextMessage)
        setIsVisible(true)
    }

    function hideLoader() {
        setIsVisible(false)
    }

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

export { LoaderProvider, useLoader }
