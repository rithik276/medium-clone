import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Blog } from "./pages/Blog";
import { SignIn } from "./pages/SignIn";
import { Blogs } from "./pages/Blogs";
import { CreateBlog } from "./pages/CreateBlog";
import { Profile } from "./pages/Profile";
import { Bookmarks } from "./pages/Bookmarks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Blogs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create/blog" element={<CreateBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
