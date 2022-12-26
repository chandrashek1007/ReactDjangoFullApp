// Loading.js
import React from 'react';
import {Background, LoadingText} from './Styles';

export default () => {
    return (
        <Background>
            <img src='/resources/icons/loading_spinner.gif' alt="Loading..." width="50px"/>
            <LoadingText style={{marginTop : '5px'}}>Fetching Data ...</LoadingText>
        </Background>
    );
};