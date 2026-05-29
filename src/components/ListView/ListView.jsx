import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import listcss from "./listview.module.css";

const ListView = (props) => {
  const { header, fetcher } = props;
  const pages = [1, 2, 3];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!fetcher) return;
    let active = true;
    setLoading(true);
    setError("");
    fetcher()
      .then((res) => {
        if (!active) return;
        setItems(Array.isArray(res?.data) ? res.data : []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || "Failed to load");
        setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetcher]);

  return (
    <div className={listcss.listviewsection}>
      <div className={listcss.listsecHeader}>
        <h1 className={listcss.listSecHeaderH1}>{header}</h1>
      </div>
      <div className={listcss.listSec}>
        {loading && <p style={{ padding: "10px 25px" }}>Loading...</p>}
        {!loading && error && (
          <p style={{ padding: "10px 25px", color: "#dc3545" }}>{error}</p>
        )}
        {!loading && !error && items.length === 0 && (
          <p style={{ padding: "10px 25px" }}>No records found.</p>
        )}
        {!loading && !error && items.length > 0 && (
          <ul
            style={{ margin: "5px 0px", paddingLeft: "25px" }}
            className={listcss.unorderlistsec}
          >
            {items.map((item, index) => (
              <li className={listcss.listitem} key={item._id || item.id || index}>
                <Link
                  to={`/${item._id || item.id || ""}`}
                  target="_blank"
                  className={listcss.linksec}
                >
                  {item.title || item.label || item.jobHeading || item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
