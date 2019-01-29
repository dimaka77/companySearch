export default theme => ({
    mainContainer: {
        height: '100vh',
        width: '100vw',
        maxWidth: '80vw',
        margin: '20px auto'
    },
    mediaCard: {
        width: '100%',
        margin: '20px 0'
    },
    progressCircle: {
        margin: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    progressCircleColor: {
        color: '#000'
    },
    infoSection: {
        position: 'relative'
    },
    tabBar: {
        backgroundColor: '#fff'
    },
    tabSection: {
        padding: '0 15px',
        position: 'relative',
        top: '60px',
        fontSize: '14px',
        fontWeight: 500
    }
});
