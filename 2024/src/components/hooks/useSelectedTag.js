import { useState } from "react";

const useSelectedTag = () => {
  const [tags, setTags] = useState([]);

  const handleTag = (tag) => {
    if (tags.map((item) => item.id).includes(tag.id)) {
      setTags(tags.filter((item) => item.id !== tag.id));
    } else {
      setTags([...tags, { ...tag }]);
    }
  };

  return {
    tags,
    handleTag,
  };
};

export default useSelectedTag;
