import { auth } from '@clerk/nextjs';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql/language/printer';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

export const fetchServer = async <T, V>(query: TypedDocumentNode<T, V>, variables: V) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 7000);

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
        signal: controller.signal,
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data as T;
};

type FetchDataResult<T> = {
    data: T | null;
    error: Error | null;
};

export const fetchServerInitialData = async <T, V>(
    document: TypedDocumentNode<T, V>,
    variables: V,
): Promise<FetchDataResult<T>> => {
    let data = null;
    let error = null;

    try {
        data = await fetchServer(document, variables);
    } catch (e) {
        console.error(e);
        error = e as Error;
    }

    return { data, error };
};
