import React, {useState} from 'react';
import Modal from './Modal';
import HeaderAdmin from './HeaderAdmin';

const AdminTableFetcher = props => {
    const [tableData, setTableData] = React.useState(null);
    const [mainArray, setMainArray] = React.useState(null);

    const seeBuddies = () => {
        const filteredData = mainArray.filter( element => element.im_a_buddy === 1);
        setTableData(filteredData);
    }

    const seePatients = () => {
        const filteredData = mainArray.filter( element => element.im_a_buddy !== 1);
        setTableData(filteredData);
    }

    const seeAll = () => {
        setTableData(mainArray);
    }

    React.useEffect(() => {
        fetch("http://localhost:9000/get-table")
            .then(response => response.json())
            .then(data => {setTableData(data); setMainArray(data)})
            .catch(rejected => console.log(rejected))
    }, []);

    return (

        !tableData ? 
            (<p>Loading...</p>) 
        : (
            <div className="">
                <HeaderAdmin />

                <div className="container-form">
                    <h1>Table of participants</h1>

                    <form className="table-button-container">
                        <label className="table-button" onClick={seeBuddies}>
                            <input type="radio" name="radio-table"/> 
                            Buddies
                        </label>

                        <label className="table-button" onClick={seePatients}>
                            <input type="radio" name="radio-table"/> 
                            Patients
                        </label>

                        <label className="table-button" onClick={seeAll}>
                            <input type="radio" name="radio-table"/> 
                            All
                        </label>
                    </form>

                    <AdminTable data={tableData}/>

                </div>
            </div> 
        )
    )
}



const AdminTable = props => {


    function calculate_age(dateofbirth) { 
        const date = new Date(dateofbirth);
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    let itemId = 0;

    const [show, setShow] = useState(false);
    const [person, setPerson] = useState({});

    const showModal = (person) =>{
        setPerson(person);
        setShow(true);
    }

    const closeModal = () =>{
        setShow(false);
    }

    return (
        <div>
            <Modal show={show} closeModal={closeModal} person={person}/>
            
                <table id="tableId">
                    <thead>
                        <tr>
                            <th className="name-column">Name</th>
                            <th className="age-column">Age</th>
                            <th className="email-column">Email</th>
                            <th className="hometown-column">Hometown</th>
                            <th className="hobbies-column">Hobbies/Interest</th>
                            <th className="buddy-column">Buddy or patient?</th>
                        </tr>
                    </thead>

                    <tbody>
                    {props.data.map( person => {
                        itemId++;
                        
                        let buddy_patient = "patient";

                        const age = calculate_age(person.dateofbirth);

                        if(person.im_a_buddy === 1)  buddy_patient = "buddy";

                        return ( 
                            <tr key={itemId} className={buddy_patient} onClick={()=>showModal(person)}>
                                <td className="name-column">{person.name}</td>
                                <td className="age-column">{age}</td>
                                <td className="email-column">{person.email}</td>
                                <td className="hometown-column">{person.hometown}</td>
                                <td className="hobbies-column">{person.hobbiesandinterests}</td>
                                <td className="buddy-column">{buddy_patient}</td>
                            </tr>
                        )
                    }) } 
                    </tbody>
                </table>

        </div>
    );
}

export default AdminTableFetcher;   
