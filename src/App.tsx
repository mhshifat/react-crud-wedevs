import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import Input from "./comps/common/element/Input";
import Modal from "./comps/common/element/Modal";
import Select from "./comps/common/element/Select";

let posts = [
  {
    id: 1,
    title: "Post 1",
    description: "Post 1 Description",
    categories: ["web"],
  },
  {
    id: 2,
    title: "Post 2",
    description: "Post 2 Description",
    categories: ["tech", "mobile"],
  },
];

function App() {
  const [, dispatch] = useReducer(() => ({}), {});
  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [editPostModalOpen, setEditPostModalOpen] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editablePost, setEditablePost] = useState<typeof posts[0] | null>(
    null
  );
  const [selectValues, setSelectValues] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState([
    {
      index: 50,
      value: "Create New",
      onClick: () => {
        setNewCategory("");
        setCategoryModalOpen(true);
      },
    },
    { index: 51, value: "Tech" },
    { index: 52, value: "Web" },
    { index: 53, value: "Mobile" },
  ]);

  useEffect(() => {
    if (editablePost) {
      setSelectValues(editablePost.categories);
    }
  }, [editablePost]);

  return (
    <div className="container">
      <h3 className="post-header-title">
        All Posts{" "}
        <button
          onClick={() => {
            setEditablePost(null);
            setSelectValues([]);
            setNewPostTitle("");
            setEditPostModalOpen(true);
          }}
        >
          Create New Post
        </button>
      </h3>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="post-card-cats">
              {post.categories.map((cat, i) => (
                <span key={i}>{cat}</span>
              ))}
            </div>
            <br />
            <button
              onClick={() => {
                setEditablePost(post);
                setEditPostModalOpen(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                posts = posts.filter((item) => item.id !== post.id);
                dispatch();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Create/Edit Post Modal */}
      <Modal
        open={editPostModalOpen}
        onClose={() => {
          setEditPostModalOpen(false);
          setEditablePost(null);
        }}
        title={editablePost ? "Edit post: " + editablePost.id : "Add New Post"}
        onSave={() => {
          if (editablePost) {
            const postIndex = posts.findIndex(
              (item) => item.id === editablePost?.id
            );
            posts[postIndex] = editablePost || posts[postIndex];
            posts[postIndex].categories = [...selectValues];
          }
          if (!editablePost && newPostTitle) {
            posts.push({
              id: posts.length + 1,
              title: newPostTitle,
              description: newPostTitle + "Description",
              categories: selectValues,
            });
          }
          setEditPostModalOpen(false);
        }}
      >
        <Input
          placeholder="e.g. Post 1"
          value={editablePost?.title || newPostTitle}
          label="Title"
          onChange={(value) => {
            if (editablePost)
              setEditablePost(
                editablePost ? { ...editablePost, title: value } : null
              );
            else setNewPostTitle(value);
          }}
        />

        <Select
          multiSelect
          placeholder="e.g. Tech"
          label="Post Categories"
          {...(selectValues && selectValues.length
            ? {
                values: [
                  ...selectValues.map((item, i) => ({
                    index: +i,
                    value: item,
                  })),
                ],
              }
            : {})}
          options={selectedOptions}
          onSelect={(values) => {
            setSelectValues([...values.map((i) => i.value)]);
          }}
        />
      </Modal>

      {/* Create Category Modal */}
      <Modal
        width="350px"
        open={categoryModalOpen}
        onClose={() => {
          setNewCategory("");
          setCategoryModalOpen(false);
        }}
        title="Add New Post Category"
        onSave={() => {
          if (editablePost) {
            setSelectValues([
              ...editablePost.categories.filter(
                (item) => !item.toLowerCase().includes("create")
              ),
              newCategory,
            ]);
          }
          if (newCategory) {
            setSelectValues([
              ...selectValues.filter(
                (item) => !item.toLowerCase().includes("create")
              ),
              newCategory,
            ]);
          }
          setCategoryModalOpen(false);
        }}
      >
        <Input
          onChange={(value) => setNewCategory(value)}
          onBlur={() =>
            setSelectedOptions([
              ...selectedOptions,
              { index: selectedOptions.length + 1, value: newCategory },
            ])
          }
          placeholder="e.g. Tech"
          label="Name"
          value={newCategory}
        />
      </Modal>
    </div>
  );
}

export default App;
