import GraphQLFetch from './GraphQLFetch';

const graphQLEndpoint = process.env.GRAPHQL_SERVER_ENDPOINT || '/api/graphql/';

const APIFetch = async ({ query, variables = null, endpoint = graphQLEndpoint }) => {
    return await GraphQLFetch({ query, variables, endpoint }).then((r) => {
        if (r && !Object.prototype.hasOwnProperty.call(r, 'errors')) return { success: true, data: r.data };
        return { success: false, response: r, errors: r ? r.errors : null };
    });
};

export default APIFetch;
