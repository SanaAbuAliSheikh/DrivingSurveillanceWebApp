import Pagination from 'react-bootstrap/Pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComp = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handleClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />
      {items}
      <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default PaginationComp;
