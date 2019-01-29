import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    inputRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
		margin: '0 auto'
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4
    }
});
const SearchInput = (props) => {
    const {
        classes,
        handleInputChange,
        handleSearchClick,
        value,
        placeholder
    } = props;
    return (
        <Paper className={classes.inputRoot} elevation={4}>
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
    )
}
SearchInput.defaultProps = {
    placeholder: "Search Company",
    classes: {},
    handleInputChange: () => {},
    handleSearchClick: () => {},
    value: ''
};

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    handleInputChange: PropTypes.func,
    handleSearchClick: PropTypes.func,
    value: PropTypes.string
};

export default withStyles(styles)(SearchInput);
