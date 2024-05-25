import React, { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button } from "../components/Button";
import { useAddBlog } from "../hooks/useAddBlog";
import { useParams } from "react-router-dom";

export const CreateBlog: React.FC = () => {
  const [rows, setRows] = useState(12);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addBlog, loading } = useAddBlog();
  const { id } = useParams();

  const updateRows = () => {
    const windowHeight = window.innerHeight;
    const rowHeight = 48;
    const maxRows = Math.floor(windowHeight / rowHeight) - 2;
    setRows(maxRows);
  };

  useEffect(() => {
    updateRows();
    window.addEventListener("resize", updateRows);

    return () => {
      window.removeEventListener("resize", updateRows);
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const handleSubmit = async (
    e: React.MouseEvent<Element, MouseEvent>,
    published: boolean
  ) => {
    e.preventDefault();
    const body = {
      id: id,
      title: title,
      content: content,
      published: published,
    };
    try {
      const res = await addBlog(body);
      console.log("blog added", res);
      //i need to create a toast or a modal

      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <AppBar>
        <div className="flex justify-end gap-3 px-20 py-5">
          <Button value="Save" onClick={(e) => handleSubmit(e, false)} />
          <Button value="Publish" onClick={(e) => handleSubmit(e, true)} />
        </div>
        <div className="pr-20">
          <div className="mb-6">
            <label
              htmlFor="large-input"
              className="block mb-2 text-3xl font-medium text-black"
            >
              Title
            </label>
            <input
              type="text"
              id="large-input"
              onChange={(e) => handleTitleChange(e)}
              className="block w-full p-3 text-black border border-g rounded-lg bg-gray-50 text-lg"
            />
          </div>
          <div className="">
            <label
              htmlFor="story"
              className="block mb-2 text-2xl font-medium text-black"
            >
              Tell your story
            </label>
            <textarea
              rows={rows}
              onChange={(e) => handleStoryChange(e)}
              className="block p-2.5 w-full text-base text-black bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Write your story here..."
            ></textarea>
          </div>
        </div>
      </AppBar>
    </div>
  );
};
