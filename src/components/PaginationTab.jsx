import Pagination from 'react-bootstrap/Pagination';

export default function PaginationTab({ numPages = 0, currentPage = 0, navigateToPage }) {
  
  function InnerPaginationButtons() {
    if (numPages === 0) {
      return (
        <Pagination.Item disabled>{1}</Pagination.Item>
      );
    }
    if (numPages <= 5) {
      return Array.from({ length: numPages }, (_, index) => index).map(i => (
        <Pagination.Item 
          key={i+1}
          active={ (i+1) === currentPage }
          onClick={() => navigateToPage(i+1)}
        >
          {i+1}
        </Pagination.Item>
      ));
    }
    else {
      return (
        <>
          <Pagination.Item 
            onClick={() => navigateToPage(1)}
          >
            {1}
          </Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item 
            onClick={() => navigateToPage(currentPage)}
            active 
          >
            {currentPage}
          </Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item 
            onClick={() => navigateToPage(numPages)}
          >
            {numPages}
          </Pagination.Item>
        </>
      )
    }
  }
  
  return (
    <Pagination className='d-flex justify-content-center'>
      <Pagination.First 
        disabled={currentPage === 1}
        onClick={() => navigateToPage(1)} 
      />
      <Pagination.Prev 
        disabled={currentPage === 1}
        onClick={() => navigateToPage(currentPage - 1)} 
      />
      <InnerPaginationButtons />
      <Pagination.Next 
        disabled={currentPage === numPages}
        onClick={() => navigateToPage(currentPage + 1)} 
      />
      <Pagination.Last 
        disabled={currentPage === numPages}
        onClick={() => navigateToPage(numPages)} 
      />
    </Pagination>
  )
}