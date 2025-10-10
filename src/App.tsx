import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { DashBoardProvider } from "./hooks/sideDashContext";

const App = () => {
  return (
    <DashBoardProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </DashBoardProvider>
  );
};

export default App;
