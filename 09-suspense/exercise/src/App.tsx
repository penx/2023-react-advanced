import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
// import { Profile } from "./Profile";
const Profile = React.lazy(() => import("./Profile"));

const App = () => {
  return (
    <ErrorBoundary fallback="Error">
      <Suspense fallback="Loading">
        <Profile />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
