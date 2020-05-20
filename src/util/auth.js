export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if (authToken === null) {
        window.location.href = '/login';
    }
}