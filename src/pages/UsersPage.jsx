import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, createUser, deleteUser, updateUser, getUser } from '../store/actions/actionCreator';

import UsersTable from '../components/UsersTable';
import UserForm from '../components/UserForm';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export default function UsersPage() {

  const dispatch = useDispatch();

  const { users: { numPages = 0, data: users = [] } = {}, user, loading, processing } = useSelector((state) => state.users);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ showModal, setShowModal ] = useState(false);
  const [ mode, setMode ] = useState('add');

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [currentPage]);

  return (
    <>
      <main className='mx-5'>
      <h1>Daftar User</h1>

      <div className='my-3 d-flex justify-content-end'>
        <Button variant="primary" onClick={() => {
          setMode('add');
          setShowModal(true);
        }}>
          Tambah
        </Button>
      </div>

      <UsersTable 
        users={users} 
        numPages={numPages}
        currentPage={currentPage}
        loading={loading} 
        handleEdit={(id) => async () => {
          setMode('edit');
          await dispatch(getUser(id));
          setShowModal(true);
        }}
        handleDelete={(id) => async (e) => {
          try {
            dispatch(deleteUser(id));
            toast("Data telah sukses ter-delete", { type: 'success' });
          } catch(err) {
            console.log(err);
            toast("Error", { type: 'error' });
          }
        }}
        navigateToPage={(pageNumber) => {
          setCurrentPage(pageNumber);
        }}
      />

      <UserForm 
        initialState={mode === 'edit' ? user : null}
        mode={mode}
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={async (formData, mode) => {
          // console.log(formData);
          try {
            let successMessage = "";
            if (mode === 'add') {
              await dispatch(createUser(formData));
              successMessage = "Sukses menambah user";
            } else if (mode === 'edit') {
              await dispatch(updateUser(user.id, {id: user.id, ...formData}));
              successMessage = "Sukses mengedit user";
            }
            dispatch(fetchUsers(currentPage));
            toast(successMessage, { type: 'success' });
            setShowModal(false);
          } catch(err) {
            let errors = err?.response?.data?.errors;
            errors = Object.entries(errors || { err: ['Internal server error']} )?.map(el => {
              let [k,v] = el;
              return v[0];
            })
            toast(errors[0], { type: 'error' });
          }          
        }}
      />

      <ToastContainer 
        position="top-center"
        closeOnClick
      />
      </main>
    </>
  )
}
