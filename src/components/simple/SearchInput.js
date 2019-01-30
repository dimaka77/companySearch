import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = (error = false) => ({
    inputRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
        margin: '0 auto',
        ...error && {
            border: '1px solid red'
        }
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4
    },
    error: {
        padding: '2px 4px',
        width: 400,
        margin: '0 auto',
        color: 'red'
    }
});
const SearchInput = (props) => {
    const {
        classes,
        error,
        handleInputChange,
        handleSearchClick,
        value,
        placeholder
    } = props;
    return (
        <Fragment>
        <Paper style={styles(error).inputRoot} elevation={4}>
            <InputBase
                autoFocus
                className={classes.input}
                onChange={handleInputChange}
                value={value}
                placeholder={placeholder}
            />
            <Divider className={classes.divider} />
            <IconButton
                className={classes.iconButton}
                aria-label="Search"
                onClick={handleSearchClick}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
            {error && <Typography style={styles().error}>Please enter company name</Typography> }
        </Fragment>
    )
}
SearchInput.defaultProps = {
    placeholder: "Enter company name...",
    classes: {},
    error: false,
    handleInputChange: () => {},
    handleSearchClick: () => {},
    value: ''
};

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    error: PropTypes.bool,
    handleInputChange: PropTypes.func,
    handleSearchClick: PropTypes.func,
    value: PropTypes.string
};

export default withStyles(styles)(SearchInput);
