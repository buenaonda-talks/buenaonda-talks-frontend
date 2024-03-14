import { GetToken } from '@clerk/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql/language/printer';

export { gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

export async function fetchClient<T, V>(
    query: TypedDocumentNode<T, V>,
    variables: V,
    {
        getToken,
        ...options
    }: Omit<RequestInit, 'method' | 'headers' | 'body'> & {
        getToken?: GetToken;
    } = {},
) {
    if (!API_URL) {
        throw new Error('API_URL is not set');
    }

    try {
        const fetchConfig: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(getToken
                    ? {
                          Authorization: `JWT ${await getToken({
                              template: 'supabase',
                          })}`,
                      }
                    : {}),
            },
            body: JSON.stringify({
                query: print(query),
                variables: variables || undefined,
            }),
            ...options,
        };
        const response = await fetch(API_URL, fetchConfig);

        if (!response.ok) {
            console.error(response);
            throw response;
        }
        console.log(response);

        const json = await response.json();

        if (json.errors && json.errors.length > 0) {
            const firstError = json.errors[0];
            let message = firstError.message;

            const firstErrorSplitted = firstError.message.split('Error: ');
            if (firstErrorSplitted.length > 1) {
                message = firstErrorSplitted.slice(1).join('');
            }

            if (message === 'Error decoding signature') {
                sessionStorage.removeItem('token');
                return fetchClient<T, V>(query, variables);
            } else {
                throw new Error(message);
            }
        }

        return json.data as T;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
