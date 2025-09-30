import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import AllSongs from "./components/AllSongs";
import About from "./components/About";
import FavouriteSongs from "./components/FavouriteSongs";
import Artists from "./components/Artists";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        { path: "/", element: <Navigate to="/allsongs" replace /> },
        { path: "allsongs", element: <AllSongs /> },
        { path: "favourites", element: <FavouriteSongs /> },
        { path: "artists", element: <Artists /> },
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
