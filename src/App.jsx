import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import AllSongs from "./components/AllSongs";
import Favorites from "./components/Favorites";
import History from "./components/History";
import About from "./components/About";
import Statistics from "./components/Statistics";
import PlaylistView from "./components/PlaylistView";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        { path: "/", element: <Navigate to="/allsongs" replace /> },
        { path: "allsongs", element: <AllSongs /> },
        { path: "favorites", element: <Favorites /> },
        { path: "history", element: <History /> },
        { path: "playlist/:id", element: <PlaylistView /> },
        { path: "statistics", element: <Statistics /> },
        { path: "about", element: <About /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
