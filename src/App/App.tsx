import React from 'react';
import './App.css';
import {Form} from '../Form/Form';
import {PhoneNumbersList} from "../PhoneNumbersList/PhoneNumbersList";


interface AppState {
    phoneNumbers: string[];
}

export class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            phoneNumbers: ["+7-922-222-22-22", "+7-945-464-56-57"]
        };
    }

    handleAddNewPhoneNumber = (newPhoneNumber: string): void => {
        this.setState({phoneNumbers: [...this.state.phoneNumbers, newPhoneNumber]});
    };

    render(): JSX.Element {
        return (
            <div className="app">
                <Form phoneNumbers={this.state.phoneNumbers} onAddNewPhoneNumber={this.handleAddNewPhoneNumber}/>
                <PhoneNumbersList phoneNumbers={this.state.phoneNumbers}/>
            </div>);
    }
}
