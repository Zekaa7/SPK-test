import React, { useState } from "react";
import { DopremaVoziloCreate } from "../../../Interface";
import { Button, Form, Modal } from "react-bootstrap";
import { dopremaVoziloCreate } from "../../../ApiCalls";
import { useDataContext } from "../../Context/getData";

function ModalPrevoznikVozilo({
  getData,
  onClose,
  clicked,
}: {
  getData: (data: DopremaVoziloCreate) => void;
  onClose: () => void;
  clicked: boolean;
}) {
  const [data, setData] = useState<DopremaVoziloCreate>();
  const [show, setShow] = useState(clicked);
  const { dopremaPrevoznik } = useDataContext();

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const newData: DopremaVoziloCreate = {
      vzRegVoz: (formData.get("vozilo") as string).toUpperCase(),
      vzRegPrik: (formData.get("prikolica") as string | "").toUpperCase(),
      prevId: dopremaPrevoznik?.prevId!,
    };

    setData(newData);

    try {
      const response = await dopremaVoziloCreate(newData);
      if (response?.isSuccess) {
        const savedData = {
          ...newData,
          id: response.value?.id,
          vrVozId: response.value?.vrVozId,
          vzBrMotora: response.value?.vzBrMotora,
        };
        getData(savedData);
      }
      console.log("Data successfully sent to the server.");
    } catch (error) {
      console.error("Failed to send data:", error);
    }

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered animation>
        <Modal.Header closeButton>
          <Modal.Title>Unos novog vozila</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formIme">
              <Form.Label>Registarska oznaka vozila</Form.Label>
              <Form.Control
                type="text"
                name="vozilo"
                placeholder="Unesite registarsku oznaku vozila"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIme">
              <Form.Label>Registarska oznaka prikolice</Form.Label>
              <Form.Control
                type="text"
                name="prikolica"
                placeholder="Unesite registarsku oznaku prikolice"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIme">
              <Form.Label>Naziv prevoznika</Form.Label>
              <Form.Control
                type="prevoznik"
                name="prikolica"
                autoFocus
                disabled
                value={dopremaPrevoznik?.prevNaziv}
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

export default ModalPrevoznikVozilo;
