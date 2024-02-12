import { auth } from '@clerk/nextjs';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql/language/printer';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

export const fetchServer = async <T, V>(query: TypedDocumentNode<T, V>, variables: V) => {
    const { getToken } = auth();
    const token = await getToken({ template: 'supabase' });

    if (!API_URL) {
        throw new Error('API_URL is not set');
    }

    const headers: RequestInit['headers'] = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token
            ? {
                  Authorization: `JWT ${token}`,
              }
            : {}),
    };

    const res = await fetch(API_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            query: print(query),
            variables: variables || undefined,
        }),
        cache: 'no-cache',
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data as T;
};
