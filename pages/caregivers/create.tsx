// pages/caregivers/create.js

import { useState } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { graphQLClient } from '../../utils/graphql-client';
import utilStyles from '../../styles/utils.module.scss';
import { useAuth } from '../../security/auth';

const Create = () => {
  const { session, loading } = useAuth();
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (async (e) => {
    const form = e.currentTarget;
    
    try {
      
      setValidated(true);

      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
        
        

        e.preventDefault()
          const formData = new FormData(e.target),
                formDataObj = Object.fromEntries(formData.entries())
          // console.log(formDataObj)

          const mutation = gql`
            mutation CreateACaregiver($firstName: String!, $lastName: String!, $telephone: String!) {
              createCaregiver(
                data: { firstName: $firstName, lastName: $lastName, telephone: $telephone}
              ) {
                  firstName
                  lastName
              }
            }
          `;

          const variables = {
            firstName: formDataObj.firstName,
            lastName:  formDataObj.lastName,
            telephone: formDataObj.telephone            
          };
          await graphQLClient(session.accessToken).request(mutation, variables);
          Router.push('/caregivers');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  })

  return (
    <>
      <h1>Create Caregiver</h1>

      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder="First name"              
            />
            <Form.Control.Feedback type="invalid">Please choose a </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              placeholder="Last name"              
            />
            <Form.Control.Feedback type="invalid">Please choose a Last Name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomTelephone">
            <Form.Label>Telephone</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">Tel.</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="telephone"
                placeholder="Telephone"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a telephone.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        {/* <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group> */}
        <Button type="submit">Submit form</Button>
      </Form>            

      {errorMessage && (
        <p role="alert" className={utilStyles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default Create;