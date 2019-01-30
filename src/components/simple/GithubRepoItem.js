import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
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
const GithubRepoItem = (props) => {
    const {
        classes,
        open_issues_count,
        src,
        watchers,
        stargazers_count,
        htmlUrl
    } = props;

    return (
        <ListItem>
            <Avatar
                alt="github-image"
                classes={{ root: classes.avatar, img: classes.avatarImg }}
                src={src}
            />
            <ListItemText>
                <div>
                    <a
                        href={htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {htmlUrl}
                    </a>
                </div>
                <Fragment>
                    <Chip
                        label={`watchers: ${watchers}`}
                        className={classes.chip}
                    />
                    <Chip
                        label={`stargazers: ${stargazers_count}`}
                        className={classes.chip}
                    />
                    <Chip
                        label={`open issues: ${open_issues_count}`}
                        className={classes.chip}
                    />
                </Fragment>
            </ListItemText>
        </ListItem>
    )
}
GithubRepoItem.defaultProps = {
    classes: {},
    open_issues_count: 0,
    src: '',
    watchers: 0,
    stargazers_count: 0,
    htmlUrl: ''
};

GithubRepoItem.propTypes = {
    classes: PropTypes.object,
    open_issues_count: PropTypes.number,
    src: PropTypes.string,
    watchers: PropTypes.number,
    stargazers_count: PropTypes.number,
    htmlUrl: PropTypes.string
};

export default withStyles(styles)(GithubRepoItem);
