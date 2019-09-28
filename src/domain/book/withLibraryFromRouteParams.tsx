import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as LibraryQueryGql from "./LibraryQuery.graphql";
import {
  ReactFunctionOrComponentClass, LibraryQuery,  
  LibraryDetailsFragment
} from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

type LibraryPageRouteParams = {
  libraryId: any
};

type LibraryPageProps = RouteComponentProps<LibraryPageRouteParams>;

type LibraryPageFullProps = LibraryPageProps & {
  data: QueryProps & LibraryQuery;
  library: LibraryDetailsFragment;
};

const withLibraryFromRouteParams = (
  TheLibraryComponent: ReactFunctionOrComponentClass<{
    library: LibraryDetailsFragment;
  }>
) => {
  const withLibraryFromRouteParamsWrapper = (props: LibraryPageFullProps) => <TheLibraryComponent library={props.data.library} />;
  return graphql<LibraryQuery, LibraryPageProps, LibraryPageFullProps>(LibraryQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          libraryId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withLibraryFromRouteParamsWrapper));
};

export default withLibraryFromRouteParams;
