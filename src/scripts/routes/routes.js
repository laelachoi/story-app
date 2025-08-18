import HomePage from "../pages/home/home-page";
import BookmarkPage from "../pages/bookmark/bookmark-page";

const routes = {
  '/': new HomePage(),
  '/bookmark': new BookmarkPage(),
};

export default routes;