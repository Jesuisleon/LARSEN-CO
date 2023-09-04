import { useState, useEffect } from "react";

import { useArticle } from "hooks/useArticle";
import ArticleInput from "components/form/ArticleInput";

export default function ArticleForm({articles, handleArticles, total, handleTotal}) {
  const { getArticle } = useArticle();
  const [articleList, setArticleList] = useState([]);

  const handleArticleUpdated = (object) => {
    const index = articles.findIndex(
      (article) => article.listId === object.listId
    );
    const newArticles = [...articles];
    if (index === -1) {
      newArticles.push(object);
    } else {
      newArticles[index] = object;
    }

    updateTotalSales(newArticles);
    handleArticles(newArticles);
  };

  const addArticle = () => {
    // On crée un identifiant unique pour chaque article ajouté à la liste
    handleArticles((prev) => [...prev, { listId: Date.now() }]);
  };

  const deleteArticle = (listId) => {
    const newArticles = articles.filter((article) => article.listId !== listId);
    updateTotalSales(newArticles);
    handleArticles(newArticles);
  };

  const updateTotalSales = (articles) => {
    if (articles.length === 0) return handleTotal();
    const total = articles.reduce((acc, article) => {
      return acc + article.quantity * article.price;
    }, 0);
    handleTotal(total);
  };

  useEffect(() => {
    getArticle().then((data) => {
      setArticleList(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {articles.map((article) => (
        <ArticleInput
          key={article.listId}
          article={article}
          articleList={articleList}
          handleArticleUpdated={(e) => handleArticleUpdated(e)}
          deleteArticle={(listId) => deleteArticle(listId)}
        />
      ))}
      <button onClick={() => addArticle()} className="btn btn-yellow justify-center">
        New Article
      </button>
     {total && ( <div className="flex items-center gap-4">
        <label htmlFor="total" className="text-red-600">
          Total
        </label>
        <input
          type="number"
          id="total"
          name="total"
          readOnly
          className="invisible-input"
          value={total}
        />
      </div>)}
    </div>
  );
}
