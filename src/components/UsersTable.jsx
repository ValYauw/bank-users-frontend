import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import PaginationTab from '../components/PaginationTab';

export default function UsersTable({ 
  users = [], 
  numPages = 0,
  currentPage = 0,
  loading = false, 
  handleEdit, 
  handleDelete,
  navigateToPage
}) {

  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation="border" role="loading" />
      </div>
    );
  }

  return (
    <div className="table-responsive">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nama Depan</th>
          <th>Nama Belakang</th>
          <th>Nama Lengkap</th>
          <th>No. telephone</th>
          <th>Email</th>
          <th>Tanggal Lahir</th>
          <th>Deskripsi</th>
          <th>Question for 2nd Authentication</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
          const { id, fName, lName, fullName, telephone, email, dateOfBirth, description, questionSecondAuthentication } = user;
          return (
            <tr key={id}>
              <td>{(currentPage-1) * 10 + index + 1}</td>
              <td>{fName}</td>
              <td>{lName}</td>
              <td>{fullName}</td>
              <td>{telephone}</td>
              <td>{email}</td>
              <td>{dateOfBirth ? new Intl.DateTimeFormat('id-ID').format(new Date(dateOfBirth)) : ''}</td>
              <td>{description}</td>
              <td>{questionSecondAuthentication}</td>
              <td>
                <Button variant="primary" onClick={handleEdit(id)} size="sm">
                  Edit
                </Button>
                {' '}
                <Button variant="danger" onClick={handleDelete(id)} size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    <PaginationTab 
      numPages={numPages}
      currentPage={currentPage}
      navigateToPage={navigateToPage}
    />
    </div>
  )
}