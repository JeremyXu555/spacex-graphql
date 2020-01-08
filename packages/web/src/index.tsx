import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";

import { client } from "./apollo";
import { Routes } from "./routes";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.getElementById("root") as HTMLElement
);
serviceWorker.unregister();
