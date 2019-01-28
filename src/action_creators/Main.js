import axios from 'axios';
import * as ACTIONTYPES from '../constants/ActionConstants';



/**
 * Search organization data in Github
 * @param {String} companyName comapny name
 */
export function getCompanyGithubData(companyName = '') {
    const request = axios.get(`https://api.github.com/orgs/${companyName}`);

    return dispatch => request
        .then(({ data })=> data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_GITHUB_DATA_FAIL,
                payload: err
            });
            return null;
        });
}

export function getCompanyWikiData(companyName = '') {
    const request = axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${companyName}`);

    return dispatch => request
        .then(({ data }) => data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_WIKI_DATA_FAIL,
                payload: err
            });
            return null;
        });
}

export function getCompanyDuckDuckGoData(companyName = '') {
    // https://api.duckduckgo.com/?q=DuckDuckGo&format=json&pretty=1
    const request = axios.get(`https://api.duckduckgo.com/?q=${companyName}&format=json`);

    return dispatch => request
        .then(({ data }) => data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_DUCKDUCKGO_DATA_FAIL,
                payload: err
            });
            return null;
        });
}

/**
 * Search organization repositories
 * "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
 * @param {String} companyName comapny name
 */
export function getCompanyRepositories(companyName = '') {
    const request = axios.get(`https://api.github.com/orgs/${companyName}/repos`);

    return dispatch => request
        .then(({ data }) => data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_REPO_DATA_FAIL,
                payload: err
            });
            return null;
        })
}

function processPayload(data = {}) {
    return {
        list: Object.keys(data).filter(i => data[i] !== null),
        data
    }
}

function setLoading(loading = true) {
    return {
        type: ACTIONTYPES.SET_LOADING,
        params: loading
    };
}

export function fetch(companyName = '') {
    return (dispatch) => {
        dispatch(setLoading(true));

        const requests = [
            dispatch(getCompanyWikiData(companyName)),
            dispatch(getCompanyGithubData(companyName)),
            dispatch(getCompanyRepositories(companyName))
        ];
        return Promise.all(requests)
            .then(([wikiData, githubData, githubRepos]) => {
                const payload = processPayload({wikiData, githubData, githubRepos});

                dispatch(setLoading(false));
                dispatch({
                    type: ACTIONTYPES.FETCH_COMPANY_DATA,
                    payload
                })
            })
            .catch(err => {
                dispatch(setLoading(false));
                dispatch({
                    error: err,
                    type: ACTIONTYPES.FETCH_COMPANY_DATA_FAIL
                })
            });
    }
}
