import React from 'react'

function Logout() {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return (
        <div>
            <button className='btn btn-warning' onClick={logout}>Logout</button>
        </div>
    )
}
export default Logout;
