import React, { useState } from 'react';
import './stylestu.css';
import Table from 'react-bootstrap/Table';
import 'react-notifications/lib/notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function Tanishstudent() {

    let [information, setinformation] = useState([]);
    let [uname, setname] = useState('');
    let [unumber, setnumber] = useState('');
    let [umail, setmail] = useState('');
    let [utext, settext] = useState('');
    let [searchQuery, setSearchQuery] = useState(''); 

    const addData = (event) => {
        event.preventDefault();

        const uname = event.target.uname.value.trim();
        const unumber = event.target.unumber.value.trim();
        const umail = event.target.umail.value.trim();
        const utext = event.target.utext.value.trim();

        if (uname === '' && unumber === '' && umail === '' && utext === '') {
            toast.warning("Please fill in all details!");
            return;
        }

        if (uname === '') {
            NotificationManager.warning("Please fill Username!");
            return;
        }

        if (unumber === '') {
            NotificationManager.warning("Please fill Phone Number!");
            return;
        }

        if (umail === '') {
            NotificationManager.warning("Please fill E-mail!");
            return;
        }

        if (utext === '') {
            NotificationManager.warning("Please write comments!");
            return;
        }

        const filterName = information.map(v => v.uname);
        const filterNumber = information.map(v => v.unumber);
        const filterMail = information.map(v => v.umail);
        const filterText = information.map(v => v.utext);

        if (!filterName.includes(uname) && !filterNumber.includes(unumber) && !filterMail.includes(umail) && !filterText.includes(utext)) {
            const newObject = { uname: uname, unumber: unumber, umail: umail, utext: utext };
            setinformation([...information, newObject]);
            setname('');
            setnumber('');
            setmail('');
            settext('');
            toast.success("Details added successfully!");
            return;
        }

        if (filterName.includes(uname) && filterNumber.includes(unumber) && filterMail.includes(umail) && filterText.includes(utext)) {
            NotificationManager.success("These details already exist!");
            return;
        }

        if (filterName.includes(uname)) {
            NotificationManager.warning("Please change Username, this name already exists!");
            return;
        }

        if (filterNumber.includes(uname)) {
            NotificationManager.warning("Please change Number, this number already exists!");
            return;
        }

        if (filterMail.includes(uname)) {
            NotificationManager.warning("Please change E-mail, this email already exists!");
            return;
        }

    };

    const searchData = (event) => {
        event.preventDefault();
        
        const dataId = searchQuery.trim();  
        
        const result = information.filter(v => 
            v.uname === dataId || 
            v.unumber === dataId || 
            v.umail === dataId || 
            v.utext === dataId
        );

        if(dataId===''){
            NotificationManager.warning("please enter your searching id!");
        }
    
        if (result.length > 0) {
            toast.success("Details are present in the list!");
            setname(result[0].uname);
            setnumber(result[0].unumber);
            setmail(result[0].umail);
            settext(result[0].utext);
        } 
        else {
            toast.warning("Details not found!");
        }
        setSearchQuery('')
    };

    return (
        <div>

            <h1 style={{color:"maroon",paddingTop:"40px"}}><b>Tanish Learning Center</b></h1>
            <div className='sr'>
                <input
                    id='pl1'
                    type='text'
                    className='form-control'
                    placeholder='Enter Name, Number, or E-mail'
                    style={{
                        width: '40%', marginLeft: '500px', marginTop: '15px',
                        height: '50px', textAlign: 'center', borderRadius: '20px'
                    }}
                    value={searchQuery}  
                    onChange={(e) => setSearchQuery(e.target.value)}  
                />

                <button className='btn btn-primary' onClick={searchData} style={{
                    height: '45px', width: '100px', marginTop: '20px',marginLeft:"20px", borderRadius: '20px',
                    backgroundColor: 'green',
                }}>Search
                </button>

            </div>

            <form onSubmit={addData}>

                <label><b>Username</b></label>
                <input
                    type='text'
                    name='uname'
                    className='form-control'
                    value={uname}
                    onChange={(e) => setname(e.target.value)}
                />

                <label><b>E-mail</b></label>
                <input
                    type='email'
                    name='umail'
                    className='form-control'
                    value={umail}
                    onChange={(e) => setmail(e.target.value)}
                />

                <label><b>Phone</b></label>
                <input
                    type='number'
                    name='unumber'
                    className='form-control'
                    value={unumber}
                    onChange={(e) => setnumber(e.target.value)}
                />

                <label><b>Comments</b></label>
                <textarea
                    style={{ height: '100px' }}
                    type='text'
                    name='utext'
                    className='form-control'
                    value={utext}
                    onChange={(e) => settext(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    style={{ marginTop: "40px", borderRadius: '20px', width: '150px', height: '50px', marginBottom:'50px',marginLeft:'110px' }}>
                    Save
                </button>

            </form>
            <ToastContainer/>
            <NotificationContainer />

            {information.map((v, i) => {
                return (
                    <FinalInformation
                        key={i}
                        v={v}
                        index={i}
                        information={information}
                        setinformation={setinformation}
                        setname={setname}
                        setnumber={setnumber}
                        setmail={setmail}
                        settext={settext}
                    />
                );
            })}
        </div>
    );
}

export default Tanishstudent;

export function FinalInformation({ v, index, information, setinformation, setname, setnumber, setmail, settext }) {

    function deleteData() {
        const finalData = information.filter((_, i) => i !== index);
        setinformation(finalData);
        toast.success("Details deleted successfully!");
    }

    function editData() {
        const currentData = information[index];
        setname(currentData.uname);
        setnumber(currentData.unumber);
        setmail(currentData.umail);
        settext(currentData.utext);
        deleteData();
    }

    return (
        <Table striped bordered hover style={{ width: '1400px', marginLeft: '90px'  }}>
            <thead>
                <tr>
                    <th style={{ textAlign: 'center', color: "maroon", backgroundColor: "gray", border: "1px red solid" }}>SL.No</th>
                    <th style={{ textAlign: 'center', color: "maroon", backgroundColor: "gray", border: "1px red solid" }}>User Name</th>
                    <th style={{ textAlign: 'center', color: "maroon", backgroundColor: "gray", border: "1px red solid" }}>Number</th>
                    <th style={{ textAlign: 'center', color: "maroon", backgroundColor: "gray", border: "1px red solid" }}>E-Mail</th>
                    <th style={{ textAlign: 'center', color: "maroon", backgroundColor: "gray", border: "1px red solid" }}>Comments</th>
                    <th style={{ textAlign: 'center', color: "maroon", backgroundColor: "gray", border: "1px red solid" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ textAlign: 'center', backgroundColor: "wheat", border: "1px red solid" }}><b>{index + 1}</b></td>
                    <td style={{ textAlign: 'center', backgroundColor: "wheat", border: "1px red solid" }}><b>{v.uname}</b></td>
                    <td style={{ textAlign: 'center', backgroundColor: "wheat", border: "1px red solid" }}><b>{v.unumber}</b></td>
                    <td style={{ textAlign: 'center', backgroundColor: "wheat", border: "1px red solid" }}><b>{v.umail}</b></td>
                    <td style={{ textAlign: 'center', backgroundColor: "wheat", border: "1px red solid" }}><b>{v.utext}</b></td>
                    <td style={{ textAlign: 'center', backgroundColor: "wheat", border: "1px red solid" }}>
                        <button className="btn btn-primary" onClick={editData}>Edit</button>
                        <button className="btn btn-danger" style={{ marginLeft: "20px" }} onClick={deleteData}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
