import { useState, useEffect } from "react";

import { useArticle } from "hooks/useArticle";
import { useReport } from "hooks/useReport";

import List from "components/List";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function ArticleList() {
  const { getArticle, error, isLoading } = useArticle();
  const { getAllReport } = useReport();

  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    const articles = await getArticle();
    const reports = await getAllReport();

    if (!articles || !reports) return;

    // create new articleList with quantity and total
    const newArticleList = articles.map((article) => {
      let quantity = 0;
      let total = 0;
      let _id = article._id;
      // Pour tous les reports
      reports.forEach((report) => {
        // Pour tous les articles d'un report
        report.articles.forEach((reportArticle) => {
          // On récupére la correspondance dans notre liste d'articles venant du modél article
          if (reportArticle._id === article._id) {
            quantity += reportArticle.quantity;
          }
        });
      });
      // Une fois qu'on a le nombre d'article on peux calculer le prix total des ventes de chaque artiles
      total = quantity * article.price;
      // On recrée un object conforme à ce que l'on souhaite dans le tableau
      return { _id, name: article.name, quantity, total: total + '$' };
    });

    // On sort pour obtenir un rank
    newArticleList.sort((a, b) => {
      return b.total - a.total;
    });

     setArticleList(newArticleList);
   };


  useEffect(() => {
    getArticleList();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <List
      thList={["Article", "Quantity", "Total"]}
      tdList={articleList}
      itemsPerPage={3}
      title="Best Sales"
      icon={
        <CurrencyDollarIcon
          className="h-6 w-6 text-gray-400 "
          aria-hidden="true"
        />
      }
    />
  );
}
