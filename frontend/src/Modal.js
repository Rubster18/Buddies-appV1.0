import React from 'react';



const Modal = ({person, show, closeModal}) => {

  function calculate_age(dateofbirth) { 
    const date = new Date(dateofbirth);
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const age = calculate_age(person.dateofbirth);
  let buddy_patient = ""; 

  person.im_a_buddy = 1 ? buddy_patient = "Buddy" : buddy_patient = "Patient";

    console.log(show)
    console.log(person)
   if (!show) {
     return null;
   }
    return(
      <div className="modal-box" id="modal-box">
         <div className="modalcontainer card">
            <h2 className="modal-head">{person.name}</h2>
            <div className="close-btn" onClick={closeModal}> x </div>
            <div className="modal-props">

              <div className="modalp">
                <div className="textrows">
                <p> <b>Leeftijd: </b> </p>
                <p className="border-b">{age}</p>
               </div>
              </div>
              <div className="modalp">
                <div className="textrows">
                  <p> <b>Email:</b></p>
                  <p className="border-b">{person.email}</p>
                </div>
              </div>

              <div className="modalp">
                <div className="textrows">
                  <p> <b>Geboorteplaats:</b> </p> 
                  <p className="border-b">{person.hometown}</p>
                </div>
              </div>

              <div className="modalp">
                <div className="textrows">
                  <p><b>Maatje of patiënt?</b> </p>
                  <p className="border-b"> {buddy_patient}</p> 
                </div>
              </div>

              <div className="hobbiebox">
                <div className="textrows">
                  <p> <b> hobby's en interesses:</b></p> 
                  <p clas="border-b">{person.hobbies}</p>
                </div>
              </div>
          </div>
        
         </div>
        <div className="overlay" onClick={closeModal}></div>
      </div>
    )
  };

/*  
------- USE THIS WHEN DELETE + MATCH FUNTIONALITIES ARE IMPLEMENTED ----------
<div className="btn-container"> 
  <button className="small-button delete"> Verwijderen </button>
  <button className="match-btn" > Ga naar de matchlijst </button>
</div> */

  export default Modal;