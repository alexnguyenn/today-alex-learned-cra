import ReactDOM from 'react-dom';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { relayStylePagination } from '@apollo/client/utilities';
import './index.css';


const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                postsConnection: relayStylePagination(),
            },
        },
    },
});

const client = new ApolloClient({
    uri: 'https://api-us-west-2.graphcms.com/v2/ckx5k6flg4kir01za8jhwcp89/master',
    cache
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
