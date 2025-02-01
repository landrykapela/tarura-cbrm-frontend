'use client'
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { clearSession } from "../utils/utils";

const SignoutDialog =(props:any)=>{
  const navigate = useNavigate()
  const handleCancel=() =>{
    props.onCancel();
  }
  const handleAction = () => {
    clearSession()
    props.onCancel()
    navigate('/',{replace:true})
    
  };
    
    return (<p>Hola</p>
    // <Modal className="overlay w-5/12 z-50 bg-white shadow-lg mt-32 mx-auto rounded-md " isOpen={props.show} ariaHideApp={false}
    //   onRequestClose={handleCancel} style={{
    //   content: {
    //     top: '80%',
    //     left: '50%',
    //     // right: 'auto',
    //     // bottom: 'auto',
    //     // marginRight: '-50%',
    //     // transform: 'translate(-50%, -50%)',
    //   },
    // }}>
      
    //     <div className="w-full flex-center flex-top bg-accent ">
    //       <h4 className="flex-row flex-center text-2xl p-2">
    //         {props.title}
    //       </h4>
    //       </div>
    //       <div className="px-4 py-8">
    //       <p className="text-textDefault my-8">{props.msg}</p>
    //       <div className="flex justify-between items-center mx-5 my-5">
    //         <button
    //           onClick={handleAction}
    //           className="bg-accent py-2 px-4 cursor-pointer"
    //           id="action-signout"
    //         >
    //           Sign out
    //         </button>

    //         <button
    //           id="cancel-user"
    //           className="text-accent border-accent py-2 px-4 cursor-pointer"
    //           onClick={handleCancel}
    //         >
    //           CANCEL
    //         </button>
    //       </div>
    //     </div>
     
    //   </Modal>
    );
  
}
export default SignoutDialog;
