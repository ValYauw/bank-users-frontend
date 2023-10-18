import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, createUser, deleteUser, updateUser, getUser } from '../store/actions/actionCreator';

import UsersTable from '../components/UsersTable';
import UserForm from '../components/UserForm';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export default function UsersPage() {

  const dispatch = useDispatch();

  const { users, user, loading } = useSelector((state) => state.users);

  const [ showModal, setShowModal ] = useState(false);
  const [ mode, setMode ] = useState('add');

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <main className='mx-5'>
      <h1>Daftar User</h1>
      <div className='my-3 float-end'>
        <Button variant="primary" onClick={() => {
          setMode('add');
          setShowModal(true);
        }}>
          Tambah
        </Button>
      </div>
      <UsersTable 
        users={users} 
        loading={loading} 
        handleEdit={(id) => async () => {
          setMode('edit');
          await dispatch(getUser(id));
          setShowModal(true);
        }}
        handleDelete={(id) => async (e) => {
          dispatch(deleteUser(id));
          toast("Sukses");
        }}
      />
      <UserForm 
        initialState={mode === 'edit' ? user : null}
        mode={mode}
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={async (formData, mode) => {
          console.log(formData);
          try {
            if (mode === 'add') {
              await dispatch(createUser(formData));
            } else if (mode === 'edit') {
              await dispatch(updateUser(user.id, {id: user.id, ...formData}));
            }
            toast("Sukses");
            setShowModal(false);
          } catch(err) {
            let errors = err?.response?.data?.errors;
            errors = Object.entries(errors || { err: ['Internal server error']} )?.map(el => {
              let [k,v] = el;
              if (k.startsWith('$.')) {
                k = k.substring(2);
                v = `The ${k} field is invalid.`
              }
              return v;
            })
            toast(errors.join(" "));
          }          
        }}
      />
      <ToastContainer />
      </main>
    </>
  )
}
