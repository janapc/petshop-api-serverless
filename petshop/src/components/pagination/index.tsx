"use client";
import { ChevronsLeft, ChevronsRight } from "react-feather";

import styles from "./pagination.module.css";
import { useEffect, useState } from "react";

type Data = {
  next: number | undefined;
  previous: number | undefined;
  getData: (pageNumber: number) => Promise<void>;
};

export default function Pagination(data: Data) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (data.next) {
      setCurrentPage(data.next - 1);
    } else if (data.previous === 0 || data.previous) {
      setCurrentPage(data.previous + 1);
    }
  }, [data]);

  async function handlePagination(next: boolean) {
    let pageNumber = currentPage;
    if (!next) pageNumber -= 1;
    else pageNumber += 1;
    await data.getData(pageNumber);
  }

  return (
    <>
      {(data.next !== undefined || data.previous !== undefined) && (
        <div className={styles.pagination}>
          <button
            disabled={data.next === 1}
            onClick={() => handlePagination(false)}
          >
            <ChevronsLeft size={24} color={"#faab78"} />
            <span>Previous</span>
          </button>

          <div className={styles.currentPage}>
            <span>{currentPage}</span>
          </div>
          <button disabled={!data.next} onClick={() => handlePagination(true)}>
            <span>Next</span>
            <ChevronsRight size={24} color={"#faab78"} />
          </button>
        </div>
      )}
    </>
  );
}
