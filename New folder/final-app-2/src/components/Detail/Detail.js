import React from 'react';
import './Detail.css';
function Detail(props) {
    const {item} = props;

    var average = (item.java + item.fe + item.react) / 3;
    average = Math.round(average * 100) / 100;
    return (
        <div>
            <h3>Detail</h3>
            <p className="bg-info">{item.name}</p>
            <div className="row">
                <div className="col">
                    <p>Java</p>
                    <div className="bg-success mark">
                        {item.java}
                    </div>
                </div>
                <div className="col">
                    <p>FE</p>
                    <div className="bg-success mark">
                        {item.fe}
                    </div>
                </div>
                <div className="col">
                    <p>React</p>
                    <div className="bg-success mark">
                        {item.react}
                    </div>
                </div>
            </div>
            <div className="bg-info mark ava">
                {average}
            </div>
        </div>
    );
}

export default Detail;