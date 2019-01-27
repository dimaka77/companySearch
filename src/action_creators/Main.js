import axios from 'axios';
import * as ACTIONTYPES from '../constants/ActionConstants';

/**
 * Search organization data in Github
 * @param {String} companyName comapny name
 */
export function getCompanyGithubData(companyName = '') {
    const request = axios.get(`https://api.github.com/orgs/${companyName}`);

    return request
        .then(({ data })=> data)
        .catch(err => ({
            type: ACTIONTYPES.FETCH_COMPANY_GITHUB_DATA_FAIL,
            payload: err
        }));
}

export function getCompanyWikiData(companyName = '') {
    const request = axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${companyName}`);

    return request
        .then(({ data }) => data)
        .catch(err => ({
            type: ACTIONTYPES.FETCH_COMPANY_WIKI_DATA_FAIL,
            payload: err
        }));
}

/**
 * Search organization repositories
 * "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
 * @param {String} companyName comapny name
 */
export function getCompanyRepositories(companyName = '') {
    const request = axios.get(`https://api.github.com/orgs/${companyName}/repos`);

    return request
        .then(({ data }) => data)
        .catch(err => ({
            type: ACTIONTYPES.FETCH_COMPANY_REPO_DATA_FAIL,
            payload: err
        }));
}

function processPayload([wikiData, githubData, githubRepos]) {
    return {
        wikiData,
        githubData,
        githubRepos
    }
}

export function fetch(companyName = 'google') {
    return (dispatch) => {
        const requests = [
            getCompanyWikiData(companyName),
            getCompanyGithubData(companyName),
            getCompanyRepositories(companyName)
        ];
        return Promise.all(requests)
            .then(([wikiData, githubData, githubRepos]) => {
                const payload = processPayload([wikiData, githubData, githubRepos]);
                return dispatch({
                    type: ACTIONTYPES.FETCH_COMPANY_DATA,
                    payload
                })
            })
            .catch(err => dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_DATA_FAIL,
                payload: err
            }));
    }
}
