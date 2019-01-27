import * as CONSTS from '../constants/ReducerConstants';
import * as ACTIONTYPES from '../constants/ActionConstants';
import { fromJS } from 'immutable';

export const INITIAL_STATE = {
    [CONSTS.SUGGESTIONS]: [
        { label: 'Afghanistan' },
        { label: 'Aland Islands' },
        { label: 'Albania' },
        { label: 'Algeria' },
        { label: 'American Samoa' },
        { label: 'Andorra' },
        { label: 'Angola' },
        { label: 'Anguilla' },
        { label: 'Antarctica' },
        { label: 'Antigua and Barbuda' },
        { label: 'Argentina' },
        { label: 'Armenia' },
        { label: 'Aruba' },
        { label: 'Australia' },
        { label: 'Austria' },
        { label: 'Azerbaijan' },
        { label: 'Bahamas' },
        { label: 'Bahrain' },
        { label: 'Bangladesh' },
        { label: 'Barbados' },
        { label: 'Belarus' },
        { label: 'Belgium' },
        { label: 'Belize' },
        { label: 'Benin' },
        { label: 'Bermuda' },
        { label: 'Bhutan' },
        { label: 'Bolivia, Plurinational State of' },
        { label: 'Bonaire, Sint Eustatius and Saba' },
        { label: 'Bosnia and Herzegovina' },
        { label: 'Botswana' },
        { label: 'Bouvet Island' },
        { label: 'Brazil' },
        { label: 'British Indian Ocean Territory' },
        { label: 'Brunei Darussalam' },
    ]
};

const setCompanyData = (state, payload) => {
	console.log('TCL: setCompanyData -> payload', payload)

    return state;
}

export default function(state = fromJS(INITIAL_STATE), action) {
    const { payload = {} } = action;

    switch (action.type) {
        case ACTIONTYPES.FETCH_COMPANY_DATA:
            return setCompanyData(state, payload);
        default:
            return state;
    }
}
