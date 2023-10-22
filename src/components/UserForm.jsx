import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function UserForm({ initialState, mode, showModal = false, handleClose, handleSubmit }) {

  const [ formData, setFormData ] = useState({});

  useEffect(() => {
    setFormData({
      fName: initialState?.fName || '',
      lName: initialState?.lName || '',
      telephone: initialState?.telephone || '',
      email: initialState?.email || '',
      dateOfBirth: initialState?.dateOfBirth?.substring(0, 10) || '',
      description: initialState?.description || '',
      questionSecondAuthentication: initialState?.questionSecondAuthentication || ''
    })
  }, [initialState]);

  const handleFormInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Form className='m-5' autoComplete='off'>
        <Form.Group className="mb-6" name="fName">
          <Form.Label>Nama Depan</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Isi nama depan" 
            name="fName"
            required
            value={formData.fName}
            onChange={handleFormInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-6" name="lName">
          <Form.Label>Nama Belakang</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Isi nama belakang"  
            name="lName"
            value={formData.lName}
            onChange={handleFormInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-6" name="telephone">
          <Form.Label>Nomor telephone</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Isi nomor telephone"  
            name="telephone"
            required
            value={formData.telephone}
            onChange={handleFormInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-6" name="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Isi alamat email"  
            name="email"
            required
            value={formData.email}
            onChange={handleFormInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-6" name="dateOfBirth">
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Isi tanggal lahir"  
            name="dateOfBirth"
            required
            value={formData.dateOfBirth}
            onChange={handleFormInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-6" name="description">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Isi deskripsi" 
            name="description"
            required
            value={formData.description}
            onChange={handleFormInputChange} 
          />
        </Form.Group>

        <Form.Group className="mb-6" name="questionSecondAuthentication">
          <Form.Label>Pertanyaan untuk autentikasi?</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="ex. Apa warna kesukaan anda?"  
            name="questionSecondAuthentication"
            required
            value={formData.questionSecondAuthentication}
            onChange={handleFormInputChange}
          />
        </Form.Group>

        <div className="mt-4 d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className='mx-2'>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(formData, mode)}>
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}