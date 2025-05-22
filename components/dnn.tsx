'use client';

import { useEffect, useState } from 'react';
import { getDnnModels } from '@/api/dnn';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComp from './paginationComp';
import ModalComp from './modalComp';
import TableComp from './tableComp';

type Model = {
  id: number;
  name: string;
  description: string;
  isOpenSource: boolean;
};

type SortConfig = {
  key: keyof Model;
  direction: 'asc' | 'desc';
} | null;

type PageData = {
  currentPageNo: 1,
  pageSize: 1,
  totalRecords: 0
} | null;

export default function DNN() {
  const [models, setModels] = useState<Model[]>([]);
  const [pageData, setPageData] = useState<PageData>();

  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentModel, setCurrentModel] = useState<Model>();

  useEffect(() => {
    fetchData(10, 1, "");
  }, []);

  const sortedModels = [...models]
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  const fetchData = async (limit: number, offset: number, search: string) => {
    const response = await getDnnModels(limit, offset, search);
    setModels(response?.dnnModelList?.data?.searchResult);
    setPageData(response?.dnnModelList?.pageData);

  };
  const handleSort = (key: keyof Model) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const handleClose = () => {
    console.log(sortConfig)
    setShowModal(false);
    setCurrentModel(undefined);
  }

  const handleSearch = (search: string) => {
    setSearch(search);

    fetchData(10, 1, search);
  }

  const handlePageChange = (pageNo: number) => {
    fetchData(10, pageNo, search)
  }

  return (
    <div className="container mt-4">

      {/* Search box */}
      <input
        className="form-control mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Table to show Dnn Models */}
      <TableComp handleSort={handleSort} showModal={showModal} setShowModal={setShowModal} sortConfig={sortConfig} sortedModels={sortedModels} currentModel={currentModel} setCurrentModel={setCurrentModel}></TableComp>
      {/* Pagination of table */}
      {pageData &&
        <div className="d-flex justify-content-end">
          <PaginationComp totalPages={Math.ceil(pageData.totalRecords / pageData.pageSize)} currentPage={pageData.currentPageNo} onPageChange={handlePageChange} />
        </div>
      }

      {/* Modal to show details */}
      <ModalComp showModal={showModal} currentModel={currentModel} handleClose={handleClose} />
    </div>
  );
}
