import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "axios";

export default function SaveSegment() {
    const [modal, setModal] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const [schemaData, setSchemaData] = useState([])
    const [schemaObj, setSchemaObj] = useState({})
    const [message, setMessage] = useState('');

    useEffect = (() => {
        if ((localStorage.getItem('segmentData')) != null) {
            var data = JSON.parse(localStorage.getItem('segmentData'))
            setSchemaData(data)
        }

    }, [])

    function hangleChange(segmentValue) {

        if (segmentValue) {
            let segmentObj = {};
            if (segmentValue == 'first_name') {
                segmentObj = { 'first_name': segmentValue }
            } else if (segmentValue == 'last_name') {
                segmentObj = { 'last_name': segmentValue }
            }
            else if (segmentValue == 'gender') {
                segmentObj = { 'gender': segmentValue }
            }
            else if (segmentValue == 'age') {
                segmentObj = { 'age': segmentValue }
            }
            else if (segmentValue == 'account_name') {
                segmentObj = { 'account_name': segmentValue }
            }
            else if (segmentValue == 'city') {
                segmentObj = { 'city': segmentValue }
            } else {
                segmentObj = { 'state': segmentValue }
            }
            setSchemaObj(segmentObj)
        }

        else {
            alert("Please select any value")
        }
    }

    const handleSubmit = async() => {
        let segmentArr = [...schemaData];
        segmentArr.push(schemaObj)
        setIsOpen(false)
        
        const segmentObject = {
            "segment_name": message,
            "schema": schemaData
        }
        setSchemaData([])
        setMessage('')
        localStorage.setItem('segmentData', JSON.stringify([]))
        await axios.post('https://webhook.site/2a820001-7027-432c-b9bc-7e893824c019', JSON.stringify(segmentObject));
        
    }

    function removeItem(i) {
        var removeSegment = []
        schemaData.map((ele, index) => {
            if (index == i) {

            } else {
                removeSegment.push(ele)
            }
        })
        setSchemaData(removeSegment)
        localStorage.setItem('segmentData', JSON.stringify(removeSegment))
    }

    const handleChangeForSegment = event => {
        setMessage(event.target.value);
    
    };

    const addNewSchema = () => {
        let segmentArr = [...schemaData];
        segmentArr.push(schemaObj)
        setSchemaData(segmentArr)
        localStorage.setItem('segmentData', JSON.stringify(segmentArr))
    }


    return (
        <div>
            <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>
                    <ModalBody>
                        <div style={{ padding: "20px" }}>
                            <div>
                                <p>Enter the name of the segment</p>
                                <input
                                    type="text"
                                    id="segmentName"
                                    name="segmentName"
                                    onChange={handleChangeForSegment}
                                    value={message}
                                />
                            </div>
                            <div>
                                <p>To save your segment. You need to add the sechmas to build the query.</p>
                            </div>
                            <div className="traits">
                                <div className="d-flex">
                                    <p className="dot green"></p>
                                    <p>User Traits</p>
                                </div>
                                <div className="d-flex">
                                    <p className="dot"></p>
                                    <p>Group Traits</p>
                                </div>
                            </div>
                            <div className="schema-div">
                                {schemaData.map((ele, index) => {
                                    return (
                                        <div className="d-flex justify-space-arround">
                                            <p className={index % 2 == 0 ? "dot green" : "dot"}></p>
                                            <select>
                                                <option value='first_name' selected={(ele.first_name) ? true : false}>First Name</option>
                                                <option value='last_name' selected={(ele.lastt_name) ? true : false} >Last Name</option>
                                                <option value='gender' selected={(ele.gender) ? true : false}>Gender</option>
                                                <option value='age' selected={(ele.age) ? true : false}>Age</option>
                                                <option value='account_name' selected={(ele.account_name) ? true : false}>Account Name</option>
                                                <option value='city' selected={(ele.city) ? true : false}>City</option>
                                                <option value='state' selected={(ele.state) ? true : false}>State</option>
                                            </select>
                                            <div className='sigment-remove' onClick={() => removeItem(index)}> - </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="d-flex justify-space-arround add-schema">
                                <p className="dot gray"></p>
                                    <select onChange={(e) => hangleChange(e.target.value)}>
                                        <option value=''>Add schema to segment</option>
                                        <option value='first_name'>First Name</option>
                                        <option value='last_name'>Last Name</option>
                                        <option value='gender'>Gender</option>
                                        <option value='age'>Age</option>
                                        <option value='account_name'>Account Name</option>
                                        <option value='city'>City</option>
                                        <option value='state'>State</option>
                                    </select>
                                {/* <div className='sigment-remove' onClick={() => setIsOpen(false)}> - </div> */}
                            </div>

                            <div className="add-new-schema" onClick={() => addNewSchema()}>
                                <p><u>+Add new schema</u></p>
                            </div>
                            <div className="nav gray">
                                <button className="btn" onClick={handleSubmit}>Save the segment</button>
                                <button className="btn cancel" onClick={() => setModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalHeader>
            </Modal>
            <button className="btn mt-3" style={{ backgroundColor: '#0b3629', color: "white"}} onClick={() => setModal(true)}>
                Save Segment
            </button>
        </div>

    )
}
