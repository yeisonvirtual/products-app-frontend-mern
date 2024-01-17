import { useEffect, useState } from "react"
import { Box, Button, Content, Form, Heading, Message, Modal, Pagination, Section, Table } from "react-bulma-components"
import { deleteUser, getUsers } from "../services/users"
import { useNavigate } from "react-router-dom";
import { FormRegister } from "../../Auth/components/FormRegister";
import { register } from "../../Auth/services/auth";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  // buscador
  const [formValues, setFormValues] = useState({
    field: '0',
    query: ''
  });

  const loadUsers = async () => {
    const response = await getUsers(page, formValues);
    const data = await response.json();
    //console.log(data.users);

    if (response.status===200) {
      setErrors(null);
      setUsers(data.users.docs);
      setTotalPages(data.users.totalPages);
    } else { 
      setErrors(data.message);
      setUsers({});
    }

  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  }

  const _handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  }

  const _handleEdit = async (userID) => {
    navigate(`edit/${userID}`);
  }

  const _handleDelete = async (userID) => {
    const response = await deleteUser(userID);
    const data = await response.json();

    if (response.status===200) {
      loadUsers();
    } else { 
      setErrors(data.message);
      setUsers({});
    }
  }

  const onChange = (nPage) => {
    setPage(nPage);
  }

  useEffect(() => {
    loadUsers();
  }, [page]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [success, setSuccess] = useState(false);
  const [errorsRegister, setErrorsRegister] = useState(null);

  const addUser = async (userData) => {
    
    const response = await register(userData);

    const data = await response.json();

    console.log(data);

    if (response.status === 201) {
      setIsModalOpen(false);
      setErrorsRegister(null);
      setSuccess(true);
      setPage(1);
    }
    else setErrorsRegister(data.message);
    
  }

  
  return (

    <>

      <Content>
        <Section>

          <Box style={{ width: 900, margin: 'auto' }}>

          <Heading size={4}>Users</Heading>

          <Heading size={6}>Search</Heading>

            {
              success && (
                <Message color="success">
                  <Message.Header>
                    <span>
                      Success
                    </span>
                    <Button remove onClick={()=> setSuccess(null)} />
                  </Message.Header>
                  <Message.Body>
                    El usuario fue agregado exitosamente
                  </Message.Body>
                </Message>
              )
            
            }

            {
              errors && (
                <Message color="danger">
                  <Message.Header>
                    <span>
                      Errors
                    </span>
                    <Button remove onClick={()=> setErrors(null)} />
                  </Message.Header>
                  <Message.Body>
                    {errors}
                  </Message.Body>
                </Message>
              )
            
            }

            <Content style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Content style={{ display: 'flex' }}>
                <Form.Field style={{ marginRight: 20 }}>
                  <Form.Control>
                    <Form.Select name="field" value={formValues.field} onChange={handleChange}>
                      <option value="0"></option>
                      <option value="1">name</option>
                      <option value="2">email</option>
                      <option value="3">type</option>
                      <option value="4">active</option>
                      <option value="5">verified</option>
                    </Form.Select>
                  </Form.Control>
                </Form.Field>
                <Form.Field style={{ marginRight: 20 }}>
                  <Form.Control>
                    <Form.Input placeholder="Search" name="query" value={formValues.query} onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Button rounded color="primary" onClick={_handleSubmit}>Search</Button>
              </Content>
              
              <Content>
                <Button rounded color="primary" style={{ float: "right" }} onClick={()=> setIsModalOpen(true)}>Add</Button>
              </Content>
              
            </Content>

            <Table style={{ minHeight: 340, margin: 'auto' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>email</th>
                  <th>type</th>
                  <th>active</th>
                  <th>verified</th>
                  <th>options</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.length>0 && users.map(user=>(
                    <tr key={user._id}>
                      <th>{user._id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.type}</td>
                      <td style={{textAlign: 'center'}}>{user.active? '✔' : '✖'}</td>
                      <td style={{textAlign: 'center'}}>{user.verified? '✔' : '✖'}</td>
                      <td>
                      <Button.Group style={{ width: 100 }}>
                          <Button onClick={ () => _handleEdit(user._id) } color="info" renderAs="span">
                            E
                          </Button>
                          <Button onClick={ () => _handleDelete(user._id) } color="danger" renderAs="span">
                            D
                          </Button>
                        </Button.Group>
                      </td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </Table>
            
            <Pagination
              style={{ height: 60 }}
              current={page}
              showFirstLast
              total={totalPages}
              next='Siguiente'
              previous='Anterior'
              rounded={true}
              size={"small"}
              onChange={onChange}
            />

          </Box>
        </Section>
      </Content>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>
            Add User
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          {
            errorsRegister && (
              <Message color="danger">
                <Message.Header>
                  <span>
                    Errors
                  </span>
                  <Button remove onClick={()=> setErrors(null)} />
                </Message.Header>
                <Message.Body>
                  {errorsRegister}
                </Message.Body>
              </Message>
            )
          
          }
          <FormRegister handleSubmit={addUser}></FormRegister>
        </Modal.Card.Body>
      </Modal.Card>
      </Modal>

    </>
  )
}