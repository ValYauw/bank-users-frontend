import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

export default function UsersTable({ users = [], loading = false, handleEdit, handleDelete }) {

  if (loading) {
    return <Spinner animation="border" role="loading" />;
  }

  return (
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
            <tr>
              <td>{index+1}</td>
              <td>{fName}</td>
              <td>{lName}</td>
              <td>{fullName}</td>
              <td>{telephone}</td>
              <td>{email}</td>
              <td>{dateOfBirth}</td>
              <td>{description}</td>
              <td>{questionSecondAuthentication}</td>
              <td>
                <Button variant="primary" onClick={handleEdit(id)}>
                  Edit
                </Button>
                {' '}
                <Button variant="danger" onClick={handleDelete(id)}>
                  Delete
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}