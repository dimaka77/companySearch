


import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    avatar: {
        display: 'inline-block',
        margin: 10,
        width: 60,
        height: 60,
    },
    avatarImg: {
        objectFit: 'fill'
    },
    tabSection: {
        padding: '0 15px',
        position: 'relative',
        top: '60px',
        fontSize: '14px',
        fontWeight: 500
    },
});
const GithubSection = (props) => {
    const {
        classes,
        key,
        src,
        description,
        email,
        htmlUrl
    } = props;
    return (
        <section
            className={classes.tabSection}
            key={key}
        >
            <div>
                <Avatar
                    alt="github-image"
                    classes={{ root: classes.avatar, img: classes.avatarImg }}
                    src={src}
                />
            </div>
            <div>{`Description: ${description}`}</div>
            <div>{`Email: ${email}`}</div>
            <div>URL:&nbsp;
					<a
                    href={htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {htmlUrl}
                </a>
            </div>
        </section>
    )
}
GithubSection.defaultProps = {
    classes: {},
    key: '0',
    src: '',
    description: '',
    email: '',
    htmlUrl: ''
};

GithubSection.propTypes = {
    classes: PropTypes.object,
    key: PropTypes.string,
    src: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    htmlUrl: PropTypes.string
};

export default withStyles(styles)(GithubSection);
