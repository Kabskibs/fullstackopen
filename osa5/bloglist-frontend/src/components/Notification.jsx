const Notification = ({ message, state }) => {
    if (message === null) {
        return null
    }
    if (state === 0) {
        return (
            <div className='notificationSuccess'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='notificationError'>
                {message}
            </div>
        )
    }
}

export default Notification