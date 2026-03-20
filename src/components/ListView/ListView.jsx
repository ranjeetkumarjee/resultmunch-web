import { useState } from "react";
import { Link } from "react-router-dom";
import listcss from "./listview.module.css";

const ListView = (props) => {
  const { header } = props;
  const pages = [1, 2, 3];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  return (
    <div className={listcss.listviewsection}>
      <div className={listcss.listsecHeader}>
        <h1 className={listcss.listSecHeaderH1}>{header}</h1>
      </div>
      <div className={listcss.listSec}>
        <ul
          style={{ margin: "5px 0px", paddingLeft: "25px" }}
          className={listcss.unorderlistsec}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 4, 4, 4, 4, 4, 4, 4, 4].map(
            (item, index) => (
              <li className={listcss.listitem} key={index}>
                <Link to="/6666" target="_blank" className={listcss.linksec}>
                  UPSC CSE Result fff gf gefsdf ds sd s twer we g fasdfs
                  dfasfsfs sdfsdfs
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className={listcss.paginationContainer}>
        {pages.map((page) => (
          <Link
            key={page}
            to={`?page=${page}`}
            className={`${listcss.pageNumber} ${
              currentPage === page ? listcss.active : ""
            }`}
          >
            {page}
          </Link>
        ))}

        {totalPages > 3 && (
          <>
            <span className={listcss.dots}>...</span>

            <Link to={`?page=${totalPages}`} className={listcss.pageNumber}>
              {totalPages}
            </Link>
          </>
        )}

        {currentPage < totalPages && (
          <Link to={`?page=${currentPage + 1}`} className={listcss.nextBtn}>
            Next →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListView;
