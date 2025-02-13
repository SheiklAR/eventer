
const checkAuth = (setIsAuthorized, navigate) => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo === null) {
        console.log(userInfo);
        navigate('/login');
    } else {
        setIsAuthorized(true);
    }
};

export default checkAuth;