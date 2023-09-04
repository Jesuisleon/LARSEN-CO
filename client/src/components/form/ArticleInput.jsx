import { useState, useEffect } from "react";

export default function ArticleInput({article, articleList, handleArticleUpdated, deleteArticle }) {

  const [articleData, setArticleData] = useState({});
  const [quantity, setQuantity] = useState(article.quantity || 1);

  useEffect(() => {
    if (articleData?._id) {
      handleArticleUpdated({ ...articleData, listId: article.listId, quantity: quantity });
    }
  }, [articleData, quantity ]);

  const incrementArticleQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrementArticleQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setQuantity(article.quantity || 1);
  }, []);


  useEffect(() => {
    //   Si l'article n'a pas d'id, on lui attribue le premier article de la liste des articles
    if (!article._id) return setArticleData(articleList[0]);
    setArticleData(articleList.find((a) => a._id === article._id));
  }, [article._id]);


  return (
    <div className="grid grid-cols-2 gap-x-6">
      <label htmlFor="article" className="label">
        Articles
      </label>
      <label htmlFor="quantity" className="label">
        Quantity
      </label>
      <select
        value={article?._id}
        onChange={(e) => {
          const article = articleList.find(
            (article) => article._id === e.target.value
          );
          setArticleData(article);
        }}
        id="article"
        name="article"
        className="input"
      >
        {articleList.map((article) => (
          <option key={article._id} value={article._id}>
            {article.name}
          </option>
        ))}
      </select>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={() => decrementArticleQuantity()}
          className="input-btx-number rounded-l"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  "
          name="custom-input-number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
        <button
          onClick={() => incrementArticleQuantity()}
          className="input-btx-number rounded-r"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
        <button
          onClick={() => deleteArticle(article.listId)}
          className="btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
