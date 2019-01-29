


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
    card: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4
    },
    cardTextBlock: {
        display: 'inline-block',
        height: '75px',
        verticalAlign: 'top',
        padding: '10px 15px'
    }
});
const MediaCard = (props) => {
    const {
        classes,
        src,
        title,
        description
    } = props;
    return (
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent>
                    <Avatar
                        alt="company-image"
                        classes={{ root: classes.avatar, img: classes.avatarImg }}
                        src={src}
                    />
                    <div className={classes.cardTextBlock}>
                        <Typography component="h5" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {description}
                        </Typography>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
MediaCard.defaultProps = {
    classes: {},
    src: '',
    title: '',
    description: ''
};

MediaCard.propTypes = {
    classes: PropTypes.object,
    src: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};

export default withStyles(styles)(MediaCard);
