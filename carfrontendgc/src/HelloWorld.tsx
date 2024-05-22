import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HelloWorld: React.FC = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/hello/')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default HelloWorld;
