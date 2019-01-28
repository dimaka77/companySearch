import * as CONSTS from '../constants/ReducerConstants';
import * as ACTIONTYPES from '../constants/ActionConstants';
import { fromJS } from 'immutable';

export const INITIAL_STATE = {
    [CONSTS.COMPANY_DATA]: {
        list: [],
        data: {}
    },
    [CONSTS.LOADING]: false
};

/**
 * Returns error trace
 * @param {Object} action redux action
 * @return {Object} action erorr
 */
const handleError = (state, action = {}) => {
    console.error(`%c ACTION: ${action.type}, ERROR:`, 'background: #222; color: red', action.payload);
    return state;
};

const setLoadingState = (state, loading) => state.set(CONSTS.LOADING, fromJS(loading));

const setCompanyData = (state, payload) => state.set(CONSTS.COMPANY_DATA, fromJS(payload));

export default function(state = fromJS(INITIAL_STATE), action) {
    const { payload = {}, params = {} } = action;

    switch (action.type) {
        case ACTIONTYPES.SET_LOADING:
            return setLoadingState(state, params);
        case ACTIONTYPES.FETCH_COMPANY_DATA:
            return setCompanyData(state, payload);
        case ACTIONTYPES.FETCH_COMPANY_DATA_FAIL:
        case ACTIONTYPES.FETCH_COMPANY_REPO_DATA_FAIL:
        case ACTIONTYPES.FETCH_COMPANY_WIKI_DATA_FAIL:
        case ACTIONTYPES.FETCH_COMPANY_GITHUB_DATA_FAIL:
        case ACTIONTYPES.FETCH_COMPANY_DUCKDUCKGO_DATA_FAIL:
            return handleError(state, action)
        default:
            return state;
    }
}
