export const gaEvent = ({ action, params }) => {
    window.gtag('event', action, params)
}