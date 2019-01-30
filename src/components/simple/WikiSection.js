import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    tabSection: {
        padding: '0 15px',
        position: 'relative',
        top: '60px',
        fontSize: '14px',
        fontWeight: 500
    }
});
const WikiSection = (props) => {
    const {
        classes,
        key,
        html
    } = props;
    return (
        <section
            className={classes.tabSection}
            key={key}
        >
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
}
WikiSection.defaultProps = {
    classes: {},
    key: 0,
    html: ''
};

WikiSection.propTypes = {
    classes: PropTypes.object,
    key: PropTypes.number,
    html: PropTypes.string
};

export default withStyles(styles)(WikiSection);
