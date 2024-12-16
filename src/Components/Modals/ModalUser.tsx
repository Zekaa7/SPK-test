import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { ModalProps } from "../../../Interface";
import { createNewVozac } from "../../../ApiCalls";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ModalDialog({
  clicked,
  onClose,
  getData,
}: {
  clicked: boolean;
  onClose: () => void;
  getData: (data: ModalProps) => void;
}) {
  const [show, setShow] = useState(clicked);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState<ModalProps>({
    ime: "",
    prezime: "",
    jmbg: "",
    brPasosa: "",
    stranac: "N",
    prevId: "",
    drzavljanstvo: null,
    legitimacija: null,
  });

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const newData: ModalProps = {
      ime: formData.get("ime") as string,
      prezime: formData.get("prezime") as string,
      jmbg: formData.get("jmbg") as string,
      brPasosa: formData.get("brPasosa") as string,
      stranac: data.stranac,
      prevId: data.prevId,
      drzavljanstvo: data.drzavljanstvo,
      legitimacija: data.legitimacija,
    };

    // Provera JMBG samo ako osoba nije strani državljanin
    if (newData.stranac === "N") {
      if (newData.jmbg.length !== 13 || !/^\d{13}$/.test(newData.jmbg)) {
        setValidated(false);
        alert("Molimo unesite validan JMBG od 13 cifara.");
        return;
      } else {
        setValidated(true);
      }
    }

    setData(newData);

    try {
      await createNewVozac(newData);
      console.log("Data successfully sent to the server.");
    } catch (error) {
      console.error("Failed to send data:", error);
    }
    getData(newData);

    handleClose();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      stranac: e.target.checked ? "Y" : "N",
    }));
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered animation>
        <Modal.Header closeButton>
          <Modal.Title>Unos novog vozaca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formIme">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                name="ime"
                placeholder="Unesite Vase ime"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrezime">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite Vase prezime"
                name="prezime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJMBG">
              <Form.Label>JMBG</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite Vas JMBG"
                name="jmbg"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formISprava">
              <Form.Label>Br. lične isprave</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite Vas br. lične isprave"
                name="brPasosa"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCheckStraniDrzavljanin">
              <Form.Check
                type="checkbox"
                label="Strani državljanin"
                checked={data.stranac === "Y"}
                onChange={handleCheckboxChange}
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
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

export default ModalDialog;
