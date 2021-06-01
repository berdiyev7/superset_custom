import React, { ReactElement, useState } from 'react'
import { styled, } from '@superset-ui/core'

interface ModalProps {
   visible: boolean;
   title: string;
   content: ReactElement | string;
   footer: ReactElement | string;
   onClose: () => void;
}


const ModalPivotWindow = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   width: 100%;
   z-index: 9999;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: rgba(0, 0, 0, 0.25);
`;

const ModalDialog = styled.div`
   width: 100%;
   max-width: 550px;
   background: #fff;
   position: relative;
   margin: 0 20px;
   max-height: calc(100vh - 40px);
   text-align: left;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ModalHeader = styled.div`
   display: flex;
   align-items: center;
   padding: 1rem;
   border-bottom: 1px solid #dbdbdb;
   justify-content: space-between;
`;
const ModalFooter = styled.div`
   display: flex;
   align-items: center;
   padding: 1rem;
   border-top: 1px solid #dbdbdb;
   justify-content: flex-end;
`;

const ModalClose = styled.span`
   cursor: pointer;
   padding: 1rem;
   margin: -1rem -1rem -1rem auto;
`;

const ModalBody = styled.div`
   overflow: auto;
`;

const ModalContent = styled.div`
   padding: 1rem;
`;

const ModalTitle = styled.h3`
   margin: 0;
`;

const ButtonSubmit = styled.button`
   cursor: pointer;
   background: transparent;
   border-radius: 3px;
   border: 2px solid palevioletred;
   color: palevioletred;
   margin: 0.5em 1em;
   padding: 0.25em 1em;
 
`;



const Modal = ({
   visible = false,
   title = '',
   content = '',
   footer = '',
   onClose,
}: ModalProps) => {

   const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
         case 'Escape':
            onClose()
            break
      }
   }

   React.useEffect(() => {
      document.addEventListener('keydown', onKeydown)
      return () => document.removeEventListener('keydown', onKeydown)
   })

   if (!visible) return null;

   return (
      <ModalPivotWindow onClick={onClose}>
         <ModalDialog onClick={e => e.stopPropagation()}>
            <ModalHeader>
               <ModalTitle>{title}</ModalTitle>
               <ModalClose onClick={onClose}>&times;</ModalClose>
            </ModalHeader>
            <ModalBody>
               <ModalContent>{content}</ModalContent>
            </ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
         </ModalDialog>
      </ModalPivotWindow>
   )
}

const ModalPivot = () => {
   const [isModal, setModal] = React.useState(false)
   const onClose = () => setModal(false)
   return (
      <>
         <ButtonSubmit onClick={() => setModal(true)}>Показать идентификатор</ButtonSubmit>
         <Modal
            visible={isModal}
            title="Идентификатор заказа ЯндексТакси"
            content={<p>Что-то важное</p>}
            footer={<button onClick={onClose}>Закрыть</button>}
            onClose={onClose}
         />
      </>
   )
}


export default ModalPivot;