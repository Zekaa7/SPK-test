import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { prevoznikCreateProps } from "../../../Interface";
import { prevoznikCreate } from "../../../ApiCalls";

function ModalPrevoznik({
  getData,
  onClose,
  clicked,
}: {
  getData: (data: prevoznikCreateProps) => void;
  onClose: () => void;
  clicked: boolean;
}) {
  const [data, setData] = useState<prevoznikCreateProps>();
  const [show, setShow] = useState(clicked);

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const newData: prevoznikCreateProps = {
      prevNaziv: formData.get("ime") as string,
      id: undefined,
    };

    try {
      const response = await prevoznikCreate(newData);

      if (response.isSuccess) {
        const savedData = {
          ...newData,
          id: response.value.id,
        };

        getData(savedData);
        console.log("Data successfully saved:", savedData);
      } else {
        console.error("Failed to save data:", response.error);
      }
    } catch (error) {
      console.error("Failed to send data:", error);
    }

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered animation>
        <Modal.Header closeButton>
          <Modal.Title>Unos novog kupca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formIme">
              <Form.Label>Naziv</Form.Label>
              <Form.Control
                type="text"
                name="ime"
                placeholder="Unesite naziv kupca"
                autoFocus
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sacuvaj
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPrevoznik;
