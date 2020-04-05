import React, { FunctionComponent, useEffect, useState } from 'react';
import './Pagination.scss';

type PaginateProps = {
  totalItems?: number;
  currentPage?: number;
  page?: number;
  pageSize?: number;
  maxPages?: number;
  onChangePage?: (page: number) => void;
};

const Pagination: FunctionComponent<PaginateProps> = (props) => {
  const pagerInit = getPager();
  const [pager, setPager] = useState(pagerInit);

  useEffect(() => {
    const pagerInit = getPager(props.totalItems, props.page, props.pageSize, props.maxPages);
    setPager(pagerInit);
  }, [props.totalItems, props.pageSize, props.maxPages, props.page]);

  function setPage(page: number) {
    if (page < 1 || page > pager.totalPages) return;
    const newPager = getPager(props.totalItems, page, props.pageSize, props.maxPages);
    setPager(newPager);

    if (props.onChangePage) {
      props.onChangePage(page);
    }
  }

  function getPager(
    totalItems: number = 0,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 3,
  ) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  }

  return (
    <ul className="pagination">
      <li className="totalItems">Total de {props.totalItems} registros</li>
      <li
        className={pager.currentPage === 1 || pager.currentPage === 0 ? 'disabled' : ''}
        onClick={() => setPage(1)}
      >
        <span>Primeiro</span>
      </li>
      <li
        className={pager.currentPage === 1 || pager.currentPage === 0 ? 'disabled' : ''}
        onClick={() => setPage(pager.currentPage - 1)}
      >
        <span>Página anterior</span>
      </li>
      {pager.pages.map((page, index) => (
        <li
          key={index}
          className={pager.currentPage === page ? 'active' : 'mobile'}
          onClick={() => setPage(page)}
        >
          <span>{page}</span>
        </li>
      ))}
      <li
        className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        onClick={() => setPage(pager.currentPage + 1)}
      >
        <span>Próxima página</span>
      </li>
      <li
        className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        onClick={() => setPage(pager.totalPages)}
      >
        <span>Último</span>
      </li>
    </ul>
  );
};

export default Pagination;
