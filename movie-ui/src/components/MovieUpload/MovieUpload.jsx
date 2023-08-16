import React from "react";
import "./MovieUpload.css";

function MovieUpload({ setShowModal }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Upload Movie</h3>
                    </div>
                    <div >
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            X
                        </button>
                    </div>

                </div>
                <div className="title">
                    <h1>Are You Sure You Want to Continue?</h1>
                </div>
                <div className="body">
                    <p>The next page looks amazing. Hope you want to go there!</p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setShowModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default MovieUpload;