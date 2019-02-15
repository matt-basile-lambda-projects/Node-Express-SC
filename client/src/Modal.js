import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'


const ModalExampleTopAligned = (props) => (
  <Modal trigger={<Button onClick={(e)=> props.moreProjectInfo(e, props.project.id)}>See Actions</Button>} centered={false}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Actions</Header>
        {props.actions.map(action =>{
          return <div>
            <p>{action.description}</p>
            <p>{action.notes}</p>
          </div>
        })}
      </Modal.Description>
    </Modal.Content>
  </Modal>
)



export default ModalExampleTopAligned