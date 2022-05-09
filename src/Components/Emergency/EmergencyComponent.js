import React from 'react';
import './Emergency.css'
const EmergencyComponent = (props) => {
    const emergencyList = [...props.emergencyList]
    const out = emergencyList.map((item) => {
        console.log(item)
        return (
            <div key={item._id} className="emergency-card">
                <div className="vertical-flex">
                    <div className="label">Patient Name :</div>
                    <input type="text" value={item.name_of_patient} />
                </div>
                <div className="vertical-flex">
                    <div className="label">Type Of Emergency : </div>
                    <input type ="text" value={item.type_of_emergency}/>
                </div>
                <div className="vertical-flex">
                    <div className="label">Intensity Of Emergency : </div>
                    <input type ="text" value={item.intensity_of_emergency}/>
                </div>
                <div className="vertical-flex">
                    <div className="label">Location :</div>
                    <input type="text" value={item.address}/>
                </div>
                <div className="vertical-flex">
                    <div className="label">Any Requirements : </div>
                    <input type="text" value={item.requirements}/>
                </div>

                <div className="vertical-flex">
                    <div className="label">Time :</div>
                    <input type="text" value={item.time} />
                </div>
                <div className="vertical-flex">
                    <div className="label">Description :  </div>
                    <input style={{"width":"60vw"}} type="text" value={item.description}/>
                </div>

            </div>
        )
    })
    return (
        <div>
            {out}
        </div>
    )
}

export default EmergencyComponent;